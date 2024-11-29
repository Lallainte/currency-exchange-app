import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDownloadLaporanComponent } from './button-download-laporan.component';

describe('ButtonDownloadLaporanComponent', () => {
    let component: ButtonDownloadLaporanComponent;
    let fixture: ComponentFixture<ButtonDownloadLaporanComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ButtonDownloadLaporanComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonDownloadLaporanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
