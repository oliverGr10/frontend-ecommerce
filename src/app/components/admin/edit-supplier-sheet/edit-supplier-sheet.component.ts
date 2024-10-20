import { HttpClientModule } from '@angular/common/http';
import { Component, Output, EventEmitter, HostListener, ViewChild, ElementRef, Inject  } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Suppliers } from '../../../interface/suppliers';
import { SupplierService } from '../../../services/supplier.service';
import { SupplierEditSchema } from '../../auth/schema/supplierEditSchema';
import { z } from 'zod';
import { CommonModule } from '@angular/common';
import { supplierSchema } from '../../auth/schema/supplierSchema';


@Component({
  selector: 'app-edit-supplier-sheet',
  standalone: true,
  imports: [FormsModule,MatDialogModule,MatFormFieldModule,CommonModule ,HttpClientModule],
  templateUrl: './edit-supplier-sheet.component.html',
  styles: ``
})
export class EditSupplierSheetComponent {
  @Output() proveedorAgregado = new EventEmitter<Suppliers>();
  @Output() proveedorActualizado = new EventEmitter<Suppliers>();
  @ViewChild('proveedorForm') proveedorForm!: NgForm;
  @ViewChild('slideOverPanel') slideOverPanel!: ElementRef;

  proveedor: Suppliers = {
    id:0,
    name: '',
    contact: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    pay_terms: '',
    logo:''
  };
  validationErrors: { [key: string]: string[] } = {};
  constructor(
    public dialogRef: MatDialogRef<EditSupplierSheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Suppliers,
    private supplierService: SupplierService
  ) { }
  ngOnInit(): void {
    // Verifica si los datos del proveedor son válidos o si necesitas hacer la solicitud para cargarlos
    if (this.data && this.data.id) {
      this.loadProvider(this.data.id);  // Usamos el ID para cargar los datos
    } else if (this.data) {
      this.proveedor = { ...this.data }; // Si ya pasas el proveedor completo al modal, simplemente lo asignamos
    }
  }

  // Este método carga el proveedor usando el ID recibido como argumento
  loadProvider(id: number): void {
    this.supplierService.getSupplierById(id).subscribe({
      next: (data: Suppliers) => {
        this.proveedor = { ...data };  // Asigna los datos obtenidos al objeto proveedor
      },
      error: (err) => {
        console.error('Error al cargar el proveedor', err);
      }
    });
  }

  cerrarHoja(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.validationErrors = {};
    try {
      // Intentamos validar el objeto `proveedor` con Zod
      supplierSchema.parse(this.proveedor);

      // Si la validación pasa, actualizamos el proveedor
      this.supplierService.updateSupplier(this.proveedor).subscribe({
        next: (updatedSupplier) => {
          console.log('Proveedor actualizado con éxito:', updatedSupplier);
          this.proveedorActualizado.emit(updatedSupplier);
          this.dialogRef.close(updatedSupplier);
        },
        error: (error) => {
          console.error('Error al actualizar el proveedor', error);
          alert('Error al actualizar el proveedor');
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
   
        console.error('Errores de validación:', error.errors);

        error.errors.forEach(err => {
          const field = err.path[0]; 
          const message = err.message; 
          
          if (!this.validationErrors[field]) {
            this.validationErrors[field] = [];
          }
          this.validationErrors[field].push(message);
        });
      } else {
        // Si ocurre un error distinto al de validación
        console.error('Error desconocido:', error);
      }
    }
  }
  
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (this.slideOverPanel && !this.slideOverPanel.nativeElement.contains(targetElement)) {
      this.cerrarHoja(event);
    }
  }
}
