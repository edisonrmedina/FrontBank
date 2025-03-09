import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CreateProductUseCase } from '../../../../application/create.product.use.case';
import { DeleteProductUseCase } from '../../../../application/delete.product.use.case';
import { GetAllProductsUseCase } from '../../../../application/get.products.use.case';
import { ProductExistsUseCase } from '../../../../application/product.exists.use.case';
import { UpdateProductUseCase } from '../../../../application/update.product.use.case';
import { FormInputComponent } from '../../forms/app-form-input/app-form-input.component';
import { AuthFormComponent } from '../../forms/auth-form/auth-form.component';

@Component({
  selector: 'lib-login',
  imports: [ReactiveFormsModule, AuthFormComponent, FormInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  @Input() loginForm: FormGroup;
  @Output() submited = new EventEmitter<FormGroup>();
  
  private readonly _getAllProductsUseCase = inject(GetAllProductsUseCase);
  private readonly _createProductUseCase = inject(CreateProductUseCase);
  private readonly _updateProductUseCase = inject(UpdateProductUseCase);
  private readonly _deleteProductUseCase = inject(DeleteProductUseCase);
  private readonly _productExistsUseCase = inject(ProductExistsUseCase);
  private readonly _destroy$ = new Subject<void>();
  constructor() {}
  ngOnInit(): void {

    this._getAllProductsUseCase.execute();
     
    // Check if product exists
     this._productExistsUseCase.execute('dos')
     .pipe(takeUntil(this._destroy$))
     .subscribe({
       next: (response) => console.log('Product exists response:', response),
       error: (error) => console.error('Product exists error:', error)
     });
   
   // Create product
   this._createProductUseCase.execute({
     id: 'tres',
     name: 'Nombre producto',
     description: 'Descripción producto',
     logo: 'assets-1.png',
     date_release: '2025-01-01',
     date_revision: '2025-01-01',
   })
     .pipe(takeUntil(this._destroy$))
     .subscribe({
       next: (response) => console.log('Create product response:', response),
       error: (error) => console.error('Create product error:', error)
     });

   // Update product
   this._updateProductUseCase.execute('tres', {
     name: 'Nombre producto',
     description: 'Descripción producto',
     logo: 'assets-1.png',
     date_release: '2025-01-01',
     date_revision: '2025-01-01',
   })
     .pipe(takeUntil(this._destroy$))
     .subscribe({
       next: (response) => console.log('Update product response:', response),
       error: (error) => console.error('Update product error:', error)
     });

   // Delete product
   this._deleteProductUseCase.execute('dos')
     .pipe(takeUntil(this._destroy$))
     .subscribe({
       next: (response) => console.log('Delete product response:', response),
       error: (error) => console.error('Delete product error:', error)
     });


  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.submited.emit(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
