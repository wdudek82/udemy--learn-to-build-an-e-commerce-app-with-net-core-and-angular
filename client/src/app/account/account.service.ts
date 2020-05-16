import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IUser } from '../shared/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(values: any): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl + 'account/login', values).pipe(
      tap((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      }),
    );
  }

  register(values: any): Observable<IUser> {
    return this.http
      .post<IUser>(this.baseUrl + 'account/register', values)
      .pipe(
        tap((user: IUser) => {
          if (user) {
            localStorage.setItem('token', user.token);
            this.currentUserSource.next(user);
          }
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string): Observable<boolean> {
    const params = new HttpParams({
      fromObject: {
        email,
      },
    });
    return this.http.get<boolean>(this.baseUrl + 'account/emailexists', {
      params,
    });
  }
}
