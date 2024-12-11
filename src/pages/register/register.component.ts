import {Component} from '@angular/core';
import {AbstractForm} from '../../tools/abstract/abstract-form';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends AbstractForm {
  passwordControl: FormControl = new FormControl("", {validators: [
      Validators.required,
      Validators.minLength(6)
    ]})

  confirmPasswordControl : FormControl = new FormControl<any>("", {validators: [
      Validators.required,
      this.mustMatch(this.passwordControl)
    ]})


  form: FormGroup = new FormGroup<any>({
    id: new FormControl(0),
    username: new FormControl("", {validators: [Validators.required]}),
    email: new FormControl("", {validators: [Validators.required, Validators.email]}),
    password: this.passwordControl
  })

  constructor(/*private http: HttpClient*/ private auth: AuthService, private route: Router) {
    super();
  }

  onSubmit$(): void {
    /*this.http.post("http://localhost:3000/register",this.form.value).subscribe() // .subscribe pour envoyer la requête si il est pas la c'est juste la prépa*/
      this.auth.register(this.form.value).subscribe(() => this.route.navigate(['/login']))
  }

}

export interface User{
  id: number,
  username: string,
  email: string,
  password: string
}
