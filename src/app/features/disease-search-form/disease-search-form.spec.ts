import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseSearchForm } from './disease-search-form';

describe('DiseaseSearchForm', () => {
  let component: DiseaseSearchForm;
  let fixture: ComponentFixture<DiseaseSearchForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiseaseSearchForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseaseSearchForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
