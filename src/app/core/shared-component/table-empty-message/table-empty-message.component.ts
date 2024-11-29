import { CommonModule } from '@angular/common';
import { Input, OnInit, Component } from '@angular/core';

@Component({
    styles: [
        `
            :host {
                padding: 1.142em 0;
                width: 100%;
            }

            :host p {
                color: #9f9f9f;
            }
        `,
    ],
    imports: [CommonModule],
    selector: 'table-empty-message',
    template: `
        <div
            style="min-height: 9.857em"
            class="flex flex-column align-items-center justify-content-center"
        >
            <img
                src="assets/images/no-data-2.png"
                alt="Illustrator table empty message"
            />
            <p class="text-center mt-2">
                <ng-content></ng-content>
            </p>
        </div>
    `,
    standalone: true,
})
export class TableEmptyMessageComponent implements OnInit {
    @Input() public readonly message: string;

    public ngOnInit(): void {}
}
