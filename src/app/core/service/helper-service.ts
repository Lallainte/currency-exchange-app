import * as CryptoJS from 'crypto-js';

import { isNil } from 'lodash-es';
import { PageInfo } from '../model/page-info';
import { NgControl } from '@angular/forms';
import { ApiService } from './api.service';
import { AppService } from 'src/app/app.service';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceEss } from './api.service-ess';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { AbstractControl } from '@angular/forms';
import { MessageBoxService } from './message-box.service';
import { AuthenticationService } from './authentication.service';

import { format } from 'date-fns';
import { saveAs } from 'file-saver';
import { lastValueFrom } from 'rxjs';
import { base64StringToBlob } from 'blob-util';

import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class HelperService {
    constructor(
        private readonly _auth: AuthenticationService,
        private readonly _apiService: ApiService,
        private readonly _appService: AppService,
        private readonly _domSanitizer: DomSanitizer,
        private readonly _apiServiceEss: ApiServiceEss,
        private readonly _messageBoxService: MessageBoxService
    ) {}

    getParam(data: PageInfo, body?: any) {
        let param = new HttpParams()
            .set('page', data.pageInfo)
            // .set('limit', data.pageLimit)
            .set('pageSize', data.pageLimit);
        // .set('tenantId', '007');
        if (body) {
            Object.keys(body).forEach((k) => {
                if (body[k] == false || (body[k] && k !== 'isRefresh')) {
                    param = param.set(k, body[k]);
                }
            });
        }

        return param;
    }

    formatDate(a: Object, timeZone?, customFormat?) {
        let formatStr = 'yyyy-MM-dd';
        if (customFormat) {
            formatStr = customFormat;
        }

        return this.formatAll(a, formatStr, timeZone);
    }

    formatTime(a: Object, timeZone?, customFormat?) {
        let formatStr = 'HH:mm';
        if (customFormat) {
            formatStr = customFormat;
        }
        return this.formatAll(a, formatStr, timeZone);
    }

    formatDateAndTime(a: Object, timeZone?, customFormat?) {
        let formatStr = 'yyyy-MM-dd HH:mm';
        if (customFormat) {
            formatStr = customFormat;
        }
        return this.formatAll(a, formatStr, timeZone);
    }

    formatDateAndTimeT(a: Object, timeZone?, customFormat?) {
        let formatStr = "yyyy-MM-dd'T'HH:mm";
        if (customFormat) {
            formatStr = customFormat;
        }
        let result = this.formatAll(a, formatStr, timeZone);
        return result;
    }

    formatDateWithComa(inputDate) {
        const date = new Date(inputDate);

        let dateOptions = {
            year: 'numeric' as const,
            month: '2-digit' as const,
            day: '2-digit' as const,
            hour: '2-digit' as const,
            minute: '2-digit' as const,
            hour12: false,
            timeZone: 'UTC',
        };

        const formattedDate = date.toLocaleString('en-US', dateOptions);
        const [datePart, timePart] = formattedDate.split(', ');
        return `${datePart}, ${timePart}`;
    }

    formatAll(a, formatStr, timeZone) {
        if (a instanceof Date) {
            let date = timeZone
                ? new Date(
                      new Date(a).toLocaleString('en', {
                          timeZone: 'Asia/Jakarta',
                      })
                  )
                : a;
            a = a ? format(date, formatStr) : null;
        } else if (a instanceof Object) {
            Object.keys(a).forEach((k) => {
                if (a[k] && a[k] instanceof Date) {
                    let date = timeZone
                        ? new Date(
                              new Date(a[k]).toLocaleString('en', {
                                  timeZone: 'Asia/Jakarta',
                              })
                          )
                        : a[k];
                    a[k] = a[k] ? format(date, formatStr) : null;
                }
            });
        }
        return a;
    }

    convertDateToDateMonthYear(
        date: string,
        format: 'short' | 'long' = 'long',
        emptyState: string = '-'
    ) {
        const dateObject = new Date(date);

        if (isNaN(dateObject.getTime())) {
            return emptyState;
        }

        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: format === 'long' ? 'numeric' : undefined,
        };
        let formattedDate = dateObject.toLocaleDateString('en-GB', options);

        if (format === 'short') {
            const yearTwoDigits = dateObject.getFullYear().toString().slice(-2);
            const parts = formattedDate.split(' ');
            formattedDate = `${parts[0]}-${parts[1]}-${yearTwoDigits}`; // Output: "10-Jun-24"
        }

        return formattedDate; // output: "10 Jun 2024"
    }

    convertTimeStringToDateTime(time) {
        return new Date('01/01/2022 ' + time + ' GMT+0700');
    }

    convertServerDateTimeToLocalDateTime(dateTime, attendance?) {
        dateTime = dateTime.replaceAll('-', '/');

        if (attendance) {
            return new Date(dateTime + ' GMT+0000');
        }

        return new Date(dateTime + ' GMT+0700');
    }

    getStatus(data) {
        let status, statusLabel;
        if (data?.status) {
            status = data?.status.toLowerCase();
            statusLabel = status;
        } else if (!isNil(data?.isActive)) {
            status = data?.isActive;
            statusLabel = data?.isActive ? 'Active' : 'Inactive';
        } else if (data?.accountBankStatus) {
            status = data?.accountBankStatus.toLowerCase();
            statusLabel = status;
        } else if (data?.statusRequest) {
            status = data?.statusRequest.toLowerCase();
            statusLabel = status;
        } else if (!isNil(data?.isPaid)) {
            status = data?.isPaid;
            statusLabel = data?.isPaid ? 'Paid' : 'Unpaid';
        } else if (data?.transferStatus) {
            status = data?.transferStatus.toLowerCase();
            statusLabel = status;
        }

        return {
            statusCode: {
                'span-gray': ['not exist'].includes(status),
                'span-active-gray': ['close', 'draft'].includes(status),
                'span-yellow': [
                    'pulang awal',
                    'pending',
                    'not exist',
                    'rollback',
                    'queue',
                ].includes(status),
                'span-active-secondary': [
                    'active',
                    'hadir',
                    'approved',
                    'publish',
                    'published',
                    'reviewed',
                    true,
                    're-open',
                    'show',
                    'paid',
                    'have',
                ].includes(status),
                'span-inactive-secondary': [
                    'inactive',
                    'tidak hadir',
                    'terlambat',
                    'rejected',
                    'canceled',
                    'unprocessed',
                    false,
                    'end',
                    'unpaid',
                    'not have',
                ].includes(status),
            },
            statusLabel: statusLabel,
        };
    }

    download(obj: Object);
    download(base: string, filename: string, ext: string);
    download(a, b?, c?) {
        const base = a.base ? a.base : a;
        const fileName = a.filename ? a.filename : b;
        const ext = a.ext ? a.ext : c;
        const file = new Blob([base64StringToBlob(base)], {
            type: 'octet/stream',
        });
        saveAs(file, fileName + (ext.includes('.') ? ext : '.' + ext));
    }

    downloadFile(resp, base = 'base', filename = 'filename', ext = 'ext') {
        var bs = atob(resp[base]);

        var buffer = new ArrayBuffer(bs.length);
        var ba = new Uint8Array(buffer);
        for (var i = 0; i < bs.length; i++) {
            ba[i] = bs.charCodeAt(i);
        }
        var file = new Blob([ba], { type: 'octet/stream' });

        saveAs(
            file,
            resp[filename] +
                (resp[ext].includes('.') ? resp[ext] : '.' + resp[ext])
        );
    }

    checkStat(noNotif?) {
        let stat = this._auth.getSession().subStat;
        if (stat == 'R96aPGLRUHso0Oixc3/PQA==') {
            return true;
        } else {
            if (!noNotif)
                this._messageBoxService.showInfo(
                    'Silahkan aktivasi akun anda untuk menggunakan fitur ini'
                );
            return false;
        }
    }

    convertInputArraysToString(arr, label = 'label') {
        const values = arr.map((obj) => obj[label]);
        return values.join('');
    }

    public isInvalidControl(
        control: NgControl | AbstractControl,
        customTouched?: boolean | undefined
    ): boolean {
        if (!control) {
            return false;
        }

        const { dirty, invalid } = control;

        return invalid && (dirty || (customTouched ?? control.touched));
    }

    public getStartAndEndIndex(pageInfo: PaginatorState): {
        endIndex: number;
        startIndex: number;
    } {
        const startIndex: number = pageInfo.rows * pageInfo.page;
        const endIndex: number = startIndex + pageInfo.rows;

        return {
            endIndex,
            startIndex,
        };
    }

    public async getEmployeePhoto(id: string): Promise<SafeUrl | undefined> {
        let image: SafeUrl = '/assets/no-profile-picture.svg';

        try {
            const res: any = await lastValueFrom(
                this._apiService.getFileByte(`employees/${id}/active-photo`)
            );
            const objectURL: string = URL.createObjectURL(res);

            image = this._domSanitizer.bypassSecurityTrustUrl(objectURL);
        } catch (error) {}

        return image;
    }

    public async getESSMyPhoto(id: string): Promise<SafeUrl | undefined> {
        let image: SafeUrl = '/assets/no-profile-picture.svg';

        try {
            const res: any = await lastValueFrom(
                this._apiServiceEss.getFileByte(`employees/${id}/active-photo`)
            );
            const objectURL: string = URL.createObjectURL(res);

            image = this._domSanitizer.bypassSecurityTrustUrl(objectURL);
        } catch (error) {}

        return image;
    }

    public filteredAdminMenus(data: any[], applicationType: string): any[] {
        const filteredArray: any[] = data.filter(
            (obj: any) =>
                obj.items.length > 0 &&
                obj.items.some(
                    (item) =>
                        item.subMenu.length > 0 &&
                        item.subMenu.some(
                            (subItem: any) => subItem.items?.length > 0
                        )
                )
        );

        const resultMap: any[] = filteredArray.map((obj: any) => ({
            name: obj.name,
            routerLink: obj.routerLink,
            items: obj.items.filter(
                (item: any) =>
                    item.subMenu.length > 0 &&
                    item.subMenu.some(
                        (subItem: any) => subItem.items?.length > 0
                    )
            ),
        }));

        return resultMap
            .find((module: any) => module.name === applicationType)
            .items.map((el: any) => ({
                items: [el],
            }));
    }

    public hasAccessToWeb(app: string): boolean {
        let hasAccess: boolean = false;

        if (
            ['ess', 'dashboard-ess'].includes(app) &&
            this._appService.hasEssAccess$.value
        ) {
            hasAccess = true;
        }

        if (app === 'mss' && this._appService.hasMssAccess$.value) {
            hasAccess = true;
        }

        if (
            ['dashboard', 'admin'].includes(app) &&
            this._appService.hasAdminAccess$.value
        ) {
            hasAccess = true;
        }

        return hasAccess;
    }

    public encryptionPassword(formValue: any): string {
        const plaintText = formValue;
        const encryptedBase64Key = 'bXVzdGJlMTZieXRlc2tleQ==';

        const parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);

        const encryptedData = CryptoJS.AES.encrypt(
            plaintText,
            parsedBase64Key,
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }
        );

        return encryptedData.toString();
    }

    public getStartAndEndDateOfTheMonth(date: Date = new Date()): {
        endDate: number;
        startDate: number;
    } {
        const endDate: number = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();
        const startDate: number = new Date(
            date.getFullYear(),
            date.getMonth(),
            1
        ).getDate();

        return {
            endDate,
            startDate,
        };
    }

    public extractDayMonthYear(value = new Date()): {
        date: number;
        year: number;
        month: number;
    } {
        const [month, date, year] = value.toLocaleDateString('en').split('/');

        return {
            date: +date,
            year: +year,
            month: +month,
        };
    }

    public minutesToHHMMSS(minutes: number): string {
        const hours: number = Math.floor(minutes / 60);
        const remainingMinutes: number = minutes % 60;
        const seconds: number = remainingMinutes * 60;

        return `${String(hours).padStart(2, '0')}:${String(
            remainingMinutes
        ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    public toCamelCase(value: string): string {
        return value
            .split(' ')
            .map((word, index) =>
                index === 0
                    ? word.charAt(0).toLowerCase() + word.slice(1)
                    : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join('');
    }

    public showMessageBulkAction(
        {
            res,
            state,
            nameModule,
            messageService,
            messageBoxService,
        }: {
            res: any;
            state: string;
            nameModule: string;
            messageService: MessageService;
            messageBoxService: MessageBoxService;
        },
        cb?: ({
            failed,
            succeed,
        }: {
            failed: boolean;
            succeed: boolean;
        }) => void
    ): void {
        const isSuccessButError: any = !res?.data;

        let data: any = JSON.parse(isSuccessButError ? res : res.data);
        let message: string = '';

        if (isSuccessButError) {
            data = data.data;
        }

        if (data.succeed) {
            message = `${data.succeed} ${nameModule} has been ${state} successfully`;
        }

        if (data.succeed && data.failed) {
            message += `, ${data.failed} failed.`;
        }

        if (!data.succeed && data.failed) {
            message = `${data.failed} ${nameModule} failed to ${state}.`;
        }

        if (isSuccessButError && data.succeed && data.failed) {
            messageService.add({
                life: 5000,
                detail: message,
                summary: 'Info',
                severity: 'info',
            });
        } else if (isSuccessButError && data.failed) {
            messageService.add({
                life: 5000,
                detail: message,
                summary: 'Fail',
                severity: 'error',
            });
        } else {
            messageBoxService.showSuccess(message, null, false);
        }

        cb({ succeed: Boolean(data.succeed), failed: Boolean(data.failed) });
    }
}
