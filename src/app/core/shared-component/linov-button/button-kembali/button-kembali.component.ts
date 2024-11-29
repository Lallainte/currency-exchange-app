import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AppConstant } from 'src/app/core/config/app.config';

@Component({
    selector: 'btn-kembali',
    templateUrl: './button-kembali.component.html',
    styleUrls: ['./button-kembali.component.scss'],
})
export class ButtonKembaliComponent {
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
                message: AppConstant.kembaliMessage,
                acceptLabel: 'Ya',
                rejectLabel: 'Tidak',
                icon: 'c-icons cancel-icon',
                rejectButtonStyleClass: 'p-button-cancel-outlined-grey',
                acceptButtonStyleClass: 'p-button-cancel ',
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
