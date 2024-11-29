import { Injectable } from '@angular/core';
import {
    HttpClient,
} from '@angular/common/http';

/**
 * Http wrapper service
 */
@Injectable({
    providedIn: 'root',
})
export class DummyService {

    constructor(
        private httpClient: HttpClient
    ) { }
    getDummySmall() {
        return this.httpClient.get<any>('assets/demo/data/dummy.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data);
    }

    getDummyMedium() {
        return this.httpClient.get<any>('assets/demo/data/dummy.json')
            .toPromise()
            .then(res => res.data )
            .then(data => data=data.concat(data));
    }

    getDummyLarge() {
        return this.httpClient.get<any>('assets/demo/data/dummy.json')
            .toPromise()
            .then(res => res.data)
            .then(data => data = data.concat(data).concat(data));
    }
}
