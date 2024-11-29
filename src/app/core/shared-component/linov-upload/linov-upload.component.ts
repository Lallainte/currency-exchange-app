import { Subscription } from 'rxjs';
import { MessageBoxService } from '../../service/message-box.service';
import { LinovUploadService } from './linov-upload.service';
import { ConfirmationService } from 'primeng/api';
import {
    Input,
    OnInit,
    Output,
    OnChanges,
    Component,
    OnDestroy,
    EventEmitter,
    SimpleChanges,
} from '@angular/core';

@Component({
    selector: 'app-linov-upload',
    styleUrls: ['./linov-upload.component.scss'],
    templateUrl: './linov-upload.component.html',
})
export class LinovUploadComponent implements OnInit, OnChanges, OnDestroy {
    @Input() src;
    @Input() uri: string;
    @Input() value: any;
    @Input() sources = [];
    @Input() isImage = false;
    @Input() disabled;
    @Input() multiple: boolean = false;
    @Input() fileType = 'image';
    @Input() detailMode: boolean = false;
    @Input() maxFileSize = 1048576;
    @Input() editMode: boolean = false;
    @Input() isImagePreview = false;
    @Input() allowedFileType;
    @Input() showClearButton = true;
    @Input() inlineUploadIcon = false;
    @Input() isSmall: boolean = false;

    @Output() onChange = new EventEmitter<any>();
    @Output() onClickInlineUploadIcon = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();

    extensionMap = new Map([
        ['excel', ['.XLSX', '.XLS']],
        ['image', ['.JPG', '.PNG', '.JPEG']],
        ['docs', ['.DOCX', '.DOC', '.PDF', '.XLSX', '.XLS']],
        [
            'all',
            ['.JPG', '.PNG', '.JPEG', '.DOCX', '.DOC', '.PDF', '.XLSX', '.XLS'],
        ],
    ]);

    categoriesFileType = ['image', 'excel', 'docs'];

    file;
    infoFiles = [];
    isLoading: boolean = false;
    listImgSubs: Subscription;
    filePreview = '';
    formatedSize;
    uploadedFiles = [];
    isShowConfirm: boolean = false;
    formatedFileType;

    constructor(
        private msg: MessageBoxService,
        private srv: LinovUploadService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        if (!this.allowedFileType) {
            this.allowedFileType = this.extensionMap.get(this.fileType);
        }

        this.getListImage();
        this.setupInfo();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes?.fileType?.currentValue !==
                changes?.fileType?.previousValue &&
            !changes?.fileType?.firstChange
        ) {
            this.allowedFileType = this.extensionMap.get(this.fileType);
            this.setupInfo();
        }

        if (this.value) {
            this.getValue();
        }
    }

    setupInfo() {
        this.formatedSize = this.formatBytes(this.maxFileSize);
        this.formatedFileType = this.allowedFileType
            .toString()
            .split('.')
            .join('')
            .toUpperCase();
    }

    getListImage() {
        if (this.uri) {
            this.isLoading = true;
            this.multiple = true;
            this.listImgSubs = this.srv.get(this.uri).subscribe({
                next: (res) => {
                    if (res) {
                        this.isLoading = false;
                        for (let file of res?.data) {
                            this.checkFileType('.' + file.fileType);
                            this.isImage = this.filePreview == 'image';
                            this.sources.push(
                                `data:image/png;base64,${file.file.base}`
                            );
                            this.infoFiles.push({
                                name: file.fileName,
                                size: file.fileSize
                                    ? this.formatBytes(file.fileSize)
                                    : this.getFileSizeFromBase64(
                                          file.file.base
                                      ),
                            });
                        }
                        this.uploadedFiles = res?.data;
                    }
                },
                error: (err) => {
                    this.isLoading = false;
                    console.error(err);
                },
            });
        }
    }

    checkFileType(ext: string) {
        const filteredAllowedFileType = [...this.extensionMap].filter(
            ([category]) => category !== 'all'
        );
        for (const [category, extensions] of filteredAllowedFileType) {
            if (extensions.includes(ext.toUpperCase())) {
                this.filePreview = category;
            }
        }
    }

    formatBytes(bytes) {
        var marker = 1024;
        var decimal = 0;
        var kiloBytes = marker;
        var megaBytes = marker * marker;
        var gigaBytes = marker * marker * marker;
        if (bytes >= gigaBytes)
            return (bytes / gigaBytes).toFixed(decimal) + ' GB';
        else if (bytes >= megaBytes)
            return (bytes / megaBytes).toFixed(decimal) + ' MB';
        else if (bytes >= kiloBytes)
            return (bytes / kiloBytes).toFixed(decimal) + ' KB';
        else return bytes + ' Bytes';
    }

    openImageOnNewTab(idx?) {
        const image = new Image();
        const w = window.open('');

        if (this.multiple) {
            image.src = this.sources[idx];
        } else {
            image.src = this.src;
        }

        w.document.write(image.outerHTML);
    }

    createFileList(arrayFiles) {
        const dataTransfer = [];

        arrayFiles.forEach((file) => {
            const blob = new Blob([file.file.base], {
                type: file.fileType ? file.fileType : file.file?.ext,
            });
            const slicedBlob = blob.slice(
                0,
                Number(file.fileSize),
                file.fileType ? file.fileType : file.file?.ext
            );
            const options = {
                type: file.fileType ? file.fileType : file.file?.ext,
                lastModified: Date.now(),
            };
            const customizedFile = new File(
                [slicedBlob],
                file.fileName,
                options
            );

            dataTransfer.push(customizedFile);
        });

        return dataTransfer;
    }

    click(e) {
        this.onChange.emit(e);
    }

    clear(idx?: number) {
        if (this.multiple) {
            this.infoFiles.splice(idx, 1);
            this.uploadedFiles.splice(idx, 1);
            this.sources.splice(idx, 1);
            this.file = null;
            this.src = null;
            this.value = null;
            this.onChange.emit(this.uploadedFiles);
        } else {
            this.infoFiles = [];
            this.uploadedFiles = [];
            this.sources = [];
            this.file = null;
            this.src = null;
            this.value = null;
            this.onChange.emit(null);
        }
    }

    onDeleteImage(id, idx) {
        if (id) {
            this.isShowConfirm = true;
            this.confirmationService.confirm({
                message: `Are you sure to delete these data?`,
                header: 'Delete Data',
                acceptLabel: 'Yes',
                rejectLabel: 'No',
                rejectButtonStyleClass: 'confirm-button-no',
                acceptButtonStyleClass: 'confirm-button-yes',
                accept: () => {
                    this.isShowConfirm = true;
                    this.confirmationService.close();
                    this.onDelete.emit(id);
                    this.infoFiles.splice(idx, 1);
                    this.uploadedFiles.splice(idx, 1);
                    this.sources.splice(idx, 1);
                    this.file = null;
                    this.src = null;
                    this.value = null;
                },
                reject: (type) => {
                    this.isShowConfirm = true;
                    this.confirmationService.close();
                },
            });
        } else {
            this.infoFiles.splice(idx, 1);
            this.uploadedFiles.splice(idx, 1);
            this.sources.splice(idx, 1);
            this.file = null;
            this.src = null;
            this.value = null;
            this.onChange.emit(this.filterBlobs(this.uploadedFiles));
        }
    }

    getValue() {
        if (this.value instanceof Object) {
            let files = [];
            this.checkFileType('.' + this.value.file?.ext);
            if (this.filePreview == 'image') {
                this.isImage = true;
            } else {
                this.isImage = false;
            }

            this.multiple = false;
            this.src = `data:image/png;base64,${this.value.file.base}`;
            this.infoFiles.push({
                name: this.value.fileName,
                size: this.value.fileSize
                    ? this.formatBytes(this.value.fileSize)
                    : this.getFileSizeFromBase64(this.value.file.base),
            });
            files.push(this.value);
            this.uploadedFiles = this.createFileList(files);
        } else if (typeof this.value == 'string') {
            let extValueArr = this.value.split('.');
            let ext = extValueArr[extValueArr.length - 1];
            this.checkFileType('.' + ext);
            this.infoFiles.push({
                name: this.value,
                size: '',
            });
            this.uploadedFiles.push({
                name: this.value,
                size: '',
            });
        }
    }

    getFileSizeFromBase64(base64String) {
        const length = base64String.length;
        const fileSize = (length * 3) / 4;
        return this.formatBytes(fileSize);
    }

    onUpload(event) {
        const files = event.target.files;

        if (!files || files.length === 0) {
            this.msg.showError('Tidak terdapat file yang diunggah.');
            return;
        }

        if (!this.multiple && files.length > 1) {
            this.msg.showError('Pengunggahan beberapa file tidak diizinkan.');
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const currentFile = files[i];
            if (currentFile.size > this.maxFileSize) {
                this.msg.showError(
                    `Ukuran file "${currentFile.name}" terlalu besar`
                );
            } else {
                let extArray = currentFile.name.split('.');
                let ext = extArray[extArray.length - 1];
                if (
                    !this.formatedFileType
                        .toLowerCase()
                        .includes(ext.toLowerCase())
                ) {
                    this.msg.showError(
                        `File "${currentFile.name}" tidak diizinkan. Hanya diperbolehkan: ${this.formatedFileType}`
                    );
                } else {
                    this.checkFileType('.' + ext);

                    this.infoFiles.push({
                        name: currentFile.name,
                        size: this.formatBytes(currentFile.size),
                    });

                    const reader = new FileReader();
                    reader.readAsDataURL(currentFile);
                    reader.onload = () => {
                        this.sources.push(reader.result as string);
                        this.src = reader.result as string;
                    };

                    this.uploadedFiles.push(currentFile);

                    if (!this.multiple) {
                        this.onChange.emit(currentFile);
                        return;
                    }
                }
            }
        }
        if (this.multiple) {
            if (this.editMode) {
                this.onChange.emit(this.filterBlobs(this.uploadedFiles));
            } else {
                this.onChange.emit(this.uploadedFiles);
            }
        }
    }

    filterBlobs(array) {
        return array.filter((item) => item instanceof Blob);
    }

    ngOnDestroy(): void {
        if (this.listImgSubs) {
            this.listImgSubs.unsubscribe();
        }
    }
}
