import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnInit,
    forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type SwitchOnChangeEvent = {
    name: string;
    value: boolean;
};

type OnChange = (val: boolean) => void;
type OnTouched = () => void;

@Component({
    selector: 'linov-switch',
    styleUrls: ['./switch.component.scss'],
    templateUrl: './switch.component.html',
    providers: [
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Switch),
        },
    ],
})
export class Switch implements OnInit, ControlValueAccessor {
    private touched: boolean = false;
    private onChange: OnChange = (val: boolean) => {};
    private onTouched: OnTouched = () => {};

    @Input() value: boolean = false;
    @Input() inputId: string = '';
    @Input() disabled: boolean = false;
    @Input() labelTrue: string = 'Yes';
    @Input() labelFalse: string = 'No';

    public ngOnInit(): void {}

    public handleChange(e: InputSwitchOnChangeEvent) {
        if (!this.disabled) {
            this.writeValue(e.checked);
        }
    }

    public writeValue(value: boolean): void {
        this.value = value;

        this.onChange(this.value);
    }

    public registerOnChange(fn: OnChange): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: OnTouched): void {
        this.onTouched = fn;
    }

    public markAsTouched(): void {
        if (!this.touched) {
            this.onTouched();

            this.touched = true;
        }
    }

    public setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }
}
