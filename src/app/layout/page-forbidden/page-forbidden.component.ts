import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AppConstant } from '@core/config/app.config';
import { AuthenticationService } from '@core/service/authentication.service';

@Component({
    selector: 'app-error-page-forbidden-found',
    styleUrls: ['./page-forbidden.component.scss'],
    templateUrl: 'page-forbidden.component.html',
})
export class PageForbiddenComponent {
    private _web: string = localStorage.getItem('web');

    constructor(
        private readonly _router: Router,
        private readonly _authenticationService: AuthenticationService
    ) {}

    public _getData(): {
        token: string | undefined;
        hasAccess: boolean;
        hasEssAccess: boolean;
        hasMssAccess: boolean;
    } {
        const { hasEssAccess, hasMssAccess }: any =
            this._authenticationService.getLocalStorage(AppConstant.info);

        const token: string | undefined =
            this._authenticationService.getSession()?.accessToken;
        const accessEss: string | undefined =
            this._authenticationService.getLocalStorage(AppConstant.accessEss);
        const accessMss: string | undefined =
            this._authenticationService.getLocalStorage(AppConstant.accessMss);
        const accessAdmin: string | undefined =
            this._authenticationService.getLocalStorage(
                AppConstant.accessAdmin
            );

        return {
            token,
            hasEssAccess,
            hasMssAccess,
            hasAccess: Boolean(accessEss || accessMss || accessAdmin),
        };
    }

    public returnToHome(): void {
        const { token, hasAccess, hasEssAccess, hasMssAccess }: any =
            this._getData();

        if (hasEssAccess) {
            this._web = 'ess';
        } else if (hasMssAccess) {
            this._web = 'mss';
        } else {
            this._web = 'admin';
        }

        let url: string = `${this._web}/`;

        if (token && !hasAccess && !this._authenticationService.isLoggedIn()) {
            url = '/login';

            this._authenticationService.destroySession();
        }

        this._router.navigate([url]);
    }
}
