import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone:false
})
export class ProductPage implements OnInit {
  listaProductos:Product[]=[];

  constructor() {
     this.listaProductos=[{
       id:1,
       name:"producto",
       image:"",
       description:"producto destacado..",
       stock:12,
       price:2000,
       currency:"CLP",
       tags:["robótica", "tecnología"],
       category:"Educación",
       rating:{average:12,count:12}
     },
     {
     id:2,
       name:"producto",
       image:"",
       description:"producto destacado..",
       stock:12,
       price:2000,
       currency:"CLP",
       tags:["robótica", "tecnología"],
       category:"Educación",
       rating:{average:12,count:12}
     },
     {
     id:3,
       name:"producto",
       image:"",
       description:"producto destacado..",
       stock:12,
       price:2000,
       currency:"CLP",
       tags:["robótica", "tecnología"],
       category:"Educación",
       rating:{average:12,count:12}
     }

    ]
   }

  ngOnInit() {
  }

}
