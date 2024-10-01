import { Component } from '@angular/core';
import { AddProductIventorySheetComponent } from '../add-product-iventory-sheet/add-product-iventory-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { EditProductIventorySheetComponent } from '../edit-product-iventory-sheet/edit-product-iventory-sheet.component';
import { DeleteProductIventorySheetComponent } from '../delete-product-iventory-sheet/delete-product-iventory-sheet.component';

@Component({
  selector: 'app-admin-inventory',
  standalone: true,
  imports: [AddProductIventorySheetComponent,EditProductIventorySheetComponent,DeleteProductIventorySheetComponent],
  templateUrl: './admin-inventory.component.html',
  styleUrl: './admin-inventory.component.css'
})
export class AdminInventoryComponent {
  constructor(private dialog: MatDialog) {}

  openAddProductSheet(){
    this.dialog.open(AddProductIventorySheetComponent,{
      width:"400px"
    })
  }
  openEditProductSheet(){
    this.dialog.open(EditProductIventorySheetComponent,{
      width:"400"
    })
  }
  openDeleteProductSheet(){
    this.dialog.open(DeleteProductIventorySheetComponent,{
      width:"400px"
    })
  }
}
