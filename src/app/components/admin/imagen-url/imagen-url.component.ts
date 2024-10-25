import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-imagen-url',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imagen-url.component.html',
  styleUrl: './imagen-url.component.css'
})
export class ImagenUrlComponent {
  @Input() imageUrl: string | undefined;
  @Input() alt: string = '';
  
  showPreview: boolean = false;
  isLightboxOpen: boolean = false;
  
  previewStyle = {
    top: '-200px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '50'
  };
  
  toggleLightbox(): void {
    this.isLightboxOpen = !this.isLightboxOpen;
    if (this.isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

}
