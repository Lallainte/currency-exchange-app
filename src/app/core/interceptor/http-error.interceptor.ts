import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageBoxService } from '../service/message-box.service';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        public msg: MessageBoxService,
        public auth: AuthenticationService,
        public router: Router
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                let msg = '';
                let reqs = request.body;
                let resp;
                if (typeof err.error === 'string') {
                    if (!err.error.includes('<')) {
                        resp = JSON.parse(err.error);
                        if (!resp.error && !resp.errors) {
                            resp = { error: resp.status };
                        }
                    } else {
                        resp = { error: 'unknown error' };
                    }
                } else {
                    resp = err.error;
                    if (!err.error.errors) {
                        if (err.error.status) {
                            resp = { error: err.error.status };
                        }
                    }
                }
                let errResp = resp?.errors;
                if (errResp) {
                    if (errResp['reason']) {
                        msg += errResp['reason'] + '\n';
                    } else {
                        Object.keys(errResp).forEach((k) => {
                            msg += k + ' ' + errResp[k] + '\n';
                            // msg += errResp[k] + '\n';
                        });
                        // for (let item in errResp) {
                        //     Object.keys(reqs).forEach((k) => {
                        //         if (item == k) {
                        //             msg += errResp[k] + '\n';
                        //         }
                        //     });
                        // }
                    }
                    resp.error = msg;
                }

                if (err.error instanceof Error) {
                    this.msg.showWarn(err.error.message, 'An error occurred');
                } else {
                    switch (err.status) {
                        case 400: {
                            this.msg.showError(
                                msg,
                                `${err.status}: Bad Request`
                            );
                            break;
                        }
                        case 403: {
                            this.msg.showInfo(
                                err.error.data,
                                `${err.status}: Forbidden`
                            );
                            this.auth.destroySession();
                            this.router.navigate(['login']);
                            break;
                        }

                        default:
                            this.msg.showError(
                                resp.error,
                                `${err.status}: Err Backend`
                            );
                    }
                }
                return throwError(() => err);
            })
        );
    }
}
