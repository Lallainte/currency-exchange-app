import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'l-box-table',
    styleUrls: ['./box-table.component.scss'],
    templateUrl: './box-table.component.html',
})
export class BoxTableComponent implements OnInit {
    @Input() public data!: any;
    @Input() public type!: string;
    @Input() public isDragStart!: boolean;

    @Output() public onSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onRemove: EventEmitter<any> = new EventEmitter<any>();

    public columns: any[] = [];
    public editing: boolean = false;
    public boxData: any = null;
    public visible: boolean = false;

    public get columnNames(): string {
        if (!this.data.columns.length) {
            return '';
        }

        let columnNamesStr = this.data.columns.map((el) => el.label).join(', ');

        if (columnNamesStr.length > 80) {
            columnNamesStr = columnNamesStr.substring(0, 81) + '...';
        }

        return `(${columnNamesStr})`;
    }

    public handleUpdatedOptionCreator(data: any): void {
        this.columns.push(data);
    }

    public handleRemovedOptionCreator(index: number): void {
        this.columns.splice(index, 1);
    }

    public save(): void {
        this.visible = false;

        if (this.columns.length) {
            this.boxData.columns = this.columns;
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

        if (this.boxData.columns.length) {
            this.columns = this.boxData.columns;
        }
    }

    public ngOnInit(): void {
        this.boxData = JSON.parse(JSON.stringify(this.data));

        if (this.boxData.columns.length) {
            this.columns = this.boxData.columns;
        }
    }
}
