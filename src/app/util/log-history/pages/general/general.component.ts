import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-general-log-history',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.scss'],
})
export class GeneralComponentLogHistory implements OnInit {
    text = {
        title: 'logHistory',
    };
    isBack: boolean = false;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit(): void {}

    onRouterOutletActivate(val: any) {
        this.isBack = val.isBack;
        this.text.title = val.text.title;

        this.cd.detectChanges();
    }
}
