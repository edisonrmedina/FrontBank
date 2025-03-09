import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonBankComponent } from './button.component';
import { ButtonComponent } from '../../../../../../../dist/product/infrastructure/ui/components/button/button.component';


describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
