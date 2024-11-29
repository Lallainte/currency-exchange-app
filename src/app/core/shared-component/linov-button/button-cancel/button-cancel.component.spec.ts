import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCancelComponent } from './button-cancel.component';

describe('ButtonCancelComponent', () => {
  let component: ButtonCancelComponent;
  let fixture: ComponentFixture<ButtonCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
