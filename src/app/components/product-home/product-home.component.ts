import { Component,OnInit } from '@angular/core';

interface Product {
  name: string;
  description: string;
  price: number;
  discount: number;
  imageUrl: string;
}
@Component({
  selector: 'app-product-home',
  standalone: true,
  imports: [],
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.css'
})
export class ProductHomeComponent {

}
