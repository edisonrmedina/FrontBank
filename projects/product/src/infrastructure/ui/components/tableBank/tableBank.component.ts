import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SelectProductCase } from '../../../../application/select-product-use-case';
import { IProduct } from '../../../../domain/model/IProduct';
import { ITableBankAction } from '../../interfaces/ITableBankAction';
import { ModalBankComponent } from '../modal.bank/modal-bank.component';
import { ModalDeleteBankComponent } from '../modal.delete.bank/modal.delete.bank.component';

@Component({
  selector: 'lib-table',
  imports: [ModalDeleteBankComponent, ModalBankComponent],
  templateUrl: './tableBank.component.html',
  styleUrl: './tableBank.component.css',
})
export class tableBankComponent {
  @Input() headers: string[] = [];
  @Input() data: IProduct[] = [];
  @Input() actions: ITableBankAction[] = [];
  @Output() modalItem = new EventEmitter<IProduct>();
  private readonly _router = inject(Router);
  private _setSelectProductCase = inject(SelectProductCase)
  showActions: boolean = false;
  modalIsVisible: boolean = false;
  headerKeyMap: { [key: string]: string } = {
    Logo: 'logo',
    'Nombre Producto': 'name',
    'Descripción': 'description',
    'Fecha de Liberación': 'date_release',
    'Fecha de Reestructuración': 'date_revision',
  };


  selectedItem: IProduct;

  constructor() {}

  showModal(action: ITableBankAction, item: IProduct) {
    debugger;
    this.selectedItem = item;
    this._setSelectProductCase.execute(item);
    if (action.label.toLowerCase() === 'editar') {
      this._router.navigate(['/create'], { queryParams: { mode: 'edit' } });
    } 
    else {
      this.modalIsVisible = true;
    }
  }

  closeModal() {
    this.modalIsVisible = false;
  }

  toggleVisibility() {
    this.showActions = !this.showActions;
  }

}
