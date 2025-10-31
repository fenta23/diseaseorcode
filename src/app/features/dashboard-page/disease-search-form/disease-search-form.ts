import { Component, computed, inject, Signal, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { toSignal } from '@angular/core/rxjs-interop';
import { Disease, Search } from '../services/search';
import { HighlightPipe } from '../pipes/highlight-pipe';


@Component({
  selector: 'app-disease-search-form',
  imports: [
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HighlightPipe
  ],
  templateUrl: './disease-search-form.html',
  styleUrl: './disease-search-form.css',
})
export class DiseaseSearchForm {

  public searchService = inject(Search);

  public myControl: FormControl<string> = new FormControl<string>('', {nonNullable: true});

  public searchTerm: Signal<string> = toSignal(this.myControl.valueChanges, {initialValue: ''});

  public filteredOptions: Signal<Disease[]> = computed(() => {
    const term = this.searchTerm()?.trim() || '';
    const diseases = this.searchService.allDiseases();

    if (!term) {
      return [];
    }

    const regex = new RegExp(term, 'gi');
    return diseases.filter(disease =>
      disease.name.match(regex) || disease.code.match(regex)
    );
  });


  public ngOnInit(): void {
    this.searchService.loadDiseaseData();
  }


  public displayFn(disease: Disease): string {
    return disease ? `${disease.name} (${disease.code})` : '';
  }
}
