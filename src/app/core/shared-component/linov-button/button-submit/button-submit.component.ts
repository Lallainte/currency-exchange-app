import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'btn-submit',
  templateUrl: './button-submit.component.html',
  styleUrls: ['./button-submit.component.scss']
})
export class ButtonSubmitComponent {
  @Input() message = 'Are you sure to submit this data?'
  @Input() header = 'Submit Data'
  @Input() routeUrl;
  @Input() isSmall = false;
  @Input() disabled = false;
  @Input() isNeedConfirmation = true;
  @Output() onClick = new EventEmitter<any>();
  isShow = false;
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  onCancel() {
    if (this.routeUrl) {
      this.router.navigate([this.routeUrl]);
    } else {
      this.onClick.emit();
    }
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
          this.onCancel();
        },
        reject: () => {
          this.isShow = false;
          this.confirmationService.close();
        },
      });
    } else {
      this.onCancel();
    }
  }
}
