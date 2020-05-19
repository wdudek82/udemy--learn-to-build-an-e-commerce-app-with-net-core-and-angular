import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IUser } from '../shared/models/user';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  loadCurrentUser(token: string): Observable<IUser> {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http
      .get<IUser>(this.baseUrl + 'account', { headers })
      .pipe(
        tap((user) => {
          this.setCurrentUserAndToken(user);
        }),
      );
  }

  login(values: any): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl + 'account/login', values).pipe(
      tap((user: IUser) => {
        this.setCurrentUserAndToken(user);
      }),
    );
  }

  register(values: any): Observable<IUser> {
    console.log('== values:', values);
    return this.http
      .post<IUser>(this.baseUrl + 'account/register', values)
      .pipe(
        tap((user: IUser) => {
          this.setCurrentUserAndToken(user);
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

  private setCurrentUserAndToken(user: IUser): void {
    if (user) {
      localStorage.setItem('token', user.token);
      this.currentUserSource.next(user);
    }
  }
}
