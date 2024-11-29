import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonResetComponent } from './button-reset.component';

describe('ButtonResetComponent', () => {
  let component: ButtonResetComponent;
  let fixture: ComponentFixture<ButtonResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
