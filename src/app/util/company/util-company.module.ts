import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilCompanyListComponent } from './list/util-company-list.component';
import { UtilCompanyAddComponent } from './add/util-company-add.component';
import { UtilCompanyDetailComponent } from './detail/util-company-detail.component';
import { UtilCompanyEditComponent } from './edit/util-company-edit.component';
import { SharedComponentModule } from 'src/app/core/shared-component/shared-component.module';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
    declarations: [
        UtilCompanyListComponent,
        UtilCompanyAddComponent,
        UtilCompanyDetailComponent,
        UtilCompanyEditComponent,
    ],
    imports: [
        CommonModule,
        SharedComponentModule,
        DialogModule,
        CalendarModule,
        InputSwitchModule,
        InputMaskModule,
    ],
})
export class UtilCompanyModule {}
