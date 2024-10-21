import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortSelectorComponent } from './sort-selector.component';
import { By } from '@angular/platform-browser';

describe('SortSelectorComponent', () => {
  let component: SortSelectorComponent;
  let fixture: ComponentFixture<SortSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sort change when option is selected', () => {
    const spy = jest.spyOn(component.onSortChange, 'emit');
    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectElement.value = 'name,asc';
    selectElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('name,asc');
  });
});
