import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinovUploadComponent } from './linov-upload.component';

describe('LinovUploadComponent', () => {
  let component: LinovUploadComponent;
  let fixture: ComponentFixture<LinovUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinovUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinovUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
