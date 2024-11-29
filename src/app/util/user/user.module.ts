import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './list/user-list.component';
import { UserAddComponent } from './add/user-add.component';
import { UserEditComponent } from './edit/user-edit.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { SharedComponentModule } from 'src/app/core/shared-component/shared-component.module';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';



@NgModule({
  declarations: [
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    SharedComponentModule,
    PasswordModule,
    InputSwitchModule
  ]
})
export class UserModule { }
