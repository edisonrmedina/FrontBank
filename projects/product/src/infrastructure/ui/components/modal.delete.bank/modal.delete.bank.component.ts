import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DeleteProductUseCase } from '../../../../application/delete.product.use.case';
import { IProduct } from '../../../../domain/model/IProduct';

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

  productTitle: string = '';

  private _deleteProductUseCase = inject(DeleteProductUseCase);
  private _destroy$ = new Subject<void>();
  ngOnInit(): void {
    debugger;
    this.productTitle = this.item?.name?? '';
  }
  deleteItem(item: IProduct): void {
    this._deleteProductUseCase.execute(item.id)
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
    debugger;
    this.deleteItem(this.item);
    this.confirm.emit();
  }

}
