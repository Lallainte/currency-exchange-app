import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRenewComponent } from './button-renew.component';

describe('ButtonRenewComponent', () => {
    let component: ButtonRenewComponent;
    let fixture: ComponentFixture<ButtonRenewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ButtonRenewComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonRenewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
