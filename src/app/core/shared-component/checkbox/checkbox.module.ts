import { Checkbox } from './checkbox.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckboxModule as PCheckboxModule } from 'primeng/checkbox';

@NgModule({
    exports: [Checkbox],
    imports: [FormsModule, CommonModule, PCheckboxModule],
    declarations: [Checkbox],
})
export class CheckboxModule {}
