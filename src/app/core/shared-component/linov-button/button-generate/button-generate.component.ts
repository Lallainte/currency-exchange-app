import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'btn-generate',
    templateUrl: './button-generate.component.html',
    styleUrls: ['./button-generate.component.scss'],
})
export class ButtonGenerateComponent {
    @Output() onClick = new EventEmitter<any>();
    @Input() selected;
    @Input() singleData = false;
    @Input() disabled = false;
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
        } else if (this.singleData) {
            this.onClick.emit();
        } else {
            this.click();
        }
    }

    click() {
        this.isShow = true;
        this.confirmationService.confirm({
            message: `Are you sure to generate these ${this.selected.length} leave settings(s)?`,
            header: 'Genarate Leave Setting',
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
    }
}
