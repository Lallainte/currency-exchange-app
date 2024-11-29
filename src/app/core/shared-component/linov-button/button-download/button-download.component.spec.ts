import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDownloadComponent } from './button-download.component';

describe('ButtonDownloadComponent', () => {
    let component: ButtonDownloadComponent;
    let fixture: ComponentFixture<ButtonDownloadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ButtonDownloadComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonDownloadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
