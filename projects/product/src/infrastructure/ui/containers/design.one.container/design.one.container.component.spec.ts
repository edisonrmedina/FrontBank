import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignOneContainerComponent } from './design.one.container.component';

describe('DesignOneContainerComponent', () => {
  let component: DesignOneContainerComponent;
  let fixture: ComponentFixture<DesignOneContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignOneContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignOneContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
