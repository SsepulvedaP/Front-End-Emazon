import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public authToken: string = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpZCI6MTQsInN1YiI6InNlYmFzdGlhbkBwcmFnbWEuY29tIiwiaWF0IjoxNzI5NTQyMjYxLCJleHAiOjE3Mjk2Mjg2NjF9.auV2bQhq6o0QKQNtWPZj6UqAomS84Yihgvs7g3s6nv4'; // Reemplaza con tu token actual

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // URLs que no requieren autenticación
    const noAuthUrls = ['/categories/paged'];

    // Verificar si la URL actual está en la lista de URLs sin autenticación
    const isNoAuthUrl = noAuthUrls.some(url => req.url.includes(url));

    // Si la URL no requiere autenticación, no añadimos el encabezado Authorization
    if (isNoAuthUrl) {
      return next.handle(req);
    }

    // Clonamos la solicitud y le añadimos el encabezado Authorization si es necesario
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.authToken}`)
    });

    return next.handle(clonedRequest);
  }
}
