import { Component, OnInit, Input } from '@angular/core';
import { InternationalizationService } from './services/internationalization.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { interval, Subscription } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AdminService } from './services/admin.service';
import { OverlayContainer } from '@angular/cdk/overlay';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}


export const ROUTES: RouteInfo[] = [
  { path: '/new-trip', title:'New Trip', icon: 'directions_car', class: '' },
  { path: '/trips', title: 'Trips', icon: 'card_travel', class: '' },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  deviceInfo = null;
  isMobile;

  isDesktopDevice;
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }
  ThemeColor = "";
  fontThemeColor = "";
  menuItems: any[];
  public userNotifications: any = [];
  intervalId: number;
  @Input() themeColor = '';

  constructor(public translate: TranslateService,
    public AuthenticationService: AuthenticationService,
    private deviceService: DeviceDetectorService,
    private overlay: OverlayContainer,
    private router: Router,
    private langService: InternationalizationService,
    private notificationService: NotificationService,
    private adminService: AdminService
  ) {

    this.langService.getLanguage()
    if (this.router.url == "/privacy-policy") {
      this.AuthenticationService.checkLogin();
    }
    this.epicFunction();
  }

  isLoginOrSignUp() {
    if (this.router.url == "/register" || this.router.url == "/login") {
      return true;
    }
    return false;
  }
  ngOnInit() {
    let themeToken = localStorage.getItem("theme");
    if (themeToken) {
      document.body.classList.add(themeToken, "mat-app-background");
      this.overlay.getContainerElement().classList.add(themeToken);
    }
    else {
      document.body.classList.add("custom-theme", "mat-app-background");
      this.overlay.getContainerElement().classList.add("custom-theme");
    }
    this.getUserNotifications()
    const source = interval(1000 * 60);
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    source.subscribe(val => this.getUserNotifications());

  }
  toggleTheme(): void {
    
  }
  setPrefLang(value) {
    this.langService.setLang(value)
  }

  getUserNotifications() {
    this.notificationService.getUserNotification(this.AuthenticationService.getLoggedInUserId()).subscribe(response => {
      this.userNotifications = response;
    }, error => { console.log("failed") }
    )
  }

  changeThemeColor(themeColor : string) {
    if (themeColor == "light-custom-theme") {
      this.overlay.getContainerElement().classList.remove("custom-theme");
      this.overlay.getContainerElement().classList.remove("third-theme");

      this.overlay.getContainerElement().classList.add("light-custom-theme");
      document.body.classList.remove("custom-theme");
      document.body.classList.remove("third-theme");

      document.body.classList.add("light-custom-theme");
      this.themeColor = "white"
    } else if (themeColor == "custom-theme") {
      this.overlay.getContainerElement().classList.remove("light-custom-theme");
      this.overlay.getContainerElement().classList.remove("third-theme");
      this.overlay.getContainerElement().classList.add("custom-theme");
      document.body.classList.remove("light-custom-theme");
      document.body.classList.remove("third-theme");
      document.body.classList.add("custom-theme");
      this.themeColor = "blue"
    } else if (themeColor == "third-theme") {
      this.overlay.getContainerElement().classList.remove("custom-theme");
      this.overlay.getContainerElement().classList.remove("light-custom-theme");
      this.overlay.getContainerElement().classList.add("third-theme");
      document.body.classList.remove("light-custom-theme");
      document.body.classList.remove("custom-theme");
      document.body.classList.add("third-theme");
    }
    localStorage.setItem("theme", themeColor);
   
  }

  navigateToTrip(link) {
    this.router.navigate(['/' + link]);
  }

  getThemeColor() {
    if(document.body.classList.contains("custom-theme")) {
      this.fontThemeColor = 'white';
      return '#B71C1C';
    } else if (document.body.classList.contains("light-custom-theme")) {
      this.fontThemeColor = 'white';
      return '#303F9F';
    } else if (document.body.classList.contains("third-theme")) {
      
      this.fontThemeColor = 'white';
      return '#5E35B1';
    }
 
  }

  getFontThemeColor() {
    return this.fontThemeColor;
  }

  isAdmin() {
    return (this.AuthenticationService.isLoggedin() && this.AuthenticationService.getLoggedInUserId() == 1008) 
  }

  isRtl() {
    return this.langService.isRtl();
  }
  
}
