import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { LovColorComponent } from './lov.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [LovColorComponent],
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        ProgressBarModule,
        MultiSelectModule,
    ],
    exports: [LovColorComponent],
})
export class LovColorModule {}
