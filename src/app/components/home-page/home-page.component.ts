import { AuthService } from './../auth/auth.service';
import { LoginComponent } from '../login/login.component';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductHomeComponent } from '../product-home/product-home.component';
import { AboutHomeComponent } from '../about-home/about-home.component';
import { FooterHomeComponent } from '../footer-home/footer-home.component';
import { CarouselHomeComponent } from '../carrousel-home/carrousel-home.component';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InactivityService } from '../auth/InactivityService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ProductHomeComponent,
    AboutHomeComponent,
    FooterHomeComponent,
    CarouselHomeComponent,
    CartDialogComponent,
    OrderDialogComponent,
    CommonModule
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'] 
})
export class HomePageComponent implements OnInit {
  isLoggedIn = false; 
  user: any = {}; 
  isModalOpen = false;
  isDropdownOpen = false;
  userRole: string = '';


  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router, private inactivityService: InactivityService ) {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoggedIn = this.authService.isLoggedIn(); 
        const userData = this.authService.getUserData();
        
        if (userData) {  // Verificamos que userData no sea null
          this.user = userData;
          this.userRole = userData.role; // Asigna el rol (USER o ADMIN)
          this.startInactivityDetection(); 
        }
      }
    });
  }
  
  // Método para abrir el diálogo del carrito
  openCartDialog(): void {
    this.dialog.open(CartDialogComponent, {
      width: '400px', 
      height: '100vh', 
      position: { right: '0' }, 
      panelClass: 'cart-dialog-panel', 
    });
  }

  openOrderDialog(): void {
    this.dialog.open(OrderDialogComponent, {
      width: '400px', 
      height: '100vh', 
      position: { right: '0' }, 
      panelClass: 'order-dialog-panel', 
    });
  }

  ngOnInit(): void {
    
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.user = this.authService.getUserData();
      console.log("quak",this.user)
      this.startInactivityDetection();
    }
  }
  
  goToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openModal() {
    this.user = this.authService.getUserData();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false; 
  }

  logout() {
    this.authService.logout();
    this.isModalOpen = false;
    this.isLoggedIn = false;
    this.isDropdownOpen = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
  }
  
  private showInactivityAlert() {
    Swal.fire({
      title: '¿Sigues ahí?',
      text: 'Parece que estás inactivo. ¿Quieres continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, seguir conectado',
      cancelButtonText: 'No, cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        this.inactivityService.resetInactivityTimer(); 
      } else {
        this.logout();
      }
    });
  }

  private startInactivityDetection() {
    // Suscribirse a la detección de inactividad
    this.inactivityService.inactivityDetected.subscribe(() => {
      this.showInactivityAlert();
    });
  }
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openAccountModal() {
    this.isModalOpen = true;
    this.isDropdownOpen = false; 
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdownElement = (event.target as HTMLElement).closest('.relative');
    if (!dropdownElement) {
      this.isDropdownOpen = false;
    }
  }
  
  
}
