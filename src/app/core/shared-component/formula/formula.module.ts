import { NgModule } from '@angular/core';
import { FormulaComponent } from './formula.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PipeModule } from '../../pipe/pipe.module';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
    exports: [FormulaComponent],
    imports: [
        CommonModule,
        InputTextareaModule,
        InputTextModule,
        ButtonModule,
        PipeModule,
        FormsModule,
        DialogModule,
        TranslateModule
    ],
    declarations: [FormulaComponent],
})
export class InsertFormulaModule {}
