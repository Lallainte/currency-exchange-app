import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/service/api.service';

@Injectable({
    providedIn: 'root',
})
export class DynamicFormPreviewService {
    constructor(private _apiService: ApiService) {}

    public getStructure(): any[] {
        return JSON.parse(localStorage.getItem('dynamic-form'))?.elements || [];
    }

    public save(uri: string, body: any): Observable<any> {
        return this._apiService.post(uri, body);
    }
}
