import {
    ChangeDetectorRef,
    Component,
    HostListener,
    OnInit,
    Renderer2,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '@core/service/helper-service';
import { MessageBoxService } from '@core/service/message-box.service';
import { MenuItem } from 'primeng/api';
import { NotificationsService } from '../../service/notifications.service';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-list-notifications',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss'],
})
export class TabListComponentNotifications implements OnInit {
    public title!: string;
    private tabIndex: number = 0;
    public activeItem!: MenuItem;
    public activeTabMenuItem!: MenuItem | undefined;
    private screenWidth!: number;
    private totalUnreadNotif: number = 0;
    isAdmin: boolean;
    private readonly web = localStorage.getItem('web');

    tabMenuItems: MenuItem[] = [
        {
            label: 'Notifications',
            icon: 'fa-solid fa-bell',
            command: () =>
                this.router.navigateByUrl(`${this.web}/notifications/list`),
        },
        {
            label: 'Announcements',
            icon: 'fa-solid fa-bullhorn',
            command: () =>
                this.router.navigateByUrl(
                    `${this.web}/notifications/list/announcements`
                ),
        },
        // {
        //     label: 'Requests',
        //     icon: 'fa-solid fa-clipboard-check',
        //     disabled: true,
        //     command: () =>
        //         this.router.navigateByUrl(
        //             `${this.web}/notifications/list/requests`
        //         ),
        // },
        // {
        //     label: 'Claims',
        //     icon: 'fa-solid fa-file-invoice-dollar',
        //     disabled: true,
        //     command: () =>
        //         this.router.navigateByUrl(
        //             `${this.web}/notifications/list/claims`
        //         ),
        // },
    ];

    // @HostListener('document:keydown', ['$event'])
    // handleKeyboardEvent(event: KeyboardEvent) {
    //     if (event.key.toLowerCase() === 'alt' && this.screenWidth > 768) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         this.altView = !this.altView;
    //         localStorage.setItem('altViewAnnouncement', String(this.altView));
    //         this.cd.detectChanges();
    //     }
    // }

    // @HostListener('window:resize', ['$event'])
    // onResize() {
    //     this.screenWidth = window.innerWidth;
    //     if (this.screenWidth < 768) {
    //         this.altView = true;
    //     }
    //     localStorage.setItem('altViewAnnouncement', String(this.altView));
    // }

    constructor(
        private readonly router: Router,
        private readonly cd: ChangeDetectorRef,
        private readonly srv: NotificationsService
    ) {
        this.title = 'notif&announ';
    }

    onRouterOutletActivate(val: any) {
        this.title = val.title;
        this.activeItem = this.tabMenuItems[val.tabIndex];
        this.cd.detectChanges();
    }

    onActiveItemChange(event, standardView = false) {
        this.activeItem = event;
        if (standardView) {
            event.command(event);
        }
    }

    ngOnInit(): void {
        // this.altView = JSON.parse(localStorage.getItem('altViewAnnouncement'));
        // this.onResize();
        lastValueFrom(this.srv.getTotalUnread()).then((res: any) => {
            let data = res.data;
            this.totalUnreadNotif = data.count;
        });
        if (this.web.toLowerCase() == 'admin') {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
        }
    }
}
