import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'btn-download',
    templateUrl: './button-download.component.html',
    styleUrls: ['./button-download.component.scss'],
})
export class ButtonDownloadComponent implements OnInit {
    @Input() disabled = false;
    @Input() isSmall = false;
    @Output() onClick = new EventEmitter<any>();
    constructor() {}

    ngOnInit(): void {}

    click() {
        this.onClick.emit();
    }
}
