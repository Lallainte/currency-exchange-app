import { Input, OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-information-view',
    templateUrl: './information-view.component.html',
    styleUrls: ['./information-view.component.scss'],
})
export class InformationViewComponent implements OnInit {
    @Input()
    public src: string = '';

    @Input()
    public title: string = '';

    public initialHeightContent!: number | undefined;

    public visibleModalInformation: boolean = false;

    public handleMaximizeModalInformation({
        maximized,
    }: {
        maximized: boolean;
    }): void {
        const content: HTMLElement = document.querySelector('.zoom');

        this.initialHeightContent = parseInt(content.style.height);

        if (maximized) {
            content.style.height = 'calc(100vh - 72px)';
        } else {
            content.style.height = this.initialHeightContent + 'px';
        }
    }

    public ngOnInit(): void {}
}
