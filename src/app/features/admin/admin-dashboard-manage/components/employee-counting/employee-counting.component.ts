import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-counting',
  templateUrl: './employee-counting.component.html',
  styleUrl: './employee-counting.component.scss'
})
export class EmployeeCountingComponent {
  cards = [
    { count: 3, name: 'Chief Engineer', status: 'offline', icon: 'assets/images/user.png' },
    { count: 7, name: 'Supritending Engineer', status: 'online', icon: 'assets/images/user.png' },
    { count: 9, name: 'Ex. Engineer', status: 'stopped', icon: 'assets/images/user.png' },
    { count: 3, name: 'AE', status: 'idle', icon: 'assets/images/user.png' },
    { count: 10, name: 'JE', status: 'offline', icon: 'assets/images/user.png' },
  ];

  constructor(
    private router : Router
  ){}

  goToDetails(data:any) {
    this.router.navigateByUrl('/admin/dashboard/user-details')
  }
}
