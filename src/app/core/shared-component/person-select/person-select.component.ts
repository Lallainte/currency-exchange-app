import { PageInfo } from 'src/app/core/model/page-info';
import { AppConstant } from '@config/app.config';
import { PersonSelectService } from './person-select.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Subscription } from 'rxjs';
import {
    Input,
    OnInit,
    Output,
    Component,
    EventEmitter,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewChildren,
    QueryList,
} from '@angular/core';
import { isNil } from 'lodash-es';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { HelperService } from '@core/service/helper-service';
import { LovComponent } from '../lov/lov.component';

@Component({
    selector: 'app-person-select',
    templateUrl: './person-select.component.html',
    styleUrls: ['./person-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonSelectComponent {
    @ViewChildren('lovs') lovs: QueryList<LovComponent>;

    @Input() paginator: boolean = true;
    @Input() emptyMessage: string = 'No data found.';
    @Input() useCustomEmptyMessage: boolean = false;
    @Input() isNeedHeader: boolean = true;
    @Input() visible: boolean = false;
    @Input() placeholder: string | null = null;
    @Input() body;
    @Input() columMap = [
        {
            label: 'Salutation',
            key: 'lovSalutationName',
        },
        {
            label: 'Person Name',
            key: 'fullName',
        },
        {
            label: 'Document',
            key: 'personalDocumentName',
        },
        {
            label: 'ID Number',
            key: 'idCard',
        },
        {
            label: 'City',
            key: 'addressCityName',
        },
        {
            label: 'Person Type',
            key: 'lovPersonTypeName',
        },
    ];
    @Input() list = [];
    @Input() count = 0;
    @Input() isSelectable: boolean = true;
    @Input() uri: String = 'persons';
    @Input() isStatus: boolean = false;
    @Input() isImage: boolean = false;
    @Input() isKebab: boolean = false;
    @Input() selectedEmployee: string = '';
    @Input() kebabOption = {
        isEdit: true,
        isDetail: true,
        isExport: false,
    };
    @Input() labelKebabDetail: string = 'Details';
    @Input() isFile: boolean = false;
    @Output() action = new EventEmitter<any>();
    @Output() selected = new EventEmitter<any>();
    @Input() dataEmployee: any;
    @Input() isSingle = true;
    @Input() isShowAdvancedSearch: boolean = false;
    @Output() hide = new EventEmitter<any>();

    hasCustomPlaceholder(): boolean {
        return this.placeholder !== null;
      }

    listLovUri = {
        organizationIds: null,
        jobPositionIds: null,
        jobTitleIds: null,
        jobLevelIds: null,
        workLocationId: null,
        employeeTypeCategoryId: null,
        employeeTypeGroupId: null,
        employeeTypeId: null,
        costCenterId: null,
        genderId: null,
        religionId: null,
    };

    selectedData = [];
    selectedKebab;
    listSubscription: Subscription;
    customOptions: any[] = [
        {
            id: 'c14851bd-6e82-4c80-877c-c3e935e41387',
            companyName: 'staditek',
            code: 'st',
            name: 'Staditek',
        },
        {
            id: 'c24851bd-6e82-4c80-877c-c3e935e41387',
            companyName: 'red-erp',
            code: 're',
            name: 'Red ERP',
        },
        {
            id: 'c1e851bd-6e82-4c80-877c-c3e935e41387',
            companyName: 'linovhr',
            code: 'lh',
            name: 'Linov HR',
        },
    ];
    page = 1;
    first = 0;
    limit = AppConstant.rowsPerPage;
    items = [
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off',
        },
    ];
    loading = false;
    showKebab = false;
    rowsPerPage = AppConstant.rowsPerPage;
    rowsPerPageOptions = AppConstant.rowsPerPageOptions;
    statusLabel = '';
    formSearch: UntypedFormGroup;
    companyIds;

    constructor(
        private cd: ChangeDetectorRef,
        private srv: PersonSelectService,
        private help: HelperService,
        private formBuilder: UntypedFormBuilder
    ) {
        this.formSearch = this.formBuilder.group({
            inquiry: null,
            name: null,
            organizationIds: [],
            jobPositionIds: [],
            jobTitleIds: [],
            jobLevelIds: [],
            workLocationId: null,
            employeeTypeCategoryId: null,
            employeeTypeGroupId: null,
            employeeTypeId: null,
            costCenterId: null,
            genderId: null,
            religionId: null,
            servicePeriodStartDate: null,
            servicePeriodEndDate: null,
        });
    }

    public getStatusClass(data: any): object {
        let status;
        if (data?.status) {
            status = data?.status.toLowerCase();
            this.statusLabel = status;
        } else if (!isNil(data?.isActive)) {
            status = data?.isActive;
            this.statusLabel = data?.isActive ? 'Active' : 'Inactive';
        }

        return {
            'span-yellow': ['pulang awal', 'pending', 'draft'].includes(status),
            'span-active-secondary': [
                'active',
                'hadir',
                'approved',
                'publish',
                true,
            ].includes(status),
            'span-inactive-secondary': [
                'inactive',
                'tidak hadir',
                'terlambat',
                'rejected',
                'canceled',
                false,
            ].includes(status),
        };
    }

    onTableLazyLoad(event) {
        this.page = event.first / event.rows + 1;
        this.limit = event.rows;

        this.getList(new PageInfo(this.page, this.limit));
    }

    selectionChange(event) {
        // this.selected.emit(this.selectedData);
    }

    getList(pi) {
        // this.first = pi.page - 1;

        if (this.uri) {
            if (this.companyIds) {
                this.body.companyIds = this.companyIds;
                this.loading = true;
                this.cd.detectChanges();
                this.listSubscription = this.srv
                    .getList(this.uri, pi, this.body)
                    .subscribe({
                        next: (res) => {
                            if (res) {
                                this.loading = false;
                                this.list = res.data;
                                this.count = res?.paging?.totalItem;
                                this.cd.detectChanges();
                            }
                        },
                        error: (err) => {
                            this.loading = false;
                            this.cd.detectChanges();
                        },
                    });
            }
        } else {
            this.loading = false;
            this.cd.detectChanges();
        }
    }

    onSearch() {
        this.body = this.formSearch.getRawValue();
        this.body.servicePeriodStartDate = this.help.formatDate(
            this.body?.servicePeriodStartDate
        );
        this.body.servicePeriodEndDate = this.help.formatDate(
            this.body?.servicePeriodEndDate
        );
        this.page = 1;
        this.getList(new PageInfo(this.page, this.limit));
    }

    onRefresh() {
        this.selectedData = [];
        this.page = 1;
        let childList = this.lovs.toArray();
        childList.forEach((child) => {
            child.reset();
        });
        this.body = { companyIds: '' };
        this.formSearch.reset();
        this.getList(new PageInfo(this.page, this.limit));
    }

    onRefreshSearch() {
        let childList = this.lovs.toArray();
        childList.forEach((child) => {
            child.reset();
        });
        this.body = { companyIds: '' };
        this.formSearch.reset();
    }

    reload() {
        this.selectedData = [];
        this.page = 1;
        this.cd.detectChanges();
    }

    onShow(data) {
        this.selectedKebab = data;
        this.showKebab = !this.showKebab;
    }

    onKebab(action, data, op: OverlayPanel, idx) {
        op.hide();

        this.action.emit({ data, action, index: idx });
    }

    showDialog() {
        this.visible = true;
    }

    onCancel() {
        this.visible = false;
        this.formSearch.reset();
        this.isShowAdvancedSearch = false;
        let childList = this.lovs.toArray();
        childList.forEach((child) => {
            child.reset();
        });
        // this.selectedData = [];
        this.hide.emit(this.visible);
    }

    onRemoveEmpData() {
        this.selectedEmployee = '';
        if (this.isSingle) {
            this.selected.emit(null);
        }
    }

    onRemoveEmpDatas(idx: number) {
        let selectedEmployees = this.selectedEmployee.split(',');
        if (idx > -1) {
            this.selectedData.splice(idx, 1);
            selectedEmployees.splice(idx, 1);
            if (selectedEmployees.length === 1) {
                this.selectedEmployee = '';
            } else {
                this.selectedEmployee = selectedEmployees.join(',');
            }
        }
    }

    onSearchDialog() {
        if (this.isShowAdvancedSearch) this.isShowAdvancedSearch = false;
        this.onSearch();
    }

    selectCompanyMulti(e) {
        this.companyIds = '';
        e.forEach((element, index) => {
            if (index == e.length - 1) {
                this.companyIds += element.id;
            } else {
                this.companyIds += element.id + ',';
            }
        });
        this.onSearchDialog();
    }

    onChoose() {
        this.selectedEmployee = '';
        this.selected.emit(this.selectedData);
        this.visible = false;
        this.selectedData.forEach((element) => {
            this.selectedEmployee +=
                `${element.idCard} - ${element.fullName}` + ', ';
        });
        // this.selectedData = [];
    }

    onSelect(data) {
        this.selected.emit(data);
        this.selectedEmployee = `${data.idCard} - ${data.fullName}`;
        this.dataEmployee = data;
        this.visible = false;
    }

    onShowAdvancedSearch() {
        this.listLovUri = {
            organizationIds: `lovs/organizations?isActive=true`,
            jobPositionIds: `lovs/job-positions?isActive=true`,
            jobTitleIds: `lovs/job-titles?isActive=true&companyId=c14851bd-6e82-4c80-877c-c3e935e41387`,
            jobLevelIds: `lovs/job-levels?isActive=true`,
            workLocationId: `lovs/work-locations?isActive=true`,
            employeeTypeCategoryId: `lovs/employee-type-categories?isActive=true`,
            employeeTypeGroupId: `lovs/employee-type-groups?isActive=true`,
            employeeTypeId: `lovs/employee-types?isActive=true`,
            costCenterId: `lovs/cost-centers?isActive=true`,
            genderId: `lovs/genders?isActive=true`,
            religionId: `lovs/religions?isActive=true`,
        };
        this.isShowAdvancedSearch = true;
    }

    onCancelAdvancedSearch() {
        this.isShowAdvancedSearch = false;
        this.listLovUri = {
            organizationIds: null,
            jobPositionIds: null,
            jobTitleIds: null,
            jobLevelIds: null,
            workLocationId: null,
            employeeTypeCategoryId: null,
            employeeTypeGroupId: null,
            employeeTypeId: null,
            costCenterId: null,
            genderId: null,
            religionId: null,
        };
    }

    selectDropdown(e, key: string) {
        this.formSearch.get(key).patchValue(e.id);
    }

    selectedMulti(e, key: string) {
        let temp = [];
        e.forEach((element) => temp.push(element.id));
        this.formSearch.get(key).patchValue(temp);
    }

    ngOnDestroy() {
        if (this.listSubscription) {
            this.listSubscription.unsubscribe();
        }
    }
}
