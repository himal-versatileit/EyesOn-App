import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import { personOutline, timeOutline, locationOutline, warningOutline, alertCircleOutline, shieldCheckmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-guarddashboard',
  templateUrl: './guarddashboard.page.html',
  styleUrls: ['./guarddashboard.page.scss'],
})
export class GuarddashboardPage implements OnInit {
  isLoading = true;
  error: string | null = null;
  activeTab = 'gaurddetails';

  constructor(private router: Router) {
    addIcons({
      'person-circle-outline': personOutline,
      'time-outline': timeOutline,
      'location-outline': locationOutline,
      'warning-outline': warningOutline,
      'alert-circle-outline': alertCircleOutline,
      'shield-checkmark': shieldCheckmarkOutline,
    });
  }

  ngOnInit() {
    // Set initial active tab based on current URL
    this.setActiveTabFromUrl(this.router.url);
    
    // Subscribe to route changes to update active tab
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.setActiveTabFromUrl(event.url);
    });
  }
  
  private setActiveTabFromUrl(url: string) {
    // Extract the last segment of the URL to determine the active tab
    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];
    
    // Remove any query parameters or fragments
    const cleanSegment = lastSegment.split('?')[0].split('#')[0];
    
    // Set active tab based on the URL segment
    if (['shift', 'checkpoints', 'incidents', 'overview', 'gaurddetails'].includes(cleanSegment)) {
      this.activeTab = cleanSegment;
    } else {
      // Default to gaurddetails if no matching segment is found
      this.activeTab = 'gaurddetails';
    }
    
    console.log('Active tab set to:', this.activeTab);
  }
}
