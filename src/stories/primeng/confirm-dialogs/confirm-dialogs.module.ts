import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { LeaveDialogComponent } from './leave-dialog/leave-dialog.component';

@NgModule({
    declarations : [
        SaveDialogComponent,
        DeleteDialogComponent,
        UpdateDialogComponent,
        LeaveDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
        ButtonModule
    ],
    exports: [
        SaveDialogComponent,
        DeleteDialogComponent,
        UpdateDialogComponent,
        LeaveDialogComponent,
    ],
    providers: [BrowserAnimationsModule]
})

export class ControlsModule{}