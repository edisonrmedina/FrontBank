import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBankComponent } from './input-bank.component';

describe('InputBankComponent', () => {
  let component: InputBankComponent;
  let fixture: ComponentFixture<InputBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputBankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
