import { AppConstant } from '@core/config/app.config';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LogHistoryService } from '../../service/log-history.service';
import { PageInfo } from '@core/model/page-info';
import { HelpersLogHistory } from '../../helper/helpers';

@Component({
    selector: 'app-detail-log-history',
    styleUrls: ['detail.component.scss'],
    templateUrl: 'detail.component.html',
})
export class DetailComponentLogHistory implements OnInit, OnDestroy {
    uri = `log/user/detail`;
    body = {
        date: null,
        action: null,
        user: null,
        module: null,
        entityName: null,
    };
    page = 1;
    text = {
        title: 'logHistory',
        subTitle: 'logHistoryDetail',
    };
    limit = AppConstant.rowsPerPage;
    isBack: boolean = true;
    loading: boolean = false;
    listData = [];
    detailDatas = [];
    maxDataReached: boolean = false;
    listSubcription: Subscription;
    updateActionTemplate: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private srv: LogHistoryService,
        private cd: ChangeDetectorRef,
        public helpLog: HelpersLogHistory
    ) {}

    ngOnInit() {
        this.body = {
            date: this.route.snapshot.queryParamMap.get('date'),
            action: this.route.snapshot.queryParamMap.get('action'),
            user: this.route.snapshot.queryParamMap.get('user'),
            module: this.route.snapshot.queryParamMap.get('module'),
            entityName: this.route.snapshot.queryParamMap.get('entityName'),
        };
        this.getData(new PageInfo(this.page, this.limit));
    }

    getData(pi, infinite = false) {
        if (!infinite) this.loading = true;
        if (this.uri) {
            this.listSubcription = this.srv
                .get(this.uri, pi, this.body)
                .subscribe({
                    next: ({ data }) => {
                        if (data && data.length > 0) {
                            if (infinite) {
                                this.listData = this.listData.concat(data);
                            } else {
                                this.listData = data;
                            }
                            this.helpLog.removeKeyFromEntity(this.listData);
                            this.loading = false;
                            this.cd.detectChanges();
                        } else {
                            this.maxDataReached = true;
                        }
                    },
                    error: (err) => {
                        this.loading = false;
                        this.cd.detectChanges();
                    },
                });
        } else {
            this.loading = false;
            this.cd.detectChanges();
        }
        if (this.body.action === 'UPDATE') {
            this.updateActionTemplate = true;
        }
    }

    onScrollNearEnd() {
        this.getData(new PageInfo(++this.page, this.limit), true);
    }

    ngOnDestroy(): void {
        if (this.listSubcription) {
            this.listSubcription.unsubscribe();
        }
    }
}
