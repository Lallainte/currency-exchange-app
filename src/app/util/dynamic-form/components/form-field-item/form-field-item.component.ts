import { Component, Input } from '@angular/core';

@Component({
    selector: 'form-field-item',
    styleUrls: ['./form-field-item.component.scss'],
    templateUrl: './form-field-item.component.html',
})
export class FormFieldItemComponent {
    @Input() public readonly name!: string;
}
