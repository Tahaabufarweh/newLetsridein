import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subscriber } from 'rxjs';
import { Observer } from 'rxjs';
import {  Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { error } from 'util';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


const baseUrl = 'api/Reports/'
const getReportRoute = 'AllReports';
const adsUrl = 'api/Users/';
const getAdsRoute = 'GetAllAds';

const isAdminRoute = 'IsAdmin/';

const postAdRoute = 'CreateNewAd/';
const deleteAdRoute = 'DeleteAd/';
@Injectable()
export class AdminService {
  constructor(private httpClient: HttpClient, private router: Router) {

  }

  
  getReports(pageNo, pageSize) {
    return this.httpClient.get(baseUrl + getReportRoute + "?PageNo=" + pageNo + "&PageSize=" + pageSize);
  }

  getAds() {
    return this.httpClient.get(adsUrl + getAdsRoute);
  }

  deleteAd(id) {
    return this.httpClient.get(adsUrl + deleteAdRoute+ id);
  }

  isAdmin(userId) {
    return this.httpClient.get(adsUrl + isAdminRoute + userId);
  }


  CreateAd(ad, file: File) {

    const formData: FormData = new FormData();
    formData.append('AdvLink', ad);
    formData.append('File', file);
    return this.httpClient.post(adsUrl + postAdRoute , formData);
   
  }
}
