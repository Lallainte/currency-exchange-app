import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { LovCompanyComponent } from './lov.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [LovCompanyComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ProgressBarModule,
    MultiSelectModule
  ],
  exports:[LovCompanyComponent]
})
export class LovCompanyModule { }
