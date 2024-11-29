import { HelperService } from '@core/service/helper-service';
import { AbstractControl } from '@angular/forms';
import { Input, OnInit, Component } from '@angular/core';

@Component({
    template: `
        <div class="mt-2 p-error" *ngIf="visible()">
            <span class="p-error-empty" *ngIf="isError('required')"></span>

            <span class="p-error-email" *ngIf="isError('email')"></span>

            <span *ngIf="isError('max')">
                tidak boleh melebihi {{ formControlKey.errors.max.max }}
            </span>

            <span *ngIf="isError('min')">
                tidak boleh lebih kecil dari {{ formControlKey.errors.min.min }}
            </span>

            <span *ngIf="isError('dateLessThan')">
                Please choose a date that is not in the future
            </span>

            <span *ngIf="isError('dateGreaterThan')">
                Please choose a date that is not in the past
            </span>

            <span *ngIf="isError('confirmedValidator')">
                {{ formControlKey.errors.confirmedValidator }}
            </span>

            <span *ngIf="isError('isZero')"> Value cannot be zero. </span>
            <span *ngIf="isError('nonProgressive')">
                Plan cannot be less than the previous month’s plans</span
            >
            <span *ngIf="isError('exceedsTarget')">
                Value cannot exceed the target
            </span>
            <span *ngIf="isError('exceedsMaxValue')">
                Value should not exceed
                {{ formControlKey.errors.exceed }}.
            </span>
            <span *ngIf="isError('valueMismatch')">
                The weight must be exactly
                {{ formControlKey.errors.expected }} but was
                {{ formControlKey.errors.actual }}.
            </span>
        </div>
    `,
    selector: 'app-error-field-helper',
})
export class ErrorFieldHelperComponent implements OnInit {
    @Input()
    public readonly delayedTouched?: boolean | undefined;

    @Input()
    public readonly formControlKey: AbstractControl;

    constructor(private readonly _helperService: HelperService) {}

    public isError(key: string): boolean {
        return this.formControlKey.hasError(key);
    }

    public visible(): boolean {
        return this._helperService.isInvalidControl(
            this.formControlKey,
            this.delayedTouched
        );
    }

    public ngOnInit(): void {}
}
