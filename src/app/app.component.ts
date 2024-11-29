import { PrimeNGConfig } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

import { OnInit, Component } from '@angular/core';

import {
    Router,
    RouteConfigLoadEnd,
    RouteConfigLoadStart,
} from '@angular/router';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
        <flash-message-error></flash-message-error>
        <flash-message-success></flash-message-success>
        <p-toast key="info" [baseZIndex]="9999999" styleClass="mt-7"></p-toast>
    `,
})
export class AppComponent implements OnInit {
    public menuMode: string = 'static';
    public isLoading: boolean = false;

    constructor(
        private readonly _router: Router,
        private readonly _primengConfig: PrimeNGConfig,
        private readonly _ngxSpinnerService: NgxSpinnerService
    ) {}

    public ngOnInit(): void {
        this._ngxSpinnerService.show();

        this._primengConfig.ripple = true;

        document.documentElement.style.fontSize = '14px';

        this._router.events.subscribe((event: any): void => {
            if (event instanceof RouteConfigLoadStart) {
                this._ngxSpinnerService.show();
            }

            if (event instanceof RouteConfigLoadEnd) {
                this._ngxSpinnerService.hide();
            }
        });
    }
}
