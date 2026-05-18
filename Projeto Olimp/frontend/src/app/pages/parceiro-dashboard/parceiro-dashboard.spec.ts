import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroDashboard } from './parceiro-dashboard';

describe('ParceiroDashboard', () => {
  let component: ParceiroDashboard;
  let fixture: ComponentFixture<ParceiroDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParceiroDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ParceiroDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
