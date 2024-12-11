import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Product} from '../../../entity/Product';
import {ProductService} from '../../../service/product.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input({required: true}) product! : Product
  @Output() productDeleted: EventEmitter<never> = new EventEmitter<never>

  private service : ProductService = inject(ProductService)

  delete(){
    this.service.delete(this.product.id).subscribe(() => {
      console.log("Produit supprimé")
      this.productDeleted.emit()
    })
  }

}
