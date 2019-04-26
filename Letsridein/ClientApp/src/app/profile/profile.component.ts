import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { RatingComponent } from '../rating/rating.component';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { CompleteProfileComponent } from '../complete-profile/complete-profile.component';
import { $ } from 'protractor';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { DataSource, ArrayDataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { User } from '../modelInterfaces';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingService } from '../services/rating.service';
import { Validators, FormControl, FormGroup} from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { ProfileService } from '../services/profile.service';
import { error } from 'util';
import { ReportComponent } from '../report/report.component';
enum PaymentMethod {
  Cash = 1,
  Visa = 2
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


/** profile component*/
export class ProfileComponent implements OnInit {
 
  displayedColumns = ['fullName', 'username', 'email', 'password'];  
  url = "https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png";
  user = {} as any;
  user2 = {} as any;
 
  /** profile ctor */
  RatingDialogRef: MatDialogRef<RatingComponent>;
  ReportDialogRef: MatDialogRef<ReportComponent>;
  CompleteDialogRef: MatDialogRef<CompleteProfileComponent>;
  constructor(public dialog: MatDialog,
    private userService: UserService,
    public translate: TranslateService,
    public authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
    private inter: InternationalizationService,
    private profileService: ProfileService,
    private ratingService: RatingService,
    private notificationService: NotificationService) {
    this.authService.checkLogin();
    translate.use(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en');
  }

  ngOnInit() {
    this.router.params.subscribe(param => { 
      this.userService.getUserDetialsById(param.id).subscribe(response => {
      this.user = response;
      console.log(this.user);
    })
    })
  }
 
  
  getPaymentMethod(val) {
    return PaymentMethod[val].toString();
  }

  openRatingDialog()
  {
    this.RatingDialogRef = this.dialog.open(RatingComponent);
    this.RatingDialogRef.afterClosed().subscribe(data => this.fillTable(data));    
  }

  openReportDialog() {
    this.ReportDialogRef = this.dialog.open(ReportComponent);
    this.ReportDialogRef.afterClosed().subscribe(data => this.fillReport(data));
  }
  title;
  body;
  fillTable(rate = {} as FormGroup) {

    console.log(rate);
    
    this.ratingService.createRate(rate, Number(this.user.id)).subscribe(response => {
      if (this.inter.getLanguage() == 'ar') {
        this.title = 'تم التقييم بنجاح'
        this.body = 'تم ارسال تقييمك بنجاح'
      }
      if (this.inter.getLanguage() == 'fr') {
        this.title = "Note de réussite"
        this.body = 'Votre note a été envoyée'
      }
      if (this.inter.getLanguage() == 'en') {
        this.title = "Rating Success"
        this.body = 'Your rate has been sent'
      }
      this.notificationService.createNotificationService('success', this.title, this.body);
      console.log("success");
    
    }, error => {
      console.log("failed");
     
    });
    
  }
  fillReport(report = {} as FormGroup) {

    console.log(report);
    console.log(this.user.id);
    this.profileService.createReport(report, Number(this.user.id)).subscribe(response => {
      if (this.inter.getLanguage() == 'ar') {
        this.title = 'تم الابلاغ بنجاح'
        this.body = 'تم ارسال ابلاغك بنجاح'
      }
      if (this.inter.getLanguage() == 'fr') {
        this.title = "Signaler le succès"
        this.body = 'Votre rapport a été envoyé'
      }
      if (this.inter.getLanguage() == 'en') {
        this.title = "Report Success"
        this.body = 'Your report has been sent'
      }
      this.notificationService.createNotificationService('success', this.title, this.body);
      console.log("success");

    }, error => {
      console.log("failed");

    });

  }
  editProfileInfo(user) {

    console.log(user);
    console.log(this.user.id);
    this.userService.updateUserInfo(user).subscribe(response => {
      this.user = response;
      if (this.inter.getLanguage() == 'ar') {
        this.title = 'تم التحديث بنجاح'
        this.body = 'تم تحديث بيانات الشخصية بنجاح'
      }
      if (this.inter.getLanguage() == 'fr') {
        this.title = "Mettre à jour le succès"
        this.body = 'Votre profil a été mis à jour avec succés'
      }
      if (this.inter.getLanguage() == 'en') {
        this.title = "Update Success"
        this.body = 'Your Profile has been Updated Successfully'
      }
      this.notificationService.createNotificationService('success', this.title, this.body);
      console.log("success");

    }, error => {
      console.log("failed");

    });

  }
  

  openCompleteDialog() {
    this.CompleteDialogRef = this.dialog.open(CompleteProfileComponent);
    this.CompleteDialogRef.afterClosed().subscribe(data => this.editProfileInfo(data));

  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result.toString();
        
      }
      this.saveUserPhoto(event.target.files[0]);

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  saveUserPhoto(file) {
    console.log(this.url)
    this.profileService.saveProfilePic(this.authService.getLoggedInUserId(), file).subscribe(response => {
      let user;
      if (this.inter.getLanguage() == 'ar') {
        this.title = 'تم رفع الصورة'
        this.body = 'تم رفع الصورة بنجاح'
      }
      if (this.inter.getLanguage() == 'fr') {
        this.title = "Succès de téléchargement"
        this.body = 'La photo de profil a été téléchargée avec succès'
      }
      if (this.inter.getLanguage() == 'en') {
        this.title = "Uploading Success"
        this.body = 'Profile picture uploaded successfully'
      }
      this.notificationService.createNotificationService('success', 'Uploading Success', 'Profile picture uploaded successfully');
      user = response;
      this.user.profileImageName = user.profileImageName;
      console.log(this.user.profileImageName )
    }, error => {
      if (this.inter.getLanguage() == 'ar') {
        this.body = 'خطأ في تحميل الصورة'
      }
      if (this.inter.getLanguage() == 'fr') {
        this.body = 'Erreur lors du téléchargement de votre photo de profil'
      }
      if (this.inter.getLanguage() == 'en') {
        this.body = 'Error in uploading your profile pic'
      }
      this.notificationService.createNotificationService('danger', '', this.body);


    });
  }
  

}


  
