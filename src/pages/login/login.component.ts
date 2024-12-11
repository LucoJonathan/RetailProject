import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials : Credentials = {
    email: "test@gmail.com",
    password: "123456"
  }

/*  constructor(private http: HttpClient, private router: Router) {

  }*/ // Dépend du moment ou c'est init priorisé les injects pour les intercepteurs ....

  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private auth: AuthService = inject(AuthService);

  onSubmit(form: HTMLFormElement) {
    if(form.checkValidity()) {
      this.auth.login(this.credentials).subscribe({
        next : () => this.router.navigate(['/home']),
        error : err => console.log(err),
      })
      form.reset()
    }
  }
}

export interface Credentials {
  email: string,
  password: string
}
