import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {LovCompanyModule} from '@shared/lov-company/lov.module'
import { LovModule } from '../lov/lov.module';

@NgModule({
    declarations: [SearchComponent],
    imports: [
        CommonModule,
        CalendarModule,
        InputTextModule,
        DropdownModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        LovCompanyModule,
        LovModule
    ],
    exports: [SearchComponent],
})
export class SearchModule {}
