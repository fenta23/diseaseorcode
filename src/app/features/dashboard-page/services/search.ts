import { inject, Injectable, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, shareReplay } from 'rxjs';

export interface Disease {
  name: string;
  code: string;
  abbr: string;
}

@Injectable({
  providedIn: 'root',
})
export class Search {
  private readonly http = inject(HttpClient);

  private readonly url = 'https://raw.githubusercontent.com/NCI-CBIIT/FHH/master/data/diseases.json';

  private readonly diseaseData$ = this.http.get<Record<string, Disease[]>>(
    this.url
  ).pipe(
    map(data => {
      const diseases: Disease[] = [];
      for (const category in data) {
        diseases.push(...data[category]);
      }
      return diseases;
    }),
    catchError(error => {
      console.error('Error loading disease data:', error);
      return of([]);
    })
  );

  public allDiseases = toSignal(this.diseaseData$, {initialValue: []});
  public isLoading = computed(() => this.allDiseases() === undefined);
  public errorMessage = computed(() =>
    this.allDiseases().length === 0 ? 'Error loading data. Please refresh.' : null
  );
}
