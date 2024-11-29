import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'btn-reminder',
  templateUrl: './button-reminder.component.html',
  styleUrls: ['./button-reminder.component.scss']
})
export class ButtonReminderComponent implements OnInit {
  @Input() message = 'Are you sure to remind the approver?';
  @Input() header = 'Remind Approver';
  @Input() isSmall = false;
  @Input() disabled = false;
  @Input() isNeedConfirmation = true;
  @Input() icon = 'fas fa-bell';
  @Output() onClick = new EventEmitter<any>();
  isShow = false;
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
  }

  onRemind() {
    this.onClick.emit();
  }

  click() {
    if (this.isNeedConfirmation) {
      this.isShow = true;
      this.confirmationService.confirm({
        message: this.message,
        header: this.header,
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        rejectButtonStyleClass: 'confirm-button-no',
        acceptButtonStyleClass: 'confirm-button-yes',
        accept: () => {
          this.isShow = false;
          this.confirmationService.close();
          this.onRemind();
        },
        reject: () => {
          this.isShow = false;
          this.confirmationService.close();
        },
      });
    } else {
      this.onRemind();
    }
  }
}
