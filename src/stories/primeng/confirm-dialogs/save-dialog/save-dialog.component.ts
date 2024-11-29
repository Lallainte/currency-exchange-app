import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
    selector: 'save-dialog',
    template: `
    <button pButton label="Show" (click)="showDialog()"></button>
    <p-dialog [(visible)]="display" [baseZIndex]="10000" [modal]="true" [draggable]="false">
        <ng-template pTemplate="header">
            <div class="dialog-header">
                <div>
                    <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 0C1.12109 0 0 1.12109 0 2.5V15C0 16.3789 1.12109 17.5 2.5 17.5H15C16.3789 17.5 17.5 16.3789 17.5 15V5.51953C17.5 4.85547 17.2383 4.21875 16.7695 3.75L13.75 0.730469C13.2812 0.261719 12.6445 0 11.9805 0H2.5ZM2.5 3.75C2.5 3.05859 3.05859 2.5 3.75 2.5H11.25C11.9414 2.5 12.5 3.05859 12.5 3.75V6.25C12.5 6.94141 11.9414 7.5 11.25 7.5H3.75C3.05859 7.5 2.5 6.94141 2.5 6.25V3.75ZM8.75 10C9.41304 10 10.0489 10.2634 10.5178 10.7322C10.9866 11.2011 11.25 11.837 11.25 12.5C11.25 13.163 10.9866 13.7989 10.5178 14.2678C10.0489 14.7366 9.41304 15 8.75 15C8.08696 15 7.45107 14.7366 6.98223 14.2678C6.51339 13.7989 6.25 13.163 6.25 12.5C6.25 11.837 6.51339 11.2011 6.98223 10.7322C7.45107 10.2634 8.08696 10 8.75 10Z" fill="#0E8EC5"/>
                    </svg>
                </div>
                <div>
                    <span>Save Data</span>
                </div>
            </div>
        </ng-template>
        <ng-template pTemplate="content">
            <span>
                {{message}}
            </span>
        </ng-template>
        <ng-template pTemplate="footer">
            <button pButton ngClass="secondary" label="No" (click)="onReject()"></button>
            <button pButton ngClass="primary" label="Yes" (click)="onAccept()"></button>
        </ng-template>
    </p-dialog>
    `,
    styleUrls: ['./save-dialog.component.css'],
    providers: [BrowserAnimationsModule]
})

export class SaveDialogComponent {
    @Input() message: string = "Are you sure to save this data?";
    @Output() accept = new EventEmitter<any>();
    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    onAccept(){
        this.accept.emit(true);
        this.display = false;
    }

    onReject(){
        this.display = false;
    }
}