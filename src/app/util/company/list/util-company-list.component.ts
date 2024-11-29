import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageInfo } from 'src/app/core/model/page-info';
import { HelperService } from 'src/app/core/service/helper-service';
import { MessageBoxService } from 'src/app/core/service/message-box.service';
import { UtilCompanyService } from '../service/util-company.service';

@Component({
    selector: 'app-util-company-list',
    templateUrl: './util-company-list.component.html',
    styleUrls: ['./util-company-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilCompanyListComponent implements OnInit {
    list = [];
    listFilter = [
        { label: 'Semua', value: '' },
        { label: 'Aktif', value: 'Active' },
        { label: 'Non Aktif', value: 'Stop' },
    ];
    isShowExtend = false;
    isShowTermit = false;
    count = 0;
    first = 0;
    form: UntypedFormGroup;
    constructor(
        private router: Router,
        private srv: UtilCompanyService,
        private cd: ChangeDetectorRef,
        private msg: MessageBoxService,
        private formBuilder: UntypedFormBuilder,
        private help: HelperService
    ) {}
    loading = false;
    selected = [];
    body;
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            date: ['', Validators.required],
            companySubscription: [
                {
                    id: ['', Validators.required],
                },
            ],
        });
    }

    onSearch(e) {
        this.body = e;
        this.getList(new PageInfo(1, 10));
    }

    onTableLazyLoad(e) {
        const page = e.first / e.rows + 1;
        const limit = e.rows;
        this.getList(new PageInfo(page, limit));
    }

    getList(pi) {
        this.first = pi.page - 1;
        this.loading = true;
        this.list = [];
        this.srv.getAll(pi, this.body).subscribe(
            (res) => {
                if (res) {
                    this.loading = false;
                    this.list = res.data;
                    this.count = res.count;
                    this.cd.detectChanges();
                }
            },
            (err) => {
                this.loading = false;
                this.cd.detectChanges();
            }
        );
    }

    selectCompSubs(e) {
        this.form.get('companySubscription').patchValue({ id: e.id });
    }

    onModal() {
        this.isShowExtend = true;
    }

    onAdd() {
        this.router.navigate(['/util/company/add']);
    }

    aksi(e) {
        if (e == 'add') {
            this.onAdd();
        } else if (e == 'extend') {
            this.isShowExtend = true;
            this.form.reset();
        } else if (e == 'terminate') {
            this.isShowTermit = true;
            this.form.reset();
        }
    }
    onEdit(e) {
        this.router.navigate(['/util/company/' + e.id]);
    }

    onSave(isExtend) {
        if (this.form.valid) {
            let idList = [];
            this.selected.forEach((e) => {
                idList.push(e.id);
            });
            let body = this.form.getRawValue();
            body.compId = idList;
            if (isExtend) {
                this.onSaveExtend(this.help.formatDate(body));
            } else {
                this.onSaveTermit(this.help.formatDate(body));
            }
        } else {
            this.form.markAllAsTouched();
        }
    }

    onSaveExtend(e) {
        this.srv.extend(e).subscribe((res) => {
            this.selected = [];
            this.msg.showSuccess(res);
            this.isShowExtend = false;
            this.getList(new PageInfo(1, 10));
            this.isShowExtend = false;
            this.cd.detectChanges();
        });
    }

    onSaveTermit(e) {
        this.srv.terminate(e).subscribe((res) => {
            this.selected = [];
            this.msg.showSuccess(res);
            this.isShowTermit = false;
            this.getList(new PageInfo(1, 10));
            this.isShowTermit = false;
            this.cd.detectChanges();
        });
    }
}
