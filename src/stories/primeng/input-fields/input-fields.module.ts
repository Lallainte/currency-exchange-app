import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import InputText from './input-text/input-text.component';
import InputTextArea from './input-text-area/input-text-area.component';
import InputNumber from './input-number/input-number.component';
import InputCalendar from './input-calendar/input-calendar.component';
import InputDropdown from './input-dropdown/input-dropdown.component';
import InputUpload from './input-file-upload/input-file-upload.component';

@NgModule({
    declarations: [
        InputText,
        InputTextArea,
        InputNumber,
        InputCalendar,
        InputDropdown,
        InputUpload,
    ],
    imports: [CommonModule, ConfirmDialogModule, DialogModule, TranslateModule],
    exports: [
        InputText,
        InputTextArea,
        InputNumber,
        InputCalendar,
        InputDropdown,
        InputUpload,
    ],
})
export class InputFieldsModule {}
