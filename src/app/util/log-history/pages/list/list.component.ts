import { PageInfo } from 'src/app/core/model/page-info';
import { AppConstant } from '@core/config/app.config';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LogHistoryService } from '../../service/log-history.service';
import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { HelpersLogHistory } from '../../helper/helpers';
import { DateRangePickerComponent } from '../../shared/components/date-range-picker/date-range-picker.component';

@Component({
    selector: 'app-list-log-history',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss'],
})
export class ListComponentLogHistory implements OnInit, OnDestroy {
    @ViewChild('dateRangePicker') dateRangePicker: DateRangePickerComponent;

    uri = `logs/user`;
    web = localStorage.getItem('web');
    text = {
        title: 'logHistory',
        subTitle: 'historyList',
    };
    role = this.route.snapshot.paramMap.get('role');
    body = null;
    page = 1;
    first = 0;
    limit = AppConstant.rowsPerPage;
    loading: boolean = false;
    isAdmin: boolean;
    session: any = null;
    listData = [];
    listGroup = [];
    formFilter: UntypedFormGroup;
    loadingScroll: boolean = false;
    maxDataReached: boolean = false;
    listSubcription: Subscription;
    openedIndexLogs: number[] = [];
    selectedEmployee: string = '';
    openedIndexDateKey: number[] = [];
    selectedDataEmployee = null;
    visibleEmployeeSelect: boolean = false;

    constructor(
        private fb: UntypedFormBuilder,
        private srv: LogHistoryService,
        private route: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef,
        public helpLog: HelpersLogHistory
    ) {
        this.createFormFilter();
    }

    ngOnInit() {
        this.checkRole();
        this.calculateRangeOfDays();
    }

    createFormFilter() {
        this.formFilter = this.fb.group({
            start: [null],
            end: [null],
            module: [null],
            user: [null],
            menu: [null],
            company: [null],
        });
    }

    checkRole() {
        if (this.role == 'admin') {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
        }
    }

    calculateRangeOfDays(startDate?, endDate?): void {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        let usedStartDate, usedEndDate;

        if (startDate && !this.helpLog.isValidDate(startDate)) {
            this.cd.detectChanges();
        }

        if (endDate && !this.helpLog.isValidDate(endDate)) {
            this.cd.detectChanges();
        }
        // usedStartDate = startDate ? new Date(startDate) : startOfMonth;
        usedStartDate = startDate
            ? new Date(startDate)
            : new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() - 30
              );
        usedEndDate = endDate ? new Date(endDate) : today;
        if (usedStartDate > usedEndDate) {
            this.cd.detectChanges();
        }
        const epoch = this.helpLog.dateToEpoch(usedStartDate, usedEndDate);

        this.formFilter.get('start').patchValue(epoch.start);
        this.formFilter.get('end').patchValue(epoch.end);

        this.onFilter(this.formFilter.getRawValue());
    }

    onApplyDateRange(date) {
        this.calculateRangeOfDays(date[0], date[1]);
    }

    public formatDateKey(dateKey) {
        const dateParts = dateKey.split('-');
        const formattedDate = new Date(
            `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
        );

        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        };
        const result = formattedDate.toLocaleDateString('en-GB', options);

        const today = new Date();
        const isToday = formattedDate.toDateString() === today.toDateString();

        if (isToday) {
            return `Today - ${result}`;
        }

        return result;
    }

    selectFilter(e, key) {
        switch (key) {
            case 'company':
                this.formFilter.get(key).patchValue(e.id);
                break;
            case 'module':
                this.formFilter.get(key).patchValue(e.id);
                break;
            case 'user':
                this.formFilter.get(key).patchValue(e.id);
                this.selectedEmployee = `${e.nik} - ${e.fullName}`;
                this.selectedDataEmployee = e;
                break;
            case 'menu':
                this.formFilter.get(key).patchValue(e.id);
                break;
            default:
                break;
        }
        this.onFilter(this.formFilter.getRawValue());
    }

    getList(pi, infinite = false) {
        if (!infinite) this.loading = true;
        else this.loadingScroll = true;
        this.cd.detectChanges();
        if (this.uri) {
            if (!this.maxDataReached) {
                this.listSubcription = this.srv
                    .get(this.uri, pi, this.body)
                    .subscribe({
                        next: ({ data }) => {
                            if (data && data.length > 0) {
                                if (infinite) {
                                    this.listData = this.listData.concat(data);
                                } else {
                                    this.listData = data;
                                }

                                this.listGroup = this.helpLog.groupDataByIdDate(
                                    this.listData
                                );
                                this.loading = false;
                                this.loadingScroll = false;
                                this.cd.detectChanges();
                            } else {
                                if (!infinite) {
                                    this.listData = [];
                                    this.listGroup = [];
                                }
                                this.loading = false;
                                this.loadingScroll = false;
                                this.maxDataReached = true;
                                this.cd.detectChanges();
                            }
                        },
                        error: (err) => {
                            this.loading = false;
                            this.loadingScroll = false;
                            this.maxDataReached = true;
                            this.cd.detectChanges();
                        },
                    });
            } else {
                this.loading = false;
                this.loadingScroll = false;
                this.maxDataReached = true;
                this.cd.detectChanges();
            }
        } else {
            this.loading = false;
            this.loadingScroll = false;
            this.maxDataReached = true;
            this.cd.detectChanges();
        }
    }

    onFilter(body) {
        this.body = body;
        this.page = 1;
        this.maxDataReached = false;
        this.getList(new PageInfo(this.page, this.limit));
    }

    onClickShowMore(event: Event, idx) {
        event.stopPropagation();
        const indexInOpenedIndexLogs = this.openedIndexLogs.indexOf(idx);

        if (indexInOpenedIndexLogs !== -1) {
            this.openedIndexLogs.splice(indexInOpenedIndexLogs, 1);
        } else {
            this.openedIndexLogs.push(idx);
        }
    }

    onClickDateKey(idx) {
        const indexInOpenedIndexDateKey = this.openedIndexDateKey.indexOf(idx);

        if (this.listGroup.length === idx + 1) {
            this.maxDataReached = !this.maxDataReached;
        }

        if (indexInOpenedIndexDateKey !== -1) {
            this.openedIndexDateKey.splice(indexInOpenedIndexDateKey, 1);
        } else {
            this.openedIndexDateKey.push(idx);
        }
    }

    onScrollNearEnd() {
        this.getList(new PageInfo(++this.page, this.limit), true);
    }

    showDialogEmpSelect() {
        this.visibleEmployeeSelect = true;
    }

    hideDialogEmpSelect() {
        this.visibleEmployeeSelect = false;
    }

    onClickCardLog(id: any) {
        const queryParams: NavigationExtras = {
            queryParams: id,
        };
        this.router.navigate(
            [`/util/log-history/${this.role}/detail`],
            queryParams
        );
    }

    onResetFilter() {
        this.formFilter.reset();
        this.selectedDataEmployee = null;
        this.selectedEmployee = '';
        this.calculateRangeOfDays();
        this.dateRangePicker.showPanel()
    }

    ngOnDestroy(): void {
        if (this.listSubcription) {
            this.listSubcription.unsubscribe();
        }
    }
}
