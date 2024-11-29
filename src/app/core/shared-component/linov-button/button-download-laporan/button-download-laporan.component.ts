import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AppConstant } from 'src/app/core/config/app.config';
@Component({
    selector: 'btn-download-laporan',
    templateUrl: './button-download-laporan.component.html',
    styleUrls: ['./button-download-laporan.component.scss'],
})
export class ButtonDownloadLaporanComponent implements OnInit {
    @Input() disabled = false;
    @Input() isMulti = false;
    @Input() btnLabel = 'Download';
    @Input() selected;
    @Output() onClick = new EventEmitter<any>();
    isShowNoData = false;
    isShow = false;
    title;
    items: MenuItem[] = [];
    constructor(private confirmationService: ConfirmationService) { }
    ngOnChanges(changes: SimpleChanges): void {
        this.ngOnInit();
    }
    ngOnInit() {
        this.items = [];
        this.items.push(
        //     {
        //     label: 'Download as PDF File',
        //     icon: 'fas fa-file-pdf',
        //     command: () => {
        //         this.click('pdf');
        //     },
        // },
        {
            label: 'Download as Excel File',
            icon: 'fas fa-file-excel',
            command: () => {
                this.click('excel');
            },
        });
    }
    click(
        e,
        needData?,
        needConfirmation?,
        icon?,
        labelAccept?,
        buttonStyle?,
        outlined?
    ) {
        if (needData || needConfirmation) {
            if (this.selected?.length > 0 || needConfirmation) {
                this.isShow = true;
                this.confirmationService.confirm({
                    message: AppConstant[e + 'Message'],
                    acceptLabel: labelAccept ? labelAccept : 'Ya',
                    rejectLabel: 'Tidak',
                    icon: icon ? icon : 'bi bi-exclamation-triangle',
                    rejectButtonStyleClass: outlined
                        ? 'p-button-cancel-outlined-red '
                        : 'p-button-cancel-outlined',
                    acceptButtonStyleClass: buttonStyle
                        ? buttonStyle
                        : 'p-button-accept',
                    accept: () => {
                        this.isShow = false;
                        this.confirmationService.close();
                        e = e == 'earlyOut' ? 'early-out' : e;
                        this.onClick.emit(e);
                    },
                    reject: () => {
                        this.isShow = false;
                        this.confirmationService.close();
                    },
                });
            } else {
                this.title = e;
                this.isShowNoData = true;
            }
        } else {
            this.onClick.emit(e);
        }
    }
}
