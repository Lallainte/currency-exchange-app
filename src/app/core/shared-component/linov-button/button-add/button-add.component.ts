import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'btn-add',
    templateUrl: './button-add.component.html',
    styleUrls: ['./button-add.component.scss'],
})
export class ButtonAddComponent implements OnInit {
    @Input() label = 'add';
    @Input() disabled = false;
    @Input() isSmall = false;
    @Output() onClick = new EventEmitter<any>();
    constructor() {}

    ngOnInit(): void {}

    click() {
        this.onClick.emit();
    }
}
