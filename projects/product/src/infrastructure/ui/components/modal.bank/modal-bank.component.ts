import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { CreateProductUseCase } from '../../../../application/create.product.use.case';
import { GetSelectedProductCase } from '../../../../application/getSelectedProductCase';
import { ProductExistsUseCase } from '../../../../application/product.exists.use.case';
import { UpdateProductUseCase } from '../../../../application/update.product.use.case';
import { IProduct } from '../../../../domain/model/IProduct';
import { ButtonBankComponent } from '../button.Bank/button.component';
import { InputBankComponent } from '../input-bank/input-bank.component';

@Component({
  selector: 'lib-modal-bank',
  standalone:true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputBankComponent,
    ButtonBankComponent,
  ],
  templateUrl: './modal-bank.component.html',
  styleUrl: './modal-bank.component.css',
})
export class ModalBankComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();
  @Input() productToEdit: IProduct | null = null;

  private fb = inject(FormBuilder);
  private _validateIdUseCase = inject(ProductExistsUseCase);
  private _createProductUseCase = inject(CreateProductUseCase);
  private _editProductUseCase = inject(UpdateProductUseCase);
  private _getSelectedProductUseCase = inject(GetSelectedProductCase);
  private readonly _destroy$ = new Subject<void>();
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  productForm!: FormGroup;
  today: string = '';
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.initForm();
    this.today = new Date().toISOString().split('T')[0];

    this._route.queryParams.subscribe((params) => {
      const isEditMode = params['mode'] === 'edit';

      if (isEditMode) {
        this.isEditMode = true;
        this._getSelectedProductUseCase.execute().subscribe((product) => {
          this.productToEdit = product;
        });

        if (this.productToEdit) {
          this.populateFormForEditing();
        } else {
          console.warn('No hay producto seleccionado en el store para editar.');
        }
      }
    });
  }

  public populateFormForEditing(): void {
    if (!this.productToEdit) return;

    this.productForm.get('id')?.disable();

    this.productForm.patchValue({
      id: this.productToEdit.id,
      name: this.productToEdit.name,
      description: this.productToEdit.description,
      logo: this.productToEdit.logo,
      date_release: this.formatDateForInput(this.productToEdit.date_release),
      date_revision: this.formatDateForInput(this.productToEdit.date_revision),
    });

  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        this.validateIdExistAsync.bind(this),
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, this.validateReleaseDate]],
      date_revision: ['', [Validators.required], ],
    });

    this.productForm.controls['date_release'].valueChanges.subscribe(
      (value) => {
        if (value) {
          const releaseDate = new Date(value);
          releaseDate.setFullYear(releaseDate.getFullYear() + 1);
          this.productForm.controls['date_revision'].setValue(
            releaseDate.toISOString().split('T')[0]
          );
        }
      }
    );
  }

  validateReleaseDate(control: FormControl) {
    const today = new Date().toISOString().split('T')[0];
    return control.value >= today ? null : { invalidDate: true };
  }

  submitForm(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      if (this.isEditMode) {
        this.productForm.get('id')?.enable();

        this._editProductUseCase
          .execute(this.productForm.get('id').value, productData)
          .pipe(takeUntil(this._destroy$))
          .subscribe({
            next: (response) => {
              this.resetForm();
              this.closeModal.emit();
            },
            error: (error) => {
              console.error('Error al editar el producto', error);
            },
          });
      } else {
        this._createProductUseCase
          .execute(productData)
          .pipe(takeUntil(this._destroy$))
          .subscribe({
            next: (response) => {
              this._router.navigate(['/design/2']);
              this.resetForm();
              this.closeModal.emit();
            },
            error: (error) => {
              console.error('Error al crear el producto', error);
            },
          });
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    if (this.isEditMode) {
      this._router.navigate(['/design/2']);
    } else {
      this.productForm.reset();
    }
    
  }

  validateIdExistAsync(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    if (!control.value) return of(null);

    return this._validateIdUseCase.execute(control.value).pipe(
      takeUntil(this._destroy$),
      map((response) => (response.exists ? { idExists: true } : null)),
      catchError(() => of(null))
    );
  }

  closeModalBank() {
    this.closeModal.emit();
  }
}
