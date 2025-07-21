import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'shared';
import { SelectProductCase } from '../../../../application/select-product-use-case';
import { ITableBankAction } from '../../interfaces/ITableBankAction';
import { LogoUrlPipe } from "../../pipes/logo.url.pipe";
import { BankComponent } from '../createBank/create-bank.component';
import { ModalDeleteBankComponent } from '../modal.delete.bank/modal.delete.bank.component';

@Component({
  selector: 'lib-table',
  imports: [ModalDeleteBankComponent, BankComponent, LogoUrlPipe],
  templateUrl: './tableBank.component.html',
  styleUrl: './tableBank.component.css',
})
export class tableBankComponent {
  @Input() headers: string[] = [];
  @Input() data: IProduct[] = [];
  @Input() actions: ITableBankAction[] = [];
  @Input() translations: { [key: string]: string } = {};
  @Output() modalItem = new EventEmitter<IProduct>();

  private readonly _router = inject(Router);
  private _setSelectProductCase = inject(SelectProductCase);

  showActions: boolean = false;
  modalIsVisible: boolean = false;
  dropdownStates: { [itemId: string]: boolean } = {};
  headerKeyMap: { [key: string]: string } = {
    'logo': 'logo',
    'name': 'name',
    'description': 'description',
    'date_release': 'date_release',
    'date_revision': 'date_revision',
  };

  selectedItem: IProduct;

  constructor() {}

  showModal(action: ITableBankAction, item: IProduct) {
    this.selectedItem = item;
    this._setSelectProductCase.execute(item);
    if (action) {
      if (action.label.toLowerCase() === 'editar') {
        this._router.navigate(['/create'], { queryParams: { mode: 'edit' } });
      } else {
        this.modalIsVisible = true;
      }
    }else{
      this._router.navigate(['/create'], { queryParams: { mode: 'edit' } });
    }
  }

  closeModal() {
    this.modalIsVisible = false;
  }

  toggleVisibility(item: IProduct): void {
    this.dropdownStates[item.id] = !this.dropdownStates[item.id];
  }
  
  getDropdownState(item: IProduct): boolean {
    return this.dropdownStates[item.id] || false;
  }

  formatDate(dateString: string | null | undefined): string {
    if (!dateString) {
      return ''; 
    }

    const dateParts = dateString.split('-');
    if (dateParts.length !== 3) {
      return dateString; 
    }

    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return `${day}/${month}/${year}`;
  }
  
}
