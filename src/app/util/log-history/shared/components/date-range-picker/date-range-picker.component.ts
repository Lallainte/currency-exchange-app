import { MessageService } from 'primeng/api';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ElementRef,
    AfterViewInit,
    ChangeDetectorRef,
} from '@angular/core';
import { HelpersLogHistory } from '../../../helper/helpers';

@Component({
    selector: 'app-date-range-picker',
    templateUrl: 'date-range-picker.component.html',
    styleUrls: ['date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit, AfterViewInit {
    @ViewChild('calendarDateRange') calendarDateRange: any;
    @ViewChild('opDateRange') opDateRange: any;

    @Input() startDate: number;
    @Input() endDate: number;

    @Output() apply = new EventEmitter<any>();

    dateRange = [];
    activeCommand;
    listCommands = [
        {
            label: 'Last one week',
            key: 'last-one-week',
        },
        {
            label: 'Last one month',
            key: 'last-one-month',
        },
    ];

    constructor(
        public helpLog: HelpersLogHistory,
        private cd: ChangeDetectorRef,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.showPanel();
    }

    ngAfterViewInit() {
        this.calendarDateRange.weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        this.cd.detectChanges();
    }

    onChangeCommand(key, idx) {
        if (idx === this.activeCommand) {
            this.activeCommand = null;
        } else {
            this.activeCommand = idx;
        }

        const today = new Date();

        switch (key) {
            case 'last-one-week':
                this.dateRange = [
                    new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() - 7
                    ),
                    today,
                ];
                break;

            default:
                this.dateRange = [
                    new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() - 30
                    ),
                    today,
                ];
                break;
        }
        this.cd.detectChanges();
    }

    showPanel() {
        if (this.startDate && this.endDate) {
            const date = this.helpLog.epochToDate(this.startDate, this.endDate);
            this.dateRange = [date.start, date.end];
            this.cd.detectChanges();
        } else {
            this.dateRange = [];
            this.cd.detectChanges();
        }
    }

    onApply() {
        if (this.helpLog.isDateRangeValid(this.dateRange)) {
            this.opDateRange.hide();
            this.apply.emit(this.dateRange);
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warn',
                detail: 'Warn: Date range should not exceed 30 days.',
            });
        }
    }

    onReset() {
        this.dateRange = [];
        this.activeCommand = null;
        this.cd.detectChanges();
    }
}
