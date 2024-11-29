import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { HelperService } from 'src/app/core/service/helper-service';

@Injectable({
    providedIn: 'root',
})
export class EmployeeSelectService {
    constructor(private api: ApiService, private help: HelperService) {}

    getList(uri, pi, body?) {
        return this.api.get(uri, this.help.getParam(pi, body));
    }

    getFilePhoto(id) {
        return this.api.getFileByte(`employees/${id}/active-photo`);
    }

    getById(id) {
        return this.api.get('employees/' + id + '/simple');
    }

    getByPersonId(id) {
        return this.api.get('employees/person/' + id + '/simple');
    }
}
