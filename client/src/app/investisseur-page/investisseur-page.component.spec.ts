import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestisseurPageComponent } from './investisseur-page.component';

describe('InvestisseurPageComponent', () => {
  let component: InvestisseurPageComponent;
  let fixture: ComponentFixture<InvestisseurPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestisseurPageComponent]
    });
    fixture = TestBed.createComponent(InvestisseurPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
