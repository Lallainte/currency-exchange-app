import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleComponent } from './toggle/toggle.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations : [
        CheckboxComponent,
        RadioButtonComponent,
        ToggleComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        CheckboxModule,
        RadioButtonModule,
        InputSwitchModule,
        FormsModule
    ],
    exports: [
        CheckboxComponent,
        RadioButtonComponent,
        ToggleComponent,
    ]
})

export class ControlsModule{}