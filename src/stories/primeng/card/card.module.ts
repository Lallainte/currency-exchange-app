import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CardComponent from './card.component';
import { CardModule } from 'primeng/card';

@NgModule({
    declarations: [CardComponent],
    imports: [CommonModule, CardModule],
    exports: [CardComponent],
})
export class CardComponentModule {}
