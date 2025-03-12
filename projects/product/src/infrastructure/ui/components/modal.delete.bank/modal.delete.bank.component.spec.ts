import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDeleteBankComponent } from './modal.delete.bank.component';

describe('ModalDeleteBankComponent', () => {
  let component: ModalDeleteBankComponent;
  let fixture: ComponentFixture<ModalDeleteBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDeleteBankComponent], // Usa declarations, no imports
    })
    .compileComponents(); // Compila el componente y sus dependencias

    fixture = TestBed.createComponent(ModalDeleteBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
