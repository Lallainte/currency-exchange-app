// import { AnalyticsApiService } from '@analytics/service/analytics-api.service';
import { ApiService } from '../../service/api.service';
import { ApiServiceEss } from '../../service/api.service-ess';

import {
    Input,
    OnInit,
    Output,
    Component,
    OnChanges,
    EventEmitter,
    ChangeDetectorRef,
    ViewChild,
    SimpleChanges,
    AfterViewInit,
} from '@angular/core';
import { MultiSelect } from 'primeng/multiselect';

@Component({
    selector: 'app-lov',
    styleUrls: ['./lov.component.scss'],
    templateUrl: './lov.component.html',
})
export class LovComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild('multiLovs') public multiLovs: MultiSelect;

    @Input() public readonly id: string | undefined = 'id';
    @Input() public readonly useChip: boolean | undefined = false;
    @Input() public readonly isTaxObject: boolean | undefined = false;
    @Input() public readonly isPeriodCW: boolean | undefined = false;
    @Input() public readonly truncate: number | undefined = 55;
    @Input() public readonly label!: string | undefined;
    @Input() public readonly haveNullValue: boolean | undefined = false;
    @Input() public readonly isMulti: boolean | undefined = false;
    @Input() public readonly showToggleAll: boolean | undefined = true;
    @Input() public readonly readonly: boolean | undefined = false;
    @Input() public readonly disabled: boolean | undefined = false;
    @Input() public readonly filter: boolean | undefined = false;
    @Input() public readonly ngClass!: any | undefined;
    @Input() public readonly styleClass: string | undefined = '';
    @Input() public readonly optLabel: string | undefined = 'name';
    @Input() public readonly showClear: boolean | undefined = false;
    @Input() public readonly appendTo: string | undefined = 'body';
    @Input() public readonly selectAll: boolean | undefined = false;
    @Input() protected value: string = '';
    @Input() protected values: any[] = [];
    @Input() protected readonly chaining: boolean | undefined = false;
    @Input() protected readonly uri!: string | undefined;
    @Input() protected readonly valuesFind: string | undefined = 'id';
    @Input() protected readonly fetchOnInit: boolean | undefined = true;
    @Input() protected readonly addedAll: boolean | undefined = false;
    @Input() protected readonly getFirstValue: boolean | undefined = false;
    @Input() protected readonly getCustomValue: boolean | undefined = false;
    @Input() protected readonly getLastIndexValue!: number | undefined;
    @Input() protected readonly needEmitWhenFound: boolean | undefined = false;
    @Input() protected readonly defaultValue!:
        | { field: string; value: string }
        | undefined;
    @Input() protected readonly isValueLabel: boolean | undefined = false;
    @Input() protected customOption: any[] = [];
    @Input() protected readonly IsCustomValueId: boolean | undefined = false;
    @Input() protected web: string | undefined = localStorage.getItem('web');
    @Input() protected readonly isAnalytics: boolean | undefined = false;

    public selectedData!: any | undefined;
    public list: any[] = [];
    public loading: boolean | undefined = true;
    public selectedDatas: any[] = [];

    @Output() protected selected = new EventEmitter<any>();
    @Output() protected hide = new EventEmitter<any>();
    @Output() protected clear = new EventEmitter<any>();
    @Output() protected nullAlert = new EventEmitter<any>();
    @Output() protected setupKeys = new EventEmitter<any>();

    protected srv: any;

    constructor(
        private readonly ref: ChangeDetectorRef,
        private readonly srv1: ApiService,
        private readonly srv2: ApiServiceEss
    ) {
        this.initializeService();
    }

    public ngOnInit(): void {
        this.selectedData = null;
        this.selectedDatas = [];
        if (this.fetchOnInit) {
            this.fetchData();
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.uri && !changes?.uri?.firstChange) {
            this.fetchData();
        }

        if (changes?.value || changes?.values) {
            this.setSelectedData();
        }

        if (!this.selectedData && this.value && this.list.length > 0) {
            this.setSelectedData();
        }

        if (
            this.selectedDatas.length === 0 &&
            this.values.length > 0 &&
            this.list.length > 0
        ) {
            this.setSelectedData();
        }
    }

    ngAfterViewInit(): void {
        this.setSelectedData();
    }

    public initializeService(): void {
        // if (this.web === 'admin') {
        this.srv = this.srv1;
        // } else {
        //     this.srv = this.srv2;
        // }
    }

    public fetchData(): void {
        if (this.uri && !this.uri.includes('undefined')) {
            this.list = [];
            this.loading = true;

            this.srv.get(this.uri).subscribe({
                next: (res) => {
                    let data = res.data;

                    if (data.length === 0) {
                        this.nullAlert.emit(null);
                        this.loading = false;
                        return;
                    }
                    this.loading = false;

                    if (this.getFirstValue) {
                        this.selectedData = data[0];
                        this.onChange(this.selectedData);
                    }
                    if (this.getLastIndexValue) {
                        this.selectedData =
                            data[data.length - (1 + this.getLastIndexValue)];
                        this.onChange(this.selectedData);
                    }
                    if (this.getCustomValue) {
                        this.selectedData = data.find(
                            (item) =>
                                item[this.defaultValue.field] ===
                                this.defaultValue.value
                        );
                        this.onChange(this.selectedData);
                    }

                    if (!this.chaining) {
                        this.setSelectedData();
                    }

                    if (this.haveNullValue) {
                        data = [{ id: '', name: '-' }].concat(data);
                    }
                    if (this.addedAll) {
                        data = [{ id: 'all', name: 'All' }].concat(data);
                    }

                    this.list = data;

                    this.updateSelectedData();
                    this.setupKeys.emit(Object.keys(this.list[0]));
                },
                error: (err) => {
                    this.loading = false;
                },
            });
        } else if (this.customOption.length > 0) {
            this.handleCustomOptions();
        }
    }

    public handleCustomOptions(): void {
        this.customOption.forEach((item) => {
            item.value = item.value || item.name;
            item.id = item.id || item.key || item.code;
            item.name = item.name || item.value;
        });

        if (this.getFirstValue) {
            this.selectedData = this.customOption[0];
            this.onChange(this.selectedData);
        }
        if (this.getLastIndexValue) {
            this.selectedData =
                this.customOption[
                    this.customOption.length - (1 + this.getLastIndexValue)
                ];
            this.onChange(this.selectedData);
        }

        if (!this.chaining) {
            this.setSelectedData();
        }

        if (this.haveNullValue) {
            this.customOption = [{ id: '', name: '-' }].concat(
                this.customOption
            );
        }
        if (this.addedAll) {
            this.customOption = [{ id: 'all', name: 'All' }].concat(
                this.customOption
            );
        }

        this.list = this.customOption;
        this.loading = false;

        this.updateSelectedData();
    }

    public setSelectedData(): void {
        if (this.values.length > 0 && this.list.length > 0) {
            this.selectedDatas = [];
            this.values.forEach((element) => {
                const foundData = this.list.find(
                    (data) => data.id === element[this.valuesFind]
                );
                if (foundData) {
                    this.selectedDatas.push(foundData);
                }
            });
        } else {
            this.selectedDatas = [];
        }

        if (this.value && this.list.length > 0) {
            if (this.isValueLabel) {
                this.selectedData = this.list.find(
                    (data) => data.name === this.value
                );
            } else {
                this.selectedData = this.list.find(
                    (data) => data.id === this.value
                );
            }
            if (this.selectedData) {
                this.selected.emit(this.selectedData);
            }
        } else {
            this.selectedData = null;
        }

        this.ref.detectChanges();
    }

    public updateSelectedData(): void {
        if (this.value) {
            if (this.isValueLabel) {
                this.selectedData = this.list.find(
                    (data) => data.name === this.value
                );
            } else if (this.IsCustomValueId) {
                const valueCust = this.valuesFind;
                this.selectedData = this.list.find(
                    (data) => data[valueCust] === this.value
                );
            } else {
                this.selectedData = this.list.find(
                    (data) => data.id === this.value
                );
            }

            if (this.selectedData) {
                this.selected.emit(this.selectedData);
            }
        } else {
            this.selectedData = null;
        }

        if (this.values.length > 0) {
            this.selectedDatas = [];
            this.values.forEach((element) => {
                const foundData = this.list.find(
                    (data) => data.id === element[this.valuesFind]
                );
                if (
                    foundData &&
                    !this.selectedDatas.some(
                        (selectedData) => selectedData.id === foundData.id
                    )
                ) {
                    this.selectedDatas.push(foundData);
                }
            });
        } else {
            this.selectedDatas = [];
        }

        this.ref.detectChanges();
    }

    public onChange(selectedData: any): void {
        this.value = null;
        this.values = [];
        this.selected.emit(selectedData);
    }

    public onHide(): void {
        this.hide.emit();
    }

    public onClear(e): void {
        this.clear.emit();
    }

    public reset(): void {
        this.selectedData = null;
        this.selectedDatas = [];
    }

    public removeSelectedDatas(item): void {
        const idx = this.selectedDatas.findIndex((find) => find == item);
        this.selectedDatas.splice(idx, 1);
        this.multiLovs.cd.detectChanges();
        this.ref.detectChanges();
    }
}
