import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'c-inputEditor',
    template: `<p-editor
        [(ngModel)]="text"
        [style]="{ height: '320px' }"
    ></p-editor>`,
    styleUrls: [],
})
export default class InputEditor {}
