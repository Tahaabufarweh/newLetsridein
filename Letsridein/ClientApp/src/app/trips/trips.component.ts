import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, PageEvent } from '@angular/material';
import { FilteringComponent } from '../filtering/filtering.component';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isNullOrUndefined, error } from 'util';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { AuthenticationService } from '../services/auth.service';
import { TripsService } from '../services/trips.service';
import { RideModalComponent } from '../ride-modal/ride-modal.component';
import { TripRequestService } from '../services/trip-request.service';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { AdminService } from '../services/admin.service';
import { IImage } from 'ng-simple-slideshow';
import { forEach } from '@angular/router/src/utils/collection';
import { NgImageSliderModule } from 'ng-image-slider';
import { interval } from 'rxjs';
@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss']
})
/** trips component*/
export class TripsComponent implements OnInit {

  public allTrips;
  public filter;
  public ads;
  RideDialogRef: MatDialogRef<RideModalComponent>;
    /** trips ctor */
  fileNameDialogRef: MatDialogRef<FilteringComponent>;
  imageUrls: (string | IImage)[] = [
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg', caption: 'The first slide', href: '#config' },
   
  ];
  AdsArrSize: number = 0;
  AdsArrCurrentIndex: number = 0;

  height: string = '400px';
  minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 3333;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = true;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = false;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  fullscreen: boolean = false;
  isLoadingData = false;
  public adsArrIndex = [0, 1, 2, 3];
  constructor(
    public dialog: MatDialog,
    private tripsService: TripsService,
    public translate: TranslateService,
    public AuthenticationService: AuthenticationService,
    private router: Router,
    private rideService: TripRequestService,
    private inter: InternationalizationService,
    private notificationService: NotificationService,
    private adminService: AdminService)
  {
    translate.use(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en');

    this.AuthenticationService.checkLogin();
  }

  
  ngOnInit() {
    const source = interval(1000 * 5);
    this.fillTable({}, 1, 10);
    this.getAllAds();
    source.subscribe(val => this.changeAdsPicture());
  }

  public changeAdsPicture() {
    for (var index = 0; index < this.adsArrIndex.length; index++) {
      if (this.adsArrIndex[index] == this.AdsArrSize || this.adsArrIndex[index] == this.AdsArrSize - 1) {
        this.adsArrIndex[index] = 0;
      }
      else {
        this.adsArrIndex[index] = this.adsArrIndex[index] + 1;
      }

    }
   
  }

  
  public getAllAds() {

    this.adminService.getAds().subscribe(response => {
      this.ads = response;
      console.log(this.ads)
      for (var image = 0; image < this.ads.length; image++) {
        let imageIn: IImage = {
          url: this.ads[image].imageName,
          href: this.ads[image].advLink
        };
       
        this.imageUrls.push(imageIn);
      }
      this.AdsArrSize = this.imageUrls.length;
      console.log(this.imageUrls)

    }, error => {
    })
  }

 
  fillTable(filter = {} as any, pageNo, pageSize) {
    this.isLoadingData = true;
    this.tripsService.getAllTrips(filter, pageNo, pageSize).subscribe(response => {
      this.allTrips = response;
      this.isLoadingData = false;
    }, error => {
      this.isLoadingData = false;
      })

   
  }

  getImage(){

  }
  navigateToDetails(id)
  {
    this.router.navigate(["/trip-details/" + id]);
  }
  openRideDialog(id) {
    this.RideDialogRef = this.dialog.open(RideModalComponent);
    this.RideDialogRef.afterClosed().subscribe(data => this.fillRide(data, id));
  }
  title;
  body;
  fillRide(ride = {} as FormGroup ,tripid) {
    this.rideService.createRate(ride, Number(tripid)).subscribe(response => {
      if (this.inter.getLanguage() == 'ar') {
        this.title = 'تم ارسال الطلب'
        this.body = 'تم ارسال طلبك بنجاح'
      }
      if (this.inter.getLanguage() == 'fr') {
        this.title = "Demande de succès"
        this.body = 'Votre demande à été envoyé'
      }
      if (this.inter.getLanguage() == 'en') {
        this.title = "Request Success"
        this.body = 'Your request has been sent'
      }
      this.notificationService.createNotificationService('success', this.title, this.body);
      console.log("success");
    }, error => {
      console.log("failed");
    });
  }


  onPageChanged(page: PageEvent) {
    console.log(this.filter)
    this.fillTable(this.filter, page.pageIndex + 1, page.pageSize)
  }

  resetSearch() {
    this.filter = {};
    this.fillTable(this.filter, 1 , 10);
  }


  openDialog() {
    this.fileNameDialogRef = this.dialog.open(FilteringComponent);

    this.fileNameDialogRef.afterClosed().subscribe(
      data => {
        this.fillTable(data, 1, 10)
        this.filter = data;
        console.log(this.filter)
      }
    );    
  }
    
}

