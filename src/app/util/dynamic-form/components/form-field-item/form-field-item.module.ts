import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldItemComponent } from './form-field-item.component';

@NgModule({
    exports: [FormFieldItemComponent],
    imports: [CommonModule],
    declarations: [FormFieldItemComponent],
})
export class FormFieldItemModule {}
