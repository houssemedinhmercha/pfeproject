import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsUsersComponent } from './gs-users.component';

describe('GsUsersComponent', () => {
  let component: GsUsersComponent;
  let fixture: ComponentFixture<GsUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GsUsersComponent]
    });
    fixture = TestBed.createComponent(GsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
