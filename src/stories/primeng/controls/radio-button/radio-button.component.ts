import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'radiobutton-custom',
    template: `
    <div [ngClass]="isVertical ? 'vertical' : 'horizontal'">
        <p-radioButton
            *ngFor="let item of items"
            [value]="item.value"
            [label]="item.label"
            [(ngModel)]="selected"
            (click)="onChange()"
        ></p-radioButton>
    </div>
    `,
    styleUrls: ['./radio-button.component.css']
})

export class RadioButtonComponent {
    @Input() items : any[] = [
        {label : '1', value : '1'},
        {label : '2', value : '2'},
    ];
    @Input() isVertical : boolean = true;
    @Output() select = new EventEmitter<any>();
    selected : any;

    onChange(){
        console.log(this.selected);
        this.select.emit(this.selected);
    }
}