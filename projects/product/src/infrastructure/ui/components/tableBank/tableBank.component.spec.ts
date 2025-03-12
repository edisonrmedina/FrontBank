import { ComponentFixture, TestBed } from '@angular/core/testing';
import { tableBankComponent } from './tableBank.component';


describe('TableComponent', () => {
  let component: tableBankComponent;
  let fixture: ComponentFixture<tableBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [tableBankComponent]
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
