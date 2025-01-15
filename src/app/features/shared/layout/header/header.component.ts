import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage.service';
import { NotificationService } from '../../services/notification.service';
import { NavigationEnd, Router } from '@angular/router';
import { ADMIN_MENU, IMG_URL } from '../../constant/menu/menu';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  menuList: any = ADMIN_MENU;
  userDetails: any;
  showMobileMenu: boolean = false;
  imgUrl = IMG_URL;

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveMenu(this.router.url);
      }
    });
  }

  updateActiveMenu(currentPath: string) {
    this.menuList?.forEach((menu: any) => {
      menu.isActive = menu.path === currentPath;
      if (menu.subNav) {
        menu.subNav.forEach((subMenu: any) => {
          subMenu.isActive = subMenu.path === currentPath;
          if (subMenu.isActive) {
            menu.isActive = true;
          }
        });
      }
    });
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

  @HostListener('document:click', ['$event'])
  closeMenus(event: Event): void {
    const clickedInside = (event.target as HTMLElement).closest('.relative');
    if (!clickedInside) {
      this.closeAllMenus(this.menuList);
      this.showPopup = false;
      this.showMobileMenu = false

    }
  }

  toggleDropdown(item: any, event: MouseEvent): void {
    this.closeAllMenus(this.menuList, item);
    this.showPopup = false;
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
    this.closeAllMenus(this.menuList);
  }

  onShowMobileMewnu() {
    this.showMobileMenu = !this.showMobileMenu
  }

  goToProfile() {
    this.closeAllMenus(this.menuList);
    this.showPopup = false;
    this.router.navigateByUrl('/admin/profile')
  }

}
