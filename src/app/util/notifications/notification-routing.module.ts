import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralComponentNotifications } from './pages/general/general.component';
import { TabListComponentNotifications } from './pages/list/list.component';
import { ListComponentNotifications } from './pages/tabs/notifications/list/list.component';
import { ListComponentAnnouncements } from './pages/tabs/announcements/list/list.component';
import { DetailComponentNotifications } from './pages/tabs/notifications/detail/detail.component';
import { DetailComponentAnnouncements } from './pages/tabs/announcements/detail/detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: GeneralComponentNotifications,
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'list',
                        component: TabListComponentNotifications,
                        children: [
                            {
                                path: '',
                                component: ListComponentNotifications,
                            },
                            {
                                path: 'announcements',
                                component: ListComponentAnnouncements,
                            },
                        ],
                    },
                    {
                        path: 'detail',
                        component: null,
                        children: [
                            {
                                path: ':uuid',
                                component: DetailComponentNotifications,
                            },
                            {
                                path: ':uuid/announcement',
                                component: DetailComponentAnnouncements,
                            },
                        ],
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class NotificationRoutingModule {}
