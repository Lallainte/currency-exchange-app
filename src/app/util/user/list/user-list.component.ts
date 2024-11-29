import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { PageInfo } from 'src/app/core/model/page-info';
import { MessageBoxService } from 'src/app/core/service/message-box.service';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
    list = [];
    count = 0;
    first = 0;
    constructor(
        private router: Router,
        private srv: UserService,
        private cd: ChangeDetectorRef,
        private msg: MessageBoxService
    ) {}
    loading = false;
    selected = [];
    body;
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
    onAdd() {
        this.router.navigate(['/util/user/add']);
    }
    aksi(e) {
        if (e == 'add') {
            this.onAdd();
        } else if (e == 'activate') {
            this.act();
        } else if (e == 'deactivate') {
            this.deact();
        }
    }
    onEdit(e) {
        this.router.navigate(['/util/user/' + e.id]);
    }

    act() {
        this.srv.act(this.selected).subscribe((res) => {
            this.msg.showSuccess(res);
            this.selected = [];
            this.getList(new PageInfo(1, 10));
        });
    }

    deact() {
        this.srv.deact(this.selected).subscribe((res) => {
            this.msg.showSuccess(res);
            this.selected = [];
            this.getList(new PageInfo(1, 10));
        });
    }
}
