import { Router } from '@angular/router';
import { AppConfig } from 'src/app/core/config/app.config';
import { AppService } from 'src/app/app.service';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ConfigService } from 'src/app/core/service/app.config.service';
import { HelperService } from '@core/service/helper-service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

import {
    OnInit,
    Component,
    OnDestroy,
    Renderer2,
    AfterViewInit,
} from '@angular/core';

import {
    state,
    style,
    animate,
    trigger,
    transition,
} from '@angular/animations';

import jwt_decode from 'jwt-decode';

@Component({
    styles: [
        `
            :host ::ng-deep .p-message {
                margin-left: 0.25em;
            }

            :host ::ng-deep .p-toast {
                margin-top: 5.7em;
                z-index: 99999;
            }
        `,
    ],
    selector: 'app-main',
    animations: [
        trigger('submenu', [
            state(
                'hidden',
                style({
                    height: '0px',
                })
            ),
            state(
                'visible',
                style({
                    height: '*',
                })
            ),
            transition(
                'visible => hidden',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
            transition(
                'hidden => visible',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
        ]),
    ],
    templateUrl: './app.main.component.html',
})
export class AppMainComponent implements AfterViewInit, OnDestroy, OnInit {
    public theme!: string | undefined;
    public width!: number | undefined;
    public menuClick!: boolean | undefined;
    public configClick!: boolean | undefined;
    public configActive!: boolean | undefined;
    public profileActive!: boolean | undefined;
    public topMenuActive!: boolean | undefined;
    public topMenuLeaving!: boolean | undefined;
    public menuActiveMobile!: boolean | undefined;
    public topMenuButtonClick!: boolean | undefined;
    public menuInactiveDesktop!: boolean | undefined;
    public configUpdateSubscriber!: Subscription | undefined;

    public config: AppConfig = {};
    public accountBtnClick: boolean = false;
    public menuActiveNotification: boolean;

    public menuNotificationLeaving: boolean;

    public overlayMenuActive: boolean = false;
    public staticMenuInactive: boolean = false;
    public isBurgerMenuClicked: boolean = true;

    documentClickListener: () => void;

    menuNotificationButtonClick: boolean;

    subscription: Subscription;

    premium = false;

    trialDaysExpired = false;

    trialDays;

    closed = false;

    notifBtnClick: boolean = false;

    constructor(
        public app: AppComponent,
        public renderer: Renderer2,
        public configService: ConfigService,

        private _router: Router,
        private _appService: AppService,
        private _helperService: HelperService,
        private _authenticationService: AuthenticationService
    ) {
        this.renderer.listen('window', 'click', (e: Event) => {
            if (!this.accountBtnClick) {
                this.topMenuActive = false;
            }
            // if (!this.notifBtnClick) {
            //     this.menuActiveNotification = false;
            // }

            this.accountBtnClick = false;
            this.notifBtnClick = false;
        });
    }

    private _logout(fn?: Function): void {
        fn?.();

        this._authenticationService.destroySession();

        this._appService.resetAppState();

        this._router.navigate(['login']);
    }

    public ngOnInit(): void {
        const web: string = this._router.url.split('/')[1];

        // TODO: Uncomment this for rbac
        // if (!this._helperService.hasAccessToWeb(web)) {
        //     this._router.navigateByUrl('403');

        //     return;
        // }

        // try {
        //     const token: any = jwt_decode(
        //         this._authenticationService.getSession()?.accessToken
        //     );
        //     const tokenHasExpired: boolean =
        //         new Date(token.exp * 1000) < new Date();

        //     if (tokenHasExpired) {
        //         return this._logout(() => {
        //             this._appService.isTokenExpired$.next(true);
        //         });
        //     }

        //     localStorage.setItem('web', web);

        //     this.width = window.innerWidth;
        //     this.config = this.configService.config;

        //     this.configUpdateSubscriber =
        //         this.configService.configUpdate$.subscribe((config: any) => {
        //             this.config = config;
        //         });
        // } catch (error) {
        //     this._logout(() => {
        //         this._appService.isTokenInvalid$.next(true);
        //     });
        // }
    }

    public ngOnDestroy(): void {
        if (this.documentClickListener) {
            this.documentClickListener();
        }

        if (this.configUpdateSubscriber) {
            this.configUpdateSubscriber.unsubscribe();
        }
    }

    public ngAfterViewInit(): void {
        // hides the overlay menu and top menu if outside is clicked
        this.documentClickListener = this.renderer.listen(
            'body',
            'click',
            (event) => {
                if (!this.isDesktop()) {
                    if (!this.menuClick) {
                        this.menuActiveMobile = false;
                    }
                } else {
                    if (!this.menuClick && this.isOverlay()) {
                        this.menuInactiveDesktop = true;
                    }
                    if (!this.menuClick) {
                        this.overlayMenuActive = false;
                    }
                }
                if (!this.topMenuButtonClick) {
                    if (
                        event?.path?.filter((pat) => pat.id == 'changeComp')
                            .length <= 0
                    ) {
                        this.hideTopMenu();
                    }
                }

                if (!this.menuNotificationButtonClick) {
                    if (
                        event?.path?.filter((pat) => pat.id == 'changeComp')
                            .length <= 0
                    ) {
                        this.hideNotifications();
                    }
                }

                if (this.configActive && !this.configClick) {
                    this.configActive = false;
                }

                this.configClick = false;
                this.menuClick = false;
                this.topMenuButtonClick = false;
                this.menuNotificationButtonClick = false;
            }
        );
    }

    toggleMenu(event: Event) {
        this.menuClick = true;
        this.staticMenuInactive = !this.staticMenuInactive;
        this.menuActiveMobile = !this.menuActiveMobile;
        this.topMenuActive = false;

        this.configService.triggerToggleMenu();

        if (this.isBurgerMenuClicked) {
            if (document.getElementById('layout-menubar')) {
                document.getElementById('layout-menubar').style.paddingLeft =
                    '0rem';
            }

            this.isBurgerMenuClicked = false;
        } else {
            if (document.getElementById('layout-menubar')) {
                document.getElementById('layout-menubar').style.paddingLeft =
                    '6rem';
            }

            this.isBurgerMenuClicked = true;
        }

        event.preventDefault();
    }

    toggleProfile(event: Event) {
        this.profileActive = !this.profileActive;

        event.preventDefault();
    }

    toggleTopMenu(event: Event) {
        this.topMenuButtonClick = true;
        this.menuActiveMobile = false;

        if (this.topMenuActive) {
            this.hideTopMenu();
        } else {
            this.topMenuActive = !this.topMenuActive;
        }

        this.accountBtnClick = true;
        if (this.menuActiveNotification) {
            this.hideNotifications();
        }

        event.preventDefault();
    }

    toggleNotifications(event: Event) {
        this.menuNotificationButtonClick = true;

        if (this.menuActiveNotification) {
            this.hideNotifications();
        } else {
            this.menuActiveNotification = !this.menuActiveNotification;
        }

        this.notifBtnClick = true;
        event.preventDefault();
    }

    hideNotifications(eventRoute: boolean = false) {
        this.menuNotificationLeaving = true;
        setTimeout(() => {
            this.menuActiveNotification = eventRoute
                ? false
                : !this.menuActiveNotification;
            this.menuNotificationLeaving = false;
        }, 1);
    }

    hideTopMenu(eventRoute: boolean = false) {
        this.topMenuLeaving = true;

        setTimeout(() => {
            this.topMenuActive = eventRoute ? false : !this.topMenuActive;
            this.topMenuLeaving = false;
        }, 1);
    }
    onMenuClick() {
        this.menuClick = true;
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    isStatic() {
        return this.app.menuMode === 'static';
    }

    isOverlay() {
        return this.app.menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth < 1024;
    }

    onSearchClick() {
        this.topMenuButtonClick = true;
    }
}
