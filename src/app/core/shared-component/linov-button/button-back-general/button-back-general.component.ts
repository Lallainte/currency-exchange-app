import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
    selector: 'app-button-back-general',
    templateUrl: './button-back-general.component.html',
    styleUrls: ['./button-back-general.component.scss'],
})
export class ButtonBackComponent {
    constructor(private location: Location) {}
    onBack() {
        this.location.back();
    }
}
