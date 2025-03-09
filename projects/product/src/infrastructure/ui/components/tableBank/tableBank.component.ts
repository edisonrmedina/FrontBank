import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../domain/model/IProduct';
import { ITableBankAction } from '../../interfaces/ITableBankAction';

@Component({
  selector: 'lib-table',
  imports: [],
  templateUrl: './tableBank.component.html',
  styleUrl: './tableBank.component.css',
})
export class tableBankComponent {
  @Input() headers: string[] = [];
  @Input() data: IProduct[] = [];
  @Input() actions: ITableBankAction[] = [];

  headerKeyMap: { [key: string]: string } = {
    Logo: 'logo',
    'Nombre Producto': 'name',
    Descripcion: 'description',
    'Fecha Liberacion': 'date_release',
    'Fecha Restructuracion': 'date_revision',
  };
  constructor() {
  }

  ngOnInit(): void {
  }
  
}
