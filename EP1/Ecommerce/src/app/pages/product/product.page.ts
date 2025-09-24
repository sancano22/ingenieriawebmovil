import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Products } from 'src/app/services/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone:false
})
export class ProductPage implements OnInit {
  listaProductos:Product[]=[];
  ListaCarrito:CartItem[]=[]

  constructor(private productService:Products,private snack: MatSnackBar) {
     
   }

  ngOnInit() {
    this.productService.ConsultarProductos().subscribe((datos)=>{
          this.listaProductos=datos;
    })
  }

  agregar(item:Product,qty=1){
    const i = this.ListaCarrito.findIndex(ci => ci.product.id=== item.id);
    if (i >= 0) {
      const next = this.ListaCarrito[i].qty + qty;
      this.ListaCarrito[i] = { ...this.ListaCarrito[i], qty: next };
    } else {
      this.ListaCarrito.push({ product: item, qty }); // ✅ usar qty, no i
    }
    
    // opcional: reducir stock localmente (si lo manejas en el frontend)
    if (item.stock !== undefined) item.stock = Math.max(0, item.stock - qty);

    this.snack.open('Adicionado al carrito', 'Cerrar', {
      duration: 2500, horizontalPosition: 'right', verticalPosition: 'bottom'
    });

    // debug
    console.log(this.ListaCarrito);
  
    }

}
