import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { DropdownChangeEvent } from 'primeng/dropdown';
import {
    Color,
    Response,
} from '../../shared-component/lov-color/lov-color.interface';
import { ApiService } from '../../service/api.service';

@Component({
    selector: 'app-lov-color',
    templateUrl: './lov.component.html',
    styleUrls: ['./lov.component.scss'],
})
export class LovColorComponent implements OnInit, OnChanges {
    public selectedData: Color;

    public data: Color[] = [];

    @Input() public readonly value: string;
    @Input() public readonly ngClass: object;
    @Input() uri: string;
    @Input() chaining = false;
    @Input() disabled = false;

    @Output('onChange') private readonly _onChange: EventEmitter<Color> =
        new EventEmitter<Color>();

    constructor(private _service: ApiService) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.chaining) {
            this.ngOnInit();
        } else {
            if (changes.value?.currentValue) {
                this.selectedData = this.data.find(
                    (data) => data.id === this.value
                );
            }
        }
    }

    public ngOnInit(): void {
        if (this.uri) {
            this.setupData();
        }
    }

    public handleChange(event: DropdownChangeEvent): void {
        this._onChange.emit((this.selectedData = event.value));
    }

    public setupData(): void {
        this._service.get(this.uri).subscribe((res: Response) => {
            this.data = res.data;

            if (this.value) {
                this.selectedData = this.data.find(
                    (data) => data.id === this.value
                );
                if (this.selectedData) {
                    this._onChange.emit(this.selectedData);
                }
            }
        });
    }
}
