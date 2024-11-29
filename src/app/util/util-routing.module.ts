import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilCompanyAddComponent } from './company/add/util-company-add.component';
import { UtilCompanyDetailComponent } from './company/detail/util-company-detail.component';
import { UtilCompanyEditComponent } from './company/edit/util-company-edit.component';
import { UtilCompanyListComponent } from './company/list/util-company-list.component';
import { RoleListComponent } from './role/list/role-list.component';
import { UserAddComponent } from './user/add/user-add.component';
import { UserDetailComponent } from './user/detail/user-detail.component';
import { UserEditComponent } from './user/edit/user-edit.component';
import { UserListComponent } from './user/list/user-list.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormPreviewComponent } from './dynamic-form-preview/dynamic-form-preview.component';

const routes: Routes = [
    {
        path: 'user',
        children: [
            {
                path: '',
                component: UserListComponent,
            },
            {
                path: 'add',
                component: UserAddComponent,
            },
            {
                path: 'edit/:id',
                component: UserEditComponent,
            },
            {
                path: ':id',
                component: UserDetailComponent,
            },
        ],
    },
    {
        path: 'role',
        children: [
            {
                path: '',
                component: RoleListComponent,
            },
        ],
    },
    {
        path: 'company',
        children: [
            {
                path: '',
                component: UtilCompanyListComponent,
            },
            {
                path: 'add',
                component: UtilCompanyAddComponent,
            },
            {
                path: 'edit/:id',
                component: UtilCompanyEditComponent,
            },
            {
                path: ':id',
                component: UtilCompanyDetailComponent,
            },
        ],
    },
    {
        path: 'dynamic-form',
        children: [
            {
                path: 'preview',
                component: DynamicFormPreviewComponent,
            },
            {
                path: '',
                component: DynamicFormComponent,
            },
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UtilRoutingModule {}
