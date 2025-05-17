import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorteurProjetPageComponent } from './porteur-projet-page.component';

describe('PorteurProjetPageComponent', () => {
  let component: PorteurProjetPageComponent;
  let fixture: ComponentFixture<PorteurProjetPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorteurProjetPageComponent]
    });
    fixture = TestBed.createComponent(PorteurProjetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
