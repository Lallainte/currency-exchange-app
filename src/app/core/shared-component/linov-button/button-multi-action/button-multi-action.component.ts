import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AppConstant } from 'src/app/core/config/app.config';

@Component({
    selector: 'btn-multi-action',
    templateUrl: './button-multi-action.component.html',
    styleUrls: ['./button-multi-action.component.scss'],
})
export class ButtonMultiActionComponent implements OnInit, OnChanges {
    items: MenuItem[] = [];
    @Input() btnLabel = 'Action';
    @Input() haveAdd = false;
    @Input() haveCancel = false;
    @Input() haveCancelRequest = false;
    @Input() haveUpdate = false;
    @Input() haveSave = false;
    @Input() haveDel = false;
    @Input() haveAct = false;
    @Input() haveDeact = false;
    @Input() haveDownload = false;
    @Input() haveUpload = false;
    @Input() haveEdit = false;
    @Input() haveProc = false;
    @Input() havePaid = false;
    @Input() haveClearAll = false;
    @Input() haveShowUnassign = false;
    @Input() haveResetPass = false;
    @Input() haveChangePass = false;
    @Input() haveAttendance = false;
    @Input() haveReimburse = false;
    @Input() selected;
    @Input() disabled = false;
    @Input() haveApprove = false;
    @Input() singleAttendance = false;
    @Input() singleReimburse = false;
    @Input() haveCorrection = false;
    @Input() haveRollback = false;
    @Input() havePrepayment = false;
    @Input() haveReopen = false;
    @Input() haveClose = false;
    @Input() haveExtend = false;
    @Input() haveTerminate = false;
    @Input() multiple = true;
    @Input() haveReport = false;
    isShowNoData = false;
    isShow = false;
    title;
    @Output() onClick = new EventEmitter<any>();
    constructor(private confirmationService: ConfirmationService) {}
    ngOnChanges(changes: SimpleChanges): void {
        this.ngOnInit();
    }
    ngOnInit() {
        this.items = [];
        if (this.haveAdd) {
            this.items.push({
                label: 'Tambah',
                command: () => {
                    this.click('add');
                },
            });
        }
        if (this.haveCancel) {
            this.items.push({
                label: 'Batalkan',
                command: () => {
                    this.click(
                        'cancel',
                        false,
                        true,
                        'c-icons cancel-icon',
                        'Batal'
                    );
                },
            });
        }
        if (this.haveUpdate) {
            this.items.push({
                label: 'Perbaharui',
                command: () => {
                    this.click('update', false, true);
                },
            });
        }
        if (this.haveReport) {
            this.items.push({
                label: 'Laporan',
                command: () => {
                    this.click('report');
                },
            });
        }
        if (this.haveSave) {
            this.items.push({
                label: 'Simpan',
                command: () => {
                    this.click('save');
                },
            });
        }
        if (this.haveDel) {
            this.items.push({
                label: 'Delete',
                command: () => {
                    this.click('delete', true);
                },
            });
        }
        if (this.haveEdit) {
            this.items.push({
                label: 'Edit',
                command: () => {
                    this.click('edit');
                },
            });
        }
        if (this.haveAct) {
            this.items.push({
                label: 'Aktifkan',
                command: () => {
                    this.click('activate', true, null, 'c-icons approved-icon');
                },
            });
        }
        if (this.haveDownload) {
            this.items.push({
                label: 'Unduh',
                command: () => {
                    this.click('download');
                },
            });
        }
        if (this.haveUpload) {
            this.items.push({
                label: 'Upload',
                command: () => {
                    this.click('upload');
                },
            });
        }
        if (this.haveClearAll) {
            this.items.push({
                label: 'Clear All',
                command: () => {
                    this.click('clearAll');
                },
            });
        }
        if (this.haveShowUnassign) {
            this.items.push({
                label: 'Unassign',
                command: () => {
                    this.click('showUnassign');
                },
            });
        }
        if (this.haveProc) {
            this.items.push({
                label: 'Process',
                command: () => {
                    this.click('process');
                },
            });
        }
        if (this.haveDeact) {
            this.items.push({
                label: 'Non Aktifkan',
                command: () => {
                    this.click(
                        'deactivate',
                        true,
                        null,
                        'c-icons reject-icon',
                        null,
                        'p-button-reject',
                        true
                    );
                },
            });
        }
        if (this.haveResetPass) {
            this.items.push({
                label: 'Reset Password',
                command: () => {
                    this.click(
                        'resetPassword',
                        false,
                        true,
                        'c-icons reject-icon',
                        null,
                        'p-button-reject',
                        true
                    );
                },
            });
        }
        if (this.haveCorrection) {
            this.items.push({
                label: 'Koreksi',
                command: () => {
                    this.click('correction', false);
                },
            });
        }
        if (this.havePrepayment) {
            this.items.push({
                label: 'Prepayment',
                command: () => {
                    this.click(
                        'prepayment',
                        false,
                        true,
                        'c-icons approved-icon'
                    );
                },
            });
        }
        if (this.haveRollback) {
            this.items.push({
                label: 'Proses Ulang',
                command: () => {
                    this.click(
                        'rollback',
                        false,
                        true,
                        'c-icons reject-icon',
                        null,
                        'p-button-reject',
                        true
                    );
                },
            });
        }
        if (this.haveChangePass) {
            this.items.push({
                label: 'Ganti Password',
                command: () => {
                    this.click('changePassword', false);
                },
            });
        }
        if (this.haveReopen) {
            this.items.push({
                label: 'Buka Kembali',
                command: () => {
                    this.click(
                        'reopen',
                        false,
                        true,
                        'c-icons reject-icon',
                        null,
                        'p-button-reject',
                        true
                    );
                },
            });
        }
        if (this.haveClose) {
            this.items.push({
                label: 'Bayar & Selesai',
                command: () => {
                    this.click('close', false, true, 'c-icons approved-icon');
                },
            });
        }
        if (this.haveExtend) {
            this.items.push({
                label: 'Perpanjang',
                command: () => {
                    this.click(
                        'extend',
                        this.multiple,
                        null,
                        'c-icons approved-icon',
                        null
                    );
                },
            });
        }
        if (this.haveTerminate) {
            this.items.push({
                label: 'Berhentikan',
                command: () => {
                    this.click(
                        'terminate',
                        this.multiple,
                        null,
                        'c-icons reject-icon',
                        null,
                        'p-button-reject',
                        true
                    );
                },
            });
        }
        if (this.haveApprove) {
            this.items.push(
                { separator: true },
                {
                    label: 'Approve Request(s)',
                    icon: 'fas fa-check',
                    command: () => {
                        this.click(
                            'approve',
                            true,
                            null,
                            'c-icons approved-icon',
                            'Setuju'
                        );
                    },
                },
                {
                    label: 'Reject Request(s)',
                    icon: 'fas fa-times',
                    command: () => {
                        this.click(
                            'reject',
                            true,
                            null,
                            'c-icons reject-icon',
                            'Tolak',
                            'p-button-reject',
                            true
                        );
                    },
                }
            );
        }
        if (this.haveCancelRequest) {
            this.items.push(
                { separator: true },
                {
                label: 'Cancel Request(s)',
                command: () => {
                    this.click(
                        'Cancel Request',
                        true,
                        null,
                        'c-icons cancel-icon',
                        'Cancel',
                    );
                },
            });
        }
        if (this.havePaid) {
            this.items.push({
                label: 'Bayar',
                command: () => {
                    this.click(
                        'paid',
                        true,
                        null,
                        'c-icons payment-icon',
                        'Bayar'
                    );
                },
            });
        }

        if (this.haveAttendance) {
            this.items.push(
                { separator: true },
                {
                    label: 'Hadir',
                    command: () => {
                        this.click(
                            'present',
                            true,
                            this.singleAttendance,
                            'c-icons time-icon'
                        );
                    },
                },

                {
                    label: 'Terlambat',
                    command: () => {
                        this.click(
                            'late',
                            true,
                            this.singleAttendance,
                            'c-icons time-icon'
                        );
                    },
                },

                {
                    label: 'Pulang Cepat',
                    command: () => {
                        this.click(
                            'earlyOut',
                            true,
                            this.singleAttendance,
                            'c-icons time-icon'
                        );
                    },
                },

                {
                    label: 'Absen',
                    command: () => {
                        this.click(
                            'absen',
                            true,
                            this.singleAttendance,
                            'c-icons time-icon'
                        );
                    },
                }
            );
        }

        if (this.haveReimburse) {
            this.items.push(
                { separator: true },
                {
                    label: 'Disetujui',
                    command: () => {
                        this.click(
                            'Approved',
                            true,
                            this.singleReimburse,
                            'c-icons approved-icon',
                            'Setuju'
                        );
                    },
                },

                {
                    label: 'Ditolak',
                    command: () => {
                        this.click(
                            'Rejected',
                            true,
                            this.singleReimburse,
                            'c-icons reject-icon',
                            'Tolak',
                            'p-button-reject',
                            true
                        );
                    },
                },

                {
                    label: 'Dibayarkan',
                    command: () => {
                        this.click(
                            'Paid',
                            true,
                            this.singleReimburse,
                            'c-icons payment-icon',
                            'Bayar'
                        );
                    },
                }
            );
        }
    }
    click(
        e,
        needData?,
        needConfirmation?,
        icon?,
        labelAccept?,
        buttonStyle?,
        outlined?
    ) {
        if (needData || needConfirmation) {
            if (this.selected?.length > 0 || needConfirmation) {
                this.isShow = true;
                this.confirmationService.confirm({
                    message: AppConstant[e + 'Message'],
                    acceptLabel: labelAccept ? labelAccept : 'Ya',
                    rejectLabel: 'Tidak',
                    icon: icon ? icon : 'bi bi-exclamation-triangle',
                    rejectButtonStyleClass: outlined
                        ? 'p-button-cancel-outlined-red '
                        : 'p-button-cancel-outlined',
                    acceptButtonStyleClass: buttonStyle
                        ? buttonStyle
                        : 'p-button-accept',
                    accept: () => {
                        this.isShow = false;
                        this.confirmationService.close();
                        e = e == 'earlyOut' ? 'early-out' : e;
                        this.onClick.emit(e);
                    },
                    reject: () => {
                        this.isShow = false;
                        this.confirmationService.close();
                    },
                });
            } else {
                this.title = e;
                this.isShowNoData = true;
            }
        } else {
            this.onClick.emit(e);
        }
    }
}
