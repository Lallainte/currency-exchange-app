import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { HelperService } from '@core/service/helper-service';

@Injectable({ providedIn: 'root' })
export class LogHistoryService {
    constructor(private api: ApiService, private help: HelperService) {}

    get(uri, pi, body?) {
        return this.api.get(uri, this.help.getParam(pi, body));
    }

    getDetail(uri, pi, body?) {
        return this.api.get(uri, this.help.getParam(pi, body));
    }

    getSetting() {
        return this.api.get('logs/setting');
    }

    putSetting(data) {
        return this.api.put('logs/setting', data);
    }
}
