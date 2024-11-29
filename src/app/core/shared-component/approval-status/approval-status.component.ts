import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-approval-status',
  templateUrl: './approval-status.component.html',
  styleUrls: ['./approval-status.component.scss']
})
export class ApprovalStatusComponent implements OnInit {
  @Input() status
  class;
  constructor() { 
  }

  ngOnInit(): void {
    this.class = this.status.toLowerCase()+'-text';
  }

}
