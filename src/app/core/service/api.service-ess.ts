import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
    HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './authentication.service';

/**
 * Http wrapper service
 */
@Injectable({
    providedIn: 'root',
})
export class ApiServiceEss {
    protected header = new HttpHeaders();
    protected headerUpload = new HttpHeaders();
    userSession;
    constructor(
        private httpClient: HttpClient,
        private spinner: NgxSpinnerService,
        private authService: AuthenticationService
    ) {}
    getHeaders(): HttpHeaders {
        return this.header
            .append(
                'Authorization',
                `Bearer ${this.authService.getSession()?.accessToken}`
            )
            .append('Accept', 'application/json')
            .append('Content-Type', 'application/json');
    }
    getHeadersFile(): HttpHeaders {
        return this.header.append(
            'Authorization',
            `Bearer ${this.authService.getSession()?.accessToken}`
        );
    }
    getHeaderUpload(): HttpHeaders {
        return this.header
            .append(
                'Authorization',
                `Bearer ${this.authService.getSession()?.accessToken}`
            )
            .append('enctype', 'multipart/form-data');
    }
    getDummyHeaders(str): HttpHeaders {
        return this.header
            .append('Authorization', 'Bearer ' + str)
            .append('Accept', 'application/json')
            .append('Content-Type', 'application/json');
    }
    private handleError(err: HttpErrorResponse): Observable<any> {
        return throwError(() => err.error);
    }

    private mapToAppResponse(response: HttpResponse<any>): any {
        return response.body;
    }

    postLogin(uri: string, body: object, isShowSpinner?): Observable<any> {
        //pasang loading
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .post<any>(environment.apiUrlEss + uri, body, {
                observe: 'response',
                responseType: 'text' as 'json',
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }

    postCsv(uri: string, body: object, isShowSpinner?): Observable<any> {
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .post<any>(environment.apiUrlEss + uri, body, {
                headers: this.getHeadersFile(),
                observe: 'response',
                responseType: 'text' as 'json',
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }
    getSSOToken(isShowSpinner?): Observable<any> {
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .post<any>(
                environment.apiUrlEss + 'open/auth/login',
                {
                    username: 'upahkuweb',
                    password: 'password123*',
                },
                {
                    observe: 'response',
                }
            )
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }

    postLoginSSO(token, isShowSpinner?): Observable<any> {
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .post<any>(
                environment.apiUrlEss + 'open/auth/code',
                {
                    username: 'ADMWID032000',
                    password: '63sqom19Z5',
                    agent: navigator.userAgent,
                },
                {
                    headers: this.getDummyHeaders(token),
                    observe: 'response',
                }
            )
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }

    get(uri: string, param?: HttpParams, isShowSpinner?): Observable<any> {
        //pasang loading
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .get<any>(environment.apiUrlEss + uri, {
                headers: this.getHeaders(),
                observe: 'response',
                params: param,
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }
    getFileByte(
        uri: string,
        param?: HttpParams,
        isShowSpinner?: boolean
    ): Observable<HttpResponse<Blob>> {
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .get<Blob>(environment.apiUrlEss + uri, {
                headers: this.getHeadersFile(),
                observe: 'response',
                // withCredentials: true,
                params: param,
                responseType: 'blob' as 'json',
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }

    post(uri: string, body: object, isShowSpinner?): Observable<any> {
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .post<any>(environment.apiUrlEss + uri, body, {
                headers: this.getHeaders(),
                observe: 'response',
                responseType: 'text' as 'json',
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }
    postFormData(uri: string, body: object, isShowSpinner?): Observable<any> {
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .post<any>(environment.apiUrlEss + uri, body, {
                headers: this.getHeaderUpload(),
                observe: 'response',
                responseType: 'text' as 'json',
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }
    postFileByte(uri: string, body: object, isShowSpinner?): Observable<any> {
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .post<any>(environment.apiUrlEss + uri, body, {
                headers: this.getHeadersFile(),
                observe: 'response',
                responseType: 'blob' as 'json',
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }

    put(uri: string, body?: object, isShowSpinner?): Observable<any> {
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .put<any>(environment.apiUrlEss + uri, body, {
                headers: this.getHeaders(),
                observe: 'response',
                responseType: 'text' as 'json',
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }
    putFormData(uri: string, body: object, isShowSpinner?): Observable<any> {
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .put<any>(environment.apiUrlEss + uri, body, {
                headers: this.getHeaderUpload(),
                observe: 'response',
                responseType: 'text' as 'json',
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }
    delete(uri: string, isShowSpinner?): Observable<any> {
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .delete<any>(environment.apiUrlEss + uri, {
                headers: this.getHeaders(),
                observe: 'response',
                responseType: 'text' as 'json',
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }

    logout(): Observable<any> {
        return this.httpClient
            .delete<any>(environment.apiUrl + 'auth/logout', {
                headers: this.getHeaders(),
                observe: 'response',
                responseType: 'text' as 'json',
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError)
            );
    }

    deleteAll(uri: string, body: object[]): Observable<any> {
        return this.httpClient
            .request('DELETE', environment.apiUrlEss + uri, {
                headers: this.getHeaders(),
                observe: 'response',
                responseType: 'text' as 'json',
                body,
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError)
            );
    }

    patch(uri: string, body?: any, isShowSpinner?): Observable<any> {
        if (isShowSpinner) {
            this.spinner.show();
        }
        return this.httpClient
            .patch<any>(environment.apiUrlEss + uri, body, {
                headers: this.getHeaders(),
                observe: 'response',
                responseType: 'text' as 'json',
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => {
                    this.spinner.hide();
                })
            );
    }

    getCompany(uri: string, param?: HttpParams): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiUrlEss + uri, {
                headers: this.getHeaders(),
                observe: 'response',
                params: param,
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError)
            );
    }

    postFormDataProgress(uri: string, body: object): Observable<any> {
        return this.httpClient.post<any>(environment.apiUrlEss + uri, body, {
            reportProgress: true,
            observe: 'events',
            responseType: 'text' as 'json',
        });
    }

    getSocket() {
        return environment.webSocketEss;
    }

    dummyGet() {
        return [
            { key: '1', value: '2020', id: '' },
            { key: '2', value: '2021', id: '' },
            { key: '3', value: '2022', id: '' },
            { key: '4', value: '2023', id: '' },
        ];
    }
}
