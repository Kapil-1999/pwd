import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PWD';
  constructor(
    private cookieService : CookieService,
    private router :Router 
  ) {
  }

  ngOnInit() {
  }
}
