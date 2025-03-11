import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DesignOneContainerComponent } from './design.one.container.component';

describe('DesignOneContainerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignOneContainerComponent], // si es standalone
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DesignOneContainerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
