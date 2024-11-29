import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { HelperService } from '@core/service/helper-service';

@Injectable({ providedIn: 'root' })
export class LinovUploadService {
    constructor(private api: ApiService, private help: HelperService) {}

    get(uri) {
        return this.api.get(uri)
    }
}
