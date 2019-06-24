import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { InternationalizationService } from '../services/internationalization.service';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { NotificationService } from '../services/notification.service';
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
/** login component*/
export class LoginComponent {
  
    /** login ctor */
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    public translate: TranslateService,
    private userService: UserService,
    private router: Router,
    private inter: InternationalizationService,
    private notificationService: NotificationService,
    private socialAuthService: AuthService          
                       ) {
 
    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');
   
  }

  ngOnInit() {


  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }


  title;
  body;
  login() {
    this.userService.login(this.loginForm.value).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.router.navigate(["/"]);
    }, error => {
      if (this.inter.getLanguage() == 'ar') {
        this.title = 'خطأ بالتسجيل'
        this.body = 'اسم المستخدم او كلمة المرور خطأ'
      }
      if (this.inter.getLanguage() == 'fr') {
        this.title = "Échec de la connexion"
        this.body = 'Le nom d"utilisateur ou le mot de passe est incorrect'
      }
      if (this.inter.getLanguage() == 'en') {
        this.title = "Login Failed"
        this.body = 'Username or password is wrong'
      }
      this.notificationService.createNotificationService('error', this.title, this.body);
    });

   
  }
  public signinWithGoogle() {
    this.socialAuthService.authState.subscribe((user) => {
      this.userService.createSocialUser(user).subscribe(res => {
        let token = (<any>res).token;
        localStorage.setItem("jwt", token);
        this.router.navigate(["/trips"]);
      }, error => {
          
        })

    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.signinWithGoogle();
  }
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.signinWithGoogle();
  }
  navigateToReset()
  {
    this.router.navigate(["/resetPassword"]);
  }
}
