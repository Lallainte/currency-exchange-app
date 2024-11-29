import { CommonModule } from '@angular/common';
import { MoveComponent } from '../move/move.component';
import { Input, OnInit, Component } from '@angular/core';

@Component({
    imports: [CommonModule, MoveComponent],
    selector: 'item-preview',
    template: ` <div
        style="
            display: flex;
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 10px 14px;
            background: #fff;
        "
        [ngStyle]="{
            width: dropListWidth,
            borderLeft: required && '3px solid #0e8ec5'
        }"
    >
        <div style="flex: 1">{{ title }}</div>
        <div style="flex: 1">{{ type }}</div>
        <move style="display: flex; gap: 2px; color: #cbd6e2;"></move>
    </div>`,
    standalone: true,
})
export class ItemPreviewComponent implements OnInit {
    @Input() public type!: string;
    @Input() public title!: string;
    @Input() public required!: boolean;
    @Input() public dropListWidth!: string;

    public ngOnInit(): void {}
}
