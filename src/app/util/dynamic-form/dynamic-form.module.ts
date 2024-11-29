import { NgModule } from '@angular/core';
import { BoxModule } from './components/box/box.module';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoveComponent } from './components/move/move.component';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { BoxTableModule } from './components/box-table/box-table.module';
import { DragDropModule } from 'primeng/dragdrop';
import { MessageService } from 'primeng/api';
import { SidebarSection } from './components/sidebar-section/sidebar-section.component';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormFieldItemModule } from './components/form-field-item/form-field-item.module';
import { DynamicFormComponent } from './dynamic-form.component';
import { ItemPreviewComponent } from './components/item-preview/item-preview.component';
import { SectionPreviewComponent } from './components/section-preview/section-preview.component';

import { DragDropModule as CDKDragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        BoxModule,
        FormsModule,
        ToastModule,
        ButtonModule,
        CommonModule,
        RouterModule,
        MoveComponent,
        TabViewModule,
        TooltipModule,
        BoxTableModule,
        DragDropModule,
        SidebarSection,
        InputTextModule,
        CDKDragDropModule,
        ConfirmDialogModule,
        FormFieldItemModule,
        ItemPreviewComponent,
        SectionPreviewComponent,
    ],
    providers: [MessageService],
    declarations: [DynamicFormComponent],
})
export class DynamicFormModule {}
