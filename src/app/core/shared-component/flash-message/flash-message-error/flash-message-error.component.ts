import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfigService } from 'src/app/core/service/app.config.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'flash-message-error',
    templateUrl: 'flash-message-error.component.html',
    styleUrls: ['flash-message-error.component.scss'],
})
export class FlashMessageErrorComponent {
    // @Output() onClick = new EventEmitter<any>();
    @Output() onClose = new EventEmitter<any>();

    @Input() icon: string;
    @Input() label: string;
    @Input() message: string;
    @Input() title: string;
    @Input() isError: boolean;
    // @Input() visible: boolean = false;
    @Input() isVisible: boolean = false;
    reportError = false;
    subscription: Subscription;

    constructor(
        private confirmService: ConfirmationService,
        public configService: ConfigService
    ) {
        this.icon = 'pi pi-external-link';
        this.label = 'Save';
        this.message = 'Absence using camera valid for mobile app only!';
        this.title = '505 Err: Absence Information';
    }
    ngOnInit() {
        this.subscription = this.configService.showError$.subscribe((msg) => {
            this.showMessage(msg);
        });
    }

    click() {
        // this.isVisible= !this.isVisible
        this.isVisible = false;
        // this.onClick.emit(this.isVisible)
        // this.onClose.emit(this.isVisible);
        // this.onClose.emit(false);
    }

    clickReport() {
        this.reportError = true;
        this.isVisible = !this.isVisible;
        // this.onClose.emit(this.isVisible);
    }

    clickBack() {
        this.isVisible = false;
        this.onClose.emit(false);
    }

    showMessage(msg) {
        this.isVisible = true;
        this.title = msg.title;
        this.message = msg.message;
    }

    // onUpdate() {
    //   this.onClick.emit();
    // }

    // click() {
    //   this.isShow = true;
    //   this.confirmService.confirm({
    //       message: this.message,
    //       acceptLabel: 'OK',
    //       icon: "c-icons error-icon",
    //       acceptButtonStyleClass: 'p-button-accept',
    //       accept: () => {
    //           this.isShow = false;
    //           this.confirmService.close();
    //           this.onUpdate();
    //       },
    //   });
    // }
}
