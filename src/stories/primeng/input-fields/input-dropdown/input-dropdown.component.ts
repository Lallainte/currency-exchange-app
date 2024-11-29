import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'c-dropdown',
    template: `<p-dropdown
        [options]="cities"
        [(ngModel)]="selectedCity"
        optionLabel="name"
        [disabled]="disabled"
    ></p-dropdown>`,
    styleUrls: [],
})
export default class InputDropdown {
    @Input() disabled: boolean = false;
    cities;
    selectedCity;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' },
        ];
    }
}
