import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

interface CartItem {
  imageUrl: string;
  title: string;
  price: number;
  description: string;
  quantity: number;
}

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css'
})
export class CartDialogComponent {
  cartItems: CartItem[] = [
    {
      imageUrl: 'https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Smartphone 1',
      price: 50.00,
      description: 'Descripción del Smartphone 1',
      quantity: 1
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Smartphone 2',
      price: 70.00,
      description: 'Descripción del Smartphone 2',
      quantity: 1
    }
  ];

  constructor(private dialogRef: MatDialogRef<CartDialogComponent>) {}

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.updateSubtotal();
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateSubtotal();
    }
  }

  removeItem(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.updateSubtotal();
    }
  }

  private updateSubtotal(): void {
    // El subtotal se actualiza automáticamente gracias al getter
  }
}