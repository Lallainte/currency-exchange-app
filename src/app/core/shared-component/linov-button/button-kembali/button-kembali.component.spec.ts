import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonKembaliComponent } from './button-kembali.component';

describe('ButtonKembaliComponent', () => {
  let component: ButtonKembaliComponent;
  let fixture: ComponentFixture<ButtonKembaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonKembaliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonKembaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
