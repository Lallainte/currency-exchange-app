import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { LovComponent } from './lov.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { PipeModule } from '@core/pipe/pipe.module';

@NgModule({
  declarations: [LovComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ProgressBarModule,
    MultiSelectModule,
    PipeModule
  ],
  exports:[LovComponent]
})
export class LovModule { }
