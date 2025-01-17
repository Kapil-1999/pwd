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

  menuListData: any;
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
    this.getMenuList();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveMenu(this.router.url);
      }
    });
  }

  updateActiveMenu(currentPath: string) {
    this.menuListData?.forEach((menu: any) => {      
      menu.isActive = menu.url === currentPath;
      if (menu.menuList) {
        menu.menuList.forEach((subMenu: any) => {
          subMenu.isActive = subMenu.url === currentPath;
          if (subMenu.isActive) {
            menu.isActive = true;
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getMenuList() {
    let menu:any = this.localStorageService.getItem('menu');
    this.menuListData = JSON.parse(menu);    
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
      this.closeAllMenus(this.menuListData);
      this.showPopup = false;
      this.showMobileMenu = false
    }
  }

  toggleDropdown(item: any, event: MouseEvent): void {    
    this.closeAllMenus(this.menuListData, item);
    this.showPopup = false;
    if (item.menuList?.length > 0) {
      item.is_open = !item.is_open;
    }
  }


  private closeAllMenus(menuList: any[], exception?: any): void {
    menuList.forEach((menu: any) => {
      if (menu !== exception) {
        menu.is_open = false;      }
      if (menu.menuList?.length) {
        this.closeAllMenus(menu.menuList, exception);
      }
      if (menu.childSubmenu?.length) {
        this.closeAllMenus(menu.childSubmenu, exception);
      }
    });
  }

  showPopup: boolean = false;

  togglePopup() {
    this.showPopup = !this.showPopup;
    this.closeAllMenus(this.menuListData);
  }

  onShowMobileMewnu() {
    this.showMobileMenu = !this.showMobileMenu
  }

  goToProfile() {
    this.closeAllMenus(this.menuListData);
    this.showPopup = false;
    this.router.navigateByUrl('/admin/profile')
  }

}
