import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { NotificationsService } from 'src/app/util/notifications/service/notifications.service';

@Component({
    selector: 'app-detail-announcements',
    templateUrl: 'detail.component.html',
    styleUrls: ['detail.component.scss'],
})
export class DetailComponentAnnouncements implements OnInit {
    private uuid!: string;
    private readonly title!: string;
    private readonly isBack!: boolean;
    public readonly web!: string | undefined;
    public detailData!: any;
    public loadData: boolean = false;
    public noBanner: boolean = true;
    public attach: any = [];

    constructor(
        private readonly _activatedRoute: ActivatedRoute,
        private readonly _service: NotificationsService,
        private readonly _router: Router
    ) {
        this.uuid = this._activatedRoute.snapshot.paramMap.get('uuid');
        this.title = 'announcement';
        this.isBack = true;
        this.web = localStorage.getItem('web');
        this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.getData();
            }
        });
    }

    ngOnInit() {
        this.getData();
    }

    private async getData() {
        this.loadData = true;
        this.uuid = this._activatedRoute.snapshot.paramMap.get('uuid');
        try {
            await lastValueFrom(this._service.get(this.uuid)).then(
                ({ data }) => {
                    this.detailData = data;
                    if (data.bannerFile) {
                        this.noBanner = false;
                    } else {
                        this.noBanner = true;
                    }
                }
            );
            await lastValueFrom(this._service.getAttach(this.uuid)).then(
                ({ data }) => {
                    if (data.length) {
                        this.attach = data;
                    }
                }
            );
            this.loadData = false;
        } catch (error) {
            this.loadData = false;
            console.error(error);
        }
    }

    public base64toUrl(base64String: string): string {
        return 'data:image/*;base64,' + base64String;
    }

    public formatBytes(bytes) {
        var marker = 1024;
        var decimal = 0;
        var kiloBytes = marker;
        var megaBytes = marker * marker;
        var gigaBytes = marker * marker * marker;
        if (bytes >= gigaBytes)
            return (bytes / gigaBytes).toFixed(decimal) + ' GB';
        else if (bytes >= megaBytes)
            return (bytes / megaBytes).toFixed(decimal) + ' MB';
        else if (bytes >= kiloBytes)
            return (bytes / kiloBytes).toFixed(decimal) + ' KB';
        else return bytes + ' Bytes';
    }
}
