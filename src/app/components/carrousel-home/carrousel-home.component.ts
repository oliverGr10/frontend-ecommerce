import { Component,OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-carrousel-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrousel-home.component.html',
  styleUrl: './carrousel-home.component.css'
})
export class CarouselHomeComponent implements OnInit, OnDestroy {
  slides = [
    {
      imageUrl: 'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      alt: 'Zapatillas estilo Urbano-1',
      title: 'Zapatillas Urbanas',
      description: 'Descubre nuestra colección de zapatillas urbanas con estilo',
      buttonText: 'Comprar ahora'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80',
      alt: 'Zapatilla Deportiva 1',
      title: 'Zapatilla Deportivas',
      description: 'Aumenta tu rendimiento con nuestras zapatillas deportivas cómodas',
      buttonText: 'Más Información'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1617606002779-51d866bdd1d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      alt: 'Zapatilla de moda 1',
      title: 'Zapatillas de Modas',
      description: 'Luce a la última con nuestras zapatillas de moda',
      buttonText: 'Explora'
    }
  ];

  currentIndex = 0;
  private intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}