import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { TripsService } from '../services/trips.service';
import { ActivatedRoute } from '@angular/router';
import { TripRequestService } from '../services/trip-request.service';
import { RideModalComponent } from '../ride-modal/ride-modal.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { InternationalizationService } from '../services/internationalization.service';
@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit
{
  deviceInfo = null;
  isMobile;
  isDesktopDevice;
  public Trip;
  public tripRequests;
  RideDialogRef: MatDialogRef<RideModalComponent>;
  constructor(public translate: TranslateService,
              private notificationService: NotificationService,
              private router: ActivatedRoute,
      public authService: AuthService,
      private inter: InternationalizationService,
              public dialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private requestService: TripRequestService, 
    private tripService: TripsService,
    private rideService: TripRequestService
  ) {

    this.authService.checkLogin();
    this.epicFunction();

  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      console.log(params.id);
      this.tripService.getTripById(params.id).subscribe(response => {
        this.Trip = response;
        this.tripRequests = this.Trip.tripRequest
        console.log(this.Trip);
      })
    })
  }

 
  epicFunction() {
    console.log('hello Home component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)

    console.log(this.isDesktopDevice); // returns if the app is running on a Desktop browser.
  }

  openRideDialog() {
    this.RideDialogRef = this.dialog.open(RideModalComponent);
    this.RideDialogRef.afterClosed().subscribe(data => this.fillTable(data));
  }
  title;
  body;
  fillTable(ride) {

    console.log(ride);
    if (ride.passengerId) {
      this.rideService.createRate(ride, Number(this.Trip.id)).subscribe(response => {
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
        this.Trip.tripRequest.push(response);
        this.notificationService.createNotificationService('success', this.title, this.body);
        console.log("success");

      }, error => {
        this.notificationService.createNotificationService('error', 'Request Failed', error.error);
        console.log("failed");

      });
    }
  }

  deleteRequest(requestId, status) {
    console.log(requestId);
    this.requestService.deleteRequest(requestId).subscribe(response => {

      this.Trip.tripRequest = response;
      console.log("Deleted Successfully")

    }, error => {
      console.log("failed")
    });;
  }

  acceptOrReject(requestId, status) {
    console.log(requestId);
    this.requestService.AcceptOrApproveRequest(requestId, status).subscribe(response => {
      this.Trip.tripRequest = response;
      console.log("success", this.tripRequests)
    }, error => {
      console.log(error)
    });
  }
}
