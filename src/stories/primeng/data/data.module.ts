import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import PaginatorComponent from './paginator/paginator.component';

@NgModule({
    declarations: [PaginatorComponent],
    imports: [CommonModule, FormsModule],
    exports: [PaginatorComponent],
})
export class DataComponentModule {}
