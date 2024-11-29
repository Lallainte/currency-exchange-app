import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './service/authentication.service';

import {
    Router,
    UrlTree,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PermisionGuard {
    constructor(
        private readonly _router: Router,
        private readonly _authenticationService: AuthenticationService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const web: string | undefined = localStorage.getItem('web');
        const session: any = this._authenticationService.getSession();

        if (state.url === '/login' && session) {
            this._router.navigateByUrl(`/${web}`);

            return false;
        }

        if (environment.isSSO) {
            window.location.href = environment.linovWordpress;
        }

        return true;
    }
}
