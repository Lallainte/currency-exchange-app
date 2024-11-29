import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { HelperService } from 'src/app/core/service/helper-service';
import { MessageBoxService } from 'src/app/core/service/message-box.service';
import { UtilCompanyService } from '../service/util-company.service';

@Component({
    selector: 'app-util-company-edit',
    templateUrl: './util-company-edit.component.html',
    styleUrls: ['./util-company-edit.component.scss'],
})
export class UtilCompanyEditComponent implements OnInit {
    loading = true;
    formGroup: UntypedFormGroup;
    companyId;
    imgSrc;
    selected = [];
    isShow = false;
    bankForm: UntypedFormGroup;
    uploadedFiles;
    isNpwp;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private srv: UtilCompanyService,
        private messageBoxService: MessageBoxService,
        private auth: AuthenticationService,
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
            id: [''],
            version: [''],
            code: [{ value: '', disabled: true }],
            name: [{ value: '', disabled: true }],
            address: [''],
            effBegin: [{ value: '', disabled: true }],
            effEnd: [{ value: '', disabled: true }],
            phone: [''],
            fax: [''],
            email: ['', [Validators.email,Validators.required]],
            scale: ['',Validators.required],
            companyType: [''],
            companyTaxNumber: [null],
        });
    }
    onUpdate() {
        if (this.formGroup.valid) {
            const formData: FormData = new FormData();

            if (this.uploadedFiles) {
                formData.append('logo', this.uploadedFiles);
            }
            formData.append(
                'company',
                JSON.stringify(
                    this.help.formatDate(this.formGroup.getRawValue())
                )
            );
            this.srv.update(formData).subscribe((res) => {
                this.messageBoxService.showSuccess(res);
                this.router.navigate(['util/company']);
            });
        } else {
            this.formGroup.markAllAsTouched();
        }
    }
    selectCT(e) {
        this.formGroup.patchValue({
            companyType: {
                id: e.id,
            },
        });
    }
    onFileChange(e) {
        this.uploadedFiles = e;
    }

    selectScale(e) {
        this.formGroup.patchValue({
            scale: e.value,
        });
    }
}
