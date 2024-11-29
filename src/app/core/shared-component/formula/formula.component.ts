import {
    ChangeDetectorRef,
    Component,
    Input,
    EventEmitter,
    Output,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from '../../service/api.service';

@Component({
    selector: 'app-formula',
    templateUrl: './formula.component.html',
    styleUrls: ['./formula.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaComponent {
    @ViewChild('textAreaInput') textAreaInput: ElementRef;

    @Input() isNeedHeader: boolean = false;
    @Input() useDialog: boolean = true;
    @Input() visibleDialog: boolean = false;
    @Input() listChipPayrolls: any[];
    @Input() listChipPerformanceIndexAllowance: any[];
    @Input() useIndexAllowance: boolean = false;
    @Input() disabled = false;
    @Input() label: string = 'Insert Formula';
    @Output() save = new EventEmitter<any>();
    @Output() hide = new EventEmitter<any>();

    inputArrays: any[] = [];
    inputString: string = '';
    searchPayrolls: string = '';
    searchPerformance: string = '';
    filteredListPayrolls: any[] = [];
    filteredListPerformance: any[] = [];
    optPayrollComponent = [];
    optPerformanceIndexAllowanceComponent = [];

    whiteButtonsLayout = [
        [
            { type: 'NUMBER', value: '1', label: '1' },
            { type: 'NUMBER', value: '2', label: '2' },
            { type: 'NUMBER', value: '3', label: '3' },
        ],
        [
            { type: 'NUMBER', value: '4', label: '4' },
            { type: 'NUMBER', value: '5', label: '5' },
            { type: 'NUMBER', value: '6', label: '6' },
        ],
        [
            { type: 'NUMBER', value: '7', label: '7' },
            { type: 'NUMBER', value: '8', label: '8' },
            { type: 'NUMBER', value: '9', label: '9' },
        ],
        [
            { type: 'NUMBER', value: '.', label: '.' },
            { type: 'NUMBER', value: '0', label: '0' },
            // { type: 'OPERATOR', value: '%', label: '%' },
        ],
    ];

    darkButtonsLayout = [
        [
            {
                type: 'delete-char',
                value: 'Delete Char',
            },
            { type: 'clear', value: 'Clear' },
        ],
        [
            { type: 'OPERATOR', value: '*', label: '*', isException: false },
            { type: 'OPERATOR', value: '/', label: '/', isException: false },
        ],
        [
            { type: 'OPERATOR', value: '+', label: '+', isException: false },
            { type: 'OPERATOR', value: '-', label: '-', isException: false },
        ],
        [
            { type: 'OPERATOR', value: '(', label: '(', isException: true },
            { type: 'OPERATOR', value: ')', label: ')', isException: true },
        ],
    ];

    constructor(private srv: ApiService, private ref: ChangeDetectorRef) {}

    async ngOnInit() {
        this.getPayrollComponent();
        this.getPerformanceIndexAllowance();
    }

    emitter() {
        this.save.emit(this.inputArrays);
    }

    onSearchChangePayrolls() {
        this.filterListPayrolls();
    }
    onSearchChangePerformance() {
        this.filterListPerformance();
    }

    filterListPayrolls() {
        if (this.searchPayrolls) {
            this.filteredListPayrolls = this.listChipPayrolls.filter(
                (chip) =>
                    chip.value
                        .toLowerCase()
                        .includes(this.searchPayrolls.toLowerCase()) ||
                    chip.label
                        .toLowerCase()
                        .includes(this.searchPayrolls.toLowerCase())
            );
        } else {
            this.filteredListPayrolls = this.listChipPayrolls;
        }
    }

    filterListPerformance() {
        if (this.searchPerformance) {
            this.filteredListPerformance =
                this.listChipPerformanceIndexAllowance.filter(
                    (chip) =>
                        chip.value
                            .toLowerCase()
                            .includes(this.searchPerformance.toLowerCase()) ||
                        chip.label
                            .toLowerCase()
                            .includes(this.searchPerformance.toLowerCase())
                );
        } else {
            this.filteredListPerformance =
                this.listChipPerformanceIndexAllowance;
        }
    }

    getPayrollComponent() {
        lastValueFrom(
            this.srv.get('lovs/payrolls/payroll-component-formulas?isActive=true')
        ).then((res) => {
            this.optPayrollComponent = res.data;
            this.createChipComponent();
            this.filterListPayrolls();
        });
    }

    getPerformanceIndexAllowance() {
        lastValueFrom(
            this.srv.get(
                'lovs/payrolls/performance-index-allowances?isActive=true&companyId=4b118e41-1391-4fe7-8452-b2a86032d0e1'
            )
        ).then((res) => {
            this.optPerformanceIndexAllowanceComponent = res.data;
            this.createChipPerformanceIndexAllowance();
            this.filterListPerformance();
        });
    }

    createChipComponent() {
        this.listChipPayrolls = [];
        this.optPayrollComponent.forEach((element) => {
            let temp = {
                type: 'PAYCOMP',
                value: element.code,
                label: element.name,
            };
            this.listChipPayrolls.push(temp);
            this.ref.markForCheck();
        });
    }

    createChipPerformanceIndexAllowance() {
        this.listChipPerformanceIndexAllowance = [];
        this.optPerformanceIndexAllowanceComponent.forEach((element) => {
            let temp = {
                type: 'PRFIDX',
                value: element.code,
                label: element.name,
            };
            this.listChipPerformanceIndexAllowance.push(temp);
            this.ref.markForCheck();
        });
    }

    showDialog() {
        this.visibleDialog = true;
    }

    onHide() {
        this.visibleDialog = false;
        this.hide.emit(this.visibleDialog);
    }

    onCancel() {
        this.visibleDialog = false;
        this.inputArrays = [];
        this.inputString = '';
        this.hide.emit(this.visibleDialog);
    }

    handleBtnClick(type, valBtn) {
        this.textAreaInput.nativeElement.focus();
        if (
            type === 'delete-char' ||
            type === 'cursor-left' ||
            type === 'cursor-right' ||
            type === 'clear'
        ) {
            this.handleActionResult(type, valBtn);
        } else {
            this.handleAppendResult(valBtn);
        }
    }

    handleAppendResult(value) {
        // const cursorStartBefore =
        //     this.textAreaInput.nativeElement.selectionStart;
        // const cursorEndBefore = this.textAreaInput.nativeElement.selectionEnd;
        // if (
        //     cursorEndBefore !== this.inputArrays.length ||
        //     cursorStartBefore !== this.inputArrays.length
        // ) {
        //     console.log('if')
        //     const newValue = [
        //         ...this.inputArrays.slice(0, cursorStartBefore),
        //         {
        //             type: value.type,
        //             value: value.value,
        //             label: value.label,
        //             order: this.inputArrays.length,
        //         },
        //         ...this.inputArrays.slice(cursorEndBefore),
        //     ];
        //     newValue.forEach((d, idx) => {
        //         d.order = idx;
        //     });
        //     this.inputArrays = newValue;
        //     this.inputString = this.convertInputArraysToString(
        //         this.inputArrays
        //     );
        //     this.emitter();
        // } else {
        if (
            this.inputArrays.length == 0 &&
            value.type == 'OPERATOR' &&
            !value?.isException
        ) {
            return;
        }

        if (this.inputArrays.length > 0) {
            // console.log(this.inputArrays[this.inputArrays.length - 1],value)
            if (
                (this.inputArrays[this.inputArrays.length - 1].type ==
                    'OPERATOR' &&
                    !this.inputArrays[this.inputArrays.length - 1]
                        ?.isException &&
                    value.type == 'OPERATOR' &&
                    !value?.isException) ||
                (this.inputArrays[this.inputArrays.length - 1].type ==
                    'PAYCOMP' &&
                    value.type == 'PAYCOMP')
            ) {
                return;
            }
            if (
                (this.inputArrays[this.inputArrays.length - 1].type ==
                    'NUMBER' &&
                    value.type == 'PAYCOMP') ||
                (this.inputArrays[this.inputArrays.length - 1].type ==
                    'PAYCOMP' &&
                    value.type == 'NUMBER')
            ) {
                return;
            }
            if (
                value.type == 'NUMBER' &&
                this.inputArrays[this.inputArrays.length - 1].type == 'NUMBER'
            ) {
                this.inputArrays[this.inputArrays.length - 1].value +=
                    value.value;
                this.inputArrays[this.inputArrays.length - 1].label +=
                    value.label;
            } else {
                this.inputArrays.push({
                    type: value.type,
                    value: value.value,
                    label: value.label,
                    isException: value.isException,
                    order: this.inputArrays.length,
                });
            }
        } else {
            this.inputArrays.push({
                type: value.type,
                value: value.value,
                label: value.label,
                isException: value.isException,
                order: this.inputArrays.length,
            });
        }

        this.inputString = this.convertInputArraysToString(this.inputArrays);
        this.emitter();
        // }
    }

    handleActionResult(type, val) {
        switch (type) {
            case 'delete-char':
                this.inputArrays.pop();
                this.inputString = this.convertInputArraysToString(
                    this.inputArrays
                );
                this.emitter();
                break;
            case 'clear':
                this.inputArrays = [];
                this.inputString = this.convertInputArraysToString(
                    this.inputArrays
                );
                this.emitter();
                break;
            case 'cursor-left':
                this.handleMoveCursorLeft();
                break;
            case 'cursor-right':
                this.handleMoveCursorRight();
                break;
            default:
                break;
        }
    }

    handleMoveCursorLeft() {
        const currentPos = this.textAreaInput.nativeElement.selectionStart;
        if (currentPos > 0) {
            this.textAreaInput.nativeElement.setSelectionRange(
                currentPos - 1,
                currentPos - 1
            );
        }
    }

    handleMoveCursorRight() {
        const currentPos = this.textAreaInput.nativeElement.selectionStart;
        const length = this.textAreaInput.nativeElement.value.length;
        if (currentPos < length) {
            this.textAreaInput.nativeElement.setSelectionRange(
                currentPos + 1,
                currentPos + 1
            );
        }
    }

    // convertInputArraysToString() {
    //     const values = this.inputArrays.map((obj) => obj.label);
    //     this.inputString = values.join('');
    //     this.emitter();
    // }
    convertInputArraysToString(arr) {
        const values = arr.map((obj) => obj.label);
        return values.join('');
    }

    onAddChipComponent(chip) {
        // TODO: Tambahkan kode ketika chip component di tambahkan
        // console.log(chip);
        this.handleAppendResult(chip);
    }

    onSave() {
        if (this.inputArrays[this.inputArrays.length - 1]?.type == 'OPERATOR') {
            this.inputArrays.pop();
            this.inputString = this.convertInputArraysToString(
                this.inputArrays
            );
        }
        this.visibleDialog = false;
        this.save.emit(this.inputArrays);
    }

    handleInput(e: Event) {
        (e.target as HTMLInputElement).value = this.inputString;
    }
}
