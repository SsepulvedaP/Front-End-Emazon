import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { CategoryService } from '../../../core/services/category/category.service';
import { TemplatesModule } from '../../templates/templates.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Category } from '../../../core/models/category.model';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let mockCategoryService: jest.Mocked<CategoryService>;

  beforeEach(async () => {
    mockCategoryService = {
      getCategoriesPaged: jest.fn(),
      create: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [HttpClientTestingModule, TemplatesModule],
      providers: [{ provide: CategoryService, useValue: mockCategoryService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;

    // Mocking the response of getCategoriesPaged
    mockCategoryService.getCategoriesPaged.mockReturnValue(
      of({
        content: [{ name: 'Books', description: 'Various books' }],
        totalPages: 1,
      })
    );

    fixture.detectChanges(); // Triggers ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and load categories', () => {
    const loadCategoriesSpy = jest.spyOn(component, 'loadCategories');
    component.ngOnInit();
    expect(loadCategoriesSpy).toHaveBeenCalled();
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalled();
    expect(component.categories.length).toBe(1);
    expect(component.categories[0].name).toBe('Books');
  });

  it('should create a category and add it to the list', () => {
    const newCategory: Category = { name: 'New Category', description: 'New Description' };
    mockCategoryService.create.mockReturnValue(of(true));

    component.handleSubmit(newCategory);

    expect(mockCategoryService.create).toHaveBeenCalledWith(newCategory);
    expect(component.categories[0].name).toBe('New Category');
  });

  it('should sort categories', () => {
    const sortSpy = jest.spyOn(component, 'sort');
    component.sort('name,asc');
    expect(sortSpy).toHaveBeenCalledWith('name,asc');
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalledWith(
      component.currentPage,
      component.pageSize,
      'name',
      'asc'
    );
  });

  it('should go to the next page', () => {
    component.hasNextPage = true;
    component.nextPage();
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalledWith(
      component.currentPage,
      component.pageSize,
      component.sortField,
      component.sortOrder
    );
  });

  it('should go to the previous page', () => {
    component.currentPage = 1;
    component.previousPage();
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalledWith(
      0,
      component.pageSize,
      component.sortField,
      component.sortOrder
    );
  });

  it('should not change page if nextPage is disabled', () => {
    component.hasNextPage = false;
    component.nextPage();
    expect(component.currentPage).toBe(0); // Verificar que la página no cambia
  });
  
  it('should not change page if previousPage is disabled', () => {
    component.currentPage = 0;
    component.previousPage();
    expect(component.currentPage).toBe(0); // Verificar que la página no cambia
  });

  it('should filter categories based on search query', () => {
    component.categories = [
      { name: 'Books', description: 'Various books' },
      { name: 'Electronics', description: 'Devices and gadgets' },
    ];
    component.onSearch('books');
    expect(component.categories.length).toBe(1);
    expect(component.categories[0].name).toBe('Books');
  });
  

});
