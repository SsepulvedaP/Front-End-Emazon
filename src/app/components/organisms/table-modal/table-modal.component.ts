import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BrandService } from '../../../core/services/brand/brand.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../core/models/product.model';
import { Brand } from '../../../core/models/brand.model';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.scss']
})
export class TableModalComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() closeModalEvent = new EventEmitter<void>();
  brands: Brand[] = [];
  categories: Category[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  sortOrder: 'asc' | 'desc' = 'asc';
  sortBy: 'name' | 'brand' | 'category' = 'name';

  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
    this.loadProducts();
  }

  loadBrands(): void {
    this.brandService.getAll().subscribe(
      (brands) => (this.brands = brands),
      (error) => console.error('Error loading brands:', error)
    );
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(
      (categories) => (this.categories = categories),
      (error) => console.error('Error loading categories:', error)
    );
  }

  loadProducts(): void {
    this.productService.getPaginated(this.currentPage, this.itemsPerPage, this.sortBy, this.sortOrder).subscribe(
      (response) => {
        this.products = response;
        this.totalItems = response.length; // Actualiza esto según la respuesta del backend
      },
      (error) => console.error('Error loading products:', error)
    );
  }

  getBrandName(brandId: number): string {
    const brand = this.brands.find((b) => b.id === brandId);
    return brand ? brand.name : 'Unknown';
  }

  getCategoryNames(categoryIds: number[]): string {
    if (!categoryIds) {
      return 'Unknown';
    }
    const categoryNames = categoryIds
      .map((id) => {
        const category = this.categories.find((c) => c.id === id);
        return category ? category.name : 'Unknown';
      })
      .join(', ');
    return categoryNames;
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  changeSortOrder(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortOrder = target.value as 'asc' | 'desc';
    this.loadProducts();
  }

  changeSortBy(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy = target.value as 'name' | 'brand' | 'category';
    this.loadProducts();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}