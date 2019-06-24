import { Component } from '@angular/core';
import { InternationalizationService } from '../../services/internationalization.service';

@Component({
    selector: 'app-policy',
    templateUrl: './policy.component.html',
    styleUrls: ['./policy.component.scss']
})
/** policy component*/
export class PolicyComponent {
  /** policy ctor */
  constructor(public langService: InternationalizationService) {

  }

  getLang() {
    return this.langService.getLanguage();
  }
}
