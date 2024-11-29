import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-error-page-not-found',
    templateUrl: 'page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
    web = localStorage.getItem('web');

    constructor(private readonly _router: Router) {}

    public onReturnHome(): void {
        if (!this.web) {
            this._router.navigate(['login']);
        } else {
            this._router.navigate([this.web + '/']);
        }
    }
}
