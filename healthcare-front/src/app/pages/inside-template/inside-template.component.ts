import { Component } from '@angular/core';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import {
  faSyringe, faUserInjured, faUserMd, faHome,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './inside-template.component.html',
  styleUrls: ['./inside-template.component.scss'],
})
export class InsideTemplateComponent {
  iconNames = IconNamesEnum;

  faIcons = {
    faUserMd, faSyringe, faUserInjured, faHome,
  };
}
