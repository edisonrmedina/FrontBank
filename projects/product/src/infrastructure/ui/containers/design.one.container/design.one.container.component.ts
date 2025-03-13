import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteProductUseCase } from '../../../../application/delete.product.use.case';
import { GetAllProductsUseCase } from '../../../../application/get.products.use.case';
import { IProduct } from '../../../../domain/model/IProduct';
import { ProductQuery } from '../../../../domain/state/product.query';
import { ButtonBankComponent } from '../../components/button.Bank/button.component';
import { InputBankComponent } from '../../components/input-bank/input-bank.component';
import { ModalBankComponent } from '../../components/modal.bank/modal-bank.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { tableBankComponent } from '../../components/tableBank/tableBank.component';
import { ITableBankAction } from '../../interfaces/ITableBankAction';

@Component({
  selector: 'lib-design.one.container',
  imports: [
    InputBankComponent,
    tableBankComponent,
    PaginationComponent,
    ButtonBankComponent,
    ModalBankComponent,
  ],
  templateUrl: './design.one.container.component.html',
  styleUrl: './design.one.container.component.css',
})
export class DesignOneContainerComponent implements OnInit {
  private readonly _getProductsUseCase = inject(GetAllProductsUseCase);
  private readonly _getAllProducts = inject(ProductQuery);
  private readonly _route = inject(ActivatedRoute);
  private readonly _subscription = new Subscription();
  private readonly _router = inject(Router);
  private readonly _deleteProductUseCase = inject(DeleteProductUseCase);
  

  data: IProduct[] = [];
  filteredData: IProduct[] = [];
  paginatedData: IProduct[] = [];
  currentPage: number = 1;
  designId: string | null = null;
  isButtonActive: boolean = false;
  headers: string[];
  actions: ITableBankAction[];
  itemsPerPage: number = 5;
  isModalOpen: boolean = false;

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.designId = params.get('id');
      this.isButtonActive = this.designId === '2';
    });
    this.headers = [
      'Logo',
      'Nombre Producto',
      'Descripción',
      'Fecha de Liberación',
      'Fecha de Reestructuración',
    ];

    this.actions = [
      {
        label: 'Eliminar',
        icon: '',
        onClick: undefined,
      },
      {
        label: 'Editar',
        icon: '', 
        onClick: undefined,
      },
    ];
    this._subscription.add(
      this._getAllProducts.selectAll().subscribe((products) => {
        this.data = products;
        this.filteredData = [...this.data];
        this.paginatedData = this.filteredData;
        this.updatePagination();
      })
    );

    this.updatePagination();
  }
  
  constructor() {
    this._getProductsUseCase.execute();
  }

  onClick(id: number) {
    console.log(id);
  }

  searchChange(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.filteredData = [...this.data];
      this.paginatedData = this.filteredData;
      this.updatePagination();
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    this.filteredData = this.data.filter((product) => {
      return this.headers.some((header) => {
        const propertyKey = this.getPropertyKeyFromHeader(header);
        if (!propertyKey) return false;

        const value = product[propertyKey as keyof IProduct];
        return (
          value !== undefined &&
          value !== null &&
          value.toString().toLowerCase().includes(term)
        );
      });
    });

    this.paginatedData = this.filteredData;
    this.updatePagination();
  }

  private getPropertyKeyFromHeader(header: string): string | null {
    const headerMap: { [key: string]: string } = {
      Logo: 'logo',
      'Nombre Producto': 'name',
      "Descripción": 'description',
      'Fecha de Liberación': 'date_release',
      'Fecha de Reestructuración': 'date_revision',
    };

    return headerMap[header] || null;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  onItemsPerPageChange(size: number) {
    this.itemsPerPage = size;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(start, end);
  }

  showCreateModal() {
    this._router.navigate(['/create']);
  }

  closeCreateModal() {
    this.isModalOpen = false;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
