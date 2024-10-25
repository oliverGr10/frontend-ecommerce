import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-upload-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload-progress.component.html'
})
export class ImageUploadProgressComponent {
  @Input() imageCount: number = 0;
}
