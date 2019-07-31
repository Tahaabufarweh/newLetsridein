import { Component, OnInit } from '@angular/core';
import { InternationalizationService } from '../services/internationalization.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private inter: InternationalizationService) { }
  getLang() {
    return this.inter.getLanguage();
  }
  ngOnInit() {
  }

}
