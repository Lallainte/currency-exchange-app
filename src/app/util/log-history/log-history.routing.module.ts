import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralComponentLogHistory } from './pages/general/general.component';
import { ListComponentLogHistory } from './pages/list/list.component';
import { DetailComponentLogHistory } from './pages/detail/detail.component';
import { SettingsComponentLogHistory } from './pages/settings/settings.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: GeneralComponentLogHistory,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'admin/settings',
                    },
                    {
                        path: ':role',
                        component: ListComponentLogHistory,
                    },
                    {
                        path: ':role/detail',
                        component: DetailComponentLogHistory,
                    },
                    {
                        path: ':role/settings',
                        component: SettingsComponentLogHistory,
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class LogHistoryRoutingModule {}
