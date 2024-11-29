import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-enhanced-textarea',
    template: `<textarea
        pInputTextarea
        [(ngModel)]="value"
        (ngModelChange)="onInput($event)"
        [rows]="rows"
        [cols]="cols"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [autoResize]="autoResize"
        [maxlength]="maxlength"
        [minlength]="minlength"
        [required]="required"
        [style]="style"
        [class]="class"
        [ngClass]="ngClass"
        (keydown)="disableEnterKey($event)"
    ></textarea>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EnhancedTextAreaComponent),
            multi: true,
        },
    ],
})
export class EnhancedTextAreaComponent implements OnInit {
    @Input() public rows!: number | undefined;
    @Input() public cols!: number | undefined;
    @Input() public placeholder: any | undefined = 'Enter Activity Plan Name';
    @Input() public disabled: boolean | undefined = false;
    @Input() public autoResize: boolean | undefined = true;
    @Input() public maxlength!: number | undefined;
    @Input() public minlength!: number | undefined;
    @Input() public required: boolean | undefined = false;
    @Input() public style!: any | undefined;
    @Input() public class!: string | undefined;
    @Input() public ngClass!: any | undefined;
    @Input() public value: any = '';

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

    public disableEnterKey(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }
}
