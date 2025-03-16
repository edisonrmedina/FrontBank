import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootsharedComponent } from './rootshared.component';

describe('RootsharedComponent', () => {
  let component: RootsharedComponent;
  let fixture: ComponentFixture<RootsharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootsharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootsharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
