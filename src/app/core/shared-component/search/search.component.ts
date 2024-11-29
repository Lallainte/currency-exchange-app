import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    ViewChildren,
    QueryList,
} from '@angular/core';
import {
    UntypedFormGroup,
    UntypedFormBuilder,
    Validators,
    UntypedFormControl,
} from '@angular/forms';
import { ElementContainer } from 'html2canvas/dist/types/dom/element-container';
import { HelperService } from 'src/app/core/service/helper-service';
import { LovComponent } from '@shared/lov/lov.component';
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    @ViewChildren('lovs') lovs: QueryList<LovComponent>;
    searchValue: string;
    @Input() uri: string;
    @Input() label: string;
    @Input() isFilter: boolean = false;
    @Input() isFilterGroup: boolean = false;
    @Input() isCompany: boolean = false;
    @Input() isCompanyMulti: boolean = false;
    @Input() isMovementType: boolean = false;
    @Input() isAttendanceType: boolean = false;
    @Input() isMovementDate: boolean = false;
    @Input() isLanguages: boolean = false;
    @Input() isReview: boolean = false;
    @Input() customFilterLabel;
    @Input() customFilterKey;
    @Input() customFilterGroup: any[] = [];
    @Input() isFilterLov: boolean = false;
    @Input() placeholder = 'All Status';
    @Input() disabled = false;
    @Input() chaining = false;
    @Input() filterCustomOptions: any[] | undefined;
    @Input() defaultFilter;
    searchStatus: any;
    status: boolean = true;
    items = [
        {
            label: 'All Status',
            value: '',
        },
        {
            label: 'Active',
            value: true,
        },
        { label: 'Inactive', value: false },
    ];
    appItems = [
        {
            label: 'All Status',
            value: '',
        },
        {
            label: 'Approved',
            value: 'APPROVED',
        },
        { label: 'Pending', value: 'PENDING' },
        { label: 'Canceled', value: 'CANCELED' },
        { label: 'Rejected', value: 'REJECTED' },
        { label: 'Draft', value: 'DRAFT' },
    ];
    appStatus = [
        {
            label: 'All Status',
            value: '',
        },
        {
            label: 'Processed',
            value: 'Processed',
        },
        { label: 'Unprocessed', value: 'Unprocessed' },
        { label: 'Rollback', value: 'Rollback' },
    ];
    appLearningType = [
        {
            label: 'All Learning Type',
            value: '',
        },
        {
            label: 'Training',
            value: 'Training',
        },
        { label: 'E-Learning', value: 'E-Learning' },
    ];
    appPeriod = [
        {
            label: 'All Period',
            value: '',
        },
        {
            label: 'Jan - Apr',
            value: 'Jan - Apr',
        },
        { label: 'May - Aug', value: 'May - Aug' },
        { label: 'Sep - Dec', value: 'Sep - Dec' },
    ];
    filter;
    approval = this.appItems[0];
    process = this.appStatus[0];
    learningType = this.appLearningType[0];
    period = this.appPeriod[0];
    rangeDates: Date[];
    formSearch: UntypedFormGroup;
    @Input() isActive: boolean;
    @Input() isApproval: boolean = false;
    @Input() isDate: boolean = false;
    @Input() isDateRange: boolean = false;
    @Input() isProcess: boolean = false;
    @Input() isLearningType: boolean = false;
    @Input() isPeriod: boolean = false;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private help: HelperService
    ) {
        this.formSearch = this.formBuilder.group({
            inquiry: null,
            isActive: null,
            status: null,
            date: null,
            companyId: null,
            startDate: null,
            endDate: null,
        });
        this.searchStatus = [
            {
                label: 'Active',
                value: true,
            },
            { label: 'Inactive', value: false },
        ];
    }

    @Output() refresh = new EventEmitter<boolean>();
    @Output() search = new EventEmitter<UntypedFormGroup | any>();
    @Output() companyId = new EventEmitter<any>();
    @Output() groupId = new EventEmitter<UntypedFormGroup>();
    @Output() selectedLov = new EventEmitter();

    ngOnInit() {

        this.searchValue = '';

        if (this.customFilterLabel) {
            this.items = this.customFilterLabel;
            this.filter = this.items[0];
        } else {
            this.filter = this.items[0].value;
        }

        if (this.customFilterKey) {
            this.formSearch.addControl(
                this.customFilterKey,
                new UntypedFormControl('')
            );
        }

        if (this.customFilterGroup.length > 0) {
            this.customFilterGroup.forEach((element) => {
                this.formSearch.addControl(
                    element.key,
                    new UntypedFormControl('')
                );
            });
        }
    }
    ngAfterViewInit() {
        if (this.defaultFilter) {
            if (this.defaultFilter.approval) {
                this.approval = this.defaultFilter.approval.toUpperCase()
                this.formSearch
                    .get('status')
                    .patchValue(this.defaultFilter.approval.toUpperCase());
            }
            this.setValueBeforeSearch();
        }
    }

    onRefresh() {
        this.formSearch.reset();
        let body = this.formSearch.value;
        body.isRefresh = true;
        let childList = this.lovs.toArray();

        childList.forEach((child) => {
            child.reset();
        });
        this.filter = this.items[0];
        this.approval = this.appItems[0];
        this.process = this.appStatus[0];
        this.rangeDates = null;
        this.search.emit(body);
        this.refresh.emit(true);
    }

    onPosSearch() {
        this.setValueBeforeSearch();
    }
    changeStatus(e) {
        let formName = this.customFilterKey
            ? this.customFilterKey
            : this.customFilterLabel
                ? 'status'
                : 'isActive';
        this.formSearch.get(formName).patchValue(e);
        this.setValueBeforeSearch();
    }
    changeStatusApproval(e) {
        this.formSearch.get('status').patchValue(e);
        this.setValueBeforeSearch();
    }

    changeStatusProcess(e) {
        this.formSearch.get('status').patchValue(e);
        this.setValueBeforeSearch();
    }

    onSelectDate(e) {
        this.formSearch.get('date').patchValue(e);
        this.setValueBeforeSearch();
    }

    onSelectDateRange() {
        if (this.rangeDates[0] instanceof Date && !this.rangeDates[1]) {
            this.formSearch.get('startDate').patchValue(this.rangeDates[0]);
            this.setValueBeforeSearch();
        }

        if (this.rangeDates[1] instanceof Date) {
            this.formSearch.get('endDate').patchValue(this.rangeDates[1]);
            this.setValueBeforeSearch();
        }
    }

    setValueBeforeSearch() {
        let body = this.formSearch.getRawValue();
        body.date = this.help.formatDate(body?.date);
        body.startDate = this.help.formatDate(body?.startDate);
        body.endDate = this.help.formatDate(body?.endDate);
        this.search.emit(body);
    }

    selectCompany(e) {
        this.companyId.emit(e.id);
    }
    isCompanySet = false;
    companyList = [];
    selectCompanyMulti(e) {
        this.companyId.emit(e);
        this.companyList = e;
        this.isCompanySet = true;
    }

    selectedFilterGroup(e, key) {
        let ids = [];
        e.forEach((element) => {
            ids.push(element.id);
        });
        this.formSearch.get(key).patchValue(ids);
        let body = this.formSearch.getRawValue();
        this.search.emit(body);
    }

    selectedFilter(e, key?) {
        if (key) {
            this.formSearch.get(key).patchValue(e.id);
            let body = this.formSearch.getRawValue();
            this.search.emit(body);
        }
        this.selectedLov.emit(e);
    }

    selectedFilterCustomOption(e, key) {
        this.search.emit({ [key]: e?.value });
    }
}
