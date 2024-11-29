import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { PageInfo } from 'src/app/core/model/page-info';
import { MessageBoxService } from 'src/app/core/service/message-box.service';
import { RoleService } from '../service/role.service';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListComponent implements OnInit {
    list;
    listDetail;
    count;
    detailLoading;
    item;
    first = 0;
    constructor(
        private srv: RoleService,
        private cd: ChangeDetectorRef,
        private msg: MessageBoxService
    ) {}
    loading = false;
    body;
    action = '';
    isShow = false;
    type;
    listFilter = [
        { label: 'Semua', value: '' },
        { label: 'ESS', value: 'ESS' },
        { label: 'WEB', value: 'WEB' },
    ];
    ngOnInit(): void {}

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
    editReport(e) {
        this.item = e;
        this.listDetail = [];
        this.type = 'Laporan-';
        this.isShow = true;
        this.detailLoading = true;
        this.srv.getReport(e.id).subscribe(
            (res) => {
                res.roleId = e.id;
                this.listDetail = res;
                this.detailLoading = false;
                this.cd.detectChanges();
            },
            (err) => {
                this.detailLoading = false;
                this.cd.detectChanges();
            }
        );
    }
    editDashboard(e) {
        this.item = e;
        this.listDetail = [];
        this.type = 'Dashbor-';
        this.isShow = true;
        this.detailLoading = true;
        this.srv.getDashboard(e.id).subscribe(
            (res) => {
                res.roleId = e.id;
                this.listDetail = res;
                this.detailLoading = false;
                this.cd.detectChanges();
            },
            (err) => {
                this.detailLoading = false;
                this.cd.detectChanges();
            }
        );
    }

    onSave() {
        this.srv.update(this.listDetail).subscribe((res) => {
            this.msg.showSuccess(res);
            this.isShow = false;
            this.cd.detectChanges();
        });
    }
}
