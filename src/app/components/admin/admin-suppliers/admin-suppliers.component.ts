import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddSuppliersComponent } from '../add-suppliers/add-suppliers.component';
import { EditSupplierSheetComponent } from '../edit-supplier-sheet/edit-supplier-sheet.component';
import { DeleteSupplierSheetComponent } from '../delete-supplier-sheet/delete-supplier-sheet.component';
import { HistorySupplierSheetComponent } from '../history-supplier-sheet/history-supplier-sheet.component';
import { EditProductIventorySheetComponent } from '../edit-product-iventory-sheet/edit-product-iventory-sheet.component';
import { Suppliers } from '../../../interface/suppliers';
import { SupplierService } from '../../../services/supplier.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-suppliers',
  standalone: true,
  imports: [MatDialogModule,AddSuppliersComponent,EditSupplierSheetComponent,DeleteSupplierSheetComponent,HistorySupplierSheetComponent,HttpClientModule,CommonModule],
  templateUrl: './admin-suppliers.component.html',
  styleUrl: './admin-suppliers.component.css'
})
export class AdminSuppliersComponent implements OnInit {
  suppliers: Suppliers[] = [];

  constructor(
    private dialog: MatDialog,
    private supplierService: SupplierService,
    private cdr: ChangeDetectorRef  // Corregido: usamos 'cdr' en lugar de 'change'
  ) {}

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = this.sortSuppliers(data);
        console.log('Proveedores obtenidos:', this.suppliers);
        this.cdr.detectChanges(); // Corregido: usamos 'cdr' en lugar de 'change'
      },
      error: (error) => {
        console.log('Error al obtener proveedores:', error);
      }
    });
  }

  openAddSuppliersSheet() {
    const dialogRef = this.dialog.open(AddSuppliersComponent, {
      width: '400px',
      // Other dialog settings
    });

    dialogRef.componentInstance.proveedorAgregado.subscribe((newSupplier: Suppliers) => {
      this.suppliers = this.sortSuppliers([...this.suppliers, newSupplier]);
      console.log('Proveedor agregado:', newSupplier);
      console.log('Lista actualizada:', this.suppliers);
      this.cdr.detectChanges(); // Corregido: usamos 'cdr' en lugar de 'change'
    });
  }

  private sortSuppliers(suppliers: Suppliers[]): Suppliers[] {
    return suppliers.sort((a, b) => {
      const nameA = (a.name || '').toUpperCase();
      const nameB = (b.name || '').toUpperCase();
      return nameA.localeCompare(nameB);
    });
  }


  openHistorySuppliersSheet(supplier: Suppliers) {
    // Implementar lógica para mostrar historial
  }

  openEditSupliersSheet(supplier: Suppliers) {
    const dialogRef =this.dialog.open(EditSupplierSheetComponent,{
      width:'400px',
      data: supplier
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.suppliers.findIndex(s => s.id === result.id);
        if (index !== -1) {
          this.suppliers[index] = result;
          this.suppliers = [...this.suppliers]; // Trigger change detection
        }
      }
    });
  }
  openDeleteSuppliersSheet(supplier: Suppliers) {
    const dialogRef = this.dialog.open(DeleteSupplierSheetComponent, {
      width: '400px',
      data: supplier
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.supplierService.deleteSupplier(supplier.id).subscribe({
          next: () => {
            this.suppliers = this.suppliers.filter(s => s.id !== supplier.id);
            Swal.fire({
              title: 'Proveedor eliminado',
              html: `El proveedor <span style="color: #d32f2f; font-weight: bold;">${supplier.name}</span> ha sido eliminado.`,
              icon: 'success',
              timer: 2000, // El mensaje se mostrará durante 2 segundos
              showConfirmButton: false,  // Sin botón de confirmación
            });
          },
          error: (error) => {
            console.error('Error al eliminar el proveedor:', error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el proveedor.',
              icon: 'error',
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  }
}