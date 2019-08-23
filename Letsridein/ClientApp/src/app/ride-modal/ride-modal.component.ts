import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { MatDialogRef } from '@angular/material';



@Component({
  selector: 'app-ride-modal',
  templateUrl: './ride-modal.component.html',
  styleUrls: ['./ride-modal.component.css']
})
export class RideModalComponent implements OnInit {
  rideForm = new FormGroup({

    passengerId: new FormControl('', Validators.required),
    
    passengerNote: new FormControl(''),
    status: new FormControl('', Validators.required),
    numberOfSeats: new FormControl('', Validators.required),
    
  })
  constructor(public translate: TranslateService,
              private router: ActivatedRoute,
              public AuthenticationService: AuthenticationService,
              private userService: UserService,
              private dialogRef: MatDialogRef<RideModalComponent>
            )
  {
    translate.use(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en');
 }

  ngOnInit() {
  }
  get passengerNote() {
    return this.rideForm.get('passengerNote') as FormControl;
  }

  get numberOfSeats() {
    return this.rideForm.get('numberOfSeats') as FormControl;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  createnewRide() {
    this.rideForm.setValue({
      passengerId: Number(this.AuthenticationService.getLoggedInUserId()),
      
      passengerNote: this.passengerNote.value,
      status: 1,
      numberOfSeats: this.numberOfSeats.value,
      
  });
this.dialogRef.close(this.rideForm.value);
   
  }
}
