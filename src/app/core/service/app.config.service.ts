import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from '../config/app.config';

@Injectable()
export class ConfigService {
    config: AppConfig = {
        theme: 'linov-default',
        dark: false,
        inputStyle: 'outlined',
        ripple: true,
        loading: false,
    };

    private configUpdate = new Subject<AppConfig>();

    configUpdate$ = this.configUpdate.asObservable();

    private menuToggle = new Subject<Boolean>();

    menuToggle$ = this.menuToggle.asObservable();

    private showSuccess = new Subject<Boolean>();

    showSuccess$ = this.showSuccess.asObservable();

    private showError = new Subject<Boolean>();

    showError$ = this.showError.asObservable();

    updateConfig(config: AppConfig) {
        this.config = config;
        this.configUpdate.next(config);
    }

    triggerToggleMenu() {
        this.menuToggle.next(true);
    }

    getConfig() {
        return this.config;
    }

    setLoading(boolean) {
        this.config.loading = boolean;
        this.configUpdate.next(this.config);
    }

    onShowSuccess(msg) {
        this.showSuccess.next(msg);
    }
    onShowError(msg) {
        this.showError.next(msg);
    }
}
