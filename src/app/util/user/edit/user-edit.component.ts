import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { HelperService } from 'src/app/core/service/helper-service';
import { MessageBoxService } from 'src/app/core/service/message-box.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  formControl;
  password = null;
  rePassword=null;
  touched=false;
  loading=true;
  id;
  
  constructor(private formBuilder: UntypedFormBuilder,
    private srv: UserService,
    private auth:AuthenticationService,
    private help:HelperService,
    private route:ActivatedRoute,
    private msg:MessageBoxService,
    private router: Router) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.createForm();
      this.getDetail(this.id);
    }
  
    getDetail(id){
      this.loading = true;
      this.srv.getOne(id).subscribe(res=>{
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
      id:[''],
      version:[''],
      username: [{value:"",disabled:true}],
      isActive:[true],
      employee:[''],
      effBegin:['',Validators.required],
      effEnd:['',Validators.required],
      email:['',[Validators.email,Validators.required]]
    })
  }
  onSave(){
    if(this.formControl.valid){
      let body = this.help.formatDate(this.formControl.getRawValue());
      this.srv.update(body).subscribe((res)=>{
        this.msg.showSuccess(res);
        this.router.navigate(['util/user'])
      });
    }else{
      this.formControl.markAllAsTouched();
      this.touched=true;
    }
  }
  selectEmp(e){
    this.formControl.patchValue({
      employee:e
    })
  }

}
