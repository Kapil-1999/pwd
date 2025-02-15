import { Component } from '@angular/core';
import { IMG_URL } from '../../constant/menu/menu';
import { LocalStorageService } from '../../services/localstorage.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  imgUrl = IMG_URL;
  userDetails: any

  constructor(
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private router: Router
  ) {
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
}
