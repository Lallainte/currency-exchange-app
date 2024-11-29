import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'btn-simulate',
    templateUrl: './button-simulate.component.html',
    styleUrls: ['./button-simulate.component.scss'],
})
export class ButtonSimulateComponent implements OnInit {
    @Input() label = 'simulate';
    @Input() disabled = false;
    @Input() isSmall = false;
    @Output() onClick = new EventEmitter<any>();
    constructor() {}

    ngOnInit(): void {}

    click() {
        this.onClick.emit();
    }
}
