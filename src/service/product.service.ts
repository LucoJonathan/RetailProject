import { Injectable } from '@angular/core';
import {AbstractService} from '../tools/abstract/abstract-service';
import {Product} from '../entity/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractService<Product>{
  protected readonly ENDPOINT: string = "/products"
}
