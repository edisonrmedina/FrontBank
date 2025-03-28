// import { DebugElement } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { PaginationComponent } from './pagination.component';

// describe('PaginationComponent', () => {
//   let component: PaginationComponent;
//   let fixture: ComponentFixture<PaginationComponent>;
//   let el: DebugElement;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [PaginationComponent], // Import the standalone component
//       //declarations: [PaginationComponent] // Remove declarations
//     }).compileComponents();

//     fixture = TestBed.createComponent(PaginationComponent);
//     component = fixture.componentInstance;
//     el = fixture.debugElement;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should emit pageChange event when previousPage is called and currentPage > 1', () => {
//     spyOn(component.pageChange, 'emit');
//     component.currentPage = 2;
//     component.previousPage();
//     expect(component.pageChange.emit).toHaveBeenCalledWith(1);
//     expect(component.currentPage).toBe(1);
//   });

//   it('should not emit pageChange event when previousPage is called and currentPage is 1', () => {
//     spyOn(component.pageChange, 'emit');
//     component.currentPage = 1;
//     component.previousPage();
//     expect(component.pageChange.emit).not.toHaveBeenCalled();
//   });

//   it('should emit pageChange event when nextPage is called and currentPage < totalPages', () => {
//     spyOn(component.pageChange, 'emit');
//     component.totalItems = 10;
//     component.itemsPerPage = 5;
//     component.currentPage = 1;
//     component.nextPage();
//     expect(component.pageChange.emit).toHaveBeenCalledWith(2);
//     expect(component.currentPage).toBe(2);
//   });
  
//   it('should update itemsPerPage and emit itemsPerPageChange event onPageSizeChange', () => {
//     spyOn(component.itemsPerPageChange, 'emit');
//     const selectElement = el.query(By.css('.page-size-selector')).nativeElement;
//     selectElement.value = '10';
//     selectElement.dispatchEvent(new Event('change'));
//     fixture.detectChanges();
//     expect(component.itemsPerPage).toBe(10);
//     expect(component.currentPage).toBe(1); // Current page should reset to 1
//     expect(component.itemsPerPageChange.emit).toHaveBeenCalledWith(10);
//   });

// });