import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'btn-reject',
    templateUrl: 'button-reject.component.html',
    styleUrls: ['./button-reject.component.scss'],
})
export class ButtonRejectComponent implements OnInit {
    @Input() label: string = 'reject';
    @Input() disabled = false;
    @Input() isNeedConfirmation = true;
    @Input() isNeedDialogComponent = true;

    @Output() onClick = new EventEmitter<any>();

    isShow = false;
    notes;

    constructor() {}

    public ngOnInit(): void {}

    onReject() {
        if (this.isNeedConfirmation) {
            this.onClick.emit(this.notes);
        } else {
            this.onClick.emit();
        }

        this.isShow = false;
    }

    click() {
        if (this.isNeedConfirmation) {
            this.isShow = true;
        } else {
            this.onReject();
        }
    }
}
