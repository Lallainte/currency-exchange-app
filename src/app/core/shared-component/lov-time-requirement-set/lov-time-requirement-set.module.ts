import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { LovTimeReqSetComponent } from './lov-time-requirement-set.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [LovTimeReqSetComponent],
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        ProgressBarModule,
        MultiSelectModule,
    ],
    exports: [LovTimeReqSetComponent],
})
export class LovTimeReqSetModule {}
