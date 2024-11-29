import { OnInit, Input, Component } from '@angular/core';

@Component({
    styles: [
        `
            .title {
                margin-bottom: 10px;
                color: #656565;
                font-size: 20px;
                font-weight: 700;
            }
        `,
        `
            .sub-title {
                margin-bottom: 14px;
                color: #656565;
                font-size: 12px;
                font-weight: 400;
            }
        `,
        `
            .separator {
                height: 3px;
                margin: 16px 0;
                background: #e9edf4;
            }
        `,
    ],
    selector: 'sidebar-section',
    template: `
        <section class="section">
            <div class="title">{{ title }}</div>
            <div class="sub-title">{{ subTitle }}</div>

            <ng-content></ng-content>

            <div class="separator"></div>
        </section>
    `,
    standalone: true,
})
export class SidebarSection implements OnInit {
    @Input() title!: string;
    @Input() subTitle!: string;

    constructor() {}

    public ngOnInit(): void {}
}
