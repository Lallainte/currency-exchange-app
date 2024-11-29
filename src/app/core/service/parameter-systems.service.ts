import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ParameterSystemService {
    constructor(private readonly _apiService: ApiService) {}

    public getParameterSystems(): Observable<any> {
        return this._apiService.get('parameter-systems');
    }

    public updateParameterSystems(data: any): Observable<any> {
        return this._apiService.put('parameter-systems', data);
    }
}
