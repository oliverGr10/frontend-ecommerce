import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddSuppliersComponent } from '../add-suppliers/add-suppliers.component';
import { EditSupplierSheetComponent } from '../edit-supplier-sheet/edit-supplier-sheet.component';
import { DeleteSupplierSheetComponent } from '../delete-supplier-sheet/delete-supplier-sheet.component';
import { HistorySupplierSheetComponent } from '../history-supplier-sheet/history-supplier-sheet.component';
import { EditProductIventorySheetComponent } from '../edit-product-iventory-sheet/edit-product-iventory-sheet.component';

@Component({
  selector: 'app-admin-suppliers',
  standalone: true,
  imports: [MatDialogModule,AddSuppliersComponent,EditSupplierSheetComponent,DeleteSupplierSheetComponent,HistorySupplierSheetComponent],
  templateUrl: './admin-suppliers.component.html',
  styleUrl: './admin-suppliers.component.css'
})
export class AdminSuppliersComponent {
  constructor(private dialog: MatDialog) {}

  openAddSuppliersSheet() {
    this.dialog.open(AddSuppliersComponent, {
      width: '400px', 
    });
  }
  openEditSupliersSheet(){
    this.dialog.open(EditSupplierSheetComponent,{
      width:'400px'
    })
  }
  openDeleteSuppliersSheet(){
    this.dialog.open(DeleteSupplierSheetComponent,{
      width:'400px'
    });
    
  }
  openHistorySuppliersSheet(){
    this.dialog.open(HistorySupplierSheetComponent,{
      width:'400px'
    });
  }


}
