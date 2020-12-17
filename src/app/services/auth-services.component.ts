import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  readonly baseUrl = 'https://conduit.productionready.io/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {}

  login(email: string, password: string): Observable<any> {
    const url = this.baseUrl + '/users/login';

    const request = {
      user: {
        email, password
      }
    };

    return this.http.post<any>(url, request);
  }

  isAuthenticated(redirect: boolean = true): boolean {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    if (!currentUser) {
      if (redirect) {
        this.router.navigate(['/login']);
      }
      return false;
    }
    return true;
  }
}
