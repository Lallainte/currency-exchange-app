import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { BoxTableComponent } from './box-table.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OptionCreatorModule } from '../option-creator/option-creator.module';

@NgModule({
    exports: [BoxTableComponent],
    imports: [
        FormsModule,
        CommonModule,
        DialogModule,
        ButtonModule,
        TooltipModule,
        InputTextModule,
        InputSwitchModule,
        OptionCreatorModule,
    ],
    declarations: [BoxTableComponent],
})
export class BoxTableModule {}
