import { CheckboxChangeEvent } from 'primeng/checkbox';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type CheckboxOnChangeEvent = {
    name: string;
    value: boolean;
};

@Component({
    selector: 'linov-checkbox',
    styleUrls: ['./checkbox.component.scss'],
    templateUrl: './checkbox.component.html',
})
export class Checkbox {
    @Input() name: string = '';
    @Input() value: boolean = false;
    @Input() disabled: boolean = false;
    @Input() labelTrue: string = 'Yes';
    @Input() labelFalse: string = 'No';

    @Output() onChange = new EventEmitter<CheckboxOnChangeEvent>();

    handleChange(e: CheckboxChangeEvent) {
        this.onChange.emit({ name: this.name, value: e.checked });
    }
}
