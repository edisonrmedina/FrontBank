import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputBankComponent } from './input-bank.component';

describe('InputBankComponent', () => {
  let component: InputBankComponent;
  let fixture: ComponentFixture<InputBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, InputBankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize searchTerm as empty string', () => {
    expect(component.searchTerm).toBe('');
  });

  it('should emit searchChange event when search() is called', () => {
    // Arrange
    const testSearchTerm = 'test search';
    component.searchTerm = testSearchTerm;
    const searchChangeSpy = spyOn(component.searchChange, 'emit');
    
    // Act
    component.search();
    
    // Assert
    expect(searchChangeSpy).toHaveBeenCalledWith(testSearchTerm);
  });

  it('should emit searchChange event when input value changes', () => {
    // Arrange
    const testSearchTerm = 'search query';
    component.searchTerm = testSearchTerm;
    const searchChangeSpy = spyOn(component.searchChange, 'emit');
    
    // Find the input element instead of a form
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    
    // Act - trigger input event
    input.triggerEventHandler('input', { target: { value: testSearchTerm } });
    
    // Assert
    expect(searchChangeSpy).toHaveBeenCalledWith(testSearchTerm);
  });

  it('should update searchTerm when input value changes', () => {
    // Arrange
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const testValue = 'new search term';
    
    // Act
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    // Assert
    expect(component.searchTerm).toBe(testValue);
  });
  
});