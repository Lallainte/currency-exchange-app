import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'toggle-custom',
    template: `
    <div class="toggle-custom">
        <p-inputSwitch [(ngModel)]="value" (onChange)="onChange()"></p-inputSwitch>
        <span>{{label}}</span>
    </div>
    `,
    styleUrls: ['./toggle.component.css']
})

export class ToggleComponent{
    @Input() label : string = 'Label';
    @Output() select = new EventEmitter<any>();
    value : boolean;

    onChange(){
        this.select.emit(this.value);
    }
}