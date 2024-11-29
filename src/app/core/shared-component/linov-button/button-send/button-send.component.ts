import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppConstant } from 'src/app/core/config/app.config';

@Component({
    selector: 'btn-send',
    templateUrl: './button-send.component.html',
    styleUrls: ['./button-send.component.scss'],
})
export class ButtonSendComponent {
    @Output() onClick = new EventEmitter<any>();
    @Input() disabled = false;
    isShow = false;
    constructor(private confirmationService: ConfirmationService) {}

    onUpdate() {
        this.onClick.emit();
    }

    click() {
        this.isShow = true;
        this.confirmationService.confirm({
            message: AppConstant.sendMessage,
            acceptLabel: 'Ya',
            rejectLabel: 'Tidak',
            icon: 'c-icons approved-icon',
            rejectButtonStyleClass: 'p-button-cancel-outlined',
            acceptButtonStyleClass: 'p-button-accept',
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
