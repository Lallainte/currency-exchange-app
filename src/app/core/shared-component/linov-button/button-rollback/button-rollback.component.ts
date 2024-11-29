import { ConfirmationService } from 'primeng/api';
import { Input, Output, Component, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'btn-rollback',
    styles: [
        `
            :host ::ng-deep {
                .btn-no {
                    height: 35px;
                    min-width: 128px;
                    color: var(--primary-color);
                    background: #e8f2ff;

                    &:hover {
                        background: var(--secondary-color);
                        color: var(--primary-color);
                    }

                    &:disabled {
                        border: 1px solid var(--surface-400);
                        background: var(--surface-400);
                        color: var(--topbar-color);
                    }
                }

                .p-dialog {
                    .p-dialog-footer,
                    .p-dialog-header,
                    .p-dialog-content {
                        padding: 20px 30px;
                    }

                    .p-dialog-footer {
                        padding-top: 16px;

                        button {
                            margin: 0;

                            &:last-child {
                                margin-left: 12px;
                            }
                        }
                    }

                    &.p-confirm-dialog {
                        .p-confirm-dialog-message {
                            margin: 0;
                        }
                    }
                }
            }
        `,
    ],
    template: `
        <button
            icon="fa-solid fa-clock-rotate-left"
            class="btn-rollback"
            label="{{ 'rollback' | translate }}"
            pButton
            [disabled]="disabled"
            (click)="handleClick()"
        ></button>

        <p-confirmDialog
            #dialogConfirm
            [style]="{ maxWidth: '495px', width: '100%' }"
        >
            <ng-template pTemplate="header">
                <h3
                    class="m-0 font-bold"
                    style="color: #656565; font-size: 20px"
                >
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <span style="margin-left: 8px">{{
                        'rollback' | translate
                    }}</span>
                </h3>
            </ng-template>
            <ng-template pTemplate="message">
                <p>{{ message }}</p>
            </ng-template>
            <ng-template pTemplate="footer">
                <button
                    class="btn-no"
                    icon="pi pi-times"
                    type="button"
                    label="{{ 'no' | translate }}"
                    pButton
                    (click)="dialogConfirm.reject()"
                ></button>
                <button
                    class="btn-update"
                    icon="pi pi-check"
                    type="button"
                    label="{{ 'yes' | translate }}"
                    pButton
                    (click)="dialogConfirm.accept()"
                ></button> </ng-template
        ></p-confirmDialog>
    `,
})
export class ButtonRollbackComponent implements OnInit {
    @Input()
    public disabled: boolean = false;

    @Input()
    public message: string = 'Are you sure to rollback this data?';

    @Output('onClick')
    private readonly _onClick: EventEmitter<BtnRollbackClickEvent> =
        new EventEmitter<BtnRollbackClickEvent>();

    constructor(private _confirmationService: ConfirmationService) {}

    public handleClick(): void {
        this._confirmationService.confirm({
            message: 'Are you sure that you want to rollback?',
            header: 'Rollback',
            accept: () => {
                this._onClick.emit('accept');
            },
            reject: () => {
                this._onClick.emit('reject');
            },
        });
    }

    public ngOnInit(): void {}
}

export type BtnRollbackClickEvent = 'accept' | 'reject';
