import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { AppMainComponent } from './layout/component/app.main.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
// import { PageForbiddenComponent } from './layout/page-forbidden/page-forbidden.component';
// import { LoginComponent } from './layout/login/login.component';
// import { AuthGuard } from './core/auth.guard';
// import { DashboardComponent } from './core/dashboard/dashboard.component';
// import { PermisionGuard } from './core/permision.guard';
// import { RedirectComponent } from './layout/redirect/redirect.component';
// import { ForgotPasswordComponent } from '@layout/forgot-password/forgot-password.component';
// import { PrivacyPoliciesComponent } from '@layout/privacy-policies/privacy-policies.component';
import { MainPageComponent } from './main-page/main-page.component';

const web: string = localStorage.getItem('web') ?? 'admin';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    redirectTo: 'main-page',
                    pathMatch: 'full',
                },
                // {
                //     path: 'dashboard',
                //     component: AppMainComponent,
                //     children: [{ path: '', component: DashboardComponent }],
                //     canActivate: [AuthGuard],
                // },
                // {
                //     path: 'login',
                //     component: LoginComponent,
                //     canActivate: [PermisionGuard],
                // },
                // {
                //     path: 'forgot-password',
                //     component: ForgotPasswordComponent,
                //     canActivate: [PermisionGuard],
                // },
                // {
                //     path: 'privacy-policy',
                //     component: PrivacyPoliciesComponent,
                //     canActivate: [PermisionGuard],
                // },
                // {
                //     path: 'redirect',
                //     component: RedirectComponent,
                // },
                {
                    path: '404',
                    component: PageNotFoundComponent,
                },
                // {
                //     path: '403',
                //     component: PageForbiddenComponent,
                // },
                // {
                //     path: 'util',
                //     component: AppMainComponent,
                //     loadChildren: () =>
                //         import('./util/util.module').then((m) => m.UtilModule),
                //     canActivate: [AuthGuard],
                // },
                // {
                //     path: 'showcase',
                //     component: AppMainComponent,
                //     loadChildren: () =>
                //         import('./showcase/showcase.module').then(
                //             (m) => m.ShowcaseModule
                //         ),
                //     // canActivate: [AuthGuard],
                // },

                {
                    path: 'main-page',
                    component: MainPageComponent,
                },

                { path: '**', redirectTo: '404' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                canceledNavigationResolution: 'computed',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
