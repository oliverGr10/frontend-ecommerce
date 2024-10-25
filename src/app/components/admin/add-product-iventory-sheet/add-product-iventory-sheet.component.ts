import { Product, ProductFormData } from './../../../interface/products';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../interface/Category';
import { Suppliers } from '../../auth/schema/supplierEditSchema';
import { ProductService } from '../../../services/product.service';
import { resizeImageToBase64, validateImageDimensions } from '../../../utils/image-utils';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { SupplierService } from '../../../services/supplier.service';
import { finalize, forkJoin } from 'rxjs';
import { ImageUploadProgressComponent } from '../image-upload-progress/image-upload-progress.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product-iventory-sheet',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ImageUploadProgressComponent],
  templateUrl: './add-product-iventory-sheet.component.html',
  styles: ``
})
export class AddProductIventorySheetComponent implements OnInit {
  @Output() productoAgregado = new EventEmitter<Product>
  @ViewChild('imageInput') imageInput!: ElementRef; 
  productForm!: FormGroup;
  categories: Category[] = [];
  suppliers: Suppliers[] = [];
  selectedImages: File[] = [];
  imagePreviewUrls: string[] = [];
  validationErrors: { [key: string]: string } = {};
  isProcessingImage: boolean = false;
  isLoading = false;
  productos: Product ={
    id: 0,
    name: '',
    description:'',
    price: 0,
    categoryId: 0,
    supplierId: 0,
    images: [],
    orders: 0
  }

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private productService: ProductService, 
    public dialogRef: MatDialogRef<AddProductIventorySheetComponent>
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      categoryId: ['', Validators.required],
      supplierId: ['', Validators.required],
      images: [[]]
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadInitialData();
  }

  private loadInitialData(): void {
    // Usar forkJoin para cargar datos en paralelo
    forkJoin({
      categories: this.categoryService.getCategories(),
      suppliers: this.supplierService.getSuppliers()
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (result) => {
        this.categories = result.categories;
        this.suppliers = result.suppliers;
        console.log('Categories loaded:', this.categories);
        console.log('Suppliers loaded:', this.suppliers);
      },
      error: (error) => {
        console.error('Error loading initial data:', error);
        this.showError('Error al cargar los datos iniciales');
      }
    });
  }

  async handleImageUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const totalImages = this.selectedImages.length + input.files.length;
    if (totalImages > 3) {
        this.showError('Solo se permiten máximo 3 imágenes');
        return;
    }

    this.isProcessingImage = true;

    try {
        for (let i = 0; i < input.files.length; i++) {
            const file = input.files[i];

            // Validar dimensiones
            const isValidDimension = await validateImageDimensions(file);
            if (!isValidDimension) {
                this.showError(`La imagen ${file.name} excede las dimensiones máximas permitidas (1920x1080)`);
                continue;
            }
            const base64Image = await resizeImageToBase64(file, 300, 300);
            this.imagePreviewUrls.push(base64Image);
            this.selectedImages.push(file);
            const currentImages = this.productForm.get('images')?.value || [];
            const newImage = {
                imageUrl: URL.createObjectURL(file),
                imageBase64: base64Image,
                orders: currentImages.length
            };

            this.productForm.patchValue({
                images: [...currentImages, newImage]
            });
        }
        const remainingImages = 3 - this.selectedImages.length;
        if (remainingImages > 0) {
            this.showInfo(`Faltan ${remainingImages} ${remainingImages === 1 ? 'imagen' : 'imágenes'} por subir`);
        } else {
            this.showSuccess('¡Todas las imágenes han sido cargadas correctamente!');
        }

    } catch (error) {
        console.error('Error al procesar las imágenes:', error);
        this.showError('Error al procesar las imágenes');
    } finally {
        this.isProcessingImage = false;
        input.value = ''; 
    }
}


  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
    this.imagePreviewUrls.splice(index, 1);
    const currentImages = this.productForm.get('images')?.value || [];
    currentImages.splice(index, 1);
    this.productForm.patchValue({ images: currentImages });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
        const formData = this.productForm.value;
        const requiredFields = ['name', 'description', 'price', 'categoryId', 'supplierId', 'images'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            this.showError(`Los siguientes campos son requeridos: ${missingFields.join(', ')}`);
            return;
        }
        this.productService.createProduct(formData).subscribe({
            next: (response) => {
                this.productoAgregado.emit(response);
                Swal.fire({
                    title: 'Éxito!',
                    text: 'El producto ha sido creado exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                this.dialogRef.close(response);
            },
            error: (error) => {
                this.showError('Error al crear el producto');
            }
        });
    } else {
        this.markFormGroupTouched(this.productForm);
        this.showError('Por favor, complete todos los campos requeridos');
    }
}

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private showError(message: string): void {
    this.validationErrors['general'] = message;
    setTimeout(() => {
      delete this.validationErrors['general'];
    }, 3000);
  }
  private showInfo(message: string): void {
    console.info(message);
}

private showSuccess(message: string): void {
    console.log(message);
}

  cerrarHoja(): void {
    this.dialogRef.close();
  }

  getErrorMessage(controlName: string): string {
    const control = this.productForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Este campo es requerido';
      if (control.errors['minlength'])
        return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      if (control.errors['maxlength'])
        return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
      if (control.errors['min']) return 'El valor debe ser mayor a 0';
    }
    return '';
  }
}