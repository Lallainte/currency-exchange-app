import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridViewAnnouncementDisplayComponent } from 'src/app/util/notifications/components/grid-view-announcement/grid-view.component';

@Component({
    selector: 'app-list-announcement',
    templateUrl: 'list.component.html',
})
export class ListComponentAnnouncements implements OnInit {
    @ViewChild('GridViewComponent')
    private readonly grid: GridViewAnnouncementDisplayComponent;

    private readonly web: string = localStorage.getItem('web');

    private readonly title!: string;
    public readonly subTitle!: string;
    private readonly tabIndex!: number;
    private body!: any;

    public readonly customFilterGroup = [
        {
            key: 'lovTypeId',
            uri: 'lovs/announcement-types',
            label: 'All Types',
            web: 'admin',
        },
    ];

    constructor(private readonly _route: Router) {
        this.title = 'notifications';
        this.subTitle = 'announcements';
        this.tabIndex = 1;
    }

    onSearch(e) {
        this.body = e;
        this.grid.onSearch(this.body);
    }

    dataAction(e) {
        let data = e.data;
        this._route.navigateByUrl(
            `${this.web}/notifications/detail/${data.id}/announcement`
        );
    }

    ngOnInit() {}
}
