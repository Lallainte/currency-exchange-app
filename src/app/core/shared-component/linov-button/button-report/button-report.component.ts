import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'btn-report',
    templateUrl: './button-report.component.html',
    styleUrls: ['./button-report.component.scss'],
})
export class ButtonReportComponent implements OnInit {
    @Input() disabled = false;
    @Output() onClick = new EventEmitter<any>();
    constructor() {}

    ngOnInit(): void {}

    click() {
        this.onClick.emit();
    }
}
