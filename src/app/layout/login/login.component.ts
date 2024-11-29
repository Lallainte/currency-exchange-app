import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { AppConstant } from '@config/app.config';
import { ApiServiceEss } from '@core/service/api.service-ess';
import { HelperService } from '@core/service/helper-service';
import { ActivatedRoute } from '@angular/router';
// import { UserRoleService } from '@workbench/user-role/user-role.service';
import { MessageBoxService } from '@core/service/message-box.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import {
    OnInit,
    Component,
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';

import { forkJoin, lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, AfterViewInit {
    public token!: string | undefined;
    public images!: any[] | undefined;
    public password!: string | undefined;
    public formGroup!: FormGroup | undefined;

    public isLoading: boolean = false;
    public showPassword: boolean = false;
    public responsiveOptions: any[] = [
        { numScroll: 1, numVisible: 1, breakpoint: '1199px' },
        { numScroll: 1, numVisible: 2, breakpoint: '991px' },
        { numScroll: 1, numVisible: 1, breakpoint: '767px' },
    ];

    constructor(
        private readonly _router: Router,
        private readonly _httpClient: HttpClient,
        private readonly _apiService: ApiService,
        private readonly _appService: AppService,
        private readonly _formBuilder: FormBuilder,
        private readonly _appServiceEss: ApiServiceEss,
        private readonly _helperService: HelperService,
        private readonly _activatedRoute: ActivatedRoute,
        // private readonly _userRoleService: UserRoleService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _messageBoxService: MessageBoxService,
        private readonly _authenticationService: AuthenticationService
    ) {
        const savedUser = this._authenticationService.getLocalStorage(
            AppConstant.savedUser
        );

        this.formGroup = this._formBuilder.group({
            username: [savedUser?.username ?? '', Validators.required],
            password: [savedUser?.password ?? '', Validators.required],
            rememberMe: [false],
        });

        if (this._authenticationService.isLoggedIn()) {
            this._router.navigate(['/']);

            return;
        }

        this._appService.resetAppState();
    }

    private _redirectToPage(app: string, roleType?: string): void {
        const hasSomeRoleType: boolean = [
            'ORDINARY',
            'SUPERADMIN',
            'COMPANYADMIN',
        ].includes(roleType);

        if (app === 'Admin' && hasSomeRoleType) {
            this._router.navigate(['/admin']);

            return;
        }

        app === 'ESS' && this._router.navigate(['/ess']);

        app === 'MSS' && this._router.navigate(['/mss']);
    }

    private _setupAccess(ess: any[], mss?: any[], admin?: any[]): void {
        ess &&
            this._authenticationService.setLocalStorage(
                AppConstant.accessEss,
                ess
            );

        mss &&
            this._authenticationService.setLocalStorage(
                AppConstant.accessMss,
                mss
            );

        admin &&
            this._authenticationService.setLocalStorage(
                AppConstant.accessAdmin,
                admin
            );
    }

    private _setAppService({ info, defaultApplication }: any): void {
        this._appService.info$.next(info);
        this._appService.hasEssAccess$.next(info.hasEssAccess);
        this._appService.hasMssAccess$.next(info.hasMssAccess);
        this._appService.hasAdminAccess$.next(info.hasAdminAccess);
        this._appService.defaultApplication$.next(defaultApplication);
    }

    private _processResponseData(res: any): any {
        const defaultApplication: string =
            res.defaultApplication.data.defaultApplicationName;

        const hasEssAccess: boolean = res.defaultApplication.data.isEss;
        const hasMssAccess: boolean = res.defaultApplication.data.isMss;
        const hasAdminAccess: boolean = res.defaultApplication.data.isAdmin;

        return {
            hasEssAccess,
            hasMssAccess,
            hasAdminAccess,
            defaultApplication,
        };
    }

    private _setupMenuAndSubmenu(modules: any[]): void {
        this._authenticationService.setLocalStorage(
            AppConstant.menuEss,
            this._reMapDataForMenuAndSubmenu(modules, 'ESS')
        );
        this._authenticationService.setLocalStorage(
            AppConstant.menuMss,
            this._reMapDataForMenuAndSubmenu(modules, 'MSS')
        );
        this._authenticationService.setLocalStorage(
            AppConstant.menuAdmin,
            this._reMapDataForMenuAndSubmenu(modules, 'Admin')
        );
    }

    private _reMapDataForMenuAndSubmenu(module: any[], name: string): any[] {
        let newMenuAndSubmenu: any[] = this._sanitizeDataForMenuAndSubmenu(
            module.find((el: any): boolean => el.name === name).items
        ).map((el: any): any => ({ items: [el] }));

        if (['ESS', 'MSS'].includes(name)) {
            newMenuAndSubmenu = newMenuAndSubmenu.map((menus: any): any => {
                return {
                    items: menus.items.map((menu: any): any => {
                        const { subMenu: items, ...restMenu }: any = menu;

                        return {
                            items,
                            ...restMenu,
                        };
                    }),
                };
            });
        }

        return newMenuAndSubmenu;
    }

    private _sanitizeDataForMenuAndSubmenu(data: any[]): any[] {
        function cleanObject(obj: any): void {
            if (obj.hasOwnProperty('items')) {
                if (Array.isArray(obj.items) && obj.items.length === 0) {
                    delete obj.items;
                } else {
                    obj.items.forEach(cleanObject);
                }
            }
        }

        data.forEach((item: any): void => item?.subMenu?.forEach(cleanObject));

        return data;
    }

    public handleSubmit(): void {
        if (this.formGroup.invalid) {
            return this.formGroup.markAllAsTouched();
        }

        this.isLoading = true;

        // const { rememberMe, ...loginForm } = this.formGroup.getRawValue();

        // loginForm.password = this._helperService.encryptionPassword(
        //     loginForm.password
        // );

        // this._apiService.postLogin('auth/secure/login', loginForm).subscribe({
        //     next: (res: any): void => {
        //         this._authenticationService.createSession(JSON.parse(res).data);

        //         forkJoin({
        //             userInfo: this._apiService.get('auth/user'),
        //             userTenant: this._apiService.get('auth/user-tenant'),
        //             defaultApplication: this._apiService.get(
        //                 'auth/default-application'
        //             ),
        //         }).subscribe((res2: any): void => {
        //             const {
        //                 hasEssAccess,
        //                 hasMssAccess,
        //                 hasAdminAccess,
        //                 defaultApplication,
        //             }: any = this._processResponseData(res2);

        //             const info: any = {
        //                 hasEssAccess,
        //                 hasMssAccess,
        //                 hasAdminAccess,
        //             };

        //             localStorage.setItem(
        //                 'web',
        //                 defaultApplication.toLowerCase()
        //             );

        //             this._authenticationService.setLocalStorage(
        //                 AppConstant.info,
        //                 info
        //             );
        //             this._authenticationService.setLocalStorage(
        //                 AppConstant.tenantId,
        //                 res2.userTenant.data
        //             );
        //             this._authenticationService.setLocalStorage(
        //                 AppConstant.userSession,
        //                 res2.userInfo.data
        //             );

        //             this._setAppService({ info, defaultApplication });

        //             if (res2.userInfo.data.roleType !== 'SUPERADMIN') {
        //                 const reqAccesses: any = {
        //                     adminMenuAndSubmenu:
        //                         this._userRoleService.getMenuAndSubmenuAdmin(),
        //                 };

        //                 if (hasEssAccess) {
        //                     reqAccesses.accessMenuRoleEss =
        //                         this._userRoleService.getAccessMenuRole('ess');
        //                 }

        //                 if (hasMssAccess) {
        //                     reqAccesses.accessMenuRoleMss =
        //                         this._userRoleService.getAccessMenuRole('mss');
        //                 }

        //                 if (hasAdminAccess) {
        //                     reqAccesses.accessMenuRoleAdmin =
        //                         this._userRoleService.getAccessMenuRole(
        //                             'admin'
        //                         );
        //                 }

        //                 forkJoin({
        //                     ...reqAccesses,
        //                     myEmployeeInformation: this._appServiceEss.get(
        //                         'my-employee-information'
        //                     ),
        //                 }).subscribe((res3: any): void => {
        //                     this._authenticationService.setLocalStorage(
        //                         AppConstant.myEmployee,
        //                         res3.myEmployeeInformation.data
        //                     );

        //                     this._setupAccess(
        //                         res3.accessMenuRoleEss?.data,
        //                         res3.accessMenuRoleMss?.data,
        //                         res3.accessMenuRoleAdmin?.data
        //                     );
        //                     this._setupMenuAndSubmenu(
        //                         res3.adminMenuAndSubmenu.data
        //                     );

        //                     this.isLoading = false;

        //                     this._changeDetectorRef.detectChanges();

        //                     this._redirectToPage(
        //                         defaultApplication,
        //                         res2.userInfo.data.roleType
        //                     );
        //                 });

        //                 return;
        //             }

        //             forkJoin({
        //                 adminMenuAndSubmenu:
        //                     this._userRoleService.getMenuAndSubmenuAdmin(),
        //                 accessMenuRoleAdmin:
        //                     this._userRoleService.getAccessMenuRole('admin'),
        //             }).subscribe((res4: any): void => {
        //                 this._setupAccess(
        //                     null,
        //                     null,
        //                     res4.accessMenuRoleAdmin.data
        //                 );
        //                 this._setupMenuAndSubmenu(
        //                     res4.adminMenuAndSubmenu.data
        //                 );

        //                 if (rememberMe) {
        //                     this._authenticationService.setLocalStorage(
        //                         AppConstant.savedUser,
        //                         this.formGroup.getRawValue()
        //                     );
        //                 } else {
        //                     localStorage.removeItem(AppConstant.savedUser);
        //                 }

        //                 this.isLoading = false;

        //                 this._changeDetectorRef.detectChanges();

        //                 this._redirectToPage(
        //                     defaultApplication,
        //                     res2.userInfo.data.roleType
        //                 );
        //             });
        //         });
        //     },
        //     error: (): void => {
        //         this.isLoading = false;

        //         this._changeDetectorRef.detectChanges();
        //     },
        // });
    }

    public getImages(): Promise<any[]> {
        return lastValueFrom(
            this._httpClient.get('assets/demo/data/photos.json')
        ).then((res: any): any[] => res.data);
    }

    public checkUsername(): void {
        if (this.formGroup.get('username').invalid) {
            return this.formGroup.get('username').markAsTouched();
        }

        this.isLoading = true;

        this._apiService
            .postLogin('auth/authenticate', {
                username: this.formGroup.value.username,
            })
            .subscribe({
                next: (): void => {
                    this.isLoading = false;
                    this.showPassword = true;

                    this._changeDetectorRef.detectChanges();
                },
                error: (): void => {
                    this.isLoading = false;

                    this._changeDetectorRef.detectChanges();
                },
            });
    }

    public switchAccount(): void {
        this.formGroup.reset();

        this.showPassword = false;
    }

    public navigateToPage(url: string): void {
        this._router.navigateByUrl(url);
    }

    public ngOnInit(): void {
        this.getImages().then((images): void => {
            this.images = images;

            this._changeDetectorRef.detectChanges();
        });

        this._activatedRoute.queryParams.subscribe((queryParams: any): void => {
            this.token = queryParams['token'];
        });
    }

    public ngAfterViewInit(): void {
        if (this._appService.isTokenInvalid$.value) {
            this._messageBoxService.showError(null, 'Error: Invalid Token');
        }

        if (this._appService.isTokenExpired$.value) {
            this._messageBoxService.showInfo(
                'Your session has expired, please log in again.',
                'Token Expired'
            );
        }
    }
}
