import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppConstant } from 'src/app/core/config/app.config';

@Component({
    selector: 'btn-delete',
    templateUrl: './button-delete.component.html',
    styleUrls: ['./button-delete.component.scss'],
})
export class ButtonDeleteComponent {
    @Output() onClick = new EventEmitter<any>();
    @Input() disabled = false;
    @Input() selected;
    @Input() singleData = false;
    @Input() isSmall = false;
    @Input() isNeedConfirmation = true;
    isShowNoData = false;
    isShow = false;
    constructor(private confirmationService: ConfirmationService) {}

    onUpdate() {
        this.onClick.emit();
    }

    check() {
        if (
            !this.singleData &&
            (!this.selected || this.selected?.length <= 0)
        ) {
            this.isShowNoData = true;
        } else {
            this.click();
        }
    }

    click() {
        if (this.isNeedConfirmation) {
            this.isShow = true;
            let message;
            if (this.singleData) {
                message = `Are you sure to delete these data?`;
            } else {
                message = `Are you sure to delete these ${this.selected.length} data?`;
            }
            this.confirmationService.confirm({
                message: message,
                header: 'Delete Data',
                acceptLabel: 'Yes',
                rejectLabel: 'No',
                rejectButtonStyleClass: 'confirm-button-no',
                acceptButtonStyleClass: 'confirm-button-yes',
                accept: () => {
                    this.isShow = false;
                    this.confirmationService.close();
                    this.onUpdate();
                },
                reject: () => {
                    this.isShow = false;
                    this.confirmationService.close();
                },
            });
        } else {
            this.onUpdate();
        }
    }
}
