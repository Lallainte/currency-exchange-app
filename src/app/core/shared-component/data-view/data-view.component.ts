import { isNil, get } from 'lodash-es';
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { AppConstant } from '@core/config/app.config';
import { KebabOption } from '@core/shared-component/table/table.types';
import { DataView } from 'primeng/dataview';
import { Subscription } from 'rxjs';
import { PageInfo } from '@core/model/page-info';
import { OverlayPanel } from 'primeng/overlaypanel';
import { LinovDataViewService } from './data-view.service';
import { LinovDataViewEssService } from './data-view-ess.service';

@Component({
    selector: 'app-data-view',
    templateUrl: 'data-view.component.html',
})
export class LinovDataViewComponent implements OnInit {
    @ViewChild('dv') dataView: DataView;
    @Input() public uri!: string | undefined;
    @Input() public body: any = { companyId: null, companyIds: null };
    @Input() public list: any[] = [];
    @Input() public count: number = 0;
    @Input() public isLazy: boolean = true;
    @Input() public isKebab: boolean = true;
    @Input() public paginator: boolean = true;
    @Input() public selectAll: boolean;
    @Input() public companyId!: string | undefined;
    @Input() public isCompany: boolean = false;
    @Input() public isCompanyMulti: boolean = false;
    @Input() public companyIds: any[] = [];
    @Input() public scrollable: boolean = false;
    @Input() public sortBy = null;
    @Input() public kebabOption: KebabOption = {
        isEdit: true,
        isDetail: true,
        isExport: false,
        isApprove: false,
        isReject: false,
    };
    @Input() public scrollHeight: string = '';
    @Input() public emptyMessage: string = 'No data found.';
    @Input() public useCustomEmptyMessage: boolean | undefined;
    @Input() public styleClass: string = 'grid-view';
    @Input() public gridStyleClass: string = '';
    @Input() public layout: string = 'list';

    @Input() public itemTemplate!: TemplateRef<any> | undefined;
    @Input() web = localStorage.getItem('web');
    @Output() public action = new EventEmitter<any>();
    @Output() public selected = new EventEmitter<any>();
    @Output() public totalItem = new EventEmitter<any>();
    // srv;
    public errors: any[] = [];
    public listSubscription!: Subscription | undefined;

    public page: number = 1;
    public first: number = 0;
    public loading: boolean = false;
    public statusLabel: string = '';
    public selectedData: any[] = [];
    public limit: number = AppConstant.rowsPerPage;
    public rowsPerPage: number = AppConstant.rowsPerPage;
    public rowsPerPageOptions: number[] = AppConstant.rowsPerPageOptions;

    constructor(
        private readonly cd: ChangeDetectorRef,
        srv1: LinovDataViewService,
        srv2: LinovDataViewEssService,
        private readonly srv: LinovDataViewService
    ) {
        // if (this.web == 'ess' || this.web == 'mss') {
        //     this.srv = srv2;
        // } else {
        //     this.srv = srv1;
        // }
    }

    ngOnInit(): void {}

    public getStatusClass(data: any): object {
        let status;

        if (data?.status) {
            status = data?.status.toLowerCase();
            this.statusLabel = status;
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

        return {
            'span-gray': ['not exist'].includes(status),
            'span-active-gray': ['close', 'draft'].includes(status),
            'span-yellow': [
                'pulang awal',
                'pending',
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
                'canceled',
                'unprocessed',
                false,
                'end',
                'unpaid',
                'not have',
            ].includes(status),
            'span-rejected': ['rejected'].includes(status),
        };
    }

    public onDataLazyLoad(event): void {
        if (event.sortField) {
            this.sortBy =
                event.sortField + ':' + (event.sortOrder == 1 ? 'ASC' : 'DESC');
        }

        this.page = event.first / event.rows + 1;
        this.limit = event.rows;

        this.getList(new PageInfo(this.page, this.limit));
    }

    public getList(pi): void {
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
                                    ? res?.data
                                    : res?.content;

                                // console.log(this.list);
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

        return get(rowData, fieldPath);
    }

    public onSearch(body): void {
        this.body = body;
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
        if (this.page != 1) {
            let paging = { first: 0, rows: this.limit };
            this.dataView.paginate(paging);
        } else {
            this.getList(new PageInfo(1, this.limit));
        }
    }

    public onRefresh(): void {
        this.selectedData = [];
        if (this.page != 1) {
            let paging = { first: 0, rows: this.limit };
            this.dataView.paginate(paging);
        } else {
            this.getList(new PageInfo(1, this.limit));
        }
    }

    public setCompanyId(id): void {
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

    public selectionChange(event): void {
        this.selected.emit(this.selectedData);
    }

    public onKebab(action, data, op: OverlayPanel, idx): void {
        op.hide();
        this.action.emit({ data, action, index: idx });
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

    ngOnDestroy(): void {
        if (this.listSubscription) {
            this.listSubscription.unsubscribe();
        }
    }
}
