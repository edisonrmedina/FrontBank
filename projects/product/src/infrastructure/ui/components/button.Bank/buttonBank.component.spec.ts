import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonBankComponent } from './button.component';


describe('ButtonComponent', () => {
  let component: ButtonBankComponent;
  let fixture: ComponentFixture<ButtonBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonBankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
