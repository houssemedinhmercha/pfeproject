import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTousProjetsComponent } from './liste-tous-projets.component';

describe('ListeTousProjetsComponent', () => {
  let component: ListeTousProjetsComponent;
  let fixture: ComponentFixture<ListeTousProjetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeTousProjetsComponent]
    });
    fixture = TestBed.createComponent(ListeTousProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
