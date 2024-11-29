import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  styles: [':host { width: 100%; display: block; margin-bottom: 1.428em }'],
  imports: [CommonModule],
  selector: 'card-header',
  template: `
    <div class="grid">
      <div class="col-12 border-line">
        <div class="grid align-items-center">
          <div class="col-6">
            <ng-content select="[title]"></ng-content>
          </div>
          <div class="col-6 flex justify-content-end" style="gap: 12px">
            <ng-content select="[buttons]"></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
})
export class CardHeaderComponent {
  public ngOnInit(): void {}
}
