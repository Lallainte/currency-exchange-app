import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Input, OnInit, Output, Component, EventEmitter } from '@angular/core';

@Component({
    selector: 'btn-update',
    styleUrls: ['./button-update.component.scss'],
    templateUrl: './button-update.component.html',
})
export class ButtonUpdateComponent implements OnInit {
    @Input() message = 'Are you sure to update this data?';
    @Input() header = 'Update Data';
    @Input() routeUrl;
    @Input() isSmall = false;
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

    public ngOnInit(): void {}
}
