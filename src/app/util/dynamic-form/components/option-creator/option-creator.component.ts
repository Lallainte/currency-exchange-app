import { Input, OnInit, Output, Component, EventEmitter } from '@angular/core';

import { generateId } from '../../utils/common-functions';

@Component({
    selector: 'l-option-creator',
    templateUrl: './option-creator.component.html',
})
export class OptionCreatorComponent implements OnInit {
    @Input() public placeholder: string;
    @Input() public emptyMessage: string;
    @Input() public pluralPlaceholder: string;

    @Input() public data: any[] = [];
    @Input() public labelKey: string = 'label';
    @Input() public valueKey: string = 'value';
    @Input() public labelTitle: string = 'Label';
    @Input() public valueTitle: string = 'Value';

    @Output() public updated: any = new EventEmitter();
    @Output() public removed: any = new EventEmitter();

    public add(): void {
        const label = `${this.placeholder} ${this.data.length + 1}`;
        const value = label.toLowerCase();

        this.updated.emit({
            id: generateId(),
            [this.labelKey ?? label]: label,
            [this.valueKey ?? value]: value,
        });
    }

    public remove(index: number): void {
        this.removed.emit(index);
    }

    public ngOnInit(): void {
        this.emptyMessage = `No ${
            this.pluralPlaceholder.toLowerCase() ?? 'options'
        } found, click button Add Another to create ${this.placeholder.toLowerCase()}.`;
    }
}
