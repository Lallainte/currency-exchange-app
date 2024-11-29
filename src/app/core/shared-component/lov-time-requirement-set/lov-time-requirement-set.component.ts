import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import { BehaviorSubject, isEmpty } from 'rxjs';
import { ApiService } from '../../service/api.service';

@Component({
    selector: 'app-lov-time-requirement-set',
    templateUrl: './lov-time-requirement-set.component.html',
    styleUrls: ['./lov-time-requirement-set.component.scss'],
})
export class LovTimeReqSetComponent implements OnInit, OnChanges {
    @Input() useChip: boolean = false;
    @Input() isTaxObject: boolean = false;
    @Input() label: string;
    @Input() haveNullValue = false;
    @Input() chaining = false;
    @Input() uri: string;
    @Input() value: string;
    @Input() values = [];
    @Input() valuesFind = 'id';
    @Input() isMulti = false;
    @Input() showToggleAll = true;
    @Input() readonly = false;
    @Input() disabled = false;
    @Input() filter = false;
    @Input() fetchOnInit = true;
    @Input() addedAll = false;
    @Input() getFirstValue = false;
    @Input() getLastIndexValue;
    @Input() needEmitWhenFound = false;
    @Input() ngClass;
    @Input() isValueLabel = false;
    @Input() customOption = [];
    @Input() styleClass = '';
    @Input() optLabel = 'name';
    @Input() optDisable = '';
    @Input() IsCustomValueId = false;
    @Input() showClear = false;

    selectedData;

    list = [];
    loading = true;
    selectedDatas = [];

    @Output() selected = new EventEmitter<any>();
    @Output() clear = new EventEmitter<any>();
    @Output() nullAlert = new EventEmitter<any>();
    @Output() setupKeys = new EventEmitter<any>();

    constructor(private srv: ApiService, private ref: ChangeDetectorRef) {}

    ngOnChanges(): void {
        if (this.chaining) {
            this.ngOnInit();
        } else {
            if (this.value && this.list.length > 0) {
                if (this.isValueLabel) {
                    this.selectedData = this.list.find(
                        (data) => data.name === this.value
                    );
                    if (this.selectedData) {
                        this.selected.emit(this.selectedData);
                    }
                } else {
                    this.selectedData = this.list.find(
                        (data) => data.id === this.value
                    );
                    if (this.selectedData) {
                        this.selected.emit(this.selectedData);
                    }
                }
                this.ref.markForCheck();
            }
        }
    }

    ngOnInit(): void {
        this.selectedData = null;
        if (!this.fetchOnInit) {
            return;
        }

        if (this.uri && !this.uri.includes('undefined')) {
            this.list = [];
            this.loading = true;
            this.srv.get(this.uri).subscribe({
                next: (res) => {
                    if (res.data.length == 0) {
                        this.nullAlert.emit(null);
                    }
                    this.loading = false;
                    let resp = res.data;
                    // resp.map((item) => {
                    //     item.id = item.key;

                    //     return item;
                    // });

                    if (this.getFirstValue) {
                        this.selectedData = resp[0];
                        this.onChange(this.selectedData);
                    }
                    if (this.getLastIndexValue) {
                        this.selectedData =
                            resp[resp.length - (1 + this.getLastIndexValue)];
                        this.onChange(this.selectedData);
                    }

                    if (!this.chaining) {
                        this.ngOnChanges();
                    }
                    if (this.haveNullValue) {
                        const nullVal: any[] = [
                            {
                                id: '',
                                name: '-',
                            },
                        ];
                        resp = nullVal.concat(resp);
                    }
                    if (this.addedAll) {
                        const allVal: any[] = [
                            {
                                id: 'All',
                                name: 'All',
                            },
                        ];
                        resp = allVal.concat(resp);
                    }
                    this.list = resp;
                    if (this.value) {
                        if (this.isValueLabel) {
                            this.selectedData = this.list.find(
                                (data) => data.name === this.value
                            );
                            if (this.selectedData) {
                                this.selected.emit(this.selectedData);
                            }
                        }
                        if (this.IsCustomValueId) {
                            let valueCust = this.valuesFind;

                            this.selectedData = this.list.find(
                                (data) => data[valueCust] === this.value
                            );

                            if (this.selectedData) {
                                this.selected.emit(this.selectedData);
                            }
                        } else {
                            this.selectedData = this.list.find(
                                (data) => data.id === this.value
                            );
                            if (this.selectedData) {
                                this.selected.emit(this.selectedData);
                            }
                        }
                    }
                    if (this.values.length > 0) {
                        this.values.forEach((element) => {
                            this.selectedDatas.push(
                                this.list.find(
                                    (data) =>
                                        data.id === element[this.valuesFind]
                                )
                            );
                        });
                    }

                    if (this.list.length > 0) {
                        this.setupKeys.emit(Object.keys(this.list[0]));
                    }
                },
                error: (err) => {
                    this.loading = false;
                },
            });
        } else if (this.customOption) {
            this.customOption.map((item) => {
                item.value = item.value || item.name;
                item.id = item.id || item.key;
                item.name = item.name || item.value;
                return item;
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
                this.ngOnChanges();
            }
            if (this.haveNullValue) {
                const nullVal: any[] = [
                    {
                        id: '',
                        name: '-',
                    },
                ];
                this.customOption = nullVal.concat(this.customOption);
            }
            if (this.addedAll) {
                const allVal: any[] = [
                    {
                        id: 'All',
                        name: 'All',
                    },
                ];
                this.customOption = allVal.concat(this.customOption);
            }
            this.list = this.customOption;
            this.loading = false;
            if (this.value) {
                if (this.isValueLabel) {
                    this.selectedData = this.list.find(
                        (data) => data.name === this.value
                    );
                    if (this.selectedData) {
                        this.selected.emit(this.selectedData);
                    }
                } else {
                    this.selectedData = this.list.find(
                        (data) => data.id === this.value
                    );
                    if (this.selectedData) {
                        this.selected.emit(this.selectedData);
                    }
                }
            }
        }
    }

    onChange(e): void {
        this.value = null;
        let data = e.value;
        let array = [];

        let isChecked = false;
        if (e.itemValue.isPrimary) {
            data.forEach((element) => {
                if (element.isPrimary) {
                    isChecked = true;
                }
            });

            this.selectedDatas.forEach((item, index) => {
                if (item.isCheckIfPrimary && isChecked) {
                    array.push(index);
                    this.selectedDatas.splice(index, 1);
                }
            });

            array.sort((a, b) => (a > b ? -1 : 1));

            array.forEach((item) => {
                this.selectedDatas.splice(item, 1);
            });

            this.list.forEach((item) => {
                if (item.isCheckIfPrimary) {
                    item.isDisable = isChecked;
                }
            });
        } else {
            data.forEach((element) => {
                if (element.objectName === e.itemValue.objectName) {
                    isChecked = true;
                }
            });

            this.list.forEach((item) => {
                if (
                    item.code === e.itemValue.code &&
                    item.objectName !== e.itemValue.objectName
                ) {
                    item.isDisable = isChecked;
                }
            });
        }

        this.selected.emit(this.selectedDatas);
    }

    onClear(e) {
        this.clear.emit();
    }

    reset() {
        this.selectedData = null;
        this.selectedDatas = null;
    }
}
