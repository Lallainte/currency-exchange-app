import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { Input, OnInit, Output, Component, EventEmitter } from '@angular/core';
import { generateId, toTitleCase } from '../../utils/common-functions';

interface Choice {
    id: string;
    label: string;
    value: string;
}

const initialValueChoices: Choice[] = [
    {
        id: generateId(),
        label: 'Choice 1',
        value: 'choice 1',
    },
];

@Component({
    selector: 'l-box',
    styleUrls: ['./box.component.scss'],
    templateUrl: './box.component.html',
})
export class BoxComponent implements OnInit {
    @Input() public data!: any;
    @Input() public type!: string;
    @Input() public isDragStart!: boolean;

    @Output() public onSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onRemove: EventEmitter<any> = new EventEmitter<any>();

    public boxData: any = null;
    public visible: boolean = false;
    public choices: Choice[] = [...initialValueChoices];
    public calendarViews: Choice[] = [
        {
            id: generateId(),
            label: 'Date',
            value: 'date',
        },
        {
            id: generateId(),
            label: 'Month',
            value: 'month',
        },
        {
            id: generateId(),
            label: 'Year',
            value: 'year',
        },
    ];
    public lovTemplates: Choice[] = [
        {
            id: generateId(),
            label: 'Company',
            value: 'company',
        },
    ];
    public lovOptionLabels: Choice[] = [];
    public acceptFiles: any[] = [
        { id: generateId(), label: 'All', value: 'all' },
        { id: generateId(), label: 'Docs', value: 'docs' },
        { id: generateId(), label: 'Excel', value: 'excel' },
        { id: generateId(), label: 'Image', value: 'image' },
    ];

    public get isNotAChoiceType() {
        return !['Switch', 'Radio', 'Attachment'].includes(this.boxData.type);
    }

    public get valueSwitchPreview() {
        return this.boxData.value || this.boxData.defaultValue;
    }

    public get valueInputNumber(): number {
        const { value, defaultValue } = this.data;

        if (typeof value === 'number') {
            return value;
        }

        return defaultValue;
    }

    public save(): void {
        this.visible = false;

        if (this.type === 'Radio' || this.type === 'Dropdown') {
            if (this.choices.length) {
                this.boxData.values = this.choices;
            }
        }

        this.onSave.emit(this.boxData);
    }

    public remove(): void {
        this.visible = false;

        this.onRemove.emit();
    }

    public cancel(): void {
        this.visible = false;
        this.boxData = this.data;

        if (!this.isNotAChoiceType) {
            this.choices = [...initialValueChoices];
        }
    }

    public handleInputChange(event: Event, key: string) {
        this.boxData[key] = (event.target as HTMLInputElement).value.trim();
    }

    public updateDataInput(event: Event, key: string) {
        this.boxData[key] = (event.target as HTMLInputElement).value;
    }

    public handleUpdatedOptionCreator(data: any): void {
        this.choices.push(data);
    }

    public handleRemovedOptionCreator(index: number): void {
        this.choices.splice(index, 1);
    }

    public handleLov(event: InputSwitchOnChangeEvent): void {
        this.boxData.values = event.checked ? [] : this.choices;
    }

    public handleUseLovTemplate(event: InputSwitchOnChangeEvent): void {
        if (event.checked) {
            this.boxData.uriLov = null;
        } else {
            this.boxData.templateLov = null;
        }
    }

    public handleLovOptionLabel(data: string[]) {
        this.lovOptionLabels = data.map((label: string) => {
            if (!this.boxData.lovOptionLabel && label === 'name') {
                this.boxData.lovOptionLabel = label;
            }

            return {
                id: generateId(),
                label: toTitleCase(label),
                value: label.toLowerCase(),
            };
        });
    }

    public handleLovGetFirstValue(data: any) {
        this.boxData.value = data.id;
    }

    public handleCheckboxNone() {
        this.boxData.defaultValue = null;
    }

    public handleChangeAttachment(event: any) {
        console.log(event);
    }

    public removeChoice(index: number): void {
        this.choices.splice(index, 1);
    }

    public ngOnInit(): void {
        this.boxData = JSON.parse(JSON.stringify(this.data));

        if (this.type === 'Radio' || this.type === 'Dropdown') {
            const { values, defaultValue } = this.boxData;

            if (values.length) {
                this.choices = values;
            }

            if (defaultValue === null) {
                this.boxData.defaultValue = '';
            }
        }

        if (this.type === 'Date & Time') {
            if (!this.boxData.calendarView) {
                this.boxData.calendarView = 'date';
            }
        }
    }
}
