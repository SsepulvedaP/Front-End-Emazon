import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public authToken: string = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpZCI6MTQsInN1YiI6InNlYmFzdGlhbkBwcmFnbWEuY29tIiwiaWF0IjoxNzI5MTE2OTYwLCJleHAiOjE3MjkyMDMzNjB9.pDqfNUjaWd66mUWSX7H7So2D2y1LNiOkW6-mhCkS3kY'; // Reemplaza con tu token actual

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clonamos la solicitud y le añadimos el encabezado Authorization
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.authToken}`)
    });

    return next.handle(clonedRequest);
  }
}
