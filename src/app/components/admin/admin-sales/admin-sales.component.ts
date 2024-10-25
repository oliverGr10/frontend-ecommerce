import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddIventoryComponent } from '../add-iventory/add-iventory.component';
import { MatDialog } from '@angular/material/dialog';
import { EditIventoryComponent } from '../edit-iventory/edit-iventory.component';
import { DeleteIventoryComponent } from '../delete-iventory/delete-iventory.component';
interface Order {
  id: number;
  usuario_id: number;
  fecha_orden: string;
  estado: 'draft' | 'confirmed' | 'packed' | 'shipped' | 'invoiced';
  total: number;
}

@Component({
  selector: 'app-admin-sales',
  standalone: true,
  imports: [CommonModule,AddIventoryComponent],
  templateUrl: './admin-sales.component.html',
  styleUrl: './admin-sales.component.css'
})
export class AdminSalesComponent {
 
  constructor(
    private dialog: MatDialog,
   
  ) { }
  openAddIventory() {
    const dialogRef = this.dialog.open(AddIventoryComponent, {
      width: '400px',
      // Other dialog settings
    });
  }
  openEditIventory() {
    const dialogRef = this.dialog.open(EditIventoryComponent, {
      width: '400px',
      // Other dialog settings
    });
  }
  openDeleteIventory() {
    const dialogRef = this.dialog.open(DeleteIventoryComponent, {
      width: '400px',
      // Other dialog settings
    });
  }
}
