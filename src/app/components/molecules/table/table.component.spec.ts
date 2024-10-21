import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { SortSelectorComponent } from '../../atoms/sort-selector/sort-selector.component';
describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent, SortSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.columns = [
      { header: 'Name', field: 'name' },
      { header: 'Description', field: 'description' },
    ];
    component.data = [
      { name: 'Item A', description: 'Description A' },
      { name: 'Item B', description: 'Description B' },
      { name: 'Item C', description: 'Description C' },
      { name: 'Item D', description: 'Description D' },
    ];
    component.pageSize = 2;
    component.currentPage = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort data in ascending order', () => {
    component.onSortChange('name,asc');
    expect(component.data[0].name).toBe('Item A');
    expect(component.data[3].name).toBe('Item D');
  });

  it('should sort data in descending order', () => {
    component.onSortChange('name,desc');
    expect(component.data[0].name).toBe('Item D');
    expect(component.data[3].name).toBe('Item A');
  });

  it('should render table rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(4); // Because pageSize is 2
  });

  it('should handle empty data', () => {
    component.data = [];
    component.ngOnChanges({
      data: { currentValue: [], previousValue: null, firstChange: true, isFirstChange: () => true }
    });
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(0);
  });

  it('should filter data', () => {
    component.onFilterChange('Item A');
    expect(component.data.length).toBe(1);
    expect(component.data[0].name).toBe('Item A');
  });



  it('should select a row', () => {
    const row = { name: 'Item A', description: 'Description A' };
    component.onRowSelect(row);
    expect(component.selectedRow).toBe(row);
  });

  it('should handle null data', () => {
    component.data = [];
    component.ngOnChanges({
      data: { currentValue: null, previousValue: [], firstChange: false, isFirstChange: () => false }
    });
    fixture.detectChanges();
    expect(component.paginatedData.length).toBe(0);
  });
  
  it('should sort and filter data', () => {
    component.onFilterChange('Item');
    component.onSortChange('name,desc');
    expect(component.data[0].name).toBe('Item D');
    expect(component.data[3].name).toBe('Item A');
  });
  
  it('should handle pagination boundaries', () => {
    expect(component.getTotalPages()).toBe(2);
    
    component.onPageChange(0);
    expect(component.paginatedData.length).toBe(2);
    expect(component.paginatedData[0].name).toBe('Item A');
    
    component.onPageChange(1);
    expect(component.paginatedData.length).toBe(2);
    expect(component.paginatedData[0].name).toBe('Item C');
    
    component.onPageChange(2);
    expect(component.paginatedData.length).toBe(2);
    expect(component.paginatedData[0].name).toBe('Item C');
  });

  it('should handle filter with no results', () => {
    component.onFilterChange('Nonexistent');
    expect(component.data.length).toBe(0);
    expect(component.paginatedData.length).toBe(0);
  });

  it('should handle sorting with equal values', () => {
    component.data = [
      { name: 'Item A', value: 1 },
      { name: 'Item B', value: 1 },
      { name: 'Item C', value: 2 },
    ];
    component.onSortChange('value,asc');
    expect(component.data[0].name).toBe('Item A');
    expect(component.data[1].name).toBe('Item B');
  });
});