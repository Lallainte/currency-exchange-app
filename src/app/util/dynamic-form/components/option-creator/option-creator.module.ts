import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { OptionCreatorComponent } from './option-creator.component';

@NgModule({
    exports: [OptionCreatorComponent],
    imports: [
        FormsModule,
        TableModule,
        ButtonModule,
        CommonModule,
        InputTextModule,
    ],
    declarations: [OptionCreatorComponent],
})
export class OptionCreatorModule {}
