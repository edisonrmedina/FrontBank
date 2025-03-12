import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ModalBankComponent } from './modal-bank.component';

describe('ModalBankComponent', () => {
  let component: ModalBankComponent;
  let fixture: ComponentFixture<ModalBankComponent>;

  // Create mock for any additional services your component might use
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModalBankComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            paramMap: of(convertToParamMap({})),
            queryParamMap: of(convertToParamMap({})),
            queryParams: of({}),
            snapshot: {
              params: {},
              paramMap: convertToParamMap({}),
              queryParamMap: convertToParamMap({}),
              queryParams: {}
            }
          }
        },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBankComponent);
    component = fixture.componentInstance;
    
    // Initialize any required properties on the component before detection
    // For example:
    // component.someRequiredProperty = mockValue;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});