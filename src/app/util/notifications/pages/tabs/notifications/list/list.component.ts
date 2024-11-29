import { Component, OnInit, ViewChild } from '@angular/core';
import { ListViewNotification } from 'src/app/util/notifications/components/list-view-notification/list-view.component';
import { Router, UrlTree } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { lastValueFrom } from 'rxjs';
import { NotificationsService } from 'src/app/util/notifications/service/notifications.service';
import { TabListComponentNotifications } from '../../../list/list.component';

@Component({
    selector: 'app-list-notifications',
    templateUrl: 'list.component.html',
})
export class ListComponentNotifications implements OnInit {
    @ViewChild('ListViewComponent')
    private readonly listView: ListViewNotification;

    private readonly web: string = localStorage.getItem('web');

    private readonly title!: string;
    public readonly subTitle!: string;
    private readonly tabIndex!: number;
    private body!: any;
    public uri: string = '';

    constructor(
        private readonly router: Router,
        private readonly msg: MessageBoxService,
        private readonly srv: NotificationsService,
        private readonly tabList: TabListComponentNotifications
    ) {
        this.title = 'notifications';
        this.subTitle = 'notifications';
        this.tabIndex = 0;
    }

    ngOnInit() {
        if (this.web === 'admin') {
            this.uri = 'notifications';
        } else {
            this.uri = 'mobile/notifications';
        }
    }

    onSearch(e) {
        this.body = e;
        this.listView.onSearch(this.body);
    }

    async dataAction(e) {
        let data = e.data;
        let route = data.route.path;
        let detailId = data.route.detailId;

        if (route) {
            await this.checkAndCorrectRoute(route, data);
        } else {
            this.msg.showError('Invalid Route');
        }
    }

    async checkAndCorrectRoute(routePath: string, data: any) {
        const is404 = await this.isRoute404(routePath);
        if (is404) {
            this.msg.showError(
                `Route ${routePath} leads to 404. No navigation performed.`
            );
        } else {
            lastValueFrom(this.srv.markAsRead(data.id)).then((res) => {
                this.listView.onRefresh();
                this.tabList.ngOnInit();
                window.open(routePath, '_blank');
            });
        }
    }

    async isRoute404(routePath: string): Promise<boolean> {
        const urlTree: UrlTree = this.router.parseUrl(routePath);
        const is404 = urlTree.root.children.primary === null;
        return is404;
    }
}
