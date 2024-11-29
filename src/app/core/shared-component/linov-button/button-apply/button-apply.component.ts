import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'btn-apply',
  templateUrl: './button-apply.component.html',
  styleUrls: ['./button-apply.component.scss']
})
export class ButtonApplyComponent implements OnInit {

  @Input() disabled = false;
  @Input() isSmall = false;
  @Output() onClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  click() {
    this.onClick.emit();
  }
}
