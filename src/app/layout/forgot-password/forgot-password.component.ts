import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
// import { UserService } from '@workbench/user-2/user.service';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-forgot-password',
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
    public images!: any[];
    public formReady!: FormGroup;
    public loading: boolean = false;
    public isSuccesSend: boolean = false;
    public readonly responsiveOptions: any[] = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1,
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    constructor(
        private readonly http: HttpClient,
        private readonly cd: ChangeDetectorRef,
        private readonly fb: NonNullableFormBuilder,
        private readonly router: Router,
        // private readonly srv: UserService,
        private readonly msg: MessageBoxService,
        private readonly activatedRoute: ActivatedRoute
    ) {
        this.createFormReady();
    }

    ngOnInit() {
        this.getImages().then((images) => {
            this.images = images;
            this.cd.detectChanges();
        });

        this.checkSuccesSend();
    }

    onSendResetPassword() {
        // if (this.formReady.valid) {
        //     let obj = this.formReady.getRawValue();

        //     this.loading = true;
        //     lastValueFrom(this.srv.sendResetPassword(obj))
        //         .then((res) => {
        //             this.loading = false;
        //             this.isSuccesSend = true;
        //             this.router.navigateByUrl(
        //                 '/forgot-password?isSuccesSend=true'
        //             );
        //             localStorage.setItem(
        //                 'email',
        //                 this.formReady.get('email').value
        //             );

        //             this.cd.detectChanges();
        //         })
        //         .catch((err) => {
        //             this.loading = false;
        //             this.isSuccesSend = false;
        //             if (err.error.error) {
        //                 this.msg.showError(err.error.error);
        //             } else {
        //                 this.msg.showError('Err: Backend');
        //             }
        //             this.cd.detectChanges();
        //         });
        // } else {
        //     this.formReady.markAllAsTouched();
        // }
    }

    createFormReady() {
        this.formReady = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    getImages() {
        return lastValueFrom(this.http.get<any>('assets/demo/data/photos.json'))
            .then((res) => <any[]>res.data)
            .then((data) => {
                return data;
            });
    }

    checkSuccesSend() {
        let isSuccess = this.activatedRoute.snapshot.queryParams.isSuccesSend;
        if (isSuccess === 'true') {
            this.isSuccesSend = true;
        } else {
            localStorage.removeItem('email');
            this.isSuccesSend = false;
        }
    }

    goToMail() {
        let domain = this.getEmailDomain(localStorage.getItem('email'));
        switch (domain) {
            case 'gmail.com':
                window.open('https://mail.google.com/', '_blank');
                break;
            case 'krm.co.id':
                window.open('https://outlook.office365.com/mail/', '_blank');
                break;
            default:
                this.msg.showError('Sorry, the email domain is not supported.');
                break;
        }
    }

    onOk() {
        this.router.navigateByUrl('forgot-password').then((res) => {
            this.isSuccesSend = false;
            localStorage.removeItem('email');
            this.formReady.reset();
        });
    }

    onBack() {
        this.router.navigateByUrl('/login');
    }

    getEmailDomain(email: string): string {
        const domainRegex = /@(.+)/;
        const match = email.match(domainRegex);
        if (match) {
            return match[1];
        } else {
            return '';
        }
    }
}
