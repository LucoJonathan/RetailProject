import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AbstractForm} from '../../tools/abstract/abstract-form';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-editor.component.html',
  styleUrl: './product-editor.component.css'
})
export class ProductEditorComponent extends AbstractForm{

  form: FormGroup = new FormGroup({
        id: new FormControl(0),
        src: new FormControl(null),
        price: new FormControl(0, {validators: [Validators.required]}),
        title: new FormControl("", {validators: [Validators.required], nonNullable: true}),
        description: new FormControl("", {validators: [Validators.required], nonNullable: true}),
  })

  /*Tableau de liens de photo*/
  pics: string[] = new Array(8) // Créer un tableau de taille souhaité
    .fill(0)// Affect la meme valeur à tous les éléments du tableau
    .map((v,i) => `pic${(i+1).toString().padStart(2,'0')}.jpg`)

  constructor(private service: ProductService, private router: Router, route: ActivatedRoute) {
    super();
    route.data.subscribe(({product}) => {
      if (product) this.form.patchValue(product)
      else this.form.reset({
        id: 0,
        src: null,
        title: "",
        description: "",
      })
    })
  }


  onSubmit$(): void {
    this.service[this.form.value.id ? 'update' : 'save'](this.form.value).subscribe(() => this.router.navigate(['/home'])) // Ternaire if UPDT ou SAVE and send with sub and go to home page
  }
}

