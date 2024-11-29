import { Switch } from './switch.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
    exports: [Switch],
    imports: [CommonModule, InputSwitchModule, FormsModule],
    declarations: [Switch],
})
export class SwitchModule {}
