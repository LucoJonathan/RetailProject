import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    // Demande au router de s'assurer que l'URL "complete" dans le navigateur est exactement la même que le path de cette route
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    // Register Page
    path: "register",
    loadComponent: () => import('../pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    // Home Page
    path: "home",
    loadComponent: () => import('../pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    // Shop Page
    path: "shop",
    loadComponent: () => import('../pages/shop/shop.component').then(m => m.ShopComponent)
  },
  {
    // Login Page
    path: "login",
    loadComponent: () => import('../pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    // Contact Page
    path: "contact",
    loadComponent: () => import('../pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: "**", // Wildcard (toute valeur)
    loadComponent: () => import('../pages/not-found/not-found.component')
      .then(m => m.NotFoundComponent)
  }
];
