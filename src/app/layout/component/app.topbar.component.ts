import { WebSocketService } from './../../core/service/web-socket.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ApiService } from 'src/app/core/service/api.service';
import { MessageBoxService } from 'src/app/core/service/message-box.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { NavigationEnd, Router, UrlTree } from '@angular/router';
import { ConfigService } from 'src/app/core/service/app.config.service';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
// import { ActivityMasterService } from '@organization/activity-organization-master/service/activity-master.service';
import { AppConstant } from '@config/app.config';
import {
    animate,
    group,
    query,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { AppService } from 'src/app/app.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

import { NotificationsService } from 'src/app/util/notifications/service/notifications.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: [
        `
            :host ::ng-deep {
                .p-tabview .p-tabview-nav li {
                    width: 100%;
                }

                .p-tabview .p-tabview-panels {
                    padding: 4px 0;
                }

                .notif__img-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--primary-color);

                    i {
                        color: var(--surface-0);
                        font-size: 20px;
                    }
                }

                .announce__img-avatar {
                    width: 8rem;
                    height: 4rem;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: center;
                        border-radius: 4px;
                    }
                }

                .list-item__notification {
                    padding: 0.8rem 0.95rem;
                    cursor: pointer;

                    &:hover {
                        filter: brightness(97%);
                    }

                    &.unread {
                        position: relative;
                        background-color: var(--light-red);
                        transition: all 0.2s;

                        &:hover {
                            filter: brightness(97%);
                        }
                    }
                }

                .confirm-dialog__flash-banner__mask {
                    z-index: 100002 !important;
                }

                .pop-up__flash-banner__mask {
                    z-index: 100001 !important;
                }

                .announcement__dialog__mask {
                    z-index: 100000 !important;
                }

                .btn__close-announcement-popup {
                    border-radius: 50%;
                    background: transparent !important;
                    color: #9f9f9f !important;
                    position: absolute;
                    right: 8px;
                    top: 8px;
                    width: 2rem !important;
                    height: 2rem !important;
                    padding: 0 !important;

                    &:hover {
                        color: #343a40;
                        border-color: transparent;
                        background-color: #e9ecef !important;
                    }
                }
            }
        `,
    ],
    animations: [
        trigger('customDialogAnnouncementAnimations', [
            transition(':enter', [
                group([
                    query(
                        '.announcement__dialog',
                        style({ transform: 'translateX(100rem)', opacity: 0 })
                    ),
                    query(
                        '.announcement__dialog',
                        animate(
                            '0.2s ease-in',
                            style({ transform: 'translateX(0)', opacity: 1 })
                        )
                    ),
                ]),
            ]),
            transition(':leave', [
                group([
                    query(
                        '.announcement__dialog',
                        style({ transform: 'translateX(0)', opacity: 1 })
                    ),
                    query(
                        '.announcement__dialog',
                        animate(
                            '0.2s ease-out',
                            style({
                                transform: 'translateX(100rem)',
                                opacity: 0,
                            })
                        )
                    ),
                ]),
            ]),
        ]),
    ],
})
export class AppTopBarComponent implements OnInit, OnDestroy {
    private readonly _web: string | undefined = localStorage.getItem('web');

    public notifTotalUnread: string = '';
    public notifListBel: any[] = [];
    public announceListBel: any[] = [];
    public announceList: any[] = [];
    public flashBannerList: any[] = [];
    public disabledRedirectNotif: boolean = false;
    public isShowConfirm: boolean = false;
    public checkedDontShowAgain: boolean = false;

    public pageFlashBanner: number = 0;

    public visibleAnn: boolean = false;
    public visibleFlash: boolean = false;

    private notifTotalUnreadPromise: Promise<any> | undefined;
    private notifBellPromise: Promise<any> | undefined;
    private announceBellPromise: Promise<any> | undefined;
    private announcementPromise: Promise<any> | undefined;
    private flashBannerPromise: Promise<any> | undefined;

    selectedItem: any;

    suggestions: any[] | undefined;

    appInfo!:
        | {
              current: string | undefined;
              hasEssAccess: boolean;
              hasMssAccess: boolean;
              hasAdminAccess: boolean;
          }
        | undefined;

    items: MenuItem[];
    session;
    cities = [
        { name: 'PT. Kramayudha Ratu Motor', code: 'NY' },
        { name: 'PT. Lawencon International', code: 'RM' },
    ];
    language = [
        { label: 'EN', value: 'en' },
        { label: 'ID', value: 'id' },
    ];
    selectedLang = localStorage.getItem('locale') || 'en';
    companyId;
    e;
    onHideFlash = {
        show: () => {
            this.isShowConfirm = true;
        },
        accept: async () => {
            if (this.checkedDontShowAgain) {
                let flashBanner = this.flashBannerList[this.pageFlashBanner];
                let body = {
                    announcementId: flashBanner.id,
                    employeeId: this.session.id,
                };
                await lastValueFrom(this.notifSrv.announceException(body));
            }
            localStorage.setItem('displayFlashAdmin', 'false');
            this.visibleFlash = false;
            this.isShowConfirm = false;
        },
        reject: () => {
            this.isShowConfirm = false;
        },
    };

    public get isSuperAdmin(): boolean {
        return this.session?.roleType === 'SUPERADMIN';
    }

    constructor(
        public appMain: AppMainComponent,
        public api: ApiService,
        public msg: MessageBoxService,
        private auth: AuthenticationService,
        private route: Router,
        private config: ConfigService,
        public translate: TranslateService,
        // private srv: ActivityMasterService,
        private readonly notifSrv: NotificationsService,
        private readonly _router: Router,
        private readonly _appService: AppService,
        private readonly _webSocketService: WebSocketService,
        private readonly _cd: ChangeDetectorRef,
        private readonly _confirmationService: ConfirmationService
    ) {
        this.session = this.auth.getLocalStorage(AppConstant.userSession);
        this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                appMain.hideNotifications(true);
                appMain.hideTopMenu(true);
            }
        });
    }

    ngOnInit(): void {
        // this.loadData();
        // this._connect();

        let web: string | undefined = localStorage.getItem('web');

        if (web === 'dashboard') {
            web = 'admin';
        }

        this.appInfo = {
            current: web,
            hasEssAccess: this._appService.hasEssAccess$.value,
            hasMssAccess: this._appService.hasMssAccess$.value,
            hasAdminAccess: this._appService.hasAdminAccess$.value,
        };

        // this.getDataCompany();

        this.defaultLangChecker();
    }

    _connect() {
        if (this.auth.isLoggedIn()) {
            const tenantId = this.auth.getLocalStorage(AppConstant.tenantId);

            this._webSocketService.connect(this._web).subscribe({
                next: (connected) => {
                    if (connected) {
                        this._webSocketService
                            .subscribe(`/topic/personal/${this.session.id}`)
                            .subscribe((message) => {
                                const splitText =
                                    message.headers.destination.split('/');
                                const uuid = splitText[splitText.length - 1];

                                if (uuid === this.session.id) {
                                    if (message.body) {
                                        let resp = JSON.parse(message.body);
                                        this._notifBell();
                                        this._notifTotalUnread();
                                    }
                                }
                            });
                        this._webSocketService
                            .subscribe(`/topic/announcement/tenant/${tenantId}`)
                            .subscribe((message) => {
                                if (message.body) {
                                    let resp = JSON.parse(message.body);
                                    if (
                                        resp.lovTypeAnnouncementCode === 'ANNCH'
                                    ) {
                                        this._announcementShow(true);
                                    } else {
                                        this._flashBannerShow(true);
                                    }
                                    this._announceBell();
                                }
                            });
                        this._webSocketService
                            .subscribe(
                                `/topic/announcement/user/${this.session.id}`
                            )
                            .subscribe((message) => {
                                const splitText =
                                    message.headers.destination.split('/');
                                const uuid = splitText[splitText.length - 1];

                                if (uuid === this.session.id) {
                                    if (message.body) {
                                        let resp = JSON.parse(message.body);
                                        if (
                                            resp.lovTypeAnnouncementCode ===
                                            'ANNCH'
                                        ) {
                                            this._announcementShow(true);
                                        } else {
                                            this._flashBannerShow(true);
                                        }
                                        this._announceBell();
                                    }
                                }
                            });
                    }
                },
                error: () => {
                    this._webSocketService.disconnect();
                },
            });
        }
        this._cd.detectChanges();
    }

    loadData() {
        this.notifTotalUnreadPromise = this._notifTotalUnread();
        this.notifBellPromise = this._notifBell();
        this.announceBellPromise = this._announceBell();
        this.announcementPromise = this._announcementShow();
        this.flashBannerPromise = this._flashBannerShow();
    }

    private _notifTotalUnread(): Promise<any> {
        return lastValueFrom(this.notifSrv.getTotalUnread()).then(
            (res: any) => {
                let count: string = '0';
                if (res.data.count >= 99) {
                    count = '99+';
                } else {
                    count = String(res.data.count);
                }

                this.notifTotalUnread = count;
            }
        );
    }

    private _notifBell(): Promise<any> {
        return lastValueFrom(this.notifSrv.getNotifBell()).then((res: any) => {
            this.notifListBel = res.data;
        });
    }

    private _announceBell(): Promise<any> {
        return lastValueFrom(this.notifSrv.getAnnounceBell()).then(
            (res: any) => {
                this.announceListBel = res.data;
            }
        );
    }

    private _announcementShow(triggerSock: boolean = false): Promise<any> {
        return lastValueFrom(this.notifSrv.getAnnounceShow()).then(
            (res: any) => {
                if (res.data && res.data.length) {
                    this.announceList = res.data;
                    const displayAnnAdmin =
                        localStorage.getItem('displayAnnAdmin');

                    if (!displayAnnAdmin || displayAnnAdmin === 'true') {
                        localStorage.setItem('displayAnnAdmin', 'true');
                        this.visibleAnn = true;
                    } else if (triggerSock) {
                        localStorage.setItem('displayAnnAdmin', 'true');
                        this.visibleAnn = true;
                    }
                }
            }
        );
    }

    private _flashBannerShow(triggerSock: boolean = false): Promise<any> {
        return lastValueFrom(this.notifSrv.getFlashBannerShow()).then(
            (res: any) => {
                if (res.data && res.data.length) {
                    this.flashBannerList = res.data;
                    const displayFlashAdmin =
                        localStorage.getItem('displayFlashAdmin');

                    if (!displayFlashAdmin || displayFlashAdmin === 'true') {
                        localStorage.setItem('displayFlashAdmin', 'true');
                        this.visibleFlash = true;
                    } else if (triggerSock) {
                        localStorage.setItem('displayFlashAdmin', 'true');
                        this.visibleFlash = true;
                    }
                }
            }
        );
    }

    onHideAnnounce() {
        localStorage.setItem('displayAnnAdmin', 'false');
        this.visibleAnn = false;
    }

    doLogout() {
        this._webSocketService.disconnect();
        this.api.logout().subscribe({
            next: (resp) => {
                this.auth.destroySession();
                this.route.navigate(['/login']);
            },
            error: (err) => {
                this.auth.destroySession();
                this.route.navigate(['/login']);
            },
        });

        // if (environment.isSSO) {
        //     this.auth.destroySession();
        //     window.location.href = environment.linovWordpress;
        // } else {
        //     this.route.navigate(['/login']);
        // }
    }

    selectCompany(e) {
        if (this.session.selectedCompanyId != e.id) {
            this.config.setLoading(true);
            this.api
                .post('auth/change-company', { id: e.id }, true)
                .subscribe((res) => {
                    this.auth.createSession(res);
                    this.session = this.auth.getSession();
                    this.config.setLoading(false);
                });
        }
    }

    defaultLangChecker() {
        this.translate.addLangs(['en', 'id']);

        if (localStorage.getItem('locale')) {
            const browserLang = localStorage.getItem('locale');
            this.translate.use(browserLang.match(/en|id/) ? browserLang : 'en');
        } else {
            localStorage.setItem('locale', 'en');
            this.translate.setDefaultLang('en');
        }
    }

    changeLang(language: string) {
        localStorage.setItem('locale', language);
        this.translate.use(language);
    }

    // async getDataCompany() {
    //     await lastValueFrom(this.srv.getCompany())
    //         .then((res) => {
    //             this.companyId = res.data[0].name;
    //             this.auth.setLocalStorage(
    //                 AppConstant.companyId,
    //                 res.data[0].id
    //             );
    //         })
    //         .catch((error) => {});
    // }

    onShowNotif() {
        let web = localStorage.getItem('web');
        this.appMain.hideNotifications();

        this.route.navigateByUrl(`/${web}/notifications/list`);
    }

    onChangeWeb(web) {
        localStorage.setItem('web', web);

        this.route.navigate(['/' + web]);
    }

    search(event: AutoCompleteCompleteEvent) {
        this.suggestions = this.auth
            .getLocalStorage(AppConstant.accessAdmin)
            .filter((el: any) =>
                el.label.toLowerCase().includes(event.query.toLowerCase())
            );
    }

    select(event: any) {
        this._router.navigateByUrl(
            `${this._web}${event.routerLink.toString()}`
        );
    }

    handleClickNotif(data) {
        let route = data.route.path;

        if (route) {
            this.checkAndCorrectRoute(route, data);
        } else {
            this.msg.showError('Invalid Route');
        }
    }

    handleClickAnnounce(data) {
        this._router.navigateByUrl(
            `${localStorage.getItem('web')}/notifications/detail/${
                data.id
            }/announcement`
        );
    }

    async checkAndCorrectRoute(routePath: string, data: any) {
        const is404 = await this.isRoute404(routePath);
        if (is404) {
            this.msg.showError(
                `Route ${routePath} leads to 404. No navigation performed.`
            );
        } else {
            lastValueFrom(this.notifSrv.markAsRead(data.id)).then((res) => {
                this._notifBell();
                this._notifTotalUnread();
                this.appMain.hideNotifications();
                window.open(routePath, '_blank');
            });
        }
    }

    async isRoute404(routePath: string): Promise<boolean> {
        const urlTree: UrlTree = this._router.parseUrl(routePath);
        const is404 = urlTree.root.children.primary === null;
        return is404;
    }

    formatDateNotifAnnounce(dateString: string) {
        const inputDate = new Date(dateString);
        const currentDate = new Date();

        const millisecondsDiff = currentDate.getTime() - inputDate.getTime();
        const daysDiff = Math.floor(millisecondsDiff / (1000 * 3600 * 24));

        if (daysDiff === 0) {
            return 'Today';
        } else if (daysDiff >= 1 && daysDiff <= 7) {
            return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
        } else {
            const formattedDate = `${this.getDayNameShort(
                inputDate.getDay()
            )}, ${inputDate.getDate()} ${this.getMonthNameShort(
                inputDate.getMonth()
            )}`;
            return formattedDate;
        }
    }

    getDayNameShort(day: number): string {
        const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return daysShort[day];
    }

    getMonthNameShort(month: number): string {
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        return months[month];
    }

    getImageUrl(item, flash = false): string {
        const foundItem = flash ? item.file.base : item.bannerFile?.file.base;
        if (foundItem) {
            try {
                const imageUrl = this.base64toUrl(foundItem);
                return imageUrl;
            } catch (error) {
                return 'assets/images/no-image-announcement.png';
            }
        } else {
            return 'assets/images/no-image-announcement.png';
        }
    }

    private base64toUrl(base64String: string): string {
        return 'data:image/*;base64,' + base64String;
    }

    getPageAnnouncement(item) {
        return this.announceList.findIndex((obj) => obj.id === item.id) + 1;
    }

    redirectToAnnouncement(item) {
        this._router.navigateByUrl(
            `${localStorage.getItem('web')}/notifications/detail/${
                item.id
            }/announcement`
        );
    }

    onPageChangeFlashBanner(e) {
        this.pageFlashBanner = e.page;
    }

    ngOnDestroy(): void {
        this._webSocketService.disconnect();
    }
}
