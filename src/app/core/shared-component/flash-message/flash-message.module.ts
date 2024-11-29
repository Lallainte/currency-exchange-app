import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FlashMessageSuccessComponent } from '@shared/flash-message/flash-message-success/flash-message-success.component';
import { FlashMessageErrorComponent } from '@shared/flash-message/flash-message-error/flash-message-error.component';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
    declarations: [FlashMessageSuccessComponent, FlashMessageErrorComponent],
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
        InputTextareaModule,
        InputTextModule,
    ],
    exports: [FlashMessageSuccessComponent, FlashMessageErrorComponent],
})
export class FlashMessageModule {}
