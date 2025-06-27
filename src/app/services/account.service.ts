import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, tap, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AccountService {
  private apiUrl = environment.API_URL; // Replace with your actual API URL
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient,private router: Router) {}

  generateOtp(MobileNumber: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { MobileNumber });
  }

  // Verify the OTP entered by the user
  verifyOtp(MobileNumber: string, OTP: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { MobileNumber, OTP }).pipe(
      tap((response: any) => {
        if (response && response.success) {
        }
      })
    );
  }
  isLoggedIn(): boolean {
    return this.checkAuthStatus();
  }

  async logout(): Promise<void> {
    // Clear auth state
    localStorage.removeItem('is_logged_in');
    localStorage.removeItem('guardid');
    localStorage.removeItem('shiftid');
    this.isAuthenticated.next(false);
    
    // Navigate to login
    await this.router.navigate(['/login'], { replaceUrl: true });
    
    // Force reload after a small delay to ensure navigation completes
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  }

  // Get authentication status as observable
  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  // Private method to check authentication status
  public checkAuthStatus(): boolean {
    return localStorage.getItem('is_logged_in') === 'true' ? true : false;
  }

  // Private method to set login status
  private setLoggedIn(status: boolean): void {
    localStorage.setItem('is_logged_in', status.toString());
    this.isAuthenticated.next(status);
  }

  //#endregion
}
