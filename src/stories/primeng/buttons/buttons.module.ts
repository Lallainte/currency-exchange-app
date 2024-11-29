import { NgModule } from '@angular/core';
import MainButton from './main-button/main-button.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TranslateModule } from '@ngx-translate/core';
import GhostButton from './ghost-button/ghost-button.component';

@NgModule({
    declarations : [
        MainButton,
        GhostButton,
    ],
    imports: [
        CommonModule,
        ConfirmDialogModule,
        DialogModule,
        ButtonModule,
        SplitButtonModule,
        TranslateModule,
    ],
    exports: [
        MainButton,
        GhostButton,
    ]

})

export class ButtonsModule{}