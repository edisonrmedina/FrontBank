import { TestBed } from '@angular/core/testing';
import { IProduct } from '../../../domain/model/IProduct';
import { ProductStore } from '../../../domain/state/product.store';
import { ProductStoreService } from '../product.store.service';

describe('ProductStoreService', () => {
  let service: ProductStoreService;
  let productStore: ProductStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductStoreService,
        ProductStore,
      ],
    });

    service = TestBed.inject(ProductStoreService);
    productStore = TestBed.inject(ProductStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set products in the store', () => {
    const products: IProduct[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2023-01-01', date_revision: '2024-01-01' },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: '2023-02-01', date_revision: '2024-02-01' },
    ];
    const updateSpy = spyOn(productStore, 'update');

    service.setProducts(products);

    expect(updateSpy).toHaveBeenCalledWith({ products });
  });

  it('should set selected product in the store', () => {
    const product: IProduct = { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2023-01-01', date_revision: '2024-01-01' };
    const updateSpy = spyOn(productStore, 'update');

    service.setSelectedProduct(product);

    expect(updateSpy).toHaveBeenCalledWith({ selectedProduct: product });
  });

  it('should add a product to the store', () => {
    const initialProducts = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2023-01-01', date_revision: '2024-01-01' }
    ];
    
    // Set initial state
    productStore.update({
      products: initialProducts,
      selectedProduct: null,
      loading: false,
      error: null,
    });
    
    const newProduct: IProduct = { 
      id: '3', 
      name: 'Product 3', 
      description: 'Description 3', 
      logo: 'logo3.png', 
      date_release: '2023-03-01', 
      date_revision: '2024-03-01' 
    };
    
    const updateSpy = spyOn(productStore, 'update').and.callThrough();

    service.addProduct(newProduct);

    // Verify update was called with a function
    expect(updateSpy).toHaveBeenCalled();
    expect(updateSpy.calls.mostRecent().args[0]).toEqual(jasmine.any(Function));
    
    // Verify the actual state after the update
    const currentState = productStore.getValue();
    expect(currentState.products).toContain(newProduct);
    expect(currentState.products.length).toBe(initialProducts.length + 1);
  });

  it('should update a product in the store', () => {
    const initialProducts = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2023-01-01', date_revision: '2024-01-01' },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: '2023-02-01', date_revision: '2024-02-01' },
    ];
    
    // Set initial state
    productStore.update({
      products: initialProducts,
      selectedProduct: null,
      loading: false,
      error: null,
    });
    
    const updatedProduct: IProduct = { 
      id: '2', 
      name: 'Updated Product 2', 
      description: 'Updated Description 2', 
      logo: 'updated-logo2.png', 
      date_release: '2023-02-01', 
      date_revision: '2024-04-01' 
    };
    
    const updateSpy = spyOn(productStore, 'update').and.callThrough();

    service.updateProduct('2', updatedProduct);

    // Verify update was called with a function
    expect(updateSpy).toHaveBeenCalled();
    expect(updateSpy.calls.mostRecent().args[0]).toEqual(jasmine.any(Function));
    
    // Verify the actual state after the update
    const currentState = productStore.getValue();
    const productInStore = currentState.products.find(p => p.id === '2');
    expect(productInStore).toEqual(updatedProduct);
    expect(currentState.products.length).toBe(initialProducts.length);
  });

  it('should delete a product from the store', () => {
    const initialProducts = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2023-01-01', date_revision: '2024-01-01' },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: '2023-02-01', date_revision: '2024-02-01' },
    ];
    
    // Set initial state
    productStore.update({
      products: initialProducts,
      selectedProduct: null,
      loading: false,
      error: null,
    });
    
    const updateSpy = spyOn(productStore, 'update').and.callThrough();

    service.deleteProduct('2');

    // Verify update was called with a function
    expect(updateSpy).toHaveBeenCalled();
    expect(updateSpy.calls.mostRecent().args[0]).toEqual(jasmine.any(Function));
    
    // Verify the actual state after the update
    const currentState = productStore.getValue();
    expect(currentState.products.length).toBe(initialProducts.length - 1);
    expect(currentState.products.find(p => p.id === '2')).toBeUndefined();
  });

  it('should set error in the store', () => {
    const error = 'An error occurred';
    const updateSpy = spyOn(productStore, 'update');

    service.setError(error);

    expect(updateSpy).toHaveBeenCalledWith({ error });
  });

  it('should set loading in the store', () => {
    const loading = true;
    const updateSpy = spyOn(productStore, 'update');

    service.setLoading(loading);

    expect(updateSpy).toHaveBeenCalledWith({ loading });
  });
  
  // Additional tests to improve coverage
  
  it('should handle empty product list when adding a product', () => {
    // Set initial state with empty products array
    productStore.update({
      products: [],
      selectedProduct: null,
      loading: false,
      error: null,
    });
    
    const newProduct: IProduct = { 
      id: '1', 
      name: 'Product 1', 
      description: 'Description 1', 
      logo: 'logo1.png', 
      date_release: '2023-01-01', 
      date_revision: '2024-01-01' 
    };
    
    const updateSpy = spyOn(productStore, 'update').and.callThrough();

    service.addProduct(newProduct);
    
    // Verify the actual state after the update
    const currentState = productStore.getValue();
    expect(currentState.products).toEqual([newProduct]);
    expect(currentState.products.length).toBe(1);
  });
  
  it('should handle product not found when updating', () => {
    const initialProducts = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2023-01-01', date_revision: '2024-01-01' },
    ];
    
    // Set initial state
    productStore.update({
      products: initialProducts,
      selectedProduct: null,
      loading: false,
      error: null,
    });
    
    const updatedProduct: IProduct = { 
      id: '999', 
      name: 'Non-existent Product', 
      description: 'This product does not exist in store', 
      logo: 'nonexistent.png', 
      date_release: '2023-05-01', 
      date_revision: '2024-05-01' 
    };
    
    const updateSpy = spyOn(productStore, 'update').and.callThrough();

    service.updateProduct('999', updatedProduct);
    
    // Verify the actual state after the update attempt
    const currentState = productStore.getValue();
    expect(currentState.products).toEqual(initialProducts);
    expect(currentState.products.length).toBe(initialProducts.length);
  });
  
  it('should handle product not found when deleting', () => {
    const initialProducts = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2023-01-01', date_revision: '2024-01-01' },
    ];
    
    // Set initial state
    productStore.update({
      products: initialProducts,
      selectedProduct: null,
      loading: false,
      error: null,
    });
    
    const updateSpy = spyOn(productStore, 'update').and.callThrough();

    service.deleteProduct('999');
    
    // Verify the actual state after the delete attempt
    const currentState = productStore.getValue();
    expect(currentState.products).toEqual(initialProducts);
    expect(currentState.products.length).toBe(initialProducts.length);
  });
});