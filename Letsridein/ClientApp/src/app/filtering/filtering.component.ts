import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})
export class FilteringComponent implements OnInit {

  constructor(public translate: TranslateService, private dialogRef: MatDialogRef<FilteringComponent>) {

    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');

  }

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  @ViewChild("placesRef") placesRef1: GooglePlaceDirective;

  public handleFromAddressChange(address) {

    this.FilterForm.get('FromDest').setValue(address.formatted_address)
  }

  public handleToAddressChange(address) {

    this.FilterForm.get('ToDest').setValue(address.formatted_address)
  }

 
  FilterForm = new FormGroup({
    FromDest: new FormControl(''),
    ToDest: new FormControl(''),
    PriceMax: new FormControl(),
    PriceMin: new FormControl(),
    StartTime: new FormControl('')
  })

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(this.FilterForm.value);
  }
}
