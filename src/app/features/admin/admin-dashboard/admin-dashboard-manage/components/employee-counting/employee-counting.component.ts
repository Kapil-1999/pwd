import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-counting',
  templateUrl: './employee-counting.component.html',
  styleUrl: './employee-counting.component.css'
})
export class EmployeeCountingComponent {
  cards = [
    { count: 200, name: 'Chief Engineer', status: 'offline', icon: 'assets/images/user.png' },
    { count: 150, name: 'Supritending Engineer', status: 'online', icon: 'assets/images/user.png' },
    { count: 300, name: 'Ex. Engineer', status: 'stopped', icon: 'assets/images/user.png' },
    { count: 400, name: 'AE', status: 'idle', icon: 'assets/images/user.png' },
    { count: 500, name: 'JE', status: 'offline', icon: 'assets/images/user.png' },
  ];
}
