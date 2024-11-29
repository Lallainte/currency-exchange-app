import { Component } from '@angular/core';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'c-paginator',
    template: `<div class="card flex justify-content-center">
        <p-paginator
            (onPageChange)="onPageChange($event)"
            [first]="first"
            [rows]="rows"
            [totalRecords]="120"
            [rowsPerPageOptions]="[10, 20, 30]"
        ></p-paginator>
    </div>`,
    styleUrls: [],
})
export default class PaginatorComponent {
    first: number = 0;

    rows: number = 10;

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }
}
