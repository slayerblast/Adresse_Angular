import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireAdresse } from './formulaire-adresse';

describe('FormulaireAdresse', () => {
  let component: FormulaireAdresse;
  let fixture: ComponentFixture<FormulaireAdresse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireAdresse],
    }).compileComponents();

    fixture = TestBed.createComponent(FormulaireAdresse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
