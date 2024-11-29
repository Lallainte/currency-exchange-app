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
import { ApiServiceEss } from '../../service/api.service-ess';

@Component({
    selector: 'app-lov-company',
    templateUrl: './lov.component.html',
    styleUrls: ['./lov.component.scss'],
})
export class LovCompanyComponent implements OnInit, OnChanges {
    @Input() label: string = 'Select company';
    @Input() haveNullValue = false;
    @Input() chaining = false;
    @Input() uri: string = 'lovs/companies?isActive=true';
    @Input() value: string;
    @Input() values = [];
    @Input() isMulti = false;
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
    @Input() showClear = false;
    @Input() display = 'comma';
    loading = true;
    isSingleCompany = false;

    selectedData;
    selectedDatas = [];

    @Output() selected = new EventEmitter<any>();
    @Output() nullAlert = new EventEmitter<any>();
    list = [];
    web = localStorage.getItem('web');
    srv;
    constructor(
        private ref: ChangeDetectorRef,
        srv1: ApiService,
        srv2: ApiServiceEss
    ) {
        // if (this.web == 'admin') {
        this.srv = srv1;
        // } else {
        //     this.srv = srv2;
        // }
    }

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

        if (this.uri) {
            this.list = [];
            this.loading = true;
            this.srv.get(this.uri).subscribe({
                next: (res) => {
                    this.loading = false;
                    let resp = res.data;
                    if (res.data.length == 0) {
                        this.nullAlert.emit(null);
                    } else if (res.data.length == 1) {
                        this.isSingleCompany = true;
                        this.getFirstValue = true;
                    }
                    // else {
                    //     this.haveNullValue = true;
                    // }

                    if (this.getFirstValue) {
                        this.selectedData = resp[0];
                        this.selectedDatas.push(resp[0]);
                        if (this.isMulti) {
                            this.onChange(this.selectedDatas);
                        } else {
                            this.onChange(this.selectedData);
                        }
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
                                id: null,
                                name: 'All',
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
                                this.list.find((data) => data.id === element)
                            );
                        });
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

    onChange(lov: any): void {
        this.value = null;
        this.selected.emit(lov);
    }
}
