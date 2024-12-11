import {Component, inject} from '@angular/core';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent {

  protected auth: AuthService = inject(AuthService)

}
