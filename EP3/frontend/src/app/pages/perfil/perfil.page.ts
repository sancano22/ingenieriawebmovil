import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone:false
})
export class PerfilPage implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }
  usuario: any;

  ngOnInit() {
    if (!this.authService.estaAutenticado()) {
      // Si ya hay token, redirige al perfil
      this.router.navigate(['/']);
    }
    //Guard 
    this.authService.obtenerPerfil().subscribe({
      next: (res: any) => {
        this.usuario = res.user;
        console.log(this.usuario);
      },
      error: (err) => {
        console.error('Error al obtener perfil:', err);
      }
    });

  }
   logout() {
    localStorage.removeItem('token'); // elimina el token
    this.router.navigate(['/home']); // redirige al login
  }

}
