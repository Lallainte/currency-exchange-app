import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ApiServiceEss } from '../../service/api.service-ess';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HelperService } from '@core/service/helper-service';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
    selector: 'app-approval-detail',
    templateUrl: './approval-detail.component.html',
    styleUrls: ['./approval-detail.component.scss'],
})
export class ApprovalDetailComponent implements OnInit {
    @Input() public appendTo!: string | undefined;
    @Input() private uri: string | undefined = 'transaction-reminder';
    @Input() private trxId!: string | undefined;
    @Input() public approvalData: any[] | undefined = [
        {
            sequence: 1,
            notes: '',
            status: 'REJECTED',
            isActive: false,
            details: [
                {
                    sequence: 1,
                    email: 'nurdin@t.com',
                    name: 'Sofwan Efendi',
                    notes: '',
                    employeeId: '79a1df0b-b9e7-4c72-8e56-20ddf8c53c95',
                    nik: '1763',
                    fullName: 'Saint',
                    companyName: 'PT. KRAMA YUDHA RATU MOTOR',
                    organizationName: 'Touch Up Unit',
                    workLocationName: 'Manufacture',
                    jobLevelName: '13',
                    jobTitleName: 'Junior Foreman',
                    jobPositionName: 'Touch Up Jr. Foreman',
                    employeeTypeName: 'PKWTT',
                    status: 'REJECTED',
                    isActive: false,
                    refuseTime: '2024-02-17T04:27:02.19601Z',
                },
                {
                    sequence: 1,
                    email: 'nurdin@t.com',
                    name: 'Agus Tiyar',
                    notes: '',
                    employeeId: '61da4f80-631a-4ea8-b4cb-67d20c174e5e',
                    nik: '2221',
                    fullName: 'Farel',
                    companyName: 'PT. KRAMA YUDHA RATU MOTOR',
                    organizationName: 'Touch Up Unit',
                    workLocationName: 'Manufacture',
                    jobLevelName: '16',
                    jobTitleName: 'Junior Foreman',
                    jobPositionName: 'Touch Up Jr. Foreman',
                    employeeTypeName: 'PKWTT',
                    status: 'REJECTED',
                    isActive: false,
                    refuseTime: '2024-02-17T04:27:02.197046Z',
                },
                {
                    sequence: 1,
                    email: 'nurdin@t.com',
                    name: 'Eko Dwi Prastio',
                    notes: '',
                    employeeId: 'c6296ad3-9492-415a-98ba-cf14bd766ee9',
                    nik: '2873',
                    fullName: 'Ledi',
                    companyName: 'PT. KRAMA YUDHA RATU MOTOR',
                    organizationName: 'Touch Up Unit',
                    workLocationName: 'Manufacture',
                    jobLevelName: '17',
                    jobTitleName: 'Junior Foreman',
                    jobPositionName: 'Touch Up Jr. Foreman',
                    employeeTypeName: 'PKWTT',
                    status: 'REJECTED',
                    isActive: false,
                    refuseTime: '2024-02-17T04:27:02.197056Z',
                },
            ],
        },
        {
            sequence: 2,
            notes: '',
            status: 'REJECTED',
            isActive: false,
            details: [
                {
                    sequence: 1,
                    email: 'nurdin@t.com',
                    name: 'Sudaryanto',
                    notes: '',
                    employeeId: '8ec932f1-1185-47d7-aacf-4906a5d5f8bc',
                    nik: '1494',
                    fullName: 'Bagus',
                    companyName: 'PT. KRAMA YUDHA RATU MOTOR',
                    organizationName: 'Sub Assy Sub Sect',
                    workLocationName: 'Manufacture',
                    jobLevelName: '12',
                    jobTitleName: 'Foreman',
                    jobPositionName: 'Sub Assy Foreman',
                    employeeTypeName: 'PKWTT',
                    status: 'REJECTED',
                    isActive: false,
                    refuseTime: '2024-02-17T04:27:02.19844Z',
                },
                {
                    sequence: 2,
                    email: 'nurdin@t.com',
                    name: 'Arya',
                    notes: '',
                    employeeId: '5e1acf7c-1334-440f-b43d-5d755b35c5bb',
                    nik: '1589',
                    fullName: 'Ari Minarwan',
                    companyName: 'PT. KRAMA YUDHA RATU MOTOR',
                    organizationName: 'Finance & Accounting Dept',
                    workLocationName: 'Office',
                    jobLevelName: 'Manager',
                    jobTitleName: 'Manager',
                    jobPositionName: 'Finance & Accounting Manager',
                    employeeTypeName: 'PKWTT',
                    status: 'REJECTED',
                    isActive: false,
                    refuseTime: '2024-02-17T04:27:02.19845Z',
                },
            ],
        },
    ];

    public isShow!: boolean | undefined;
    public readonly web!: string | undefined;
    private readonly srv!: any | undefined;
    public idxShow!: number | undefined;

    constructor(
        private readonly srv1: ApiService,
        private readonly srv2: ApiServiceEss,
        private readonly _sanitizer: DomSanitizer,
        public readonly _helperService: HelperService,
        private readonly _msg: MessageBoxService
    ) {
        // this.web = localStorage.getItem('web');
        // if (this.web == 'admin') {
        this.srv = srv1;
        // } else {
        //     this.srv = srv2;
        // }
    }

    ngOnInit() {}

    async getPhoto(id) {
        await lastValueFrom(
            this.srv.getFileByte(`employees/${id}/active-photo`)
        ).then((res) => {
            if (res) {
                // @ts-ignore
                const objectURL = URL.createObjectURL(res);
                const img = this._sanitizer.bypassSecurityTrustUrl(objectURL);
                return img;
            } else {
                return 'assets/no-profile-picture.svg';
            }
        });
    }

    onReminder() {
        if (this.trxId) {
            let objVal = {
                trxId: this.trxId,
            };
            lastValueFrom(this.srv.post(this.uri, objVal, true)).then(
                (res: any) => {
                    let resp = JSON.parse(res);
                    this._msg.showSuccess(resp.data), null, false;
                }
            );
        } else {
            this._msg.showWarn('Transaction ID tidak ditemukan.');
        }
    }

    onShow(): void {
        this.isShow = true;
        this.idxShow = null;
    }

    onShowNotes(idx: number): void {
        if (this.idxShow === idx) {
            this.idxShow = null;
        } else {
            this.idxShow = idx;
        }
    }

    getApproverStatusFormat(data: any): string {
        const totalApprovers = data.details.length;

        const approvedCount = data.details.filter(
            (approver) => approver.status === 'APPROVED'
        ).length;

        return `${approvedCount}/${totalApprovers}`;
    }
}
