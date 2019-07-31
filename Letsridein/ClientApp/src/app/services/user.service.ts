import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subscriber } from 'rxjs';
import { Observer } from 'rxjs';  
import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { error } from 'util';
import { User } from '../modelInterfaces';


//import { User } from 'app/ModelInterfaces/ModelInterface';

const baseUrl = 'api/Users/'
const getUserRoute = 'GetUser/';
const updateUserRoute = 'UpdateUserInfo';
const signupRoute = 'SignUp';
const signupSocialRoute = 'SocialMediaSignup';
const updatePassRoute = 'UpdatePassword';

const getUsersRoute = 'GetAllUsers';
const resetPassRoute = 'ResetPassword';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {

    }
  getUserDetialsById(id) {
    return this.httpClient.get(baseUrl + getUserRoute + id);
  }

  getUserById(id) {
    return this.httpClient.get(baseUrl +  id);
  }
  
  getUsers(filter, pageNo, pageSize) {
    return this.httpClient.get(baseUrl + getUsersRoute + "?username=" + filter + "&PageNo=" + pageNo + "&PageSize=" + pageSize);
  }

    createUser(user) {
        return this.httpClient.post(baseUrl + signupRoute, JSON.stringify(user), httpOptions);
  }
  createSocialUser(user) {
    return this.httpClient.post(baseUrl + signupSocialRoute, user, httpOptions);
  }
  updatePassword(user) {
    return this.httpClient.post(baseUrl + updatePassRoute, JSON.stringify(user), httpOptions);
  }
  login(user) {
    console.log(this.httpClient.post(baseUrl + "Login", JSON.stringify(user), httpOptions));
    return this.httpClient.post(baseUrl + "Login", JSON.stringify(user), httpOptions)
     }

  updateUserInfo(user)
  {
    return this.httpClient.post(baseUrl + updateUserRoute, JSON.stringify(user), httpOptions);
  }
  resetPassword(username, value) {
      return this.httpClient.get(baseUrl + resetPassRoute + "?username=" + username+"&value="+value);
    
  }
}
