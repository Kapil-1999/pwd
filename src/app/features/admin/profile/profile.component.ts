import { Component } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { IMG_URL } from '../../shared/constant/menu/menu';
import { NotificationService } from '../../shared/services/notification.service';
import { LocalStorageService } from '../../shared/services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userData: any;
  imgUrl = IMG_URL

  constructor(
    private commonService : CommonService,
    private notificationService : NotificationService,
    private localStorageService : LocalStorageService,
    private router : Router
  ){}

  ngOnInit() {
    this.getUserDetail()
  }

  getUserDetail() {
    this.userData = this.commonService.getUserDetails()
  }

  logout() {
    this.notificationService.successAlert('Logout Successfully');
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }
}
