import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosModalComponent } from './pagos-modal.component';

describe('PagosModalComponent', () => {
  let component: PagosModalComponent;
  let fixture: ComponentFixture<PagosModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagosModalComponent]
    });
    fixture = TestBed.createComponent(PagosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
