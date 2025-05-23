import { Component } from '@angular/core';
import { IMG_URL } from '../../constant/menu/menu';
import { LocalStorageService } from '../../services/localstorage.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';
import { CommonService } from '../../services/common.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/app.reducer';
import { setSelectedProfile } from '../../../../core/app.selector';
import { selectProfile } from '../../../../core/app.action';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  imgUrl = IMG_URL;
  userDetails: any
  photoBase64: any;
  profilePic: any;

  constructor(
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private loginService: LoginServiceService,
    private store : Store<AppState>
  ) {
   this.store.select(setSelectedProfile).subscribe((res: any) => {
      let image: any = res;
      this.profilePic = (image);
    })
  }

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails() {
    let user = this.localStorageService.getItem('user');
    if (user) {
      this.userDetails = JSON.parse(user);
    }
  }

  logout() {
    this.notificationService.successAlert('Logout Successfully');
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        let imageValue = reader.result as string
        this.photoBase64 = imageValue.split(',')[1];
        let payload = {
          "user_id":  this.userDetails?.user_id,
          "base64_str": this.photoBase64
        };
        this.loginService.profilePicUpload(payload).subscribe((res: any) => {          
          if(res?.status == 200){
            this.store.dispatch(selectProfile({selectProfile : res?.body?.result}))
            this.notificationService.successAlert(res?.body?.actionResponse);
            this.getUserDetails();
          }
        })
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        this.notificationService.errorAlert("Failed to read file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  }


}
