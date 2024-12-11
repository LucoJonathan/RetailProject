import { Component } from '@angular/core';
import {CopyrightComponent} from './copyright/copyright.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CopyrightComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
