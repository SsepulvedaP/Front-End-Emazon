import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ToastComponent } from './toast.component';
import { ToastService, ToastMessage } from '../../../core/services/toast.service';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    const toastServiceMock = {
      toastMessages$: of([]),
      removeToast: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ ToastComponent ],
      providers: [
        { provide: ToastService, useValue: toastServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
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

  it('should return empty string for unknown icon type', () => {
    expect(component.getIconSrc('unknown' as any)).toBe('');
  });

  
  it('should call removeToast on closeToast', () => {
    const toastId = 1;
    component.closeToast(toastId);
    expect(toastService.removeToast).toHaveBeenCalledWith(toastId);
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
