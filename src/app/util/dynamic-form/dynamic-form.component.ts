import { DynamicFormService } from './dynamic-form.service';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
    OnInit,
    Component,
    AfterViewInit,
    ChangeDetectorRef,
    OnDestroy,
} from '@angular/core';
import {
    ConfirmEventType,
    ConfirmationService,
    MessageService,
} from 'primeng/api';
import { isElement, isField } from './utils/common-functions';

interface Data {
    uri: string;
    elements: any[];
    cancelUrl: string;
    successUrl: string;
}

function generateId() {
    return 'id' + Math.random().toString(16).slice(2);
}

@Component({
    selector: 'l-dynamicForm',
    styleUrls: ['./dynamic-form.component.scss'],
    templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements AfterViewInit, OnInit, OnDestroy {
    public data: Data = {
        uri: null,
        elements: [],
        cancelUrl: null,
        successUrl: null,
    };
    public isDragging: boolean = false;
    public isDragToForm: boolean = false;
    public dragToEditor: boolean = false;
    public dragToSection: boolean = false;
    public dropSectionWidth: string = '100%';
    public draggedSidebarItem: string | null = '';
    public dropSectionListWidth: string = '100%';
    public isSectionListItemDragging: boolean = false;

    public get styleDroppableEditor() {
        return {
            'flex-direction': !this.data.elements.length && 'column',
            'align-items': !this.data.elements.length && 'center',
            'justify-content': !this.data.elements.length && 'center',
            display: !this.data.elements.length ? 'flex' : 'block',
        };
    }

    constructor(
        private _cs: ConfirmationService,
        private _ms: MessageService,
        private _cdr: ChangeDetectorRef,
        private _dfs: DynamicFormService
    ) {}

    public addNewSection(event: Event): void {
        event.stopPropagation();

        this.data.elements.push({
            id: generateId(),
            type: 'Section',
            title: `Untitled Section (${this.data.elements.length + 1})`,
            components: [],
        });

        this.saveDataToLocalStorage();
    }

    public updateInputData(event: Event, key: string): void {
        this.data[key] = (event.target as HTMLInputElement).value;

        this.saveDataToLocalStorage();
    }

    public drop(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }

        this.draggedSidebarItem = null;
        this.isSectionListItemDragging = false;

        this.saveDataToLocalStorage();
    }

    public drag(event: Event, dropZoneClassName: string): void {
        event.stopPropagation();

        if (this.isDragging) {
            return;
        }

        const dropSections = document.querySelectorAll(`.${dropZoneClassName}`);

        dropSections?.forEach((dragSection) => {
            if (!dragSection.querySelector('.drop-section-list')) {
                dragSection.classList.add('dragging');
            }
        });

        this.isDragging = true;
    }

    public removeDropIndicatorOnDropSectionWhenSectionHasFilled(
        event: DragEvent,
        dataIndex: number
    ): void {
        const target = event.target as HTMLElement;
        const isForm =
            this.data.elements[dataIndex].components.length &&
            isElement(this.draggedSidebarItem);

        if (isForm) {
            target.closest('.drop-section').classList.add('dragging');
            return;
        }

        target.closest('.drop-section').classList.remove('p-draggable-enter');
    }

    public handleDropSectionDragLeave(
        event: DragEvent,
        dataIndex: number
    ): void {
        const target = event.target as HTMLElement;
        const isForm =
            this.data.elements[dataIndex].components.length &&
            isElement(this.draggedSidebarItem);

        if (isForm) {
            target
                .closest('.drop-section')
                .classList.remove('p-draggable-enter', 'dragging');
        }
    }

    public dragStart(event: Event, type: string, zone?: string) {
        event.stopPropagation();

        const dt = (event as DragEvent).dataTransfer;

        dt.setData('type', type);

        if (zone === 'drop-form') {
            this.isDragToForm = true;
        }

        this.draggedSidebarItem = type;
    }

    public dragEnd(event: Event, zone?: string) {
        event.stopPropagation();

        if (zone === 'editor') {
            this.dragToEditor = false;
        }

        if (zone === 'section') {
            this.dragToSection = false;
        }

        document
            .querySelectorAll('.dragging')
            .forEach((el) => el.classList.remove('dragging'));

        this.isDragging = false;
        this.isDragToForm = false;
        this.draggedSidebarItem = null;
    }

    public dropToSection(event: Event, dataIndex: number): any {
        event.stopPropagation();

        const type: string = (event as DragEvent).dataTransfer.getData('type');

        if (isField(type)) {
            if (!this.data.elements[dataIndex].components.length) {
                return this._ms.add({
                    detail: `The section has no element type form, should add the element type form first then add the field type ${type.toLowerCase()}.`,
                    summary: 'Warn',
                    severity: 'warn',
                });
            }

            const target = event.target as HTMLElement;
            const idToArray = target
                .closest('.drop-section-list')
                ?.getAttribute('id')
                .split('-');
            const index = idToArray ? idToArray[idToArray.length - 1] : 0;

            const data: any = this.setupData(type);

            return this.data.elements[dataIndex].components[0].components[
                index
            ].push(data);
        }

        if (isElement(type)) {
            if (this.data.elements[dataIndex].components.length) {
                return this._ms.add({
                    detail: `The section already has element. try creating a new section to add element type ${type.toLowerCase()}.`,
                    summary: 'Warn',
                    severity: 'warn',
                });
            }

            if (type === 'Form') {
                this.data.elements[dataIndex].components.push({
                    type,
                    id: generateId(),
                    components: [[], []],
                });
            }

            if (type === 'Table') {
                this.data.elements[dataIndex].components.push({
                    type,
                    id: generateId(),
                    uri: null,
                    columns: [],
                });
            }
        }

        this.saveDataToLocalStorage();
    }

    public updateTitleSection(event: Event, dataIndex: number): void {
        this.data.elements[dataIndex].title = (
            event.target as HTMLInputElement
        ).value.trim();

        this.saveDataToLocalStorage();
    }

    public dropToFormColumn(
        event: Event,
        { dataIndex, dataComponentIndex, formComponentIndex }: any
    ): void {
        event.stopPropagation();

        const type: string = (event as DragEvent).dataTransfer.getData('type');
        const data: any = this.setupData(type);

        if (isField(type)) {
            this.data.elements[dataIndex].components[
                dataComponentIndex
            ].components[formComponentIndex].push(data);
        }

        this.saveDataToLocalStorage();
    }

    public updateBoxData(data: any, index: any, element?: string): void {
        if (element === 'Table') {
            this.data.elements[index.dataIndex].components[0] = data;
        } else {
            this.data.elements[index.dataIndex].components[0].components[
                index.formComponentIndex
            ][index.componentIndex] = data;
        }

        this.saveDataToLocalStorage();
    }

    public removeBoxData({
        dataIndex,
        dataComponentIndex,
        componentIndex,
        formComponentIndex,
    }: any): void {
        this.data.elements[dataIndex].components[0].components[
            formComponentIndex
        ].splice(componentIndex, 1);

        this.saveDataToLocalStorage();
    }

    public removeSectionData(index: number, title: string): void {
        this._cs.confirm({
            icon: 'pi pi-info-circle',
            header: 'Remove Confirmation',
            message: `Do you want to remove ${title} section?`,
            accept: () => {
                this.data.elements.splice(index, 1);

                this.saveDataToLocalStorage();

                this._ms.add({
                    severity: 'success',
                    summary: 'Deleted',
                    detail: 'The section has been deleted',
                });
            },
            reject: (type) => {
                // switch (type: ConfirmEventType) {
                //     case ConfirmEventType.REJECT:
                //         this._ms.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                //         break;
                //     case ConfirmEventType.CANCEL:
                //         this._ms.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                //         break;
                //     default:
                //         break;
                // }
            },
        });
    }

    public saveDataToLocalStorage(): void {
        localStorage.setItem('dynamic-form', JSON.stringify(this.data));
    }

    public generateBaseData(): object {
        return {
            id: generateId(),
            label: 'Untitled Field',
            value: null,
            inputId: generateId(),
            disabled: false,
            required: false,
            centerLabel: false,
            description: null,
            placeholder: 'Untitled Field',
            defaultValue: null,
            propertyName: generateId(),
        };
    }

    public setupData(type: string): any {
        const data: any = this.generateBaseData();

        data.type = type;

        if (type === 'Radio') {
            data.values = [];
        }

        if (type === 'Attachment') {
            data.attachmentAcceptFile = 'all';
        }

        return data;
    }

    public onCdkDragStartedDropSection(event: any) {
        const parentNode = event.source.element.nativeElement.parentNode;
        const dropSectionEl = parentNode.querySelector('.drop-section');
        const dropSectionWidth = getComputedStyle(dropSectionEl).width;
        const dropSectionWidthNumber = parseFloat(dropSectionWidth);

        this.dropSectionWidth = dropSectionWidthNumber + 'px';
    }

    public onCdkDragStartedDropSectionList(event: any) {
        const parentNode = event.source.element.nativeElement.parentNode;
        const dropSectionEl = parentNode.querySelector('.drop-section-list');
        const dropSectionListWidth = getComputedStyle(dropSectionEl).width;
        const dropSectionListWidthNumber = parseFloat(dropSectionListWidth);

        this.dropSectionListWidth = dropSectionListWidthNumber + 'px';
        this.isSectionListItemDragging = true;
    }

    public ngOnInit(): void {
        const dynamicFormLocalStorage = JSON.parse(
            localStorage.getItem('dynamic-form')
        );

        if (dynamicFormLocalStorage?.elements?.length) {
            this.data = dynamicFormLocalStorage;
        }
    }

    public ngAfterViewInit(): void {
        document
            .querySelector('.layout-main-container')
            .setAttribute('style', 'margin: 0; padding: 80px 0 0 0');

        document
            .querySelector('.layout-sidebar')
            .setAttribute('style', 'display: none');
    }

    public ngOnDestroy(): void {
        document
            .querySelector('.layout-main-container')
            .removeAttribute('style');

        document
            .querySelector('.layout-sidebar')
            .setAttribute('style', 'display: block');
    }
}
