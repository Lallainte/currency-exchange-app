import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ConfigService } from 'src/app/core/service/app.config.service';

export interface ErrorValidationApi {
    key: string;
    message: any[];
}

/**
 * A convenient service for showing notification message box
 */
@Injectable({
    providedIn: 'root',
})
export class MessageBoxService {
    constructor(
        private messageService: MessageService,
        public configService: ConfigService
    ) {}

    public showWarn(message: string, title: string = 'Warning') {
        this.showMessage('warn', title, message);
    }

    public showSuccess(
        message: string,
        title?: string,
        redirect = true,
        path = null
    ) {
        if(title){
            let suc = {
                title: title,
                message: message,
                redirect: redirect,
                path: path,
            };
            this.configService.onShowSuccess(suc);
        }else{
            let suc = {
                title: 'Success!',
                message: message,
                redirect: redirect,
                path: path,
            };
            this.configService.onShowSuccess(suc);
        }
        // this.showMessage('success', title, message);
    }

    public showInfo(message: string, title: string = 'Information') {
        this.showMessage('info', title, message);
    }

    public showError(message: string, title: string = 'Error') {
        let err = {
            title: title,
            message: message,
        };
        this.configService.onShowError(err);
        // this.showMessage('error', title, message);
    }

    private showMessage(severity: string, title: string, message: string) {
        this.messageService.add({
            severity,
            summary: title,
            detail: message,
            key: 'info',
            life: 5000
        });
    }

    /**
     * This method is used to handle 422 HTTP status response from API
     * with status code = 444 (JSON Format validation violation)
     * @param   errorValidationApi List of Error Validation API
     * @returns any[]
     */
    public showMessageValidationFromApi(
        errorValidationApi: ErrorValidationApi[]
    ): void {
        const msgs: any[] = [];

        for (const summary of errorValidationApi) {
            for (const detail of summary.message) {
                msgs.push({
                    severity: 'warn',
                    summary: summary.key,
                    detail,
                });
            }
        }

        this.messageService.addAll(msgs);
    }
}
