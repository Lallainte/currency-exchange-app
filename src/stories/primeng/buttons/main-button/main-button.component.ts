import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'main-button',
  template: `
    <button 
    pButton
    [label]="label"
    type="button" 
    [ngClass]="classess" 
    [disabled]="disabled"
    [icon]="icon"
    [iconPos]="iconPos"
    [ngStyle]="{'background-color' : backgroundColor}">
    <span style="margin-left: 0.5em;" *ngIf="isCounter">&#40;{{count}}&#41;</span>
    </button>
    `,
  styleUrls: ['./main-button.css']
})

export default class MainButton {
  @Input() label: string = 'Button';
  @Input() backgroundColor: string = "#0E8EC5";
  @Input() iconPos : string = "left";
  @Input() disabled: boolean = false;
  @Input() classess?: string;
  @Input() icon? : string;
  @Output() click = new EventEmitter<any>();
  @Input() isCounter : boolean = false;
  @Input() count? : number;

  onClick(event : any){
    this.click.emit(event);
  }
}