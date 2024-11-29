import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { HelperService } from 'src/app/core/service/helper-service';
import { MessageBoxService } from 'src/app/core/service/message-box.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  
})
export class UserDetailComponent implements OnInit {
  formControl;
  password = null;
  rePassword=null;
  touched=false;
  loading=true;
  isShow=false;
  id;
  version;
  
  constructor(private formBuilder: UntypedFormBuilder,
    private srv: UserService,
    private auth:AuthenticationService,
    private route:ActivatedRoute,
    private help:HelperService,
    private msg:MessageBoxService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.createForm();
    this.getDetail(this.id);
  }

  getDetail(id){
    this.loading = true;
    this.srv.getOne(id).subscribe(res=>{
      this.version=res.version;
      res.effBegin=res.effBegin?new Date(res.effBegin):null;
      res.effEnd= res.effEnd?new Date(res.effEnd):null;
      this.formControl.patchValue(res);
      this.loading=false;
    }, err => {
      this.loading = false
    })
  }
  createForm(): void {
    this.formControl = this.formBuilder.group({
      username: [{value:"",disabled:true}],
      isActive:[''],
      employee:[''],
      effBegin:[{value:"",disabled:true}],
      effEnd:[{value:"",disabled:true}],
      email:[{value:"",disabled:true}]
    })
  }
  onSave(){
    if( this.password&& this.password==this.rePassword){
      let form = this.formControl.getRawValue();
      let body ={
        newPassword: !form.isGeneratedPassword ? this.help.encryptionPassword(this.password) : null,
        id:this.id,
        version:this.version
      }
      this.srv.changePass(body).subscribe((res)=>{
        this.msg.showSuccess(res);
        this.getDetail(this.id);
        this.isShow=false;
      });
    }else{
      this.touched=true;
    }
  }
  selectEmp(e){
    this.formControl.patchValue({
      employeeId:e.id
    })
  }
  
  click(e){
    if(e == 'edit'){
      this.onEdit()
    }else if(e=='changePassword'){
      this.password=null;
      this.rePassword=null;
      this.isShow=true;
    }else{
      this.onResetPass();
    }
  }
  onResetPass(){
    this.srv.resetPass({id:this.id,version:this.version}).subscribe(res=>{
      this.msg.showSuccess(res);
      this.getDetail(this.id);
    })
  }
  onEdit(){
    this.router.navigate(['/util/user/edit/'+this.id])
  }
}
