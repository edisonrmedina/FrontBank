import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { RootsharedComponent } from 'shared';
import { GetAllProductsUseCase } from '../../../../application/get.products.use.case';
import { LoadTranslationsUseCase } from '../../../../application/translate.use.case';
import { IProduct } from '../../../../domain/model/IProduct';
import { ProductQuery } from '../../../../domain/state/product.query';
import { ButtonBankComponent } from '../../components/button.Bank/button.component';
import { BankComponent } from '../../components/createBank/create-bank.component';
import { InputBankComponent } from '../../components/input-bank/input-bank.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { tableBankComponent } from '../../components/tableBank/tableBank.component';
import { ITableBankAction } from '../../interfaces/ITableBankAction';

@Component({
  selector: 'lib-design.one.container',
  standalone: true,
  imports: [
    InputBankComponent,
    tableBankComponent,
    PaginationComponent,
    ButtonBankComponent,
    BankComponent,
    RootsharedComponent,
  ],
  templateUrl: './design.one.container.component.html',
  styleUrl: './design.one.container.component.css',
})
export class DesignOneContainerComponent implements OnInit {
  currentLanguage: string;
  
  private readonly _getProductsUseCase = inject(GetAllProductsUseCase);
  private readonly _queries = inject(ProductQuery);
  private readonly _route = inject(ActivatedRoute);
  private readonly _subscription = new Subscription();
  private readonly _router = inject(Router);
  private readonly _loadTranslationsUseCase = inject(LoadTranslationsUseCase);

  translations: { [key: string]: string } = {};
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

  constructor() {
    this._queries.selectCurrentLanguage().subscribe((currentLanguage) => {
      this._loadTranslationsUseCase.execute(currentLanguage);
    });
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.designId = params.get('id');
      this.isButtonActive = this.designId === '2';
    });

    this.headers = [
      'logo',
      'name',
      'description',
      'date_release',
      'date_revision',
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
      combineLatest([
        this._getProductsUseCase.execute(),
        this._queries.selectAll(),
        this._queries.selectTranslations(),
      ]).subscribe(([_,products, translations]) => {
        this.data = products;
        this.filteredData = [...this.data];
        this.paginatedData = this.filteredData;
        this.translations = translations;
        this.updatePagination();
      })
    );

    this.updatePagination();
  }
  onClick(id: number) {
    console.log(id);
  }

  searchChange(searchTerm: string) {
    debugger;
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
      logo: 'logo',
      name: 'name',
      description: 'description',
      date_release: 'date_release',
      date_revision: 'date_revision',
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

  toggleLanguage(): void {
    const newLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    //this._productStoreService.setCurrentLanguage(newLanguage); 
    this.currentLanguage = newLanguage;
    this._loadTranslationsUseCase.execute(newLanguage);  
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
