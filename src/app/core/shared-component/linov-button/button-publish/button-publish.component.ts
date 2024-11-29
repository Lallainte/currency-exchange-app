import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'btn-publish',
  templateUrl: './button-publish.component.html',
  styleUrls: ['./button-publish.component.scss']
})
export class ButtonPublishComponent implements OnInit {

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
