import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AppConstant } from 'src/app/core/config/app.config';

@Component({
    selector: 'btn-reset',
    templateUrl: './button-reset.component.html',
    styleUrls: ['./button-reset.component.scss'],
})
export class ButtonResetComponent {
    @Input() message =
        'Are you sure to reset simulation? The modifications you’ve made will not be saved.';
    @Input() header = 'Reset Simulation?';
    @Input() routeUrl;
    @Input() disabled = false;
    @Input() isNeedConfirmation = true;
    @Output() onClick = new EventEmitter<any>();
    isShow = false;
    constructor(
        private router: Router,
        private confirmationService: ConfirmationService
    ) {}

    onCancel() {
        if (this.routeUrl) {
            this.router.navigate([this.routeUrl]);
        } else {
            this.onClick.emit();
        }
    }

    click() {
        if (this.isNeedConfirmation) {
            this.isShow = true;
            this.confirmationService.confirm({
                message: this.message,
                header: this.header,
                acceptLabel: 'Yes',
                rejectLabel: 'No',
                rejectButtonStyleClass: 'confirm-button-no',
                acceptButtonStyleClass: 'confirm-button-yes',
                accept: () => {
                    this.isShow = false;
                    this.confirmationService.close();
                    this.onCancel();
                },
                reject: () => {
                    this.isShow = false;
                    this.confirmationService.close();
                },
            });
        } else {
            this.onCancel();
        }
    }
}
