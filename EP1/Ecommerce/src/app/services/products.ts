import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
 export class Products {
  apiProductos:string="https://fakestoreapi.com/products";
  constructor(private http:HttpClient){
  }

  ConsultarProductos():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiProductos);
  }
}
