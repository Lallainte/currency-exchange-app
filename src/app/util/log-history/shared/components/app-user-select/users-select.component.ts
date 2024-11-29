import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { TableComponent } from '@core/shared-component/table/table.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-select',
    templateUrl: 'users-select.component.html',
    styleUrls: ['users-select.component.scss'],
})
export class UserSelectComponent implements OnInit, OnDestroy {
    @ViewChild('TableComponent') table: TableComponent;

    uri: string = 'users?isActive=true';
    body;
    count = 0;
    visible: boolean = false;
    isStatus: boolean = true;
    isSingle: boolean = true;
    listData = [];
    isSelectable: boolean = false;

    @Output() selected = new EventEmitter<any>();
    @Output() hide = new EventEmitter<any>();

    selectedData: string = '';
    selectedDatas = [];
    listSubcription: Subscription;
    columnMap = [
        {
            label: 'Name',
            key: 'username',
        },
        {
            label: 'Role',
            key: 'roleName',
        },
        {
            label: 'Email',
            key: 'email',
        },
    ];

    constructor() {}

    ngOnInit() {}

    showDialog() {
        this.visible = true;
    }

    onCancel() {
        this.visible = false;
        this.hide.emit(this.visible);
    }

    onSelected(e) {
        this.visible = false;
        this.hide.emit(this.visible);
        this.selected.emit(e)
    }

    onSearch(e) {
        this.body = e;
        this.table.onSearch(this.body);
    }

    ngOnDestroy() {
        if (this.listSubcription) {
            this.listSubcription.unsubscribe();
        }
    }
}
