import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsPageNotFoundComponent } from './components-page-not-found.component';

describe('ComponentsPageNotFoundComponent', () => {
  let component: ComponentsPageNotFoundComponent;
  let fixture: ComponentFixture<ComponentsPageNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentsPageNotFoundComponent]
    });
    fixture = TestBed.createComponent(ComponentsPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
