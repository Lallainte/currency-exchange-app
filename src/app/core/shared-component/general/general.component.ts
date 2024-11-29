import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedComponentModule } from '../shared-component.module';

import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
    imports: [CommonModule, RouterModule, SharedComponentModule],
    selector: 'general-route-component',
    template: `
        <p-header>
            <div class="grid field py-2">
                <div class="col-6">
                    <app-button-back-general
                        *ngIf="isBack"
                    ></app-button-back-general>

                    <span class="font-title">{{ title | translate }}</span>

                    <app-information-view
                        [src]="manualGuideSource"
                        [title]="title"
                    ></app-information-view>
                </div>
            </div>
        </p-header>

        <router-outlet
            (activate)="onRouterOutletActivate($event)"
        ></router-outlet>
    `,
    standalone: true,
})
export class GeneralComponent {
    public title!: string | undefined;
    public isBack!: boolean | undefined;
    public manualGuideSource!: string | undefined;

    constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

    public onRouterOutletActivate(event: any): void {
        this.title = event.title;
        this.isBack = event.isBack;
        this.manualGuideSource = event.manualGuideSource;

        this._changeDetectorRef.detectChanges();
    }
}
