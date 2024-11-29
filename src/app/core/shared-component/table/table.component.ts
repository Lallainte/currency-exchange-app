import { map } from 'rxjs/operators';
import { PageInfo } from 'src/app/core/model/page-info';
import { KebabOption } from './table.types';
import { AppConstant } from '@config/app.config';
import { TableService } from './table.service';
import { TableServiceEss } from './table-ess.service';
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
    ViewChild,
} from '@angular/core';
import { isNil, get } from 'lodash-es';
import { Table } from 'primeng/table';
import { merge } from 'lodash';
// import { TableServiceAnalytics } from './table-analytics.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
    @ViewChild('table') table: Table;
    @Input() scrollable: boolean = false;
    @Input() scrollHeight: string = '';
    @Input() paginator: boolean = true;
    @Input() emptyMessage: string = 'No data found.';
    @Input() useCustomEmptyMessage: boolean = false;
    @Input() body = { companyId: null, companyIds: null };
    @Input() companyId;
    @Input() companyIds = [];
    @Input() hideCompany: boolean = false;
    @Input() isCompany: boolean = false;
    @Input() isCompanyMulti: boolean = false;
    @Input() isError: boolean = false;
    @Input() columMap = [];
    @Input() list = [];
    @Input() count = 0;
    @Input() rowsMap = [{}];
    @Input() isSelectable: boolean = true;
    @Input() isIndex: boolean = true;
    @Input() indexLabel: string = 'No';
    @Input() uri: String;
    @Input() isStatus: boolean = true;
    @Input() customStatus: any;
    @Input() isActiveStatus: boolean = false;
    @Input() isPublishStatus: boolean = false;
    @Input() isKebab: boolean = true;
    @Input() isKebabOvertime: boolean = false;
    @Input() isKebabSettlement: boolean = false;
    @Input() isKebabUser: boolean = false;
    @Input() isKebabWorkflowSequence: boolean = false;
    @Input() isKebabCW: boolean = false;
    @Input() isKebabScoreCard: boolean = false;
    @Input() isFlag: boolean = false;
    @Input() labelStatus = 'Status';
    @Input() isOneAction: boolean = false;
    @Input() isOneActionShowHide: boolean = false;
    @Input() isOneActionConditionKey: string = '';
    @Input() isOneActionConditionValue: string = '';
    @Input() isBlueDraftStatus: boolean = false;
    @Input() truncate: number = -1;
    @Input() kebabOption: KebabOption = {
        isEdit: true,
        isDetail: true,
        isExport: false,
        isApprove: false,
        isReject: false,
        isRescheduled: false,
        isDownload: false,
        isCancelRequest: false,
        isDeleteDraft: false,
        isEditDraft: false,
        isDetailOpen: false,
        isViewLearningEvents: false,
    };
    @Input() labelKebabDetail: string = 'Details';
    @Input() isFile: boolean = false;
    @Input() isReschedule: boolean = false;
    @Input() dataKey: string = 'id';
    @Input() isLazy: boolean = true;
    @Input() getOninit: boolean = false;
    @Input() isUseClickRow: boolean = false;
    @Input() data: any[] = [];
    @Input() selectedData = [];
    @Input() sortBy = null;
    @Output() action = new EventEmitter<any>();
    @Output() selected = new EventEmitter<any>();
    @Output() totalItem = new EventEmitter<any>();
    @Input() web = localStorage.getItem('web');
    @Input() isTimesheet: boolean = false;
    @Input() limit = AppConstant.rowsPerPage;
    @Input() rowsPerPage = AppConstant.rowsPerPage;
    @Input() rowsPerPageOptions = AppConstant.rowsPerPageOptions;
    @Input() isAnalytics = false;
    @Input() isKebabCalibrationReviewRevoke = false;
    srv;
    errors: any[] = [];
    selectedKebab;
    listSubscription: Subscription;

    @Input() selectionMode = '';
    isTableHistory = false;
    @Input() isNeedHistory = false;
    @Input() columnMapTableHistory = [];
    @Input() listTableHistory = [];

    page = 1;
    first = 0;
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
    notes;
    isShowReject: boolean = false;
    isShowApprove: boolean = false;
    dataRejectApprove = {
        data: '',
        action: '',
        id: '',
    };
    tempBody;

    public get spanTableRow(): number {
        const extra = [
            this.isIndex,
            this.isSelectable,
            this.isCompanyMulti,
            this.isPublishStatus,
            this.isStatus,
            this.isFile,
            this.isKebab,
            this.isOneAction,
        ].filter((el) => el).length;

        return this.columMap?.length + extra;
    }

    constructor(
        private cd: ChangeDetectorRef,
        srv1: TableService,
        srv2: TableServiceEss
        // private srv3: TableServiceAnalytics
    ) {
        // if (this.web == 'ess' || this.web == 'mss') {
        //     this.srv = srv2;
        // } else {
        this.srv = srv1;
        // }
    }
    ngOnInit(): void {
        // if (this.isAnalytics) {
        //     this.srv = this.srv3
        // }

        if (this.isTimesheet) {
            this.rowsPerPage = AppConstant.rowsPerPageTimesheet;
            this.rowsPerPageOptions = AppConstant.rowsPerPageOptionsTimesheet;
        }
        if (this.getOninit) {
            this.getList(new PageInfo(this.page, this.limit));
        }
    }
    formatTime(time: string): string {
        return this.srv.formatTime(time);
    }

    formatUTCDateForTimezone(dateString): string {
        return this.srv.formatUTCDateForTimezone(dateString);
    }

    formatTimeWithoutSecond(timeString: string): string {
        if (!timeString) return '';

        const time = new Date(`1970-01-01T${timeString}`);
        const formattedTime = time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });

        return formattedTime;
    }

    statusLabel = '';
    publishStatusLabel = '';
    public getStatusClass(data: any): object {
        let status;
        if (this.isActiveStatus) {
            status = data?.activeStatus;
            this.statusLabel = data?.activeStatus ? 'Active' : 'Inactive';
        } else {
            if (data?.status) {
                if (this.customStatus?.keyTrue) {
                    if (
                        data?.status.toLowerCase() === 'approved' ||
                        data?.status.toLowerCase() === 'active' ||
                        data?.status.toLowerCase() === 'paid'
                    ) {
                        status = this.customStatus.keyTrue.toLowerCase();
                        this.statusLabel = status;
                    } else {
                        status = this.customStatus.keyFalse.toLowerCase();
                        this.statusLabel = status;
                    }
                } else {
                    status = data?.status.toLowerCase();
                    this.statusLabel = status;
                }
            } else if (!isNil(data?.isActive)) {
                status = data?.isActive;
                this.statusLabel = data?.isActive ? 'Active' : 'Inactive';
            } else if (data?.accountBankStatus) {
                status = data?.accountBankStatus.toLowerCase();
                this.statusLabel = status;
            } else if (data?.statusRequest) {
                status = data?.statusRequest.toLowerCase();
                this.statusLabel = status;
            } else if (!isNil(data?.isPaid)) {
                status = data?.isPaid;
                this.statusLabel = data?.isPaid ? 'Paid' : 'Unpaid';
            } else if (data?.transferStatus) {
                status = data?.transferStatus.toLowerCase();
                this.statusLabel = status;
            }
        }

        return {
            'span-blue':
                (this.isBlueDraftStatus &&
                    ['open', 'draft', 'processed'].includes(status)) ||
                (!this.isBlueDraftStatus &&
                    ['open', 'processed'].includes(status)),
            'span-gray': ['not exist'].includes(status),
            'span-active-gray': ['close'].includes(status),
            'span-yellow': [
                'pulang awal',
                'pending',
                'draft',
                'not exist',
                'rollback',
                'queue',
            ].includes(status),
            'span-active-secondary': [
                'active',
                'hadir',
                'approved',
                'publish',
                'published',
                'reviewed',
                true,
                're-open',
                'show',
                'paid',
                'have',
            ].includes(status),
            'span-inactive-secondary': [
                'inactive',
                'tidak hadir',
                'terlambat',
                'rejected',
                'canceled',
                'unprocessed',
                false,
                'end',
                'unpaid',
                'not have',
            ].includes(status),
        };
    }

    onShowFile(data, idx) {
        this.action.emit({ data, index: idx });
    }

    public getPublishStatusClass(data: any): object {
        let publishStatus;

        if (data?.publishStatus) {
            publishStatus = data?.publishStatus.toLowerCase();
            this.publishStatusLabel = publishStatus;
        } else if (!isNil(data?.isActive)) {
            publishStatus = data?.isActive;
            this.publishStatusLabel = data?.isActive ? 'Active' : 'Inactive';
        } else if (data?.statusReview) {
            publishStatus = data?.statusReview.toLowerCase();
            this.publishStatusLabel = publishStatus;
        }

        return {
            'span-yellow': ['pulang awal', 'pending', 'draft'].includes(
                publishStatus
            ),
            'span-active-secondary': [
                'active',
                'hadir',
                'approved',
                'publish',
                'published',
                'reviewed',
                true,
            ].includes(publishStatus),
        };
    }

    onTableLazyLoad(event) {
        if (event.sortField) {
            this.sortBy =
                event.sortField + ':' + (event.sortOrder == 1 ? 'ASC' : 'DESC');
        }

        this.page = event.first / event.rows + 1;
        this.limit = event.rows;

        this.getList(new PageInfo(this.page, this.limit));
    }

    selectionChange(event) {
        this.selected.emit(this.selectedData);
    }

    getList(pi) {
        // this.first = pi.page - 1;
        this.loading = true;
        let canLoad = true;
        if (this.isCompany) {
            if (this.companyId) {
                canLoad = true;
            } else {
                canLoad = false;
            }
        } else if (this.isCompanyMulti) {
            if (this.companyIds.length > 0) {
                canLoad = true;
            } else {
                canLoad = false;
            }
        }
        this.cd.detectChanges();
        if (this.uri) {
            if (canLoad) {
                this.listSubscription = this.srv
                    .getList(this.uri, pi, this.body, this.sortBy)
                    .subscribe({
                        next: (res) => {
                            if (res) {
                                this.loading = false;
                                this.list = res?.data
                                    ? Array.isArray(res?.data)
                                        ? res?.data
                                        : res?.data.content
                                    : res?.content;

                                this.count = res?.paging
                                    ? res?.paging?.totalItem
                                    : res?.totalElements
                                    ? res?.totalElements
                                    : res?.data?.length;
                                this.totalItem.emit(this.count);
                                this.cd.detectChanges();
                            }
                        },
                        error: (err) => {
                            this.loading = false;
                            this.cd.detectChanges();
                        },
                    });
            } else {
                this.loading = false;
                this.cd.detectChanges();
            }
        } else {
            this.loading = false;
            this.cd.detectChanges();
        }
    }

    onSearch(body) {
        if (!body.isRefresh) {
            for (const property in body) {
                if (!body[property]) {
                    delete this.body[property];

                    if (this.tempBody) {
                        delete this.tempBody[property];
                    }
                }
            }

            this.body = merge(this.body, body);

            if (this.companyId) {
                this.body.companyId = this.companyId;
            }

            if (this.isCompanyMulti) {
                this.body.companyIds = '';
                this.companyIds.forEach((element, index) => {
                    if (index == this.companyIds.length - 1) {
                        this.body.companyIds += element.id;
                    } else {
                        this.body.companyIds += element.id + ',';
                    }
                });
            }
            this.page = 1;
            this.first = 0;
            this.getList(new PageInfo(this.page, this.limit));
        } else {
            this.onRefresh();
        }

        this.tempBody = body;
    }

    onRefresh() {
        this.sortBy = null;
        this.body = { companyId: null, companyIds: null };
        this.tempBody = null;
        if (this.companyId) {
            this.body.companyId = this.companyId;
        }
        if (this.isCompanyMulti) {
            this.body.companyIds = '';
            this.companyIds.forEach((element, index) => {
                if (index == this.companyIds.length - 1) {
                    this.body.companyIds += element.id;
                } else {
                    this.body.companyIds += element.id + ',';
                }
            });
        }
        this.table.sortOrder = 0;
        this.table.sortField = null;
        this.table.reset();
        this.selectedData = [];
        this.page = 1;
        this.first = 0;
        // this.getList(new PageInfo(this.page, this.limit));
    }

    reload() {
        this.table.sortOrder = 0;
        this.table.sortField = null;
        this.table.reset();
        this.selectedData = [];
        this.page = 1;
        this.first = 0;
        this.cd.detectChanges();
    }
    setCompanyId(id) {
        if (this.isCompanyMulti) {
            this.body.companyIds = '';
            this.companyIds = id;
            this.companyIds.forEach((element, index) => {
                if (index == this.companyIds.length - 1) {
                    this.body.companyIds += element.id;
                } else {
                    this.body.companyIds += element.id + ',';
                }
            });
        }
        if (this.isCompany) {
            this.companyId = id;
            this.body.companyId = this.companyId;
        }

        this.getList(new PageInfo(this.page, this.limit));
    }

    setUri(uri: string) {
        this.uri = uri;
        this.selectedData = [];
        this.page = 1;
        this.first = 0;
        this.getList(new PageInfo(this.page, this.limit));
    }

    onShow(data) {
        this.selectedKebab = data;
        this.showKebab = !this.showKebab;
    }

    onKebab(action, data, op: OverlayPanel, idx) {
        op.hide();

        this.dataRejectApprove = {
            data: data,
            action: action,
            id: idx,
        };

        if (action === 'approve') {
            this.isShowApprove = true;
        } else if (action === 'reject') {
            this.isShowReject = true;
        } else {
            this.action.emit({ data, action, index: idx });
        }
    }

    onReject() {
        this.isShowReject = false;

        this.action.emit({
            data: this.dataRejectApprove.data,
            action: this.dataRejectApprove.action,
            index: this.dataRejectApprove.id,
            note: this.notes,
        });
    }

    onApprove() {
        this.isShowApprove = false;

        this.action.emit({
            data: this.dataRejectApprove.data,
            action: this.dataRejectApprove.action,
            index: this.dataRejectApprove.id,
            note: this.notes,
        });
    }

    onOneAction(action, data, idx) {
        this.action.emit({ action, data, index: idx });
    }

    onClickRow(data, idx) {
        this.action.emit({ data, index: idx });
    }

    onClickCell(data, idx, key) {
        this.action.emit({ data, index: idx, key });
    }

    getAbbreviatedMonth(monthNumber: number): string {
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];

        return monthNames[monthNumber - 1] || '';
    }

    getValue(rowData, fieldPath, col, idx?: number) {
        if (idx) {
            fieldPath = fieldPath.replace(0, idx);
        }

        if (col.isArray) {
            if (col.isArrList) {
                rowData = rowData[col.arrayName][col.arrayIndex];
            } else {
                rowData[fieldPath] =
                    rowData[col.arrayName][col.arrayIndex]?.[fieldPath];
            }
        }

        if (col.isConditional) {
            rowData[fieldPath] =
                rowData[col.condition1] || rowData[col.condition2];
        }

        if (
            fieldPath === 'periodeMonth' ||
            (fieldPath === 'month' &&
                rowData[fieldPath] &&
                col.isAbbreviatedMonth)
        ) {
            return this.getAbbreviatedMonth(rowData[fieldPath]);
        }

        if (col.isArrayOfObject) {
            const found = rowData[fieldPath].find(
                (element) =>
                    element[col.code] == col.colPos ||
                    element[col.code] == col.label
            );
            return found[col.targetValue];
        }

        if (Array.isArray(fieldPath)) {
            if (col.component) {
                fieldPath = fieldPath
                    .filter((field) => rowData[field])
                    .map((field) => field.replace('is', '').toUpperCase());
                return fieldPath.join(',');
            }

            if (col.jobAttribute) {
                fieldPath = fieldPath
                    .filter((field) => rowData[field])
                    .map((field) => field.replace('use', ''));
                return fieldPath.join(',');
            }
        }

        // const fieldName = fieldPath
        //     .replace(/[\[\]']+/g, '.')
        //     .split('.')
        //     .filter((i) => i);

        // const field = fieldName.reduce((acc, f) => acc[f], rowData);

        // return field;

        return get(rowData, fieldPath);
    }

    getValueList(rowData, fieldKey, col) {
        let finalList = [];

        if (col.isList) {
            const keys = fieldKey.split('.');
            const list = rowData[keys[0]];
            finalList = list.map((l) => l[keys[1]]);
        }

        return finalList;
    }

    onViewFile(data) {}

    ngOnDestroy() {
        if (this.listSubscription) {
            this.listSubscription.unsubscribe();
        }
    }

    setError(err) {
        this.errors = [];
        err.forEach((err) => {
            this.errors[err.id] = err;
        });
    }
    arrToString(arr) {
        let msg = '';
        arr.forEach((element) => {
            msg += element + ',\n';
        });
        return msg;
    }
    tooltipOptions = {
        tooltipEvent: 'hover',
        tooltipPosition: 'left',
    };

    onRowSelect(event) {
        if (this.isNeedHistory) {
            this.isTableHistory = true;
        }
    }
}
