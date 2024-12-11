import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {ProductComponent} from './product/product.component';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    AsyncPipe,
    ProductComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

  protected service = inject(ProductService)
  private route = inject(ActivatedRoute)
  data = this.route.data.pipe(map(({products}) => products))
}
