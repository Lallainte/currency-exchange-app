import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import TagComponent from './tag/tag.component';
import ChipComponent from './chip/chip.component';

@NgModule({
    declarations: [TagComponent, ChipComponent],
    imports: [CommonModule, FormsModule],
    exports: [TagComponent, ChipComponent],
})
export class MiscModule {}
