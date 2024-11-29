import { AppConstant } from '@config/app.config';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

import { Router, NavigationEnd } from '@angular/router';

import { Input, OnInit, Component, OnDestroy } from '@angular/core';

import { map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-submenu-component',
    templateUrl: './app.submenu.component.html',
})
export class AppSubMenuComponent implements OnInit, OnDestroy {
    @Input()
    public items;

    private sub = this.route.events
        .pipe(
            filter((event) => event instanceof NavigationEnd),
            map((event) => event as NavigationEnd)
        )
        .subscribe((event) => {
            let currentModule = event.url.split('/')[2];

            if (currentModule) {
                this.changeSubMenu(currentModule);
            } else {
                this.items = [];
            }
        });

    activeUrl;

    checked: boolean = false;
    hardCodedMenu = [
        {
            items: [
                {
                    label: 'Workbench',
                    icon: 'fas fa-toolbox',
                    routerLink: ['/admin/workbench'],
                    subMenu: [
                        {
                            label: 'General Settings',
                            styleClass: '',
                            items: [
                                {
                                    label: 'System Configuration',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/system-configurations',
                                    ],
                                },
                                {
                                    label: 'Module Configuration',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/module-configurations',
                                    ],
                                },
                                {
                                    label: 'User Configuration',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/user-configurations',
                                    ],
                                },
                                {
                                    label: 'Mobile Configuration',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/mobile-configurations',
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'User & Menu Authorization',
                            styleClass: '',
                            items: [
                                {
                                    label: 'User Role',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/user-role/list',
                                    ],
                                },
                                {
                                    label: 'User',
                                    styleClass: '',
                                    routerLink: ['/admin/workbench/user/list'],
                                },
                                {
                                    label: 'Report Password',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/report-password/list',
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Transaction Configuration',
                            styleClass: '',
                            items: [
                                {
                                    label: 'Workflow Approval',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Workflow Category',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workbench/workflow-category/list',
                                            ],
                                        },
                                        {
                                            label: 'Workflow Template',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workbench/workflow-template/list',
                                            ],
                                        },
                                        {
                                            label: 'Approval Group',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workbench/approval-group/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Transaction Settings',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/transaction-settings/list',
                                    ],
                                },
                                {
                                    label: 'Numbering Format',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/numbering-format/list',
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Portal Configuration',
                            styleClass: '',
                            items: [
                                {
                                    label: 'Announcement',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/announcement-panel/list',
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Migration',
                            styleClass: '',
                            items: [
                                {
                                    label: 'Migrations',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/migrations/upload',
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Template Configuration',
                            styleClass: '',
                            items: [
                                {
                                    menuId: 'cec42d2b-8450-4181-bc8b-f31412993abd',
                                    label: 'Letter Template',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/letter-template/list',
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Reminder & Scheduler Settings',
                            styleClass: '',
                            items: [
                                {
                                    label: 'Manual Reminder Configuration',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/manual-reminder-configurations',
                                    ],
                                },
                                {
                                    label: 'Reminder Configuration',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/reminder-configuration/list',
                                    ],
                                },
                                {
                                    label: 'Scheduler Configuration',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workbench/scheduler-configuration/list',
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            items: [
                {
                    label: 'Organization',
                    icon: 'fas fa-sitemap',
                    routerLink: ['/admin/organization'],
                    subMenu: [
                        {
                            label: 'Settings',
                            styleClass: '',
                            items: [
                                {
                                    label: 'Job Attribute',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/organization/settings/job-attribute/list-combination',
                                    ],
                                },
                                {
                                    label: 'Cost Center',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/organization/settings/cost-center/list',
                                    ],
                                },
                                // {
                                //     label: 'MPP',
                                //     styleClass: '',
                                //     routerLink: [
                                //         '/admin/organization/settings/mpp/list',
                                //     ],
                                // },
                            ],
                        },
                        {
                            label: 'Activities',
                            styleClass: '',
                            items: [
                                {
                                    label: 'Company',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/organization/activities/company/list',
                                    ],
                                },
                                {
                                    label: 'Organization Master',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/organization/activities/organization-master-level/list',
                                    ],
                                },
                                {
                                    label: 'Organization Structure',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/organization/activities/organization-structure/list',
                                    ],
                                },
                                {
                                    label: 'Job Design',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Job Title',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/organization/activities/job-title/list',
                                            ],
                                        },
                                        {
                                            label: 'Job Level',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/organization/activities/job-level/list',
                                            ],
                                        },
                                        {
                                            label: 'Employee Type',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/organization/activities/employee-type/list',
                                            ],
                                        },
                                        {
                                            label: 'Job Position',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/organization/activities/job-position/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Work Location',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/organization/activities/work-location/list',
                                    ],
                                },
                                {
                                    label: 'Cost Center',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/organization/activities/cost-center/list',
                                    ],
                                },
                                // {
                                //     label: 'Man Power Planning',
                                //     styleClass: '',
                                //     items: [
                                //         {
                                //             label: 'Period',
                                //             styleClass: '',
                                //             routerLink: [
                                //                 '/admin/organization/activities/mpp-period/list',
                                //             ],
                                //         },
                                //         {
                                //             label: 'Request',
                                //             styleClass: '',
                                //             routerLink: [
                                //                 '/admin/organization/activities/mpp-request/list',
                                //             ],
                                //         },
                                //         {
                                //             label: 'Balance Display',
                                //             styleClass: '',
                                //             routerLink: [
                                //                 '/admin/organization/activities/mpp-balance-display/list',
                                //             ],
                                //         },
                                //     ],
                                // },
                                // {
                                //     label: 'Job Attribute Requests',
                                //     styleClass: '',
                                //     items: [
                                //         {
                                //             label: 'Organization Request',
                                //             styleClass: '',
                                //             routerLink: [
                                //                 '/admin/organization/activities/organization-request/list',
                                //             ],
                                //         },
                                //     ],
                                // },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            items: [
                {
                    label: 'Workforce',
                    icon: 'fas fa-users',
                    routerLink: ['/admin/workforce'],
                    subMenu: [
                        {
                            label: 'Settings',
                            styleClass: '',
                            items: [
                                {
                                    label: 'General Settings',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Bank Master',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/bank-account/list',
                                            ],
                                        },
                                        {
                                            label: 'Digital Signature',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/digital-signature/list',
                                            ],
                                        },
                                        {
                                            label: 'Retirement Period',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/retirement-period/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Numbering',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Employee Number Format',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/numbering/general-settings-member-by/detail',
                                            ],
                                        },
                                        {
                                            label: 'Employee Family Patient ID',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/numbering-family-id/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Employee Data Field Configuration',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workforce/settings/employee-data-field-configuration/list',
                                    ],
                                },
                                {
                                    label: 'Master Data Configuration',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Person',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/person/relationship/list',
                                            ],
                                        },
                                        {
                                            label: 'Residential',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/data-configuration-master-residence/state-list',
                                            ],
                                        },
                                        {
                                            label: 'Education',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/data-configuration-education-master/list',
                                            ],
                                        },
                                        {
                                            label: 'Language',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/language/list',
                                            ],
                                        },
                                        {
                                            label: 'Currency',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/data-configuration-currency/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Movement Master',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Movement Type',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/movement-type/list',
                                            ],
                                        },
                                        {
                                            label: 'Movement Type Setting',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/movement-type-setting/list',
                                            ],
                                        },
                                    ],
                                    routerLink: [],
                                },
                                {
                                    label: 'Termination Master',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Termination Type',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/employee-document-termination/list',
                                            ],
                                        },
                                    ],
                                    routerLink: [],
                                },
                                {
                                    label: 'Onboarding Configuration',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workforce/settings/on-boarding-configuration/list',
                                    ],
                                },
                                {
                                    label: 'Offboarding Configuration',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workforce/settings/offboarding-configuration/list',
                                        ,
                                    ],
                                },
                                {
                                    label: 'Employee Reward Master',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workforce/settings/employee-reward-master/list',
                                    ],
                                },
                                {
                                    label: 'Employee Punishment Master',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Punishment Type',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/employee-punishment-master/list',
                                            ],
                                        },
                                        {
                                            label: 'Punishment Level',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/employee-punishment-master/levels/list',
                                            ],
                                        },
                                    ],
                                    routerLink: [],
                                },
                                {
                                    label: 'Employee Asset',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workforce/settings/employee/asset/list',
                                    ],
                                },
                                {
                                    label: 'Employee Document',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workforce/settings/employee-document/document-master/list',
                                    ],
                                },
                                {
                                    label: 'Vendor Master',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workforce/settings/vendor-master/list',
                                    ],
                                },
                                {
                                    label: 'Q&A Master',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Q&A Template',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/qna-template/list',
                                            ],
                                        },
                                        {
                                            label: 'Q&A Template Type',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/interview-qna-template-type/exit-interview/list',
                                            ],
                                        },
                                        {
                                            label: 'Master Measurement',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/settings/measurement-master/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Action Reason',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workforce/settings/action-reason/list',
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Activities',
                            styleClass: '',
                            items: [
                                {
                                    label: 'Employee Information',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workforce/activities/employee-information/list',
                                    ],
                                },
                                {
                                    label: 'New Employee Entry',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/workforce/activities/new-employee-entry/list',
                                    ],
                                },
                                {
                                    label: 'Employee Movement',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Onboarding',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-movement/on-boarding/list',
                                            ],
                                        },
                                        {
                                            label: 'Individual Movement',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-movement/individual-movement/list-publish',
                                            ],
                                        },
                                        {
                                            label: 'Massive Movement',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-movement/massive-movement/list-publish',
                                            ],
                                        },
                                        {
                                            label: 'Acting Job',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-movement/acting-job/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Employee Termination',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Individual Termination',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-termination/individual-termination/list',
                                            ],
                                        },
                                        {
                                            label: 'Massive Termination',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/massive-termination/list',
                                            ],
                                        },
                                        {
                                            label: 'Termination Request',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-termination-request/list',
                                            ],
                                        },
                                        {
                                            label: 'Off Boarding',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-termination-offboarding/list',
                                            ],
                                        },
                                        // {
                                        //     label: 'Exit Interview',
                                        //     styleClass: '',
                                        //     routerLink: [
                                        //         '/admin/workforce/activities/exit-interview/list',
                                        //     ],
                                        // },
                                    ],
                                },
                                {
                                    label: 'Employee Review',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Employee Movement Review',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-review/movement-review/list',
                                            ],
                                        },
                                        {
                                            label: 'Temporary Employee Review',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-review/temporary-review/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Reward Administration',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Reward Received',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/reward-administration/reward-received/list',
                                            ],
                                        },
                                        {
                                            label: 'Reward Request',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/reward-administration/reward-request/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Punishment Administration',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Punishment Received',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/punishment-received/list',
                                            ],
                                        },
                                        {
                                            label: 'Punishment Request',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/punishment-request/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Asset Management',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Asset Assignment Request',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/asset-assignment-request/list',
                                            ],
                                        },
                                        {
                                            label: 'Asset Return Request',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/asset-return-request/list',
                                            ],
                                        },
                                        {
                                            label: 'Employee Asset',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-asset/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Document Management',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Document Entry',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/document-entry-request/list',
                                            ],
                                        },
                                        {
                                            label: 'Document Return Request',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/document-return-request/list',
                                            ],
                                        },
                                        {
                                            label: 'Employee Document',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-document/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Employee Letters',
                                    styleClass: '',
                                    items: [
                                        // {
                                        //     label: 'Letter Administration',
                                        //     styleClass: '',
                                        //     routerLink: [
                                        //         '/admin/workforce/activities/letter/administration',
                                        //     ],
                                        // },
                                        {
                                            label: 'Curriculum Vitae',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/letter/curriculum-vitae',
                                            ],
                                        },
                                        {
                                            label: 'Reference Letter',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/letter/employee-reference',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Employee Request',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Employee Data Update',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-request/employee-data-update/list',
                                            ],
                                        },
                                        {
                                            label: 'Employee Credential Update',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/activities/employee-credential/list',
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Reports',
                            styleClass: '',
                            items: [
                                {
                                    label: 'Employee',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Contract Report',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/reports/contract-expired',
                                            ],
                                        },
                                        {
                                            label: 'Service Period Report',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/reports/service-period',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Movement',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Movement Report',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/reports/movement',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Termination',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Termination Report',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/reports/termination',
                                            ],
                                        },
                                        // {
                                        //     label: 'Exit Interview Report',
                                        //     styleClass: '',
                                        //     routerLink: [
                                        //         '/admin/workforce/reports/exit-interview',
                                        //     ],
                                        // },
                                    ],
                                },
                                {
                                    label: 'Reward',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Award Report',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/reports/reward',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Punishment',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Punishment Report',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/workforce/reports/punishment',
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },

        {
            items: [
                {
                    label: 'Performance',
                    icon: 'fas fa-chart-line',
                    routerLink: ['/admin/performance'],
                    subMenu: [
                        {
                            label: 'Settings',
                            styleClass: '',
                            items: [
                                {
                                    label: 'General Setting',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/performance/settings/general-setting/index',
                                    ],
                                },
                                {
                                    label: 'Performance Period',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/performance/settings/period/list',
                                    ],
                                },
                                {
                                    label: 'Component Weight',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/performance/settings/component-weight/list',
                                    ],
                                },
                                {
                                    label: 'Balance Scorecard',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Score Card',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/settings/scorecard/list',
                                            ],
                                        },
                                        {
                                            label: 'Score Card Category',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/settings/scorecard-category/list',
                                            ],
                                        },
                                        {
                                            label: 'Weight Of Scorecard',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/settings/weight-of-scorecard/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Key Performance Indicator',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Objective KPI',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/settings/objective-kpi/list',
                                            ],
                                        },
                                        {
                                            label: 'Assignment Level',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/settings/assignment-level/list',
                                            ],
                                        },
                                        {
                                            label: 'Objective KPI Weight',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/settings/objective-kpi-weight/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Table of Duties',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/performance/settings/table-of-duties/list',
                                    ],
                                },
                                {
                                    label: 'Performance Result Category',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/performance/settings/performance-result-category/list',
                                    ],
                                },
                                {
                                    label: 'Result Formula',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/performance/settings/result-formula/list',
                                    ],
                                },

                                {
                                    label: 'Data Master',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'MVC Cluster',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/settings/mvc-cluster/list',
                                            ],
                                        },
                                        {
                                            label: 'Measurement',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/settings/measurement/list',
                                            ],
                                        },
                                        {
                                            label: 'Incentive Parameter',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/settings/incentive-parameter/list',
                                            ],
                                        },
                                        {
                                            label: 'Miscellaneous',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/settings/miscellaneous/list',
                                            ],
                                        },
                                        {
                                            label: 'Stop Reason',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/settings/stop-reason/list',
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Activities',
                            styleClass: '',
                            items: [
                                {
                                    label: 'Key Performance Indicator',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'KPI Creation',
                                            styleClass: '',
                                            items: [
                                                {
                                                    label: 'KPI Creation Request',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/kpi-creation/list',
                                                    ],
                                                },
                                                {
                                                    label: 'KPI Creation List',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/kpi-creation-list/list',
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            label: 'KPI Assignment',
                                            styleClass: '',
                                            items: [
                                                {
                                                    label: 'KPI Assignment Request',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/kpi-assignment/list',
                                                    ],
                                                },
                                                {
                                                    label: 'KPI Assignment List',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/kpi-assignment-list/list',
                                                    ],
                                                },
                                                {
                                                    label: 'KPI Stop Request',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/kpi-assignment-stop/list',
                                                    ],
                                                },
                                            ],
                                        },

                                        {
                                            label: 'KPI Request & Monitoring',
                                            styleClass: '',
                                            items: [
                                                {
                                                    label: 'KPI Key IN Request',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/kpi-keyin/list',
                                                    ],
                                                },
                                                {
                                                    label: 'KPI Monitoring',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/kpi-monitoring/list',
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Activity Plan',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'AP Creation',
                                            styleClass: '',
                                            items: [
                                                {
                                                    label: 'AP Creation Request',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/ap-creation-request/list',
                                                    ],
                                                },
                                                {
                                                    label: 'AP Creation List',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/ap-creation-list/list',
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            label: 'AP Assignment',
                                            styleClass: '',
                                            items: [
                                                {
                                                    label: 'AP Assignment Request',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/ap-assignment-request/list',
                                                    ],
                                                },
                                                {
                                                    label: 'AP Assignment List',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/ap-assignment-list/list',
                                                    ],
                                                },
                                                {
                                                    label: 'AP Stop Request',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/ap-stop-request/list',
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            label: 'AP Request & Monitoring',
                                            styleClass: '',
                                            items: [
                                                {
                                                    label: 'AP Key IN Request',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/ap-keyin/list',
                                                    ],
                                                },
                                                {
                                                    label: 'AP Monitoring',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/ap-monitorings/list',
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Table of Duties',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'TOD Creation',
                                            styleClass: '',
                                            items: [
                                                {
                                                    label: 'TOD Creation Request',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/tod-creation/list-request',
                                                    ],
                                                },
                                                {
                                                    label: 'TOD Creation List',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/tod-creation/list',
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            label: 'TOD Assignment',
                                            styleClass: '',
                                            items: [
                                                {
                                                    label: 'TOD Assignment Request',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/tod-assignment/list-request',
                                                    ],
                                                },
                                                {
                                                    label: 'TOD Assignment List',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/tod-assignment/list',
                                                    ],
                                                },
                                                {
                                                    label: 'TOD Assignment Stop Request',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/tod-assignment/stop-request',
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            label: 'TOD Request & Monitoring',
                                            styleClass: '',
                                            items: [
                                                {
                                                    label: 'TOD Key IN Request',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/tod-monitoring/list-request',
                                                    ],
                                                },
                                                {
                                                    label: 'TOD Monitoring',
                                                    styleClass: '',
                                                    routerLink: [
                                                        '/admin/performance/activities/tod-monitoring/list',
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            label: 'Employee Shift',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/activities/tod-employee-shift/list',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Raport Personal',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/performance/report/raport-personal/list',
                                    ],
                                },
                                {
                                    label: 'Organization Ranking',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Ranking by Balanced Scorecard',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/report/organization-ranking/balance-scorecard',
                                            ],
                                        },
                                        {
                                            label: 'Ranking by Component',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/performance/report/organization-ranking/performance-component',
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: 'Performance All Project',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/performance/report/performance-all-project',
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            items: [
                {
                    label: 'Loan',
                    icon: 'fas fa-credit-card',
                    routerLink: ['/showcase'],
                    subMenu: [],
                },
            ],
        },
        {
            items: [
                {
                    label: 'Career Path',
                    icon: 'fas fa-map-signs',
                    routerLink: ['/showcase'],
                    subMenu: [],
                },
            ],
        },
        {
            items: [
                {
                    label: 'Learning Management System',
                    icon: 'fas fa-graduation-cap',
                    routerLink: ['/admin/lnd'],
                    subMenu: [
                        {
                            label: 'Settings',
                            styleClass: '',
                            items: [
                                {
                                    label: 'Learning Period',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/settings/training-period/list',
                                    ],
                                },
                                {
                                    label: 'Provider',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/settings/provider/list',
                                    ],
                                },
                                {
                                    label: 'Venue',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/settings/location-type/list',
                                    ],
                                },
                                {
                                    label: 'Learning List',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/settings/training-list/list',
                                    ],
                                },
                                {
                                    label: 'Topic',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/settings/topic/list',
                                    ],
                                },
                                {
                                    label: 'Course',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/settings/course/list',
                                    ],
                                },
                                {
                                    label: 'Instructor',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/settings/internal-instructor/list',
                                    ],
                                },
                                {
                                    label: 'Learning PIC',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/settings/learning-pic/list',
                                    ],
                                },
                                {
                                    label: 'Test Master',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/settings/test-form-template/list',
                                    ],
                                },
                                {
                                    label: 'Evaluation Form',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Score Value',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/lnd/settings/score-value/list',
                                            ],
                                        },
                                        {
                                            label: 'Evaluation Form',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/lnd/settings/evaluation-form/list',
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Activities',
                            styleClass: '',
                            items: [
                                {
                                    label: 'Learning Plan',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/activities/learning-plan/list',
                                    ],
                                },
                                {
                                    label: 'Learning Request',
                                    styleClass: '',
                                    items: [
                                        {
                                            label: 'Learning Plan Request',
                                            styleClass: '',
                                            routerLink: [
                                                '/admin/lnd/activities/learning-request/learning-plan-request/list',
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Reports',
                            styleClass: '',
                            items: [
                                {
                                    label: 'Learning Summary',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/reports/learning-summary/list',
                                    ],
                                },
                                {
                                    label: 'Learning Individual',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/reports/learning-individual/list',
                                    ],
                                },
                                {
                                    label: 'Learning Plan',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/reports/learning-plan/list',
                                    ],
                                },
                                {
                                    label: 'Plan & Actual Learning',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/reports/plan-actual-learning/list',
                                    ],
                                },
                                {
                                    label: 'Plan & Actual Budget Learning',
                                    styleClass: '',
                                    routerLink: [
                                        '/admin/lnd/reports/plan-actual-budget-learning/list',
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            items: [
                {
                    label: 'Log History',
                    icon: 'fa-solid fa-clock-rotate-left',
                    routerLink: ['/admin/log-history/settings'],
                    subMenu: [
                        {
                            label: 'Settings',
                            styleClass: '',
                            items: [],
                        },
                        {
                            label: 'Logs',
                            styleClass: '',
                            items: [],
                        },
                    ],
                },
            ],
        },
        {
            items: [
                {
                    label: 'Notifications',
                    routerLink: ['/admin/notifications/list'],
                    subMenu: [],
                },
            ],
        },
    ];

    constructor(private route: Router, public auth: AuthenticationService) {}

    private _setupSubMenus(): void {
        this.hardCodedMenu = [];
        this.items = [];
        if (this.auth.getLocalStorage(AppConstant.menuAdmin)) {
            this.hardCodedMenu = this.auth.getLocalStorage(
                AppConstant.menuAdmin
            );
        }
    }

    public ngOnInit(): void {
        // TODO: Uncomment this for rbac
        // this._setupSubMenus();
        let currentModule = this.route.url.split('/')[2];

        if (currentModule) {
            this.changeSubMenu(currentModule);
        } else {
            this.items = [];
        }
    }

    public changeSubMenu(currentModule): void {
        this.hardCodedMenu.forEach((element) => {
            let label = element.items[0]?.label.toLocaleLowerCase();

            if (label == 'dashboard') {
                label = 'analytics';
            }

            if (label == 'time & attendance') {
                label = 'time';
            }

            if (label == 'training') {
                label = 'lnd';
            }
            if (label == 'organization design') {
                label = 'organization';
            }

            if (label == currentModule.toLocaleLowerCase()) {
                // @ts-ignore
                this.items = element.items[0]?.subMenu;
                this.resetStyleclass(0, this.items);
                this.recursiveMenu(this.items);
            }
        });
    }

    public onClickMenu(): void {
        this.recursiveMenu(this.items);
    }

    public async recursiveMenu(child, parent?, grandParent?): Promise<any> {
        this.activeUrl = this.route.url;

        child.forEach((element) => {
            if (element.items?.length > 0) {
                element.items.forEach((element2) => {
                    if (element2.items?.length > 0) {
                        this.recursiveMenu(element2.items, element2, element);
                    } else {
                        if (element2.routerLink[0] == this.activeUrl) {
                            this.resetStyleclass(0, this.items);
                            element2.styleClass = 'active';
                            element.styleClass = 'active';
                        }
                    }
                });
            } else {
                if (element.routerLink?.[0] == this.activeUrl) {
                    this.resetStyleclass(0, this.items);

                    element.styleClass = 'active';

                    if (parent) {
                        parent.styleClass = 'active';

                        if (grandParent) {
                            grandParent.styleClass = 'active';
                        }
                    }
                }
            }
        });
    }

    public resetStyleclass(idx = 0, arrData): void {
        for (let i = idx; i < arrData.length; i++) {
            arrData[i].styleClass = '';

            if (arrData[i].items) {
                this.resetStyleclass(0, arrData[i].items);
            }
        }
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
