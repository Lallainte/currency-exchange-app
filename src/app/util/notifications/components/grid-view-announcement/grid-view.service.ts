import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from '@core/service/api.service';
import { ApiServiceEss } from '@core/service/api.service-ess';
import { HelperService } from '@core/service/helper-service';

@Injectable({ providedIn: 'root' })
export class GridViewAnnouncementDisplayService {
    private api: any;

    constructor(
        private readonly _apiAdmin: ApiService,
        private readonly _apiEss: ApiServiceEss,
        private readonly _help: HelperService,
        private readonly router: Router
    ) {
        this.updateApiBasedOnLocalStorage();
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateApiBasedOnLocalStorage();
            }
        });
    }

    private updateApiBasedOnLocalStorage() {
        const web: string = localStorage.getItem('web') || '';

        if (web === 'admin') {
            this.api = this._apiAdmin;
        } else {
            this.api = this._apiEss;
        }
    }

    getList(uri, pi, body?) {
        return this.api.get(uri, this._help.getParam(pi, body));
    }

    get(id) {
        return this.api.get(`announcement/${id}`);
    }
}
