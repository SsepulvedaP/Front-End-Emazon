import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { CategoryService } from '../../../core/services/category/category.service';
import { TemplatesModule } from '../../templates/templates.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [HttpClientTestingModule, TemplatesModule],
      providers: [CategoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and initialize component', () => {
    const ngOnInitSpy = jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(ngOnInitSpy).toHaveBeenCalled();
  });
});
