import { NgModule } from '@angular/core';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { CommonModule } from '@angular/common';
import { LogHistoryModule } from './log-history/log-history.module';
import { UtilRoutingModule } from './util-routing.module';
import { UtilCompanyModule } from './company/util-company.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { DynamicFormPreviewModule } from './dynamic-form-preview/dynamic-form-preview.module';

@NgModule({
    imports: [
        RoleModule,
        UserModule,
        CommonModule,
        DynamicFormModule,
        DynamicFormPreviewModule,
        UtilCompanyModule,
        UtilRoutingModule,
    ],
})
export class UtilModule {}
