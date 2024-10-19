import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';
import { LogoSizes } from '../../../../shared/utils/enums/atoms-values';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size as LARGE', () => {
    expect(component.size).toBe(LogoSizes.LARGE);
  });
});
