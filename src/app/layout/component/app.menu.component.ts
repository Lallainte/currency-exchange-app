import { AppConstant } from '@config/app.config';
import { AppMainComponent } from './app.main.component';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li
                    role="none"
                    class="layout-menuitem-category"
                    *ngFor="let item of model; let i = index"
                    app-menu
                    [item]="item"
                    [root]="true"
                    [index]="i"
                >
                    <div
                        class="layout-menuitem-root-text"
                        [attr.aria-label]="item.label"
                    >
                        {{ item.label }}
                    </div>
                    <ul role="menu">
                        <li
                            role="none"
                            *ngFor="let child of item.items"
                            app-menuitem
                            [item]="child"
                            [index]="i"
                            [parent]="item.label"
                        ></li>
                    </ul>
                </li>
            </ul>
        </div>
    `,
})
export class AppMenuComponent implements OnInit {
    public model: any[] = [
        // {
        //     items: [
        //         {
        //             label: 'Dashboard',
        //             icon: 'fas fa-home',
        //             routerLink: ['/admin/analytics'],
        //         },
        //     ],
        // },
        {
            items: [
                {
                    label: 'Workbench',
                    icon: 'fas fa-toolbox',
                    routerLink: ['/admin/workbench'],
                },
            ],
        },
        {
            items: [
                {
                    label: 'Organization',
                    icon: 'fas fa-sitemap',
                    routerLink: ['/admin/organization'],
                },
            ],
        },
        {
            items: [
                {
                    label: 'Workforce',
                    icon: 'fas fa-users',
                    routerLink: ['/admin/workforce'],
                },
            ],
        },
        // {
        //     items: [
        //         {
        //             label: 'Time & Attendance',
        //             icon: 'fas fa-clock',
        //             routerLink: ['/admin/time'],
        //         },
        //     ],
        // },
        // {
        //     items: [
        //         {
        //             label: 'Reimbursement',
        //             icon: 'fas fa-hand-holding-usd',
        //             routerLink: ['/admin/reimbursement'],
        //         },
        //     ],
        // },
        // {
        //     items: [
        //         {
        //             label: 'Payroll',
        //             icon: 'fas fa-money-bill',
        //             routerLink: ['/admin/payroll'],
        //         },
        //     ],
        // },
        // {
        //     items: [
        //         {
        //             label: 'Recruitment',
        //             icon: 'fas fa-user-plus',
        //             routerLink: ['/admin/recruitment'],
        //         },
        //     ],
        // },
        // {
        //     items: [
        //         {
        //             label: 'Competency',
        //             icon: 'fas fa-chart-simple',
        //             routerLink: ['/admin/competency'],
        //         },
        //     ],
        // },
        {
            items: [
                {
                    label: 'Performance',
                    icon: 'fas fa-chart-line',
                    routerLink: ['/admin/performance'],
                },
            ],
        },
        // {
        //     items: [
        //         {
        //             label: 'Loan',
        //             icon: 'fas fa-credit-card',
        //             routerLink: ['/showcase'],
        //         },
        //     ],
        // },
        // {
        //     items: [
        //         {
        //             label: 'Career Path',
        //             icon: 'fas fa-map-signs',
        //             routerLink: ['/showcase'],
        //         },
        //     ],
        // },
        // {
        //     items: [
        //         {
        //             label: 'Learning Management System',
        //             icon: 'fas fa-graduation-cap',
        //             routerLink: ['/admin/lnd'],
        //         },
        //     ],
        // },
        // {
        //     items: [
        //         {
        //             label: 'Log History',
        //             icon: 'fa-solid fa-clock-rotate-left',
        //             routerLink: ['/admin/log-history/admin'],
        //         },
        //     ],
        // },
    ];

    constructor(
        public readonly auth: AuthenticationService,
        public readonly appMain: AppMainComponent
    ) {}

    private _setupMenus(): void {
        if (this.auth.getLocalStorage(AppConstant.menuAdmin)) {
            this.model = this.auth.getLocalStorage(AppConstant.menuAdmin);
        }
    }

    public ngOnInit(): void {
        // TODO: Uncomment this for rbac
        // this._setupMenus();
    }

    public onKeydown(event: KeyboardEvent): void {
        const nodeElement = <HTMLDivElement>event.target;

        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
