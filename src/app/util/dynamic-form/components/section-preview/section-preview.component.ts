import { CommonModule } from '@angular/common';
import { Input, OnInit, Component } from '@angular/core';

@Component({
    imports: [CommonModule],
    template: ` <div
        style="
            margin: 25px 0;
            border: 2px dashed #eee;
            border-radius: 8px;
            padding: 30px;
            background: #fff;
            box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        "
        [ngStyle]="{
            width: dropSectionWidth
        }"
    >
        <div class="section-title">{{ title }}</div>
    </div>`,
    selector: 'section-preview',
    standalone: true,
})
export class SectionPreviewComponent implements OnInit {
    @Input() public title!: string;
    @Input() public dropSectionWidth!: string;

    public ngOnInit(): void {}
}
