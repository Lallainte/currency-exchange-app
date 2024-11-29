import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
    selector: 'leave-dialog',
    template: `
    <button pButton label="Show" (click)="showDialog()"></button>
    <p-dialog [(visible)]="display" [baseZIndex]="10000" [modal]="true" [draggable]="false">
        <ng-template pTemplate="header">
            <div class="dialog-header">
                <div>
                    <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 1.25015C12.5 0.863431 12.3242 0.50015 12.0195 0.265775C11.7148 0.0314 11.3203 -0.0545375 10.9453 0.0392125L3.91797 1.79702C3.08594 2.00406 2.5 2.75406 2.5 3.61343V17.5001H1.25C0.558594 17.5001 0 18.0587 0 18.7501C0 19.4416 0.558594 20.0001 1.25 20.0001H12.5V1.25015ZM10 10.0001C10 10.6916 9.58203 11.2501 9.0625 11.2501C8.54297 11.2501 8.125 10.6916 8.125 10.0001C8.125 9.30874 8.54297 8.75015 9.0625 8.75015C9.58203 8.75015 10 9.30874 10 10.0001ZM13.75 5.00015H17.5V18.7501C17.5 19.4416 18.0586 20.0001 18.75 20.0001H21.25C21.9414 20.0001 22.5 19.4416 22.5 18.7501C22.5 18.0587 21.9414 17.5001 21.25 17.5001H20V5.00015C20 3.62124 18.8789 2.50015 17.5 2.50015H13.75V5.00015Z" fill="#0E8EC5"/>
                    </svg>
                </div>
                <div>
                    <span>Leave Page</span>
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
    styleUrls: ['./leave-dialog.component.css'],
    providers: [BrowserAnimationsModule]
})

export class LeaveDialogComponent {
    @Input() message: string = "Are you sure to leave this page? The last changes you\'ve made won\'t be saved.";
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