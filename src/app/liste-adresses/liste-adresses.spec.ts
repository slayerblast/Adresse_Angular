import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAdresses } from './liste-adresses';

describe('ListeAdresses', () => {
  let component: ListeAdresses;
  let fixture: ComponentFixture<ListeAdresses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeAdresses],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeAdresses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
