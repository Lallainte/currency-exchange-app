import { Component, ViewChild } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    FormControl,
    Validators,
    FormArray,
} from '@angular/forms';
import { DynamicFormPreviewService } from './dynamic-form-preview.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { MessageBoxService } from '@core/service/message-box.service';
import { CheckboxOnChangeEvent } from '@core/shared-component/checkbox';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { TableComponent } from '@core/shared-component/table/table.component';

@Component({
    selector: 'dynamic-form-preview',
    templateUrl: './dynamic-form-preview.component.html',
})
export class DynamicFormPreviewComponent {
    @ViewChild('TableComponent') table: TableComponent;

    public dynamicForm: FormGroup;
    public uploadedFiles: any;

    public data: any = JSON.parse(localStorage.getItem('dynamic-form'));
    public dataCheckbox: any = [];

    public selectedList: any[] = [];
    public body;
    public selected;
    public selectedItems = 0;
    public isButtonDisabled: boolean = true;

    constructor(
        private _location: Location,
        private formBuilder: FormBuilder,
        private dynamicFormPreviewService: DynamicFormPreviewService,
        private msg: MessageBoxService
    ) {}

    public onSearch(e): void {
        this.body = e;
        this.table.onSearch(this.body);
    }

    public ngOnInit(): void {
        const sections = this.dynamicFormPreviewService.getStructure();
        const formGroup = {};

        sections.forEach((section) => {
            section.components.forEach((element) => {
                if (element.type === 'Form') {
                    element.components.forEach((column) => {
                        column.forEach((field) => {
                            const validators = [];
                            const value =
                                field.value || field.defaultValue || '';

                            if (field.required) {
                                validators.push(Validators.required);
                            }

                            if (field.minimumLength) {
                                validators.push(
                                    Validators.minLength(field.minimumLength)
                                );
                            }

                            if (field.maximumLength) {
                                validators.push(
                                    Validators.maxLength(field.maximumLength)
                                );
                            }

                            // if (field.type === 'Checkbox') {
                            //     const values = [];

                            //     field.defaultValue.forEach((val: string) => {
                            //         values.push(new FormControl(val));
                            //     });

                            //     formGroup[field.propertyName] =
                            //         this.formBuilder.array(
                            //             values || value || [],
                            //             validators
                            //         );

                            //     return;
                            // }

                            formGroup[field.propertyName] = [
                                { value, disabled: field.disabled },
                                validators,
                            ];
                        });
                    });
                }
            });
        });

        this.dynamicForm = this.formBuilder.group(formGroup);

        console.log(this.dynamicForm.getRawValue());
    }

    public hasError(field: any): boolean {
        const fc = this.dynamicForm.get(field.propertyName);

        return (fc.touched || fc.dirty) && !fc.valid;
    }

    public getErrorMessage(field): string {
        const formControl = this.dynamicForm.get(field.propertyName);

        // for (const validation of field.validations) {
        //     if (formControl.hasError(validation.name)) {
        //         return validation.message;
        //     }
        // }

        if (formControl.hasError('required')) {
            return 'Please fill out this field.';
        }

        if (formControl.hasError('minlength')) {
            return `Please enter at least ${field.minimumLength} characters.`;
        }

        if (formControl.hasError('maxlength')) {
            return `Please shorten your input to ${field.maximumLength} characters or less.`;
        }

        return '';
    }

    public handleSelectedLov(data: any, propertyName: string): void {
        this.dynamicForm.get(propertyName).patchValue(data.id);
    }

    public handleCheckboxChange(
        e: CheckboxChangeEvent,
        propertyName: string
    ): void {
        this.dataCheckbox.push(this.dynamicForm.get(propertyName).value[0]);

        console.log(new Set([...this.dataCheckbox]));
        // this.dynamicForm.patchValue({
        //     [propertyName]: e.checked,
        // });
    }

    public onSave(): void {
        if (this.dynamicForm.valid) {
            const obj = this.dynamicForm.getRawValue();

            let formData = null;

            if (this.uploadedFiles) {
                formData = new FormData();

                formData.append('attachment', this.uploadedFiles);
                formData.set('body', JSON.stringify(obj));
            }

            lastValueFrom(
                this.dynamicFormPreviewService.save(this.data.uri, obj)
            ).then((res) => {
                this.msg.showSuccess(JSON.parse(res).data);
            });
        } else {
            this.dynamicForm.markAllAsTouched();
        }
    }

    actionSelected(e) {
        if (e.length > 0) {
            this.isButtonDisabled = false;
            this.selectedItems = e.length;
            this.selected = e;
        } else {
            this.isButtonDisabled = true;
            this.selectedItems = 0;
        }
    }

    onDelete() {
        if (this.selected.length > 0) {
            const idList = [];

            this.selected.forEach((item) => {
                idList.push(item.id);
            });

            if (idList.length > 1) {
                // lastValueFrom(this.service.deleteBatch(idList)).then((response) => {
                //   const res = JSON.parse(response);
                //   this.msg.showSuccess(res.data, null, false);
                //   this.selectedItems = 0;
                //   this.selected = [];
                //   this.table.onRefresh();
                // });
            } else {
                // lastValueFrom(this.service.delete(idList[0])).then((response) => {
                //   const res = JSON.parse(response);
                //   this.msg.showSuccess(res.data, null, false);
                //   this.selectedItems = 0;
                //   this.selected = [];
                //   this.table.onRefresh();
                // });
            }
        }
    }

    onAdd() {
        // this.router.navigateByUrl(
        //   this.web + '/workforce/settings/vendor-master/add'
        // );
    }

    public handleChangeAttachment(event: any, propertyName: string) {
        this.uploadedFiles = event;

        this.dynamicForm.get(propertyName).patchValue(event.name);
    }

    public onCancel(): void {
        this._location.back();
    }
}
