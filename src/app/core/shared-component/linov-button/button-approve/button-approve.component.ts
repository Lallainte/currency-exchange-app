import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConstant } from 'src/app/core/config/app.config';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'btn-approve',
    templateUrl: 'button-approve.component.html',
})
export class ButtonApproveComponent implements OnInit {
    @Input() label: string = 'approve';
    @Input() disabled = false;
    @Input() isNeedConfirmation = true;
    @Input() isNeedDialogComponent = true;
    @Output() onClick = new EventEmitter<any>();

    isShow = false;
    notes;

    constructor(private confirmationService: ConfirmationService) {}

    public ngOnInit(): void {}

    onApprove() {
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
            this.onApprove();
        }
    }
}
