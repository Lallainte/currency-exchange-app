import { NgModule } from '@angular/core';
import { LovModule } from '@core/shared-component/lov/lov.module';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { LovCompanyModule } from '@core/shared-component/lov-company/lov.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { DynamicFormPreviewComponent } from './dynamic-form-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        LovModule,
        FormsModule,
        CommonModule,
        CheckboxModule,
        InputTextModule,
        LovCompanyModule,
        InputNumberModule,
        InputSwitchModule,
        RadioButtonModule,
        ReactiveFormsModule,
        SharedComponentModule,
    ],
    declarations: [DynamicFormPreviewComponent],
})
export class DynamicFormPreviewModule {}
