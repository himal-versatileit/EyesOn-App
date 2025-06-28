import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { interval, Subscription, take } from 'rxjs';
import { AccountService } from 'src/app/services/auth.service';
import { phonePortraitOutline, keypadOutline, close } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isOtpSent = false;
  countdown = 30;
  countdownInterval: any;
  isKeyboardVisible = false;
  isMobileFocused = false;
  isOtpFocused = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private authService: AccountService,
    private router: Router
  ) { 
    // Register the icons
    addIcons({ phonePortraitOutline, keypadOutline, close });
    this.loginForm = this.formBuilder.group({
      MobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      OTP: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });
  }

  async sendOtp() {
    if (this.loginForm.get('MobileNumber')?.invalid) {
      this.showToast('Please enter a valid 10-digit mobile number', 'warning');
      return;
    }
    
    const loading = await this.loadingController.create({
      message: 'Sending OTP...',
    });
    await loading.present();

    const MobileNumber = this.loginForm.get('MobileNumber')?.value;
    
    this.authService.generateOtp(MobileNumber).subscribe({
      next: async (response) => {
        await loading.dismiss();
        if (response && response.success) {
          // Disable mobile number field and show OTP section
          this.loginForm.get('MobileNumber')?.disable();
          this.isOtpSent = true;
          this.startCountdown(); 
          this.showToast(`OTP has been sent to your mobile number: ${response.otp.GeneratedOTP}`, 'success');
        } else {
          this.showToast(response?.message || 'Failed to send OTP. Please try again.', 'danger');
        }
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Error sending OTP:', error);
        this.showToast(error.error?.message || 'Failed to send OTP. Please try again.', 'danger');
      }
    });
  }

  async login() {
    if (this.loginForm.get('OTP')?.invalid) {
      this.showToast('Please enter a valid OTP', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Verifying...',
    });
    await loading.present();

    const MobileNumber = this.loginForm.get('MobileNumber')?.value;
    const OTP = this.loginForm.get('OTP')?.value;

    this.authService.verifyOtp(MobileNumber, OTP).subscribe({
      next: async (response: any) => {
        await loading.dismiss();
        if (response && response.success) {
          localStorage.setItem('is_logged_in', 'true');
          localStorage.setItem('guardid', response.guardid);
          localStorage.setItem('shiftid', response.shiftid);
          this.router.navigateByUrl('/home', { replaceUrl: true })
            .then(nav => {
              console.log('Navigation result:', nav);
              if (!nav) {
                // If navigation fails, try a full page reload
                window.location.href = '/home';
              }
            })
            .catch(err => {
              console.error('Navigation error:', err);
              // Fallback to window.location if navigation fails
              window.location.href = '/home';
            });
        } else {
          const errorMsg = response?.message || 'Invalid OTP. Please try again.';
          console.log('OTP verification failed:', errorMsg);
          this.showToast(errorMsg, 'danger');
        }
      },
      error: async (error) => {
        console.error('Error in OTP verification:', error);
        await loading.dismiss();
        const errorMsg = error.error?.message || 'Failed to verify OTP. Please try again.';
        console.error('Error details:', { status: error.status, message: errorMsg });
        this.showToast(errorMsg, 'danger');
      }
    });
  }

  startCountdown() {
    this.countdown = 30;
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  resendOtp() {
    this.countdown = 30;
    this.startCountdown();
    this.sendOtp();
  }

  // Enable the MobileNumber control when resetting the form
  async resetForm() {
    this.isOtpSent = false;
    this.loginForm.get('MobileNumber')?.enable();
    this.loginForm.get('OTP')?.reset();
    
    // Ensure keyboard is dismissed before refocusing
    if (window && (window as any).Keyboard) {
      (window as any).Keyboard.hide();
    }
    
    // Small delay to ensure the mobile input is visible
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Refocus the mobile input after reset
    const mobileInput = document.querySelector('ion-input[formControlName="MobileNumber"]') as HTMLIonInputElement;
    if (mobileInput) {
      mobileInput.setFocus();
    }
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success', duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top',
      color: color,
      cssClass: 'top-toast',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  // Handle OTP input through keydown event
  onOtpKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    const currentValue = this.loginForm.get('OTP')?.value || '';
    
    // Handle backspace
    if (event.key === 'Backspace') {
      // If current input is empty, move to previous input
      if (!input.value && index > 0) {
        const prevInput = input.previousElementSibling as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
      // Clear current input
      input.value = '';
      // Update form control
      const newValue = currentValue.substring(0, index) + ' ' + currentValue.substring(index + 1);
      this.loginForm.get('OTP')?.setValue(newValue.trim(), { emitEvent: false });
      return;
    }
    
    // Allow only numbers
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      return;
    }
    
    // Prevent default to handle the input manually
    event.preventDefault();
    
    // Update the input value
    input.value = event.key;
    
    // Update the form control value
    let newValue = currentValue;
    if (newValue.length > index) {
      newValue = newValue.substring(0, index) + event.key + newValue.substring(index + 1);
    } else {
      newValue = (newValue + event.key).substring(0, 5);
    }
    this.loginForm.get('OTP')?.setValue(newValue, { emitEvent: false });
    
    // Move to next input if not at the last one
    if (index < 4) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    } else {
      // If at last input, blur to hide keyboard
      input.blur();
    }
  }
  
  ngOnInit() {
  }
}
