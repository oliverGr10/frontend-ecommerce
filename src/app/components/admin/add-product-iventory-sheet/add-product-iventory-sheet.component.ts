import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-iventory-sheet',
  standalone: true,
  imports: [],
  templateUrl: './add-product-iventory-sheet.component.html',
  styles: ``
})
export class AddProductIventorySheetComponent {
  constructor(public dialogRef: MatDialogRef<AddProductIventorySheetComponent>) {}
  cerrarHoja(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.dialogRef.close();
  }

}
