import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'ghost-button',
  template: `
    <button 
    type="button" 
    [ngClass]="classess" 
    [disabled]="disabled"
    [ngStyle]="{'border-color' : borderColor, 'color' : borderColor}">
    <i *ngIf="icon" [class]="icon"></i>
    {{label}}
    </button>
    `,
  styleUrls: ['./ghost-button.css']
})

export default class GhostButton {
  @Input() label: string = 'Button';
  @Input() disabled: boolean = false;
  @Input() borderColor?: string = "#0E8EC5";
  @Input() classess?: string;
  @Input() icon? : string;
  @Output() click = new EventEmitter<any>();

  onClick(event : any){
    this.click.emit(event);
  }
}