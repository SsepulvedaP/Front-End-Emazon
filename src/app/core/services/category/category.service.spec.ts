import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { ToastService } from '../toast.service';
import {
  CATEGORY_CREATED_SUCCESSFULLY,
  CATEGORY_CREATE_ERROR,
} from '../../../shared/utils/constants/services-constants';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService, ToastService],
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
    toastService = TestBed.inject(ToastService);
  });

  it('should create a category successfully', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const categoryData = { name: 'Books', description: 'A category for books' };

    service.create(categoryData).subscribe((response) => {
      expect(response).toBe(true);
    });

    const req = httpMock.expectOne(`${service['url']}`);
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'success',
        text: CATEGORY_CREATED_SUCCESSFULLY,
      })
    );
  });

  it('should handle network error when creating a category', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const categoryData = { name: 'Invalid', description: 'Category causing error' };

    service.create(categoryData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(CATEGORY_CREATE_ERROR);
      },
    });

    const req = httpMock.expectOne(`${service['url']}`);
    req.error(new ErrorEvent('Network error'));

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text: `${CATEGORY_CREATE_ERROR}`,
      })
    );
  });

  it('should handle server error with specific message', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const categoryData = { name: 'Another', description: 'Another category' };

    service.create(categoryData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(`${CATEGORY_CREATE_ERROR}: Server is down`);
      },
    });

    const req = httpMock.expectOne(`${service['url']}`);
    req.flush({ message: 'Server is down' }, { status: 500, statusText: 'Internal Server Error' });

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text: `${CATEGORY_CREATE_ERROR}: Server is down`,
      })
    );
  });

  afterEach(() => {
    httpMock.verify();
  });
});
