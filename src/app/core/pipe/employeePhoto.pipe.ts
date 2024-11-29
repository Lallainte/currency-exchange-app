import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/service/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiServiceEss } from '@core/service/api.service-ess';

import { Pipe, PipeTransform } from '@angular/core';

import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Pipe({
    name: 'employeePhoto',
})
export class EmployeePhoto implements PipeTransform {
    web = localStorage.getItem('web');
    srv;

    constructor(
        private srv1: ApiService,
        private srv2: ApiServiceEss,
        private httpClient: HttpClient,
        private sanitizer: DomSanitizer
    ) {
        if (this.web == 'admin') {
            this.srv = srv1;
        } else {
            this.srv = srv2;
        }
    }

    transform(id: any, args?: any) {
        return this.httpClient
            .get<Blob>(`${environment.apiUrl}employees/${id}/active-photo`, {
                headers: this.srv.getHeadersFile(),
                observe: 'response',
                responseType: 'blob' as 'json',
            })
            .pipe(
                map((res) =>
                    this.sanitizer.bypassSecurityTrustUrl(
                        URL.createObjectURL(res.body)
                    )
                )
            );
    }
}
