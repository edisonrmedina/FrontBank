import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  showActions: boolean = false;
  modalIsVisible: boolean = false;
  headerKeyMap: { [key: string]: string } = {
    Logo: 'logo',
    'Nombre Producto': 'name',
    Descripcion: 'description',
    'Fecha Liberacion': 'date_release',
    'Fecha Restructuracion': 'date_revision',
  };


  selectedItem: IProduct;

  constructor() {}

  showModal(item: IProduct) {
    debugger;
    this.selectedItem = item;
    this.modalIsVisible = true;
    this.modalItem.emit(item);
  }

  closeModal($event: Event) {
    this.modalIsVisible = false;
  }

  toggleVisibility(): void {
    this.showActions = !this.showActions;
  }

}
