import { NgModule } from '@angular/core';
import { PipeModule } from '../../pipe/pipe.module';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ApprovalDetailComponent } from './approval-detail.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelModule } from 'primeng/panel';
import { LinovButtonModule } from '../linov-button/linov-button.module';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
    exports: [ApprovalDetailComponent],
    imports: [
        CommonModule,
        TableModule,
        PipeModule,
        TieredMenuModule,
        OverlayPanelModule,
        ButtonModule,
        MenuModule,
        TranslateModule,
        FormsModule,
        InputTextareaModule,
        DialogModule,
        ConfirmDialogModule,
        ScrollPanelModule,
        PanelModule,
        LinovButtonModule,
        AccordionModule,
    ],
    declarations: [ApprovalDetailComponent],
})
export class ApprovalDetailModule {}
