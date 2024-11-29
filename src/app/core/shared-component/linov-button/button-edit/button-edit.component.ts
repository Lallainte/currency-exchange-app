import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'btn-edit',
    templateUrl: './button-edit.component.html',
    styleUrls: ['./button-edit.component.scss'],
})
export class ButtonEditComponent implements OnInit {
    @Input() isSmall = false;
    @Input() disabled = false;
    @Input() label = 'edit';
    @Output() onClick = new EventEmitter<any>();
    constructor() {}

    ngOnInit(): void {}

    click() {
        this.onClick.emit();
    }
}
