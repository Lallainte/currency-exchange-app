import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input-number-icon',
    templateUrl: 'input-number-icon.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputNumberIcon),
            multi: true,
        },
    ],
})
export class InputNumberIcon implements OnInit, ControlValueAccessor {
    @Input() public id: string | undefined = '';
    @Input() public disabled: boolean | undefined = false;
    @Input() public readonly: boolean | undefined = false;
    @Input() public leftIcon!: string | undefined;
    @Input() public rightIcon!: string | undefined;
    @Input() public isIcon: boolean = false;
    @Input() public ngClass!: any | undefined;
    @Input() public styleClass: any | undefined = '';
    @Input() public placeholder: any | undefined = '';
    @Input() public useGrouping: boolean = false;
    @Input() public value: any = '';
    @Input() public maxFractionDigits: number = 2;
    @Input() public minFractionDigits: number = 0;
    @Input() public mode: string = 'decimal'

    private onChange: (value: any) => void = () => {};
    private onTouched: () => void = () => {};

    ngOnInit(): void {}

    public writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public onInput(event: any): void {
        this.value = event;
        this.onChange(this.value);
        this.onTouched();
    }
}
