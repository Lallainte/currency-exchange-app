import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppConstant } from 'src/app/core/config/app.config';

@Component({
    selector: 'btn-terminate',
    templateUrl: './button-terminate.component.html',
    styleUrls: ['./button-terminate.component.scss'],
})
export class ButtonTerminateComponent {
    @Output() onClick = new EventEmitter<any>();
    @Input() disabled = false;
    @Input() selected;
    @Input() singleData = false;
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
        this.isShow = true;
        this.confirmationService.confirm({
            message: AppConstant.terminateMessage,
            acceptLabel: 'Ya',
            rejectLabel: 'Tidak',
            icon: 'c-icons reject-icon',
            rejectButtonStyleClass: 'p-button-cancel-outlined-red ',
            acceptButtonStyleClass: 'p-button-reject ',
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
    }
}
