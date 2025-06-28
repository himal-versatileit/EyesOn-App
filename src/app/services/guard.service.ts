import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface GuardDashboardData {
  guardInfo: any;
  currentShift: any;
  checkpoints: any[];
  alerts: any[];
  incidents: any[];
}

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL ;

  getGuardDashboardData(guardId: number , datafor: number): Observable<GuardDashboardData> {
    const url = `${this.apiUrl}/guarddashboarddata?guardId=${guardId}&DataFor=${datafor}`;    
    return this.http.get<GuardDashboardData>(url).pipe(
      catchError(this.handleError)
    );
  }

  createIncident(incidentData: any) {
    const formData = new FormData();
    
    Object.keys(incidentData).forEach(key => {
      if (key === 'incidentPhoto' && incidentData[key]) {
        // If there's an image, add it to form data
        const blob = this.dataURItoBlob(incidentData[key]);
        formData.append('incidentPhoto', blob, 'incident_photo.png');
      } else {
        formData.append(key, incidentData[key]);
      }
    });
    return this.http.post<any>(`${this.apiUrl}/incidents`, formData).pipe(
      catchError(this.handleError)
    );
  }
  
  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([ab], { type: mimeString });
  }

  getCheckpoints(routeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/checkpoints?routeId=${routeId}`).pipe(
      catchError(this.handleError)
    );
  }

  getTracking(guardId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/guard-live-tracking?guardId=${guardId}`).pipe(
      catchError(this.handleError)
    );
  }

  saveTracking(trackingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guard-live-tracking`, trackingData).pipe(
      catchError(this.handleError)
    );
  }
  
  getAlerts(guardId: number, isAll?: number): Observable<{ success: boolean; data: any[] }> {
    let url = `${this.apiUrl}/alerts?guardId=${guardId}`;
    if (isAll !== undefined) {
      url += `&isAll=${isAll}`;
    }
    return this.http.get<{ success: boolean; data: any[] }>(url).pipe(
      catchError(this.handleError)
    );
  }
  
  getIncidents(guardId: number): Observable<{ success: boolean; data: any[] }> {
    let url = `${this.apiUrl}/incidents?guardId=${guardId}`;
    return this.http.get<{ success: boolean; data: any[] }>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Log detailed error information
    const errorDetails = {
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      error: error.error,
      headers: error.headers,
      message: error.message,
      name: error.name,
      timestamp: new Date().toISOString()
    };
    
    console.error('API Error Details:', JSON.stringify(errorDetails, null, 2));
    
    let errorMessage = 'An error occurred while processing your request.';
    
    if (error.status === 0) {
      // A client-side or network error occurred
      if (error.error && error.error instanceof ProgressEvent) {
        errorMessage = 'Network Error: Could not connect to the server. '
          + 'Please check if the server is running and accessible from this device. '
          + `Trying to reach: ${error.url}`;
      } else {
        errorMessage = 'Network Error: No response from server. '
          + 'This could be due to CORS, network issues, or the server being down.';
      }
    } else if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code
      errorMessage = `Server returned error: ${error.status} - ${error.statusText || 'Unknown Error'}`;
      
      // Add more specific error messages based on status code
      if (error.status === 404) {
        errorMessage = 'The requested resource was not found on the server.';
      } else if (error.status >= 500) {
        errorMessage = 'Internal server error. Please try again later.';
      }
    }
    
    // Log the final error message
    console.error('Error Message:', errorMessage);

    return throwError(() => ({
      message: errorMessage,
      status: error.status,
      error: error.error
    }));
  }
}
