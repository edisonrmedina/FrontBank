import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
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
import { catchError, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { CreateProductUseCase } from '../../../../application/create.product.use.case';
import { ProductExistsUseCase } from '../../../../application/product.exists.use.case';
import { ButtonBankComponent } from '../button.Bank/button.component';
import { InputBankComponent } from '../input-bank/input-bank.component';

@Component({
  selector: 'lib-modal-bank',
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

  private fb = inject(FormBuilder);
  private _validateIdUseCase = inject(ProductExistsUseCase);
  private _createProductUseCase = inject(CreateProductUseCase)
  private readonly _destroy$ = new Subject<void>();
  productForm!: FormGroup;
  today: string = '';

  ngOnInit(): void {
    this.initForm();
    this.today = new Date().toISOString().split('T')[0];
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
      date_revision: ['',[ Validators.required]],
    });

    this.productForm.controls['date_release'].valueChanges.subscribe((value) => {
      if (value) {
        const releaseDate = new Date(value);
        releaseDate.setFullYear(releaseDate.getFullYear() + 1);
        this.productForm.controls['date_revision'].setValue(
          releaseDate.toISOString().split('T')[0]
        );
      }
    });
  }

  validateReleaseDate(control: FormControl) {
    const today = new Date().toISOString().split('T')[0];
    return control.value >= today ? null : { invalidDate: true };
  }

  submitForm(): void {
    if (this.productForm.valid) {
      this._createProductUseCase.execute(this.productForm.value)
      .pipe(takeUntil(this._destroy$)) 
      .subscribe({
        next: (response) => {
          this.resetForm();
          this.closeModal.emit(); 
        },
        error: (error) => {
          console.error('Error al crear el producto', error);
          
        }
      })
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.productForm.reset();
  }

  validateIdExistAsync(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) return of(null); 
  
    return this._validateIdUseCase.execute(control.value).pipe(
      takeUntil(this._destroy$),
      map(response => (response.exists ? { idExists: true } : null)),
      catchError(() => of(null))
    );
  }
  
  closeModalBank() {
    this.closeModal.emit();
  }
  
}
