import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { GetAllProductsUseCase } from '../../../../application/get.products.use.case';
import { DesignOneContainerComponent } from './design.one.container.component';

// Create a mock for the use case
const mockGetAllProductsUseCase = {
  execute: jasmine.createSpy('execute').and.returnValue(Promise.resolve([]))
};

describe('DesignOneContainerComponent', () => {
  let component: DesignOneContainerComponent;
  let fixture: ComponentFixture<DesignOneContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DesignOneContainerComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: GetAllProductsUseCase, useValue: mockGetAllProductsUseCase },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({})),
            queryParamMap: of(convertToParamMap({})),
            snapshot: {
              paramMap: convertToParamMap({}),
              queryParamMap: convertToParamMap({})
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignOneContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});