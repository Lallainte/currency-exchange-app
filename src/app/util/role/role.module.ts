import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './list/role-list.component';
import { SharedComponentModule } from 'src/app/core/shared-component/shared-component.module';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [
    RoleListComponent
  ],
  imports: [
    CommonModule,
    SharedComponentModule,
    DialogModule
  ]
})
export class RoleModule { }
