import { CommonModule } from '@angular/common';
import { Input, OnInit, Component } from '@angular/core';

@Component({
  styles: [':host { width: 100%; }'],
  imports: [CommonModule],
  selector: 'field-grid',
  template: `
    <div
      class="grid"
      [ngClass]="{
        'align-items-center': alignItemsCenter
      }"
    >
      <div
        [ngClass]="[
          labelCentered ? 'center-label' : '',
          labelColLength ? 'col-' + labelColLength : ''
        ]"
      >
        <ng-content select="[label]"></ng-content>
      </div>

      <div
        *ngIf="isField"
        [ngClass]="[contentColLength ? 'col-' + contentColLength : '']"
      >
        <div *ngIf="inputCentered" class="flex align-items-center">
          <ng-content select="[altContent]"></ng-content>
        </div>

        <ng-content select="[contentField]" *ngIf="!inputCentered"></ng-content>

        <ng-content select="[helper]"></ng-content>
      </div>

      <div
        class="flex"
        *ngIf="isDetails"
        [ngClass]="[contentColLength ? 'col-' + contentColLength : '']"
      >
        <span class="mr-3">:</span>
        <ng-content select="[contentDetails]"></ng-content>
      </div>
    </div>
  `,
  standalone: true,
})
export class FieldGridComponent implements OnInit {
  @Input('type')
  public type: 'field' | 'details' = 'field';

  @Input()
  public labelCentered: boolean = true;

  @Input()
  public inputCentered: boolean = false;

  @Input()
  public labelColLength: number = 3;

  @Input()
  public contentColLength: number = 9;

  @Input()
  public alignItemsCenter: boolean = false;

  public get isField(): boolean {
    return this.type === 'field';
  }

  public get isDetails(): boolean {
    return this.type === 'details';
  }

  public ngOnInit(): void {}
}
