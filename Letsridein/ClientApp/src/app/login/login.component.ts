import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { InternationalizationService } from '../services/internationalization.service';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { NotificationService } from '../services/notification.service';


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

  constructor(public translate: TranslateService,
              private userService: UserService,
    private router: Router,
    private notificationService: NotificationService 
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



  login() {
    this.userService.login(this.loginForm.value).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      console.log(token)
      this.router.navigate(["/"]);
    }, error => {
        this.notificationService.createNotificationService('error', 'Login Failed', 'Username or password is wrong');
    });

   
  }
  navigateToReset()
  {
    this.router.navigate(["/resetPassword"]);
  }
}
