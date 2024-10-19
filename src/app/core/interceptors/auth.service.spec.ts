import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should add Authorization header', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${new AuthInterceptor().authToken}`);
  });

  afterEach(() => {
    httpMock.verify();
  });
});