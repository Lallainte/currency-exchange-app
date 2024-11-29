import { Component, Input, isDevMode } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
    selector: 'form-logger',
    template: `
        <ng-container *ngIf="isDev">
            <h3>Store</h3>
            <code>
                {{ storeItem | json }}
            </code>
            <hr />
            <h3>Form State</h3>
            <code>
                {{ formValue?.getRawValue() | json }}
            </code>
        </ng-container>
    `,
})
export class LoggerComponent {
    @Input() storeItem: any;
    @Input() formValue: FormGroup | FormArray;

    constructor() {}

    /**
     *  Get Environment is Dev or Not
     *  @return boolean
     */
    get isDev(): boolean {
        return isDevMode();
    }
}
