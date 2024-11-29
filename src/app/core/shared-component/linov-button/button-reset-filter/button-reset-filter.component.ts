import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'btn-reset-filter',
    templateUrl: './button-reset-filter.component.html',
    styleUrls: ['./button-reset-filter.component.scss'],
})
export class ButtonResetFilterComponent implements OnInit {
    @Input() label = 'resetFilter';
    @Input() disabled = false;
    @Input() isSmall = false;
    @Output() onClick = new EventEmitter<any>();
    constructor() {}

    ngOnInit(): void {}

    click() {
        this.onClick.emit();
    }
}
