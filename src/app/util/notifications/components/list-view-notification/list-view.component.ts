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
import { Subscription } from 'rxjs';
import { PageInfo } from '@core/model/page-info';
import { DataView } from 'primeng/dataview';
import { ListViewNotificationService } from './list-view.service';
import {
    format,
    formatDistanceToNow,
    formatRelative,
    differenceInMilliseconds,
    formatDistanceToNowStrict,
} from 'date-fns';

@Component({
    selector: 'app-list-view-notification',
    templateUrl: 'list-view.component.html',
    styleUrls: ['list-view.component.scss'],
})
export class ListViewNotification implements OnInit, OnDestroy {
    @ViewChild('dv') dataView: DataView;
    @Input() uri: string;
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
    limit = AppConstant.rowsPerPage;
    rowsPerPage = AppConstant.rowsPerPage;
    rowsPerPageOptions = AppConstant.rowsPerPageOptions;

    imgData: any[] = [];

    constructor(
        private readonly cd: ChangeDetectorRef,
        private readonly srv: ListViewNotificationService
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
                this.list = [];
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

                                // const promises = this.list.map((item) =>
                                //     this.getImageAnnouncement(item.id)
                                // );
                                // const images = await Promise.all(promises);
                                // this.imgData = images.filter(
                                //     (img) => img !== undefined
                                // );

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

    onKebab(action, data, idx) {
        this.action.emit({ data, action, index: idx });
    }

    async getImageAnnouncement(id) {
        try {
            const { data } = await this.srv.get(id).toPromise();
            if (data.bannerFile) {
                return data;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getImageUrl(item): string {
        const foundItem = this.imgData.find(
            (imgItem) => imgItem.id === item.id
        );
        if (foundItem) {
            try {
                const imageUrl = this.base64toUrl(
                    foundItem.bannerFile.file.base
                );
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
        const inputDate = new Date(dateString);
        const currentDate = new Date();

        const millisecondsDiff = currentDate.getTime() - inputDate.getTime();
        const daysDiff = Math.floor(millisecondsDiff / (1000 * 3600 * 24));
        const weeksDiff = Math.floor(daysDiff / 7);

        if (daysDiff === 0) {
            return 'Today';
        } else if (daysDiff >= 1 && daysDiff <= 6) {
            return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
        } else if (weeksDiff >= 1 && weeksDiff <= 3) {
            return `${weeksDiff === 1 ? 'A week' : `${weeksDiff} weeks`} ago`;
        } else {
            const formattedDate = `${inputDate.getDate()} ${this.getMonthName(
                inputDate.getMonth()
            )} ${inputDate.getFullYear()}`;
            return formattedDate;
        }
    }

    getMonthName(month: number): string {
        const months = [
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
        return months[month];
    }

    ngOnDestroy(): void {
        if (this.listSubscription) {
            this.listSubscription.unsubscribe();
        }
    }
}
