import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { HelperService } from 'src/app/core/service/helper-service';
import { MessageBoxService } from 'src/app/core/service/message-box.service';
import { UtilCompanyService } from '../service/util-company.service';

@Component({
    selector: 'app-util-company-add',
    templateUrl: './util-company-add.component.html',
    styleUrls: ['./util-company-add.component.scss'],
})
export class UtilCompanyAddComponent implements OnInit {
    formControl;
    companyId;
    selected = [];
    uploadedFiles;
    isNpwp;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private srv: UtilCompanyService,
        private messageBoxService: MessageBoxService,
        private auth: AuthenticationService,
        private help: HelperService,
        private msg: MessageBoxService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.companyId = this.auth.getSession().selectedCompanyId;
        this.createForm();
    }

    createForm(): void {
        this.formControl = this.formBuilder.group({
            name: ['', Validators.required],
            address: [''],
            phone: [''],
            fax: [''],
            email: ['', [Validators.email, Validators.required]],
            scale: ['',Validators.required],
            companyType: ['', Validators.required],
            ownerName: ['', Validators.required],
            ownerAddress: [''],
            ownerBirth: ['', Validators.required],
            ownerGender: ['', Validators.required],
            ownerNumberId: ['', Validators.required],
            ownerEmail: ['', Validators.email],
            ownerReligion: ['', Validators.required],
            companyTaxNumber: [''],
        });
    }
    onSave() {
        if (this.formControl.valid) {
            const formData: FormData = new FormData();

            if (this.uploadedFiles) {
                formData.append('logo', this.uploadedFiles);
            }
            let obj = this.formControl.getRawValue();
            if(!this.isNpwp){
                obj.companyTaxNumber=null;
            }
            formData.append(
                'company',
                JSON.stringify(
                    this.help.formatDate(obj)
                )
            );
            this.srv.save(formData).subscribe((res) => {
                this.msg.showSuccess(res);
                this.router.navigate(['util/company']);
            });
        } else {
            this.formControl.markAllAsTouched();
        }
    }
    selectCT(e) {
        this.formControl.patchValue({
            companyType: {
                id: e.id,
            },
        });
    }
    selectReligion(e) {
        this.formControl.patchValue({
            ownerReligion: {
                id: e.id,
            },
        });
    }
    selectScale(e) {
        this.formControl.patchValue({
            scale: {
                id: e.id,
            },
        });
    }
    selectGender(e) {
        this.formControl.patchValue({
            ownerGender: {
                id: e.id,
            },
        });
    }
    onFileChange(e) {
        this.uploadedFiles = e;
    }
}
