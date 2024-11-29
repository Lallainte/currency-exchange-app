import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMultiActionComponent } from './button-multi-action.component';

describe('ButtonMultiActionComponent', () => {
  let component: ButtonMultiActionComponent;
  let fixture: ComponentFixture<ButtonMultiActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonMultiActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonMultiActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
