import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'btn-preview',
  templateUrl: './button-preview.component.html',
  styleUrls: ['./button-preview.component.scss']
})
export class ButtonPreviewComponent implements OnInit {

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
