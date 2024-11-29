import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Input, OnInit, Output, Component, EventEmitter } from '@angular/core';

@Component({
    selector: 'btn-save',
    styleUrls: ['./button-save.component.scss'],
    templateUrl: './button-save.component.html',
})
export class ButtonSaveComponent implements OnInit {
    @Input() message = 'Are you sure to save this data?';
    @Input() header = 'Save Data';
    @Input() label = 'save';
    @Input() isSmall = false;
    @Input() disabled = false;
    @Input() isNeedConfirmation = true;
    @Input() icon = 'fas fa-save';
    @Input() terminate: boolean = false;
    @Input() loading : boolean = false
    @Output() onClick = new EventEmitter<any>();

    isShow = false;

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService
    ) {}

    onSave() {
        this.onClick.emit();
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
                    this.onSave();
                },
                reject: () => {
                    this.isShow = false;
                    this.confirmationService.close();
                },
            });
        } else {
            this.onSave();
        }
    }

    public ngOnInit(): void {}
}
