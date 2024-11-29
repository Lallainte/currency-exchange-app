import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCancelComponent } from './button-cancel/button-cancel.component';
import { ButtonResetComponent } from './button-reset/button-reset.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ButtonDownloadLaporanComponent } from './button-download-laporan/button-download-laporan.component';
import { ButtonDownloadComponent } from './button-download/button-download.component';
import { ButtonMultiActionComponent } from './button-multi-action/button-multi-action.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonAddComponent } from './button-add/button-add.component';
import { ButtonSimulateComponent } from './button-simulate/button-simulate.component';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonSaveComponent } from './button-save/button-save.component';
import { ButtonUpdateComponent } from './button-update/button-update.component';
import { ButtonEditComponent } from './button-edit/button-edit.component';
import { ButtonProcessComponent } from './button-process/button-process.component';
import { ButtonKembaliComponent } from './button-kembali/button-kembali.component';
import { ButtonDeleteComponent } from './button-delete/button-delete.component';
import { ButtonTerminateComponent } from './button-terminate/button-terminate.component';
import { ButtonReportComponent } from './button-report/button-report.component';
import { ButtonGenerateComponent } from './button-generate/button-generate.component';
import { ButtonSendComponent } from './button-send/button-send.component';
import { ButtonRenewComponent } from './button-renew/button-renew.component';
import { ButtonBackComponent } from './button-back-general/button-back-general.component';
import { ButtonPrintComponent } from './button-print/button-print.component';
import { ButtonApproveComponent } from './button-approve/button-approve.component';
import { ButtonRejectComponent } from './button-reject/button-reject.component';
import { ButtonSubmitComponent } from './button-submit/button-submit.component';
import { ButtonCancelRequestComponent } from './button-cancel-request/button-cancel-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonPreviewComponent } from './button-preview/button-preview.component';
import { ButtonResetFilterComponent } from './button-reset-filter/button-reset-filter.component';
import { ButtonRollbackComponent } from './button-rollback/button-rollback.component';
import { ButtonPublishComponent } from './button-publish/button-publish.component';
import { ButtonReminderComponent } from './button-reminder/button-reminder.component';
import { ButtonApplyComponent } from './button-apply/button-apply.component';

@NgModule({
    declarations: [
        ButtonRollbackComponent,
        ButtonCancelComponent,
        ButtonResetComponent,
        ButtonDownloadLaporanComponent,
        ButtonMultiActionComponent,
        ButtonDownloadComponent,
        ButtonAddComponent,
        ButtonSimulateComponent,
        ButtonSaveComponent,
        ButtonUpdateComponent,
        ButtonEditComponent,
        ButtonProcessComponent,
        ButtonKembaliComponent,
        ButtonDeleteComponent,
        ButtonTerminateComponent,
        ButtonReportComponent,
        ButtonGenerateComponent,
        ButtonSendComponent,
        ButtonRenewComponent,
        ButtonBackComponent,
        ButtonPrintComponent,
        ButtonApproveComponent,
        ButtonRejectComponent,
        ButtonSubmitComponent,
        ButtonCancelRequestComponent,
        ButtonResetFilterComponent,
        ButtonPreviewComponent,
        ButtonPublishComponent,
        ButtonReminderComponent,
        ButtonApplyComponent
    ],
    imports: [
        CommonModule,
        ConfirmDialogModule,
        DialogModule,
        ButtonModule,
        SplitButtonModule,
        TranslateModule,
        FormsModule,
    ],
    exports: [
        ButtonRollbackComponent,
        ButtonCancelComponent,
        ButtonResetComponent,
        ButtonDownloadLaporanComponent,
        ButtonAddComponent,
        ButtonSimulateComponent,
        ButtonDownloadComponent,
        ButtonMultiActionComponent,
        ButtonSaveComponent,
        ButtonUpdateComponent,
        ButtonEditComponent,
        ButtonProcessComponent,
        ButtonKembaliComponent,
        ButtonDeleteComponent,
        ButtonTerminateComponent,
        ButtonReportComponent,
        ButtonGenerateComponent,
        ButtonSendComponent,
        ButtonRenewComponent,
        ButtonBackComponent,
        ButtonPrintComponent,
        ButtonApproveComponent,
        ButtonRejectComponent,
        ButtonSubmitComponent,
        ButtonCancelRequestComponent,
        ButtonPreviewComponent,
        ButtonResetFilterComponent,
        ButtonPublishComponent,
        ButtonReminderComponent,
        ButtonApplyComponent
    ],
})
export class LinovButtonModule { }
