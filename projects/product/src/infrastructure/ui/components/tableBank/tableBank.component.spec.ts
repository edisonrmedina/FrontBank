import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectProductCase } from '../../../../application/select-product-use-case';
import { tableBankComponent } from './tableBank.component';

// Create a mock for the use case
const mockSelectProductCase = {
  execute: jasmine.createSpy('execute').and.returnValue(Promise.resolve([]))
};

describe('TableComponent', () => {
  let component: tableBankComponent;
  let fixture: ComponentFixture<tableBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [tableBankComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SelectProductCase, useValue: mockSelectProductCase }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(tableBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});