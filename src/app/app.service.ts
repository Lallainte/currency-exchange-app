import { Injectable } from '@angular/core';
import { AppConstant } from '@core/config/app.config';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '@core/service/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private _info: any | undefined =
        this._authenticationService.getLocalStorage(AppConstant.info);

    public info$: any = new BehaviorSubject<any>({});
    public accessEss$: any = new BehaviorSubject<any>([]);
    public accessMss$: any = new BehaviorSubject<any>([]);
    public accessAdmin$: any = new BehaviorSubject<any>([]);
    public hasEssAccess$: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    public hasMssAccess$: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    public hasAdminAccess$: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    public isTokenExpired$: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    public isTokenInvalid$: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);

    public defaultApplication$: BehaviorSubject<string> =
        new BehaviorSubject<string>('');

    constructor(private _authenticationService: AuthenticationService) {
        if (this._info) {
            this.info$.next(this._info);
            this.hasEssAccess$.next(this._info.hasEssAccess);
            this.hasMssAccess$.next(this._info.hasMssAccess);
            this.hasAdminAccess$.next(this._info.hasAdminAccess);
            this.defaultApplication$.next(this._info.defaultApplication);
        }
    }

    public getAccess(
        menu: string,
        searchRouterLink?: string,
        module: string | undefined = localStorage.getItem('web')
    ): Access | undefined {
        const newMenu: string = menu.toLowerCase().trim();

        if (module?.toLowerCase() === 'admin') {
            return this._authenticationService
                .getLocalStorage(AppConstant.accessAdmin)
                .find(({ label, routerLink }: any): any => {
                    const newLabel: string = label.toLowerCase().trim();
                    const incRouter: string = routerLink[0].includes(
                        searchRouterLink?.toLowerCase()
                    );

                    return searchRouterLink
                        ? newLabel === newMenu && incRouter
                        : newLabel === newMenu;
                });
        }

        return undefined;
    }

    public getTabAccess(
        name: string,
        menu: string,
        searchRouterLink?: string,
        module: string | undefined = localStorage.getItem('web')
    ): boolean {
        let value: string = '';

        if (module?.toLowerCase() === 'admin') {
            value = this.getAccess(menu,searchRouterLink, module).tabs.find(
                (el: string): boolean => {
                    const newEl = el?.toLowerCase()?.trim();
                    const newName = name?.toLowerCase()?.trim();

                    return newEl === newName;
                }
            );
        }

        return Boolean(value);
    }

    public resetAppState(): void {
        this.hasEssAccess$.next(false);
        this.hasMssAccess$.next(false);
        this.hasAdminAccess$.next(false);
        this.isTokenExpired$.next(false);
        this.isTokenInvalid$.next(false);
        this.defaultApplication$.next('');
    }
}

export type Module = 'ESS' | 'MSS' | 'Admin';

export interface Access {
    tabs: string[];
    isTab: boolean;
    isAdd: boolean;
    isEdit: boolean;
    isDetail: boolean;
    isDelete: boolean;
    isReject: boolean;
    isPublish: boolean;
    isApprove: boolean;
    isProcess: boolean;
    isCreateRequest: boolean;
    isCancelRequest: boolean;
}
