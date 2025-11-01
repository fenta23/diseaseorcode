import { Component, computed, inject, Signal } from '@angular/core';
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

  public readonly searchService = inject(Search);
  public readonly searchControl = new FormControl<string>('', {nonNullable: true});

  public searchTerm: Signal<string> = toSignal(
    this.searchControl.valueChanges,
    {initialValue: ''}
  );

  public filteredOptions: Signal<Disease[]> = computed(() => {
    const value: string | Disease = this.searchTerm();
    const term = typeof value === 'string' ? value.trim() : '';


    if (!term || term.length < 2) {
      return [];
    }
    const regex = new RegExp(term, 'gi');
    return this.searchService.allDiseases().filter(disease =>
      disease.name.match(regex) || disease.code.match(regex)
    );
  });


  public displayFn(disease: string | Disease | null): string {
    if (!disease || typeof disease === 'string') {
      return typeof disease === 'string' ? disease : '';
    }
    return `${disease.name} (${disease.code})`;
  }
}
