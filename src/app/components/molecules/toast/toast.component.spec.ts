import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty toastMessages array', () => {
    expect(component.toastMessages).toEqual([]);
  });

  it('should get icon source for error', () => {
    expect(component.getIconSrc('error')).toContain('error-icon.png');
  });

  it('should get icon source for warning', () => {
    expect(component.getIconSrc('warning')).toContain('warning-icon.png');
  });

  it('should get icon source for success', () => {
    expect(component.getIconSrc('success')).toContain('success-icon.png');
  });

  it('should get icon source for inform', () => {
    expect(component.getIconSrc('inform')).toContain('info-icon.png');
  });

});
