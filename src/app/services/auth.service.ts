
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'candidate' | 'employer';
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private snackBar = inject(MatSnackBar);
  private Router = inject(Router);
  private apiUrl = environment.apiUrl + '/auth';

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem('token');
  }

  getUser() {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }



register(data: RegisterData): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(
    `${this.apiUrl}/register`,
    data
  ).pipe(
    tap(response => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('token', response.token);
        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );
      }

      this.snackBar.open(
        response.message,
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        }
      );
    })
  );
}

login(data: LoginData): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(
    `${this.apiUrl}/login`,
    data
  ).pipe(
    tap(response => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('token', response.token);
        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );
      }

      this.snackBar.open(
        response.message,
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'

        }
      );
    })
  );
}




  //Done
  logout(): void {
  if (!isPlatformBrowser(this.platformId)) {
    return;
  }

  const token = localStorage.getItem('token');

  if (!token) {
    this.clearSession();
    return;
  }

  this.http.post(
    `${this.apiUrl}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).subscribe({
    next: () => {
      this.clearSession();
    },
    error: (error) => {
      console.error('Logout error:', error);

      // Clear local session even if API fails
      this.clearSession();
    }
  });
};

private clearSession(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  this.snackBar.open('Logged out successfully!', 'Close', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  });

  this.Router.navigate(['/login']);
}

}

