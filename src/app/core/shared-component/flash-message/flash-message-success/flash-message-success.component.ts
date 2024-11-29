import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppConstant } from '@core/config/app.config';
import { ConfirmationService } from 'primeng/api';
import { ConfigService } from 'src/app/core/service/app.config.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'flash-message-success',
    templateUrl: './flash-message-success.component.html',
    styleUrls: ['./flash-message-success.component.scss'],
})
export class FlashMessageSuccessComponent {
    @Output() onClick = new EventEmitter<any>();

    @Input() icon: string;
    @Input() label: string;
    @Input() message: string;
    @Input() title?: string;
    @Input() isMessageSuccess: boolean = false;
    @Input() isError: boolean;
    web = localStorage.getItem('web');

    subscription: Subscription;
    constructor(
        private confirmService: ConfirmationService,
        public configService: ConfigService,
        private location: Location,
        private router: Router
    ) {
        this.icon = 'pi pi-external-link';
        this.label = 'Save';
        this.message = 'Write your message in here';
    }
    ngOnInit() {
        this.subscription = this.configService.showSuccess$.subscribe((msg) => {
            this.showMessage(msg);
        });
    }

    clickBack() {
        this.isMessageSuccess = false;
        this.onClick.emit(false);
        if (this.isRedirect) {
            if (this.path) {
                this.router.navigateByUrl(this.web + this.path);
            } else {
                this.location.back();
            }
        }
    }

    isRedirect = true;
    path;
    showMessage(msg) {
        this.isMessageSuccess = true;
        this.message = msg.message;
        this.isRedirect = msg.redirect;
        this.title = msg.title;
        this.path = msg.path;
    }

    // onUpdate() {
    //   this.onClick.emit();
    // }

    // click() {
    //   this.isShow = true;
    //   this.confirmService.confirm({
    //       message: this.message,
    //       acceptLabel: 'OK',
    //       icon: "c-icons approved-icon",
    //       acceptButtonStyleClass: 'p-button-accept',
    //       accept: () => {
    //           this.isShow = false;
    //           this.confirmService.close();
    //           this.onUpdate();
    //       },
    //   });
    // }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
