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
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-admin-suppliers',
  standalone: true,
  imports: [MatDialogModule,AddSuppliersComponent,EditSupplierSheetComponent,DeleteSupplierSheetComponent,HistorySupplierSheetComponent,HttpClientModule,CommonModule],
  templateUrl: './admin-suppliers.component.html',
  styleUrl: './admin-suppliers.component.css'
})
export class AdminSuppliersComponent implements OnInit {
  suppliers: Suppliers[] = [];
  filteredSuppliers: Suppliers[] = [];
  searchTerm$ = new Subject<string>();

  constructor(
    private dialog: MatDialog,
    private supplierService: SupplierService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.loadSuppliers();
    this.searchTerm$.pipe(
      debounceTime(300), 
      distinctUntilChanged() 
    ).subscribe(term => {
      this.filterSuppliers(term);
    });
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = this.sortSuppliers(data);
        this.filteredSuppliers = [...this.suppliers];
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.log('Error al obtener proveedores:', error);
      }
    });
  }
   
    onSearch(event: any) {
      const term = event.target.value.toLowerCase().trim();
      this.filterSuppliers(term);
    }
    
    filterSuppliers(term: string) {
      if (!term) {
        // Si no hay término de búsqueda, mostrar todos los proveedores
        this.filteredSuppliers = [...this.suppliers];
      } else {
        // Filtrar los proveedores que coincidan con el término
        this.filteredSuppliers = this.suppliers.filter(supplier => 
          supplier.name?.toLowerCase().includes(term) ||
          supplier.email?.toLowerCase().includes(term) ||
          supplier.phone?.toLowerCase().includes(term)
        );
      }
    }

  openAddSuppliersSheet() {
    const dialogRef = this.dialog.open(AddSuppliersComponent, {
      width: '400px',
      // Other dialog settings
    });

    dialogRef.componentInstance.proveedorAgregado.subscribe((newSupplier: Suppliers) => {
      this.suppliers = this.sortSuppliers([...this.suppliers, newSupplier]);
      this.filteredSuppliers = [...this.suppliers];
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
          this.suppliers = [...this.suppliers]; 
          this.filteredSuppliers = [...this.suppliers];// Trigger change detection
          this.cdr.detectChanges();
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
            
            this.filteredSuppliers = [...this.suppliers];
            Swal.fire({
              title: 'Proveedor eliminado',
              html: `El proveedor <span style="color: #d32f2f; font-weight: bold;">${supplier.name}</span> ha sido eliminado.`,
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
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