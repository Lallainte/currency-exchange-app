import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { HelperService } from 'src/app/core/service/helper-service';

@Injectable({
    providedIn: 'root',
})
export class PersonSelectService {
    constructor(private api: ApiService, private help: HelperService) {}

    getList(uri, pi, body?) {
        return this.api.get(uri, this.help.getParam(pi, body));
    }
}
