import { Suppliers } from './../../../interface/suppliers';
import { SupplierService } from './../../../services/supplier.service';
import { Component, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { z } from 'zod';
import { supplierSchema } from '../../auth/schema/supplierSchema';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-suppliers',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, CommonModule],
  templateUrl: './add-suppliers.component.html',
  styles: ``,
})
export class AddSuppliersComponent {
  @Output() proveedorAgregado = new EventEmitter<Suppliers>();
  @ViewChild('proveedorForm') proveedorForm!: NgForm;
  @ViewChild('slideOverPanel') slideOverPanel!: ElementRef;
  isFileUploaded: boolean = false;
  fileUploadErrorMessage = ''; 
  fileUploadError = false; 
  proveedor: Suppliers = {
    id:0,
    name: '',
    contact: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    pay_terms: '',
    logo: '',
  };

  erroresValidacion: Record<string, string> = {}; // Para almacenar errores de validación

  constructor(
    public dialogRef: MatDialogRef<AddSuppliersComponent>,
    private supplierService: SupplierService // Inyecta el servicio
  ) {}


  // Cierra el diálogo de la hoja
  cerrarHoja(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.dialogRef.close();
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    // Validación de datos con Zod
    const resultadoValidacion = supplierSchema.safeParse({
      id:this.proveedor.id || 0,
      name: this.proveedor.name,
      contact: this.proveedor.contact,
      phone: this.proveedor.phone,
      email: this.proveedor.email,
      address: this.proveedor.address,
      country: this.proveedor.country,
      pay_terms: this.proveedor.pay_terms,
      logo: this.proveedor.logo, 
    });

    // Verificar si la validación de Zod es exitosa
    if (!resultadoValidacion.success) {
      // Si la validación falla, mapeamos los errores de Zod
      this.erroresValidacion = this.getZodErrors(resultadoValidacion.error.format());

      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, revisa los campos del formulario.',
      });
    } else {
      // Validar que el logo esté en formato base64
      if (this.proveedor.logo && !this.proveedor.logo.startsWith('data:image/')) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El logo no tiene el formato correcto.',
        });
        return;
      }

      // Crear objeto con los datos validados
      const proveedorData: Suppliers = {
        id:resultadoValidacion.data.id || 0,
        name: resultadoValidacion.data.name,
        contact: resultadoValidacion.data.contact,
        phone: resultadoValidacion.data.phone,
        email: resultadoValidacion.data.email,
        address: resultadoValidacion.data.address,
        country: resultadoValidacion.data.country,
        pay_terms: resultadoValidacion.data.pay_terms || '',
        logo: resultadoValidacion.data.logo || '',
      };
      

      // Llamar al servicio para agregar el proveedor
      console.log(proveedorData);
      this.supplierService.addSupplier(proveedorData).subscribe({
        next: (response) => {
          this.proveedorAgregado.emit(response);
          this.limpiarFormulario();
          this.cerrarHoja();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Proveedor agregado correctamente.',
          });
        },
        error: (error) => {
          console.error('Error al agregar proveedor:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al agregar el proveedor. Por favor, inténtalo de nuevo.',
          });
        },
      });
    }
  }

  private limpiarFormulario(): void {
    // Limpiar los campos del formulario
    
    this.proveedor = {
      id:0,
      name: '',
      contact: '',
      phone: '',
      email: '',
      address: '',
      country: '',
      pay_terms: '',
      logo: '',
    };
    this.proveedorForm.resetForm();
    this.erroresValidacion = {}; // Limpiar los errores de validación
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (this.slideOverPanel && !this.slideOverPanel.nativeElement.contains(targetElement)) {
      this.cerrarHoja(event);
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0]; // Aquí accedes a los archivos seleccionados
  
    if (!file) {

      this.fileUploadError = true;
      this.fileUploadErrorMessage = 'No se ha seleccionado ningún archivo.';
      return;
    }
  
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El archivo debe ser una imagen en formato PNG, JPG o GIF.',
      });
      return;
    }
  
    const maxSizeInMB = 10;
    if (file.size > maxSizeInMB * 1024 * 1024) {
      this.fileUploadError = true;
      this.fileUploadErrorMessage = `El archivo no debe exceder los ${maxSizeInMB} MB.`;
      return;
    }
  
      const uploadContainer = document.getElementById('file-upload-container');
      if (uploadContainer) {
        uploadContainer.style.borderColor = 'green';  
        uploadContainer.style.borderStyle = 'dashed';  
      }

      // Desactiva el input para que no se puedan cargar más archivos
      input.disabled = true;
      this.isFileUploaded = true; 
      // Establece el borde del input para que coincida con el contenedor
      input.style.border = '4px solid green'; 

      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          // Crear un canvas para redimensionar la imagen a 100x100 px
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            
            canvas.width = 100;
            canvas.height = 100;
    
            
            ctx.drawImage(image, 0, 0, 100, 100);
    
            const base64Image = canvas.toDataURL(file.type);  
    
          
            this.proveedor.logo = base64Image;
  
            input.disabled = true;
          }
        };
        image.src = reader.result as string; 
      };
      reader.readAsDataURL(file);  
    }

  // Función para mapear los errores de Zod a un formato usable en la vista
  getZodErrors(errors: z.ZodFormattedError<Map<string, string>, string>): Record<string, string> {
    const formattedErrors: Record<string, string> = {};
    Object.entries(errors).forEach(([key, value]) => {
      if (value && '_errors' in value && value._errors.length > 0) {
        formattedErrors[key] = value._errors[0]; // Mapear el primer error si existe
      }
    });
    return formattedErrors;
  }
}
