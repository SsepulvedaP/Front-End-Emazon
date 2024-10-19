import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainButtonComponent } from './main-button.component';
import { ButtonSizes, ButtonTypes } from '../../../../shared/utils/enums/atoms-values';

describe('MainButtonComponent', () => {
  let component: MainButtonComponent;
  let fixture: ComponentFixture<MainButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size as MEDIUM', () => {
    expect(component.size).toBe(ButtonSizes.MEDIUM);
  });

  it('should have default type as MAIN', () => {
    expect(component.type).toBe(ButtonTypes.MAIN);
  });

  it('should have default label as "Save"', () => {
    expect(component.label).toBe('Save');
  });

  it('should have default htmlType as "button"', () => {
    expect(component.htmlType).toBe('button');
  });

  it('should have default disabled as false', () => {
    expect(component.disabled).toBeFalsy();
  });
});
