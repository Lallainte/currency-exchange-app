import { ApiService } from '@core/service/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiServiceEss } from '@core/service/api.service-ess';

import { Router, NavigationEnd } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
    private api: any;
    private uriNotif: string | undefined;

    constructor(
        private readonly _apiEss: ApiServiceEss,
        private readonly _router: Router,
        private readonly _apiAdmin: ApiService
    ) {
        this.updateApiBasedOnLocalStorage();

        this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateApiBasedOnLocalStorage();
            }
        });
    }

    private updateApiBasedOnLocalStorage() {
        const web: string = localStorage.getItem('web') || '';

        if (web === 'admin') {
            this.api = this._apiAdmin;
            this.uriNotif = '';
        } else {
            this.api = this._apiEss;
            this.uriNotif = 'mobile/';
        }
    }

    public get(id: string): Observable<any> {
        return this.api.get(`announcement/${id}`);
    }

    public getAttach(id: string): Observable<any> {
        return this.api.get(`announcement-attachments?announcementId=${id}`);
    }

    public markAsRead(id) {
        return this.api.put(`${this.uriNotif}notification/mark-as-read/${id}`);
    }

    public markAsReads() {
        return this.api.put(`${this.uriNotif}notification/mark-as-read`);
    }

    public getTotalUnread() {
        return this.api.get(
            `${this.uriNotif}notifications/total-unread`,
            null,
            false,
            false,
            () => {}
        );
    }

    public getNotifBell() {
        return this.api.get(
            `${this.uriNotif}notifications?pageSize=4`,
            null,
            false,
            false,
            () => {}
        );
    }

    public getAnnounceBell() {
        return this.api.get(
            'announcements/display?pageSize=4',
            null,
            false,
            false,
            () => {}
        );
    }

    public getAnnounceShow() {
        return this.api.get('announcements/show', null, false, false, () => {});
    }

    public getFlashBannerShow() {
        return this.api.get('flash-banners/show', null, false, false, () => {});
    }

    public announceException(body) {
        return this.api.post('announce-show-exceptions', body);
    }
}
