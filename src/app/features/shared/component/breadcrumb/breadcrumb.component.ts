import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbItem } from '../../interface/breadcrumb.interface';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() breadcrumbItems: BreadcrumbItem[] = [];

  constructor(
    private router : Router
  ){}

  navigateRoute(item: BreadcrumbItem) {
    try {
      this.router.navigateByUrl(item.path);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }
}
