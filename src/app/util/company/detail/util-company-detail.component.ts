import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { id } from 'date-fns/locale';
import { HelperService } from 'src/app/core/service/helper-service';
import { MessageBoxService } from 'src/app/core/service/message-box.service';
import { UtilCompanyService } from '../service/util-company.service';

@Component({
    selector: 'app-util-company-detail',
    templateUrl: './util-company-detail.component.html',
    styleUrls: ['./util-company-detail.component.scss'],
})
export class UtilCompanyDetailComponent implements OnInit {
    loading = true;
    formGroup: UntypedFormGroup;
    companyId;
    imgSrc;
    selected = [];
    isShow = false;
    bankForm: UntypedFormGroup;
    form: UntypedFormGroup;
    isShowExtend = false;
    isShowTermit = false;
    isNpwp;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private srv: UtilCompanyService,
        private messageBoxService: MessageBoxService,
        private route: ActivatedRoute,
        private help: HelperService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.companyId = this.route.snapshot.paramMap.get('id');
        this.createForm();
        this.getDetail(this.companyId);
    }
    getDetail(id) {
        this.loading = true;
        this.srv.getOne(id).subscribe(
            (res) => {
                res.effBegin = res.effBegin ? new Date(res.effBegin) : null;
                res.effEnd = res.effEnd ? new Date(res.effEnd) : null;
                if (res.owner) {
                    res.owner.birthDate = res.owner.birthDate
                        ? new Date(res.owner.birthDate)
                        : null;
                }

                if (res.companyTaxNumber === null) {
                    this.isNpwp = false;
                } else {
                    this.isNpwp = true;
                }

                this.formGroup.patchValue(res);

                this.imgSrc =
                    'data:image/' +
                    res.fileLogo.ext +
                    ';base64,' +
                    res.fileLogo.base;
                this.loading = false;
            },
            (err) => {
                this.loading = false;
            }
        );
    }

    createForm(): void {
        this.formGroup = this.formBuilder.group({
            code: [{ value: '', disabled: true }],
            name: [{ value: '', disabled: true }],
            address: [{ value: '', disabled: true }],
            effBegin: [{ value: '', disabled: true }],
            effEnd: [{ value: '', disabled: true }],
            phone: [{ value: '', disabled: true }],
            fax: [{ value: '', disabled: true }],
            email: [{ value: '', disabled: true }],
            scale: [{ value: '', disabled: true }],
            companyType: [''],
            fileLogo: [''],
            companyBank: [''],
            companyTaxNumber: [{ value: null, disabled: true }],
            owner: this.formBuilder.group({
                name: [{ value: '', disabled: true }],
                address: [{ value: '', disabled: true }],
                birthDate: [{ value: '', disabled: true }],
                gender: [{ value: '', disabled: true }],
                numberId: [{ value: '', disabled: true }],
                email: [{ value: '', disabled: true }],
                religion: [{ value: '', disabled: true }],
            }),
        });
        this.bankForm = this.formBuilder.group({
            bankName: ['', Validators.required],
            accountName: ['', Validators.required],
            accountNumber: ['', Validators.required],
            company: {
                id: this.companyId,
            },
        });
        this.form = this.formBuilder.group({
            date: ['', Validators.required],
            companySubscription: [
                {
                    id: ['', Validators.required],
                },
            ],
            compId: [[this.companyId]],
        });
    }
    onAdd() {
        this.isShow = true;
    }
    onDelete() {
        this.srv.deleteBank(this.selected).subscribe((res) => {
            this.messageBoxService.showSuccess(res);
            this.getDetail(this.companyId);
            this.selected = [];
        });
    }
    click(e) {
        if (e == 'edit') {
            this.onEdit();
        } else if (e == 'extend') {
            this.isShowExtend = true;
            this.form.get('date').reset();
        } else if (e == 'terminate') {
            this.isShowTermit = true;
            this.form.get('date').reset();
        } else if (e == 'add') {
            this.onAdd();
        } else if (e == 'delete') {
            this.onDelete();
        }
    }
    onEdit() {
        this.router.navigate(['/util/company/edit/' + this.companyId]);
    }

    selectCompSubs(e) {
        this.form.get('companySubscription').patchValue({ id: e.id });
    }

    onSave() {
        if (this.bankForm.valid) {
            this.srv.saveBank(this.bankForm.getRawValue()).subscribe((res) => {
                this.messageBoxService.showSuccess(res);
                this.isShow = false;
                this.getDetail(this.companyId);
            });
        } else {
            this.bankForm.markAllAsTouched();
        }
    }
    onSaveExtend() {
        if (this.form.valid) {
            const data = this.form.getRawValue();
            data.date = this.help.formatDate(data.date);

            this.srv.extend(data).subscribe((res) => {
                this.messageBoxService.showSuccess(res);
                this.isShowExtend = false;
                this.getDetail(this.companyId);
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
    onSaveTermit() {
        if (this.form.valid) {
            const data = this.form.getRawValue();
            data.date = this.help.formatDate(data.date);
            data.companySubscription = null;

            this.srv.terminate(data).subscribe((res) => {
                this.messageBoxService.showSuccess(res);
                this.isShowTermit = false;
                this.getDetail(this.companyId);
            });
        } else {
            this.form.markAllAsTouched();
        }
    }

    handleChange(e) {
        if (e.checked) {
            this.formGroup.get('companyTaxNumber').enable();
        } else {
            this.formGroup.get('companyTaxNumber').disable();
            this.formGroup.get('companyTaxNumber').reset();
        }
    }
}
