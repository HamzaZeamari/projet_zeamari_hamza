import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable()
export class InterceptorsInterceptor implements HttpInterceptor {
  public static token: String = "";

  constructor() {}



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (InterceptorsInterceptor.token !== "") {
      request = request.clone({setHeaders: {Authorization: `Bearer ${InterceptorsInterceptor.token}` }});
    }

  // Un peu aidé d'internet car assez compliqué à tout mettre ensemble
    return next.handle(request).pipe(tap(
        (evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            let tab : Array<String>;
            let headerAuthorization = evt.headers.get("Authorization");
            if (headerAuthorization != null ) {
              tab = headerAuthorization.split(/Bearer\s+(.*)$/i);
              if (tab.length > 1) InterceptorsInterceptor.token = tab[1];
            }
          }
        }
      )
    );
  }
}
