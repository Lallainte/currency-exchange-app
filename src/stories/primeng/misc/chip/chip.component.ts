import { Component } from '@angular/core';

@Component({
    selector: 'c-chip',
    template: `<div class="card flex align-items-center gap-2 flex-wrap">
        <p-chip label="Action"></p-chip>
        <p-chip label="Comedy"></p-chip>
        <p-chip label="Mystery"></p-chip>
        <p-chip label="Thriller" [removable]="true"></p-chip>
    </div>`,
    styleUrls: [],
})
export default class ChipComponent {}
