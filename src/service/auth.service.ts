import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../pages/register/register.component';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentResponse: BehaviorSubject<AuthResponse | undefined> = new BehaviorSubject<AuthResponse | undefined>(undefined)
  private http: HttpClient = inject(HttpClient)

  get currentUser() {
    return this.currentResponse.value?.user;
  }

  get currentName() {
    return this.currentUser?.username
  }

  get token() {
    return this.currentResponse.value?.accessToken
  }

  get isLogged(): boolean {
    return !!this.currentResponse.value
  }

  private readonly AUTH_KEY = "AUTH_RESPONSE"

  constructor() {
    const auth = sessionStorage.getItem(this.AUTH_KEY)
    if (auth) {
      this.currentResponse.next(JSON.parse(auth))
    }
    this.currentResponse.subscribe(response => {
      if (response) {
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(response))
      } else {
        this.router.navigate(['/home'])
        sessionStorage.clear()
      }
    })
  }

  login(credential: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("/login", credential)
      // Ajouter des opérations lors de la préparation de l'observable
      .pipe(
        // Permet de lire la valeur qui sera retournée lors de la souscription
        tap(response => this.currentResponse.next(response)) // next prend pour role un event emiter
      )
  }

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("/register", user)
  }
  router: Router = inject(Router)
  logout(): void {
    this.currentResponse.next(undefined)
    this.router.navigate(['/home'])
  }

}

export interface AuthResponse {
  accessToken: string,
  user: User
}

export interface Credentials {
  email: string,
  password: string
}
