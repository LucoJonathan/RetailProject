import {ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';
import {authGuard} from '../tools/auth.guard';
import {ProductService} from '../service/product.service';
import {catchError, of} from 'rxjs';
import {inject} from '@angular/core';

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
    loadComponent: () => import('../pages/home/home.component').then(m => m.HomeComponent),

  },
  {
    // Shop Page
    path: "shop",
    loadComponent: () => import('../pages/shop/shop.component').then(m => m.ShopComponent),
    resolve: {
      products : () => inject(ProductService).all()
    }
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
    // ProductEditor Page
    path: "product-editor/:id",
    loadComponent: () => import('../pages/product-editor/product-editor.component')
      .then(m => m.ProductEditorComponent),
    canMatch: [authGuard],
    resolve: {
      product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = +(route.paramMap.get('id') || 0); // ID take the value in path, convert in number or if nothing == 0
        return id ? inject(ProductService).byId(id).pipe(catchError(() => of(undefined))) : undefined;
      }
    }
  },
  {
    path: "**", // Wildcard (toute valeur)
    loadComponent: () => import('../pages/not-found/not-found.component')
      .then(m => m.NotFoundComponent)
  }
];
