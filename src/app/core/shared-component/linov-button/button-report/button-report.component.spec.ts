import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonReportComponent } from './button-report.component';

describe('ButtonAddComponent', () => {
    let component: ButtonReportComponent;
    let fixture: ComponentFixture<ButtonReportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ButtonReportComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
