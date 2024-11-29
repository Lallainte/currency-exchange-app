import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-general-notifications',
    templateUrl: 'general.component.html',
})
export class GeneralComponentNotifications implements OnInit, OnDestroy {
    title: string;
    isBack: boolean = false;
    web = localStorage.getItem("web");
    isAdmin: boolean;
    constructor(private cd: ChangeDetectorRef) {
        this.title = 'notifications';
    }

    ngOnInit(): void {
        if (this.web.toLowerCase() == 'admin') {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
        }
    }

    onRouterOutletActivate(event: any) {
        this.title = event.title;
        this.isBack = event.isBack;
        this.cd.detectChanges();
    }

    ngOnDestroy(): void {
        if (localStorage.getItem('altViewAnnouncement')) {
            localStorage.removeItem('altViewAnnouncement');
        }
    }
}
