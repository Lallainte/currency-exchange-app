import { NgModule } from '@angular/core';
import { PipeModule } from '../../pipe/pipe.module';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { EmployeeSelectComponent } from './employee-select.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { SearchModule } from '@shared/search/search.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { LinovButtonModule } from '../linov-button/linov-button.module';
import { LovModule } from '../lov/lov.module';
import {LovCompanyModule} from '../lov-company/lov.module'
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    exports: [EmployeeSelectComponent],
    imports: [
        CommonModule,
        TableModule,
        PipeModule,
        TieredMenuModule,
        OverlayPanelModule,
        ButtonModule,
        MenuModule,
        DialogModule,
        TranslateModule,
        InputTextModule,
        SearchModule,
        ReactiveFormsModule,
        FormsModule,
        BadgeModule,
        LinovButtonModule,
        LovModule,
        LovCompanyModule,
        CalendarModule
    ],
    declarations: [EmployeeSelectComponent],
})
export class LinovEmployeeSelectModule {}
