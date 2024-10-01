import { Component, Output, EventEmitter, HostListener, ViewChild, ElementRef  } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Proveedor {
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion: string;
  pais: string;
  terminos_pago: string;
}

@Component({
  selector: 'app-add-suppliers',
  standalone: true,
  imports: [FormsModule,MatDialogModule,MatFormFieldModule],
  templateUrl: './add-suppliers.component.html',
  styles: ``
})
export class AddSuppliersComponent {
  @Output() proveedorAgregado = new EventEmitter<Proveedor>();
  @ViewChild('proveedorForm') proveedorForm!: NgForm;
  @ViewChild('slideOverPanel') slideOverPanel!: ElementRef;

  proveedor: Proveedor = {
    nombre: '',
    contacto: '',
    telefono: '',
    email: '',
    direccion: '',
    pais: '',
    terminos_pago: ''
  };

  constructor(public dialogRef: MatDialogRef<AddSuppliersComponent>) {}

  cerrarHoja(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.proveedorForm.valid) {
      this.proveedorAgregado.emit(this.proveedor);
      this.limpiarFormulario();
      this.cerrarHoja();
    }
  }

  private limpiarFormulario(): void {
    this.proveedor = {
      nombre: '',
      contacto: '',
      telefono: '',
      email: '',
      direccion: '',
      pais: '',
      terminos_pago: ''
    };
    this.proveedorForm.resetForm();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (this.slideOverPanel && !this.slideOverPanel.nativeElement.contains(targetElement)) {
      this.cerrarHoja(event);
    }
  }
}