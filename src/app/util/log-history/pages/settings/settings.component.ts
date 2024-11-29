import { MessageBoxService } from './../../../../core/service/message-box.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { LogHistoryService } from '../../service/log-history.service';

@Component({
    selector: 'app-settings-log-history',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss'],
})
export class SettingsComponentLogHistory implements OnInit {
    public readonly text = {
        title: 'logHistory',
        subTitle: 'userActivity&apiLogSetting',
    };
    public isEdit: boolean = false;
    public formReady!: FormGroup;
    public loading: boolean = false;

    constructor(
        private readonly fb: NonNullableFormBuilder,
        private readonly srv: LogHistoryService,
        private readonly msg: MessageBoxService
    ) {
        this.createFormReady();
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.loading = true;
        lastValueFrom(this.srv.getSetting())
            .then((res) => {
                let resp = res.data;
                this.formReady.patchValue(resp);
                this.loading = false;
            })
            .catch((err) => {
                console.error(err);
                this.loading = false;
            });
    }

    createFormReady() {
        this.formReady = this.fb.group({
            isLogApiActive: [{ value: false, disabled: true }],
            isLogActivityActive: [{ value: false, disabled: true }],
        });
    }

    onUpdate() {
        let obj = this.formReady.getRawValue();

        lastValueFrom(this.srv.putSetting(obj)).then((res) => {
            let resp = JSON.parse(res);
            
            this.isEdit = false;
            this.msg.showSuccess(resp.data, null, false);
            this.getData();
            this.handleFormReady(false)
        });
    }

    onCancel() {
        this.getData();
        this.isEdit = false;
        this.handleFormReady(false);
    }

    onEdit() {
        this.isEdit = true;
        this.handleFormReady();
    }

    handleFormReady(enabled = true) {
        if (enabled) {
            for (let i in this.formReady.controls) {
                this.formReady.get(i)?.enable();
                this.formReady.get(i).updateValueAndValidity();
            }
        } else {
            for (let i in this.formReady.controls) {
                this.formReady.get(i)?.disable();
                this.formReady.get(i).updateValueAndValidity();
            }
        }
    }
}
