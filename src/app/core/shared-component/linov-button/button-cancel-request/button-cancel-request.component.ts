import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'btn-cancel-request',
    templateUrl: 'button-cancel-request.component.html',
    styleUrls: ['./button-cancel-request.component.scss'],
})
export class ButtonCancelRequestComponent implements OnInit {
    @Input() label: string = 'Cancel Request';
    @Input() disabled = false;
    @Input() isNeedConfirmation = true;
    @Input() isNeedDialogComponent = true;
    @Input() isEss = false;
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
