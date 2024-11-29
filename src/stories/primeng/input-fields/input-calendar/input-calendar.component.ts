import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'c-calendar',
    template: `<p-calendar
        placeholder="Select Date"
        [showTime]="isTime"
        [showIcon]="isIcon"
        [disabled]="disabled"
    ></p-calendar>`,
    styleUrls: [],
})
export default class InputCalendar {
    @Input() disabled: boolean = false;
    @Input() isIcon: boolean = false;
    @Input() isTime: boolean = false;
}
