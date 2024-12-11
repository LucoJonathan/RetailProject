import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from '../components/header/nav/nav.component';
import {FooterComponent} from '../components/footer/footer.component';
import {HeaderComponent} from '../components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjectRetail';
  protected readonly alert = alert;
}
