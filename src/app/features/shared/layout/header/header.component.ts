import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { ADMIN_MENU } from '../../constant/menu/menu';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  menuList: any;

  constructor(
    private renderer: Renderer2, 
    private elRef: ElementRef,
    private localStorageService: LocalStorageService,
    private notificationService : NotificationService,
    private router : Router
  ) {}
  
  ngOnInit(): void {
    this.menuList = ADMIN_MENU;
  }
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      // Close all menus if the click is outside
      this.closeAllMenus(this.menuList);
      this.showPopup = false
    }
  }
  
  toggleDropdown(item: any, event: MouseEvent): void {
    event.stopPropagation();
    
    // Close all other menus
    this.closeAllMenus(this.menuList, item);
  
    // Toggle current item's menu
    if (item.subNav?.length > 0 || item.childSubmenu?.length > 0) {
      item.isOpen = !item.isOpen;
    }
  }
  
  
  private closeAllMenus(menuList: any[], exception?: any): void {
    menuList.forEach((menu: any) => {
      if (menu !== exception) {
        menu.isOpen = false;
      }
      if (menu.subNav?.length) {
        this.closeAllMenus(menu.subNav, exception);
      }
      if (menu.childSubmenu?.length) {
        this.closeAllMenus(menu.childSubmenu, exception);
      }
    });
  }
  
  showPopup: boolean = false;

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  logout() {
    this.notificationService.successAlert('Logout Successfully');
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }

}
