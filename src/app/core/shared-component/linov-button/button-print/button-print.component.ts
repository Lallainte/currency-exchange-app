import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'btn-print',
  templateUrl: './button-print.component.html',
  styleUrls: ['./button-print.component.scss']
})
export class ButtonPrintComponent implements OnInit {

  @Input() disabled = false;
  @Input() isSmall = false;
  @Output() onClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  click(){
    this.onClick.emit();
  }
}
