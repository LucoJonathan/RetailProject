import { Component } from '@angular/core';
import {NavComponent} from './nav/nav.component';
import {LogoComponent} from './logo/logo.component';
import {SocialIconComponent} from './social-icon/social-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavComponent,
    LogoComponent,
    SocialIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
