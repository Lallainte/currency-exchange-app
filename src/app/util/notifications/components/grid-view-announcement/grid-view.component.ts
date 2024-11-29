import { isNil } from 'lodash-es';
import { AppConstant } from '../../../../core/config/app.config';
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { PageInfo } from '@core/model/page-info';
import { KebabOption } from '@core/shared-component/table/table.types';
import { OverlayPanel } from 'primeng/overlaypanel';

import { DataView } from 'primeng/dataview';
import { GridViewAnnouncementDisplayService } from './grid-view.service';

@Component({
    selector: 'app-grid-view-announcement-display',
    templateUrl: 'grid-view.component.html',
    styleUrls: ['grid-view.component.scss'],
})
export class GridViewAnnouncementDisplayComponent implements OnInit, OnDestroy {
    @ViewChild('dv') dataView: DataView;
    @Input() uri: String;
    @Input() body = { companyId: null, companyIds: null };
    @Input() list = [];
    @Input() count = 0;
    @Input() isLazy: boolean = true;
    @Input() paginator: boolean = true;
    @Input() companyId;
    @Input() isCompany: boolean = false;
    @Input() companyIds = [];
    @Input() scrollable: boolean = false;
    @Input() emptyMessage: string = 'No data found.';
    @Input() isCompanyMulti: boolean = false;

    @Output() action = new EventEmitter<any>();
    @Output() selected = new EventEmitter<any>();
    @Output() totalItem = new EventEmitter<any>();

    errors: any[] = [];
    listSubscription: Subscription;

    page = 1;
    first = 0;
    loading = false;
    statusLabel = '';
    selectedData = [];
    limit = AppConstant.rowsCard;
    rowsPerPage = AppConstant.rowsCard;
    rowsPerPageOptions = AppConstant.rowsCardOptions;

    imgData: any[] = [];

    constructor(
        private readonly cd: ChangeDetectorRef,
        private readonly srv: GridViewAnnouncementDisplayService
    ) {}

    ngOnInit() {}

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
            'span-blue': ['open', 'processed'].includes(status),
            'span-gray': ['not exist'].includes(status),
            'span-yellow': [
                'pulang awal',
                'pending',
                'draft',
                'not exist',
                'rollback',
            ].includes(status),
            'span-active-secondary': [
                'active',
                'hadir',
                'approved',
                'publish',
                'published',
                'reviewed',
                true,
            ].includes(status),
            'span-inactive-secondary': [
                'inactive',
                'tidak hadir',
                'terlambat',
                'rejected',
                'canceled',
                'unprocessed',
                false,
            ].includes(status),
        };
    }

    onDataLazyLoad(event) {
        this.page = event.first / event.rows + 1;
        this.limit = event.rows;

        this.getList(new PageInfo(this.page, this.limit));
    }

    getList(pi) {
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
                    .getList(this.uri, pi, this.body)
                    .subscribe({
                        next: async (res) => {
                            if (res) {
                                this.list = res?.data
                                    ? res?.data
                                    : res?.content;

                                this.count = res?.paging
                                    ? res?.paging?.totalItem
                                    : res?.totalElements
                                    ? res?.totalElements
                                    : res?.data?.length;
                                this.totalItem.emit(this.count);

                                this.loading = false;
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

    onClickRow(data, idx) {
        this.action.emit({ data, index: idx });
    }

    onSearch(body) {
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

    onRefresh() {
        this.selectedData = [];
        if (this.page != 1) {
            let paging = { first: 0, rows: this.limit };
            this.dataView.paginate(paging);
        } else {
            this.getList(new PageInfo(1, this.limit));
        }
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

    selectionChange(event) {
        this.selected.emit(event);
    }

    onKebab(action, data, op: OverlayPanel, idx) {
        op.hide();
        this.action.emit({ data, action, index: idx });
    }

    getImageUrl(item): string {
        const foundItem = item.bannerFile?.file.base;
        if (foundItem) {
            try {
                const imageUrl = this.base64toUrl(foundItem);
                return imageUrl;
            } catch (error) {
                return 'assets/images/no-image-announcement.png';
            }
        } else {
            return 'assets/images/no-image-announcement.png';
        }
    }

    base64toUrl(base64String: string): string {
        return 'data:image/*;base64,' + base64String;
    }

    formatDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    }

    ngOnDestroy(): void {
        if (this.listSubscription) {
            this.listSubscription.unsubscribe();
        }
    }
}
