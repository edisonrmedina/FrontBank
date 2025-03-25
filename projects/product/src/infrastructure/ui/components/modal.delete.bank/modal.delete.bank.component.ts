import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from '../../../../../../shared/src/domain/model/IProduct';
import { DeleteProductUseCase } from '../../../../application/delete.product.use.case';
import { GetSelectedProductCase } from '../../../../application/getSelectedProductCase';

@Component({
  selector: 'lib-delete-bank',
  templateUrl: './modal.delete.bank.component.html',
  styleUrl: './modal.delete.bank.component.css',
})
export class ModalDeleteBankComponent implements OnInit {
  
  @Input() item: IProduct | null = null;
  @Input() isVisible: boolean = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Input() translations: { [key: string]: string } = {};

  private readonly _getSelectedProduct = inject(GetSelectedProductCase)
  productToDelete : IProduct;

  private _deleteProductUseCase = inject(DeleteProductUseCase);
  private _destroy$ = new Subject<void>();
  ngOnInit(): void {
    this._getSelectedProduct.execute().subscribe((product) => {
      this.productToDelete = product;
    });
  }

  deleteItem(item: IProduct): void {
    this._deleteProductUseCase.execute(this.productToDelete.id)
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (data) => {
        this.isVisible = false;
        this.cancel.emit();
      },
      error: (error) => {
        console.error('Delete product error:', error);
      }
    });
    
  }

  onCancel(): void {
    this.isVisible = false;
    this.cancel.emit();
  }

  onConfirm(): void {
    this.deleteItem(this.item);
    this.isVisible = false;
    this.confirm.emit();
  }

}
