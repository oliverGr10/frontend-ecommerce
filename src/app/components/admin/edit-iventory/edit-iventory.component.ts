import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-iventory',
  standalone: true,
  imports: [],
  templateUrl: './edit-iventory.component.html',
  styleUrl: './edit-iventory.component.css'
})
export class EditIventoryComponent {
  @HostListener('document:click', ['$event'])
  @ViewChild('slideOverPanel') slideOverPanel!: ElementRef;


  constructor(
    public dialogRef: MatDialogRef<EditIventoryComponent>,
   
  ) {}
  onClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (this.slideOverPanel && !this.slideOverPanel.nativeElement.contains(targetElement)) {
      this.cerrarHoja(event);
    }
  }
  cerrarHoja(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.dialogRef.close();
  }

}