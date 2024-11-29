import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'checkbox-custom',
    template: `
    <div [ngClass]="isVertical ? 'vertical' : 'horizontal'">
        <p-checkbox
            *ngFor="let item of items"
            [label]="item.label"
            [value]="item.value"
            [(ngModel)]="selected"
            (onChange)="onChange()"
            >
        </p-checkbox>
    </div>
    `,
    styleUrls: ['./checkbox.component.css']
})

export class CheckboxComponent{
    @Input() items: any[] = [
        {label : '1', value : '1'},
        {label : '2', value : '2'},
    ];
    @Input() isVertical : boolean = true;
    @Output() select = new EventEmitter<any>();
    selected: any[];

    onChange(){
        this.select.emit(this.selected);
    }
}