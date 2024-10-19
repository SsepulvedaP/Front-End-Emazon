import { Component, Input } from '@angular/core';
import { LogoSizes } from '../../../../shared/utils/enums/atoms-values';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input() size: LogoSizes = LogoSizes.LARGE;
}
