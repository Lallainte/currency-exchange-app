import { CheckboxOnChangeEvent } from '../checkbox/checkbox.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type CheckboxMultiselectOnChange = {
    name: string;
    value: boolean;
};

@Component({
    selector: 'linov-checkboxMultiselect',
    styleUrls: ['./checkbox-multiselect.component.scss'],
    templateUrl: './checkbox-multiselect.component.html',
})
export class CheckboxMultiselect {
    @Input() name: string = '';
    @Input() options: any[] = [];
    @Input() labelTrue: string = 'Yes';
    @Input() labelFalse: string = 'No';
    @Input() placeholder: string = '';
    @Input() checkboxName: string = '';
    @Input() checkboxValue: boolean = false;
    @Input() multiSelectName: string = '';
    @Input() selectedOptions: any[] = [];
    @Input() disabledCheckbox: boolean = false;
    @Input() disabledMultiCheckbox: boolean = false;

    @Output() onCheckboxChange = new EventEmitter<CheckboxOnChangeEvent>();
    @Output() onMultiSelectChange = new EventEmitter<any>();

    handleCheckboxChange(e: CheckboxOnChangeEvent) {
        this.checkboxValue = e.value;

        this.onCheckboxChange.emit({
            name: this.name,
            value: this.checkboxValue,
        });
    }
}
