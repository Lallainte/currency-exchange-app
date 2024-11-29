import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorFieldHelperComponent } from './error-field-helper/error-field-helper.component';
import { LinovButtonModule } from './linov-button/linov-button.module';
import { LovModule } from './lov/lov.module';
import { LovCompanyModule } from './lov-company/lov.module';
import { LovColorModule } from './lov-color/lov.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../pipe/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { SearchModule } from './search/search.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DummyService } from '../service/dummy.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ApprovalStatusComponent } from './approval-status/approval-status.component';
import { DirectiveModule } from '../directive/directive.module';
import { SkeletonModule } from 'primeng/skeleton';
import { CheckboxModule as PCheckboxModule } from 'primeng/checkbox';
import { LinovUploadComponent } from './linov-upload/linov-upload.component';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { InformationViewComponent } from './information-view/information-view.component';
import { CheckboxAllComponent } from './checkbox-all/checkbox-all.component';
import { LinovTableModule } from './table/table.module';
import { SwitchModule } from './switch';
import { EditorComponent } from './editor/editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CheckboxMultiselectModule } from './checkbox-multi-select';
import { CheckboxModule } from './checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormModule } from '@shared/form/form.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LinovEmployeeSelectModule } from '@shared/employee-select/employee-select.module';
import { LovTimeReqSetModule } from '@shared/lov-time-requirement-set/lov-time-requirement-set.module';
import { FlashMessageModule } from './flash-message/flash-message.module';
import { BoxDataSharedComponent } from './box-data/box-data.component';
import { ImageModule } from 'primeng/image';
import { LinovPersonSelectModule } from './person-select/person-select.module';
import { ApprovalDetailModule } from './approval-detail/approval-detail.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { LinovDataViewModule } from './data-view/data-view.module';
import { EnhancedTextAreaComponent } from './enhanced-textarea/enhanced-textarea.component';
import { InputNumberIcon } from './input-number-icon/input-number-icon.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
    declarations: [
        CheckboxAllComponent,
        EditorComponent,
        LinovUploadComponent,
        ApprovalStatusComponent,
        InformationViewComponent,
        ErrorFieldHelperComponent,
        BoxDataSharedComponent,
        EnhancedTextAreaComponent,
        InputNumberIcon,
    ],
    imports: [
        PipeModule,
        FormsModule,
        TableModule,
        CommonModule,
        ButtonModule,
        CalendarModule,
        PCheckboxModule,
        DropdownModule,
        TranslateModule,
        InputTextModule,
        LinovTableModule,
        CKEditorModule,
        ProgressBarModule,
        ReactiveFormsModule,
        DialogModule,
        ConfirmDialogModule,
        InputTextareaModule,
        FormModule,
        LinovEmployeeSelectModule,
        LinovPersonSelectModule,
        SearchModule,
        LovCompanyModule,
        LovColorModule,
        LovTimeReqSetModule,
        FlashMessageModule,
        ImageModule,
        SkeletonModule,
        ApprovalDetailModule,
        InputSwitchModule,
        NgxExtendedPdfViewerModule,
        KeyFilterModule,
        InputNumberModule,
    ],
    exports: [
        LovModule,
        LinovButtonModule,
        PipeModule,
        ErrorFieldHelperComponent,
        TranslateModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        InputTextareaModule,
        CalendarModule,
        ApprovalStatusComponent,
        ApprovalDetailModule,
        DirectiveModule,
        SkeletonModule,
        PCheckboxModule,
        FormsModule,
        LinovUploadComponent,
        DirectiveModule,
        DialogModule,
        DropdownModule,
        InformationViewComponent,
        CheckboxAllComponent,
        LinovTableModule,
        SwitchModule,
        EditorComponent,
        CheckboxMultiselectModule,
        CheckboxModule,
        FormModule,
        LinovEmployeeSelectModule,
        LinovPersonSelectModule,
        SearchModule,
        LovCompanyModule,
        LovColorModule,
        LovTimeReqSetModule,
        FlashMessageModule,
        BoxDataSharedComponent,
        InputSwitchModule,
        LinovDataViewModule,
        EnhancedTextAreaComponent,
        InputNumberIcon,
        InputNumberModule,
    ],
    providers: [ConfirmationService, DummyService],
})
export class SharedComponentModule {}
