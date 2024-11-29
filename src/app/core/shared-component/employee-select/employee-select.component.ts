import { PageInfo } from 'src/app/core/model/page-info';
import { AppConstant } from '@config/app.config';
import { EmployeeSelectService } from './employee-select.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Subscription, lastValueFrom } from 'rxjs';
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
    OnChanges,
} from '@angular/core';
import { isNil } from 'lodash-es';
import {
    FormGroup,
    UntypedFormBuilder,
    UntypedFormGroup,
} from '@angular/forms';
import { HelperService } from '@core/service/helper-service';
import { LovComponent } from '../lov/lov.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-employee-select',
    templateUrl: './employee-select.component.html',
    styleUrls: ['./employee-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeSelectComponent implements OnInit, OnChanges {
    @ViewChildren('lovs') lovs: QueryList<LovComponent>;
    @Input() companyIds;
    @Input() needCompany = false;
    @Input() paginator: boolean = true;
    @Input() emptyMessage: string = 'No data found.';
    @Input() useCustomEmptyMessage: boolean = false;
    @Input() isNeedHeader: boolean = true;
    @Input() visible: boolean = false;
    @Input() placeholder: string = 'Select employee';
    @Input() body;
    @Input() disabled: boolean = false;
    @Input() hideOnChoose: boolean = true;
    @Input() columMap = [
        {
            label: 'Employee ID',
            key: 'nik',
        },
        {
            label: 'Employee Name',
            key: 'fullName',
        },
        {
            label: 'Organization',
            key: 'organizationName',
        },
        {
            label: 'Job Position',
            key: 'jobPositionName',
        },
        {
            label: 'Job Title',
            key: 'jobTitleName',
        },
        {
            label: 'Job Level',
            key: 'jobLevelName',
        },
    ];
    @Input() list = [];
    @Input() count = 0;
    @Input() isSelectable: boolean = true;
    @Input() uri: String = 'employees/pop-up-dialog?isActive=true';
    @Input() isStatus: boolean = false;
    @Input() isImage: boolean = true;
    @Input() isKebab: boolean = false;
    @Input() selectedEmployee: string = '';
    @Input() showAdvancedSearchJobAttribute: boolean = false;
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
    @Input() btnOnly = false;
    @Input() btnAddOnly = false;
    @Input() withJobAttribute = false;
    @Input() dataStatusMovement: any;
    @Input() isShowAdvancedSearch: boolean = false;
    @Input() appendTo: any = 'body';
    @Output() hide = new EventEmitter<any>();
    @Input() value;
    @Input() isCustomSearch: boolean;
    @Input() customForm: FormGroup;
    @Input() isEditMode: boolean = false;
    @Input() personIds: any;
    @Input() isOvertimePlanAdvSearch: boolean = false;
    @Input() isShowDescription: boolean = true;

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

    listLovUriJobAttribute = {
        organizationIds: null,
        jobPositionIds: null,
        jobTitleIds: null,
        jobLevelIds: null,
        workLocationId: null,
        employeeTypeCategoryId: null,
        employeeTypeGroupId: null,
        employeeTypeId: null,
    };

    loadingPhoto: boolean = true;
    selectedData = [];
    selectedKebab;
    listSubscription: Subscription;
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
    disableCompany = false;
    src: any;

    constructor(
        private cd: ChangeDetectorRef,
        private srv: EmployeeSelectService,
        private help: HelperService,
        private formBuilder: UntypedFormBuilder,
        private sanitizer: DomSanitizer
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
    ngOnInit() {
        if (this.companyIds) {
            this.disableCompany = true;
        } else if (this.personIds) {
            this.getByPersonId();
        }
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
                if (isNil(this.body)) {
                    this.body = {};
                } else if (this.isCustomSearch) {
                    this.body = this.customForm.getRawValue();
                }
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
        if (!this.disabled) {
            this.visible = true;
        }
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
    selectCompany(e) {
        this.companyIds = e.id;
        this.onSearchDialog();
    }

    onChoose() {
        this.selectedEmployee = '';
        this.selected.emit(this.selectedData);
        this.selectedData.forEach((element) => {
            this.getPhoto(element.id);
            this.selectedEmployee +=
                `${element.nik} - ${element.fullName}` + ', ';
        });
        if (this.hideOnChoose) {
            this.visible = false;
        }
        this.selectedData = [];
    }

    onSelect(data) {
        this.selected.emit(data);
        this.src = null;
        this.getPhoto(data.id);
        this.selectedEmployee = `${data.nik} - ${data.fullName}`;
        this.dataEmployee = data;
        this.visible = false;
    }

    onShowAdvancedSearch() {
        if (this.companyIds.length > 0) {
            if (this.isOvertimePlanAdvSearch) {
                this.listLovUri = {
                    organizationIds:
                        `lovs/organizations?isActive=true&companyId=` +
                        this.companyIds,
                    jobPositionIds:
                        `lovs/job-positions-no-trustee?isActive=true&companyId=` +
                        this.companyIds,
                    jobTitleIds:
                        `lovs/job-titles-no-trustee?isActive=true&companyId=` +
                        this.companyIds,
                    jobLevelIds:
                        `lovs/job-levels-no-trustee?isActive=true&companyId=` +
                        this.companyIds,
                    workLocationId:
                        `lovs/work-locations-no-trustee?isActive=true&companyId=` +
                        this.companyIds,
                    employeeTypeCategoryId:
                        `lovs/employee-type-categories-no-trustee?isActive=true&companyId=` +
                        this.companyIds,
                    employeeTypeGroupId:
                        `lovs/employee-type-groups-no-trustee?isActive=true&companyId=` +
                        this.companyIds,
                    employeeTypeId:
                        `lovs/employee-types-no-trustee?isActive=true&companyId=` +
                        this.companyIds,
                    costCenterId:
                        `lovs/cost-centers-no-trustee?isActive=true&companyId=` +
                        this.companyIds,
                    genderId:
                        `lovs/genders?isActive=true&companyId=` +
                        this.companyIds,
                    religionId:
                        `lovs/religions?isActive=true&companyId=` +
                        this.companyIds,
                };
                this.isShowAdvancedSearch = true;
            } else {
                this.listLovUri = {
                    organizationIds:
                        `lovs/organizations?isActive=true&companyId=` +
                        this.companyIds,
                    jobPositionIds:
                        `lovs/job-positions?isActive=true&companyId=` +
                        this.companyIds,
                    jobTitleIds:
                        `lovs/job-titles?isActive=true&companyId=` +
                        this.companyIds,
                    jobLevelIds:
                        `lovs/job-levels?isActive=true&companyId=` +
                        this.companyIds,
                    workLocationId:
                        `lovs/work-locations?isActive=true&companyId=` +
                        this.companyIds,
                    employeeTypeCategoryId:
                        `lovs/employee-type-categories?isActive=true&companyId=` +
                        this.companyIds,
                    employeeTypeGroupId:
                        `lovs/employee-type-groups?isActive=true&companyId=` +
                        this.companyIds,
                    employeeTypeId:
                        `lovs/employee-types?isActive=true&companyId=` +
                        this.companyIds,
                    costCenterId:
                        `lovs/cost-centers?isActive=true&companyId=` +
                        this.companyIds,
                    genderId:
                        `lovs/genders?isActive=true&companyId=` +
                        this.companyIds,
                    religionId:
                        `lovs/religions?isActive=true&companyId=` +
                        this.companyIds,
                };
                this.isShowAdvancedSearch = true;
            }
        }
    }
    onShowAdvancedSearchJobAttribute() {
        if (this.companyIds.length > 0) {
            this.listLovUriJobAttribute = {
                organizationIds:
                    `lovs/organizations?isActive=true&companyId=` +
                    this.companyIds,
                jobPositionIds:
                    `lovs/job-positions/with-combination?isActive=true&companyId=` +
                    this.companyIds,
                jobTitleIds:
                    `lovs/job-titles?isActive=true&companyId=` +
                    this.companyIds,
                jobLevelIds:
                    `lovs/job-levels?isActive=true&companyId=` +
                    this.companyIds,
                workLocationId:
                    `lovs/work-locations?isActive=true&companyId=` +
                    this.companyIds,
                employeeTypeCategoryId:
                    `lovs/employee-type-categories?isActive=true&companyId=` +
                    this.companyIds,
                employeeTypeGroupId:
                    `lovs/employee-type-groups?isActive=true&companyId=` +
                    this.companyIds,
                employeeTypeId:
                    `lovs/employee-types?isActive=true&companyId=` +
                    this.companyIds,
            };

            this.isShowAdvancedSearch = true;
        }
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
    onCancelAdvancedSearchJobAttribute() {
        this.isShowAdvancedSearch = false;
        this.listLovUriJobAttribute = {
            organizationIds: null,
            jobPositionIds: null,
            jobTitleIds: null,
            jobLevelIds: null,
            workLocationId: null,
            employeeTypeCategoryId: null,
            employeeTypeGroupId: null,
            employeeTypeId: null,
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

    reset() {
        this.selectedData = [];
    }

    async getPhoto(id: string) {
        await lastValueFrom(this.srv.getFilePhoto(id))
            .then((res) => {
                if (res) {
                    // @ts-ignore
                    const objectURL = URL.createObjectURL(res);
                    const img =
                        this.sanitizer.bypassSecurityTrustUrl(objectURL);
                    this.src = img;
                    this.cd.detectChanges();
                }
            })
            .catch(() => {});
    }

    ngOnChanges() {
        this.getData();
    }

    private getData(): void {
        if (!this.isEditMode) {
            if (this.value && this.companyIds) {
                let body: any = {};

                body.companyIds = this.companyIds;
                body.inquiry = this.value;

                lastValueFrom(
                    this.srv.getList(
                        this.uri,
                        new PageInfo(this.page, this.limit),
                        body
                    )
                ).then((res) => {
                    res.data.forEach((e) => {
                        this.getPhoto(e.id);
                        this.selectedEmployee +=
                            `${e.nik} - ${e.fullName}` + ', ';
                        this.dataEmployee = e;
                    });
                });
            }
        }

        if (this.isEditMode && this.value) {
            lastValueFrom(this.srv.getById(this.value)).then((res) => {
                this.dataEmployee = res.data;
                this.selectedEmployee = `${this.dataEmployee.nik} - ${this.dataEmployee.fullName}`;

                this.getPhoto(this.dataEmployee.id);

                this.selected.emit(this.dataEmployee);

                this.cd.detectChanges();
            });
        }
    }
    getByPersonId() {
        lastValueFrom(this.srv.getByPersonId(this.personIds)).then((res) => {
            this.dataEmployee = res.data;
            this.selectedEmployee = `${this.dataEmployee.nik} - ${this.dataEmployee.fullName}`;

            this.getPhoto(this.dataEmployee.id);

            this.selected.emit(this.dataEmployee);

            this.cd.detectChanges();
        });
    }
}
