import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from '../checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxMultiselect } from './checkbox-multiselect.component';

@NgModule({
    exports: [CheckboxMultiselect],
    imports: [FormsModule, CommonModule, CheckboxModule, MultiSelectModule],
    declarations: [CheckboxMultiselect],
})
export class CheckboxMultiselectModule {}
