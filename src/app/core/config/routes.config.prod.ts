/**
 * List of menu code in application
 */
import { Routes } from '@angular/router';
import { AuthGuard } from '@core/auth.guard';
import { DashboardComponent } from '@core/dashboard/dashboard.component';

/**
 * Path declaration of feature module.
 * Lazy load => loadChildren
 * If code is empty string then the menu is not from the API
 */

export const CORE_ROUTES: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'log-history',
        loadChildren: () =>
            import('./../../util/log-history/log-history.module').then(
                (m) => m.LogHistoryModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'notifications',
        loadChildren: () =>
            import('./../../util/notifications/notifications.module').then(
                (m) => m.NotificationsModule
            ),
        canActivate: [AuthGuard],
    },
];

