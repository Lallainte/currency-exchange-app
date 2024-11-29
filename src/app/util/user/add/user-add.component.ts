import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { HelperService } from 'src/app/core/service/helper-service';
import { MessageBoxService } from 'src/app/core/service/message-box.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  formControl;
  password = null;
  rePassword=null;
  touched=false;
  
  constructor(private formBuilder: UntypedFormBuilder,
    private srv: UserService,
    private auth:AuthenticationService,
    private help:HelperService,
    private msg:MessageBoxService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.createForm();
  }
  

  createForm(): void {
    this.formControl = this.formBuilder.group({
      username: ["",Validators.required],
      isGeneratedPassword: [true],
      isActive:[true],
      employee:[null],
      effBegin:['',Validators.required],
      effEnd:['',Validators.required],
      email:['',[Validators.email,Validators.required]]
    })
  }
  onSave(){
    if(this.formControl.valid){
      if(!this.formControl.value.isGeneratedPassword && (!this.password || this.password!=this.rePassword)){
        this.touched=true;
        return
      }
      let body = this.help.formatDate(this.formControl.getRawValue());
      body.password = !body.isGeneratedPassword ? this.help.encryptionPassword(this.password) : null;
      this.srv.save(body).subscribe((res)=>{
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
