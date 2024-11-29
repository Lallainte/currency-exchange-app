import { isNil } from 'lodash-es';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from '@core/service/api.service';
import { ApiServiceEss } from '@core/service/api.service-ess';
import { HelperService } from '@core/service/helper-service';

@Injectable({ providedIn: 'root' })
export class LinovDataViewService {
    private api: any;

    constructor(
        private readonly _apiEss: ApiServiceEss,
        private readonly _router: Router,
        private readonly _apiAdmin: ApiService,
        private help: HelperService
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
        } else {
            this.api = this._apiEss;
        }
    }

    getList(uri, pi, body?, sort?) {
        let param = this.help.getParam(pi, body);

        if (!isNil(sort)) {
            param = param.set('sortBy', sort);
        }

        return this.api.get(uri, param);
    }
}
