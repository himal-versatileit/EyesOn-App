import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { addIcons } from 'ionicons';
import { personCircle, alertCircle, refresh, mail, call, toggleOutline, time, location } from 'ionicons/icons';
import { GuardService } from 'src/app/services/guard.service';
@Component({
  selector: 'app-gaurddetails',
  templateUrl: './gaurddetails.page.html',
  styleUrls: ['./gaurddetails.page.scss'],
})
export class GaurddetailsPage implements OnInit {
  public guardService = inject(GuardService);
  isLoading = true;
  hasError = false;
  guardId=Number(localStorage.getItem('guardid'));
  datafor=1;
  guardDetails:any={};
  constructor(
  ) {
    addIcons({ 
      personCircle, 
      alertCircle, 
      refresh,
      mail,
      call,
      toggleOutline,
      time,
      location
    });
    
  }

  ngOnInit() {
   this.getguarddetails();
  }
 
  getguarddetails(){
    console.log(this.guardId);
    this.guardService.getGuardDashboardData(this.guardId,this.datafor).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.hasError = false;
        this.guardDetails = response[0][0];
      },
      error: (error: any) => {
        console.error('Error loading alerts:', error);
        this.hasError = true;
      }
    });
  }
}
