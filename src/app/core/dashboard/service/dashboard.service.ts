import { Injectable } from '@angular/core';
import { ApiService } from "@core/service/api.service";
import { HelperService } from '@core/service/helper-service';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private api: ApiService,private help: HelperService) {}
    getAll(uri: string,pi, body?) {
        return this.api.get(`${uri}`,
        this.help.getParam(pi, body));
    }

    getAllCommon(uri: string) {
        return this.api.get(`${uri}`);
    }

    getById(id: string, uri: string) {
        return this.api.get(`${uri}/${id}`);
    }

    getFilePhoto(id: string, uri: string) {
        return this.api.getFileByte(`${uri}/${id}`);
    }

    getAttachment(uri: string) {
        return this.api.getFileByte(`${uri}`);
    }
}
