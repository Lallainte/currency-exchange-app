import { Injectable } from '@angular/core';
import { AppConstant } from '../config/app.config';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    privilegeMenu: any;

    constructor() {}

    setLocalStorage(key: string, value: any) {
        localStorage.setItem(key, btoa(JSON.stringify(value)));
    }

    getLocalStorage(key: string) {
        const item = localStorage.getItem(key);

        if (item) {
            return JSON.parse(atob(item));
        } else {
            return item;
        }
    }

    isLoggedIn(): boolean {
        return this.getLocalStorage(AppConstant.userSessionKey) !== null;
    }

    destroySession() {
        const savedUser = this.getLocalStorage(AppConstant.savedUser);

        localStorage.clear();

        savedUser?.rememberMe &&
            this.setLocalStorage(AppConstant.savedUser, savedUser);
    }

    createSession(session) {
        this.setLocalStorage(AppConstant.userSessionKey, session);
        localStorage.setItem('seen_badge', 'false');
    }

    getSession(): UserSession {
        if (!this.getLocalStorage(AppConstant.userSessionKey)?.accessToken) {
            return JSON.parse(this.getLocalStorage(AppConstant.userSessionKey));
        } else {
            return this.getLocalStorage(AppConstant.userSessionKey);
        }
    }
}
export interface UserSession {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
    selectedCompanyId?: string;
    subStat: string;
}

interface User {
    id: string;
    userRoles: any[];
    tenant: Tenant;
    isSa: boolean;
    version: number;
}

interface Tenant {
    id: string;
    companies: Company[];
    tenantModules: TenantModule[];
}

interface TenantModule {
    id: string;
    label: string;
    icon: string;
    routerLink: string[];
    items: Item2[];
    userWidgets: any[];
}

interface Item2 {
    id: string;
    label: string;
    routerLink: (null | null | string | string)[];
    icon: string;
    items?: Item[];
}

interface Item {
    id: string;
    label: string;
    routerLink: string[];
    icon: string;
}

interface Company {
    id: string;
    name: string;
}

interface Token {
    accessToken: string;
    refreshToken: string;
}
