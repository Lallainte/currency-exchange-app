import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTerminateComponent } from './button-terminate.component';

describe('ButtonTerminateComponent', () => {
  let component: ButtonTerminateComponent;
  let fixture: ComponentFixture<ButtonTerminateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonTerminateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTerminateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
