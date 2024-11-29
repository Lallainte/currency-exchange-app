import { NgModule } from '@angular/core';
import { LovModule } from '@core/shared-component/lov/lov.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BoxComponent } from './box.component';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { LovCompanyModule } from '@core/shared-component/lov-company/lov.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OptionCreatorModule } from '../option-creator/option-creator.module';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';

import { DragDropModule as CDKDragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    exports: [BoxComponent],
    imports: [
        CDKDragDropModule,
        LovModule,
        FormsModule,
        TableModule,
        ButtonModule,
        CommonModule,
        DialogModule,
        TabViewModule,
        TooltipModule,
        CalendarModule,
        CheckboxModule,
        DragDropModule,
        DropdownModule,
        InputTextModule,
        LovCompanyModule,
        RadioButtonModule,
        InputNumberModule,
        InputSwitchModule,
        InputTextareaModule,
        OptionCreatorModule,
        SharedComponentModule,
    ],
    declarations: [BoxComponent],
})
export class BoxModule {}
