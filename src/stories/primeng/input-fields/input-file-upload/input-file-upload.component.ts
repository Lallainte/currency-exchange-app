import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}
@Component({
    selector: 'c-fileUpload',
    template: ` <p-fileUpload
        mode="basic"
        chooseLabel="Choose"
        name="demo[]"
        url="https://www.primefaces.org/cdn/api/upload.php"
        accept="image/*"
        [maxFileSize]="maxFileSize"
        (onUpload)="onUpload($event)"
    ></p-fileUpload>`,
    styleUrls: [],
    providers: [MessageService],
})
export default class InputUpload {
    @Input() maxFileSize = 1048576;

    constructor(private messageService: MessageService) {}

    onUpload(event: UploadEvent) {
        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded with Basic Mode',
        });
    }
}
