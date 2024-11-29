import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppConstant } from 'src/app/core/config/app.config';

@Component({
    selector: 'btn-process',
    templateUrl: './button-process.component.html',
    styleUrls: ['./button-process.component.scss'],
})
export class ButtonProcessComponent {
    @Output() onClick = new EventEmitter<any>();
    @Input() disabled = false;
    @Input() icon = 'fas fa-cog';
    @Input() isNeedDialogComponent: boolean;
    @Input() outline: boolean;
    isShow = false;
    constructor(private confirmationService: ConfirmationService) {}

    onUpdate() {
        this.onClick.emit();
    }

    click() {
        this.isShow = true;
        this.confirmationService.confirm({
            message: AppConstant.processMessage,
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
