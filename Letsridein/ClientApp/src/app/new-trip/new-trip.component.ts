import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { TripsService } from '../services/trips.service';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { error } from 'util';
import { UserService } from '../services/user.service';


@Component({
    selector: 'app-new-trip',
    templateUrl: './new-trip.component.html',
    styleUrls: ['./new-trip.component.scss']
})
/** new-trip component*/
export class NewTripComponent {
  isLinear = false;
  test: Date = new Date();
  private activeUser;
  focus;
  focus1;
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  @ViewChild("placesRef") placesRef1: GooglePlaceDirective;
  @ViewChild("placesRef") placesRef2: GooglePlaceDirective;

  public handleFromAddressChange(address) {
 
    this.fromDestination.setValue(address.formatted_address)
  }

  public handleToAddressChange(address) {
   
    this.toDestination.setValue(address.formatted_address)
  }

  public handleTripAddressChange(address) {

    this.CarInfo.setValue(address.formatted_address)
  }
  constructor(public translate: TranslateService, private userService: UserService, private inter: InternationalizationService, private tripsService: TripsService, public AuthenticationService: AuthenticationService, private route: Router, private notificationService: NotificationService) {
    this.AuthenticationService.checkLogin();
    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');

  }

  ngOnInit() {
    this.tripsService.getUserTripInfo(this.AuthenticationService.getLoggedInUserId()).subscribe(response => {
      this.activeUser = response;
      this.carBrand.setValue(this.activeUser.carBrand);
      this.carColor.setValue(this.activeUser.carColor);
      this.carModel.setValue(this.activeUser.carModel);
      this.manufacturingYear.setValue(this.activeUser.manufacturingYear);
      this.carNo.setValue(this.activeUser.carNumber);
      console.log(response)
    })
  }
  TripsForm = new FormGroup({
    fromDestination: new FormControl('', Validators.required),
    toDestination: new FormControl('', Validators.required),
    StartTime: new FormControl('', [Validators.pattern("^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$"), Validators.required]),
    StartDate: new FormControl('', Validators.required),
    ExpectedArrivalTime: new FormControl(new Date()),
    Details: new FormControl(''),
    carNumber: new FormControl(),
    carColor: new FormControl(),
    carModel: new FormControl(),
    carBrand: new FormControl(),
    manufacturingYear: new FormControl(),
    CarInfo: new FormControl('', Validators.required),
    Price: new FormControl(0, Validators.min(0)),
    seatsNo: new FormControl(0, Validators.min(1)),
    carNo: new FormControl('', Validators.required),
    driverId: new FormControl(0),
    isSmoker: new FormControl(),
    isAnimals: new FormControl()
  })

  setIsSmoker(event) {
    this.isSmoker.setValue(event.checked);
  }

  setIsAnimal(event) {
    this.isAnimals.setValue(event.checked);
  }
  get fromDestination() {
    return this.TripsForm.get('fromDestination') as FormControl
  }
  get toDestination() {
    return this.TripsForm.get('toDestination') as FormControl
  }

  get isSmoker() {
    return this.TripsForm.get('isSmoker') as FormControl
  }
  get isAnimals() {
    return this.TripsForm.get('isAnimals') as FormControl
  }
  get StartTime() {
    return this.TripsForm.get('StartTime') as FormControl
  }
  get carBrand() {
    return this.TripsForm.get('carBrand') as FormControl;
  }
  get StartDate() {
    return this.TripsForm.get('StartDate') as FormControl;
  }

  get manufacturingYear() {
    return this.TripsForm.get('manufacturingYear') as FormControl;
  }

  get carModel() {
    return this.TripsForm.get('carModel') as FormControl;
  }

  get carColor() {
    return this.TripsForm.get('carColor') as FormControl;

  }

  get ExpectedArrivalTime() {
    return this.TripsForm.get('ExpectedArrivalTime') as FormControl
  }
  get Details() {
    return this.TripsForm.get('Details') as FormControl
  }
  get Price() {
    return this.TripsForm.get('Price') as FormControl
  }
  get CarInfo() {
    return this.TripsForm.get('CarInfo') as FormControl
  }
  get seatsNo() {
    return this.TripsForm.get('seatsNo') as FormControl
  }
  get carNo() {
    return this.TripsForm.get('carNo') as FormControl
  }
  get driverId() {
    return this.TripsForm.get('driverId') as FormControl
  }

  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'short',
    defaultOpen: false
  }
  changeDate() {

  }

  //setStartTime(event: Date) {

  //}

  //setExpectedArrivalTime(event: Date) {

  //}
  title;
  body;
  submitTrip() {
    
  
    this.driverId.setValue(this.AuthenticationService.getLoggedInUserId());
    this.StartDate.setValue(new Date(this.StartDate.value));
    this.ExpectedArrivalTime.setValue(new Date(this.ExpectedArrivalTime.value));
    this.carColor.setValue(this.carColor.value);
    this.tripsService.createNewTrip(this.TripsForm.value).subscribe(response => {
      if (this.inter.getLanguage() == 'ar') {
        this.title = 'تم التسجيل'
        this.body = 'تم تسجيل رحلتك بنجاح'
      }
      if (this.inter.getLanguage() == 'fr') {
        this.title = "Succès d'inscription"
        this.body = 'Votre voyage a été ajouté avec succès'
      }
      if (this.inter.getLanguage() == 'en') {
        this.title = "Trip added"
        this.body = 'Your trip has been added successfully'
      }
      this.notificationService.createNotificationService('success', this.title, this.body);
      console.log(this.activeUser)
      if (this.activeUser.carBrand == null || this.activeUser.carColor == null || this.activeUser.carModel == null || this.activeUser.carNumber == null || this.activeUser.manufacturingYear == null) {
        this.activeUser.carBrand = this.carBrand.value;
        this.activeUser.carColor = this.carColor.value;
        this.activeUser.carModel = this.carModel.value;
        this.activeUser.manufacturingYear = this.manufacturingYear.value;
        this.activeUser.carNumber = this.carNo.value;
        console.log(this.activeUser)
        this.userService.updateUserInfo(this.activeUser).subscribe(response => {
          console.log(response)
        }, error => {
          console.log(error)

        })
      }
      this.route.navigate(["/trips"]);

    }, error => {
      if (this.inter.getLanguage() == 'ar') {
        this.title = 'لم يتم التسجيل '
        this.body = 'لم يتم تسجيل رحلتك بنجاح يرجى مراجعة الحقول '
      }
      if (this.inter.getLanguage() == 'fr') {
        this.title = "Pas d'inscription"
        this.body = 'Votre vol n"a pas été enregistré avec succès.Veuillez vérifier les champs.'
      }
      if (this.inter.getLanguage() == 'en') {
        this.title = "Trip does not added"
        this.body = 'Your trip has not been added successfully,please check your fields'
      }
        this.notificationService.createNotificationService('error', this.title, this.body);
    
      })
  }
}
