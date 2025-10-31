import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Disease {
  name: string;
  code: string;
}


@Injectable({
  providedIn: 'root',
})
export class Search {
  private readonly http = inject(HttpClient);
  public isLoading = signal(true);
  public allDiseases = signal<Disease[]>([]);
  public errorMessage = signal<string | null>(null);

  async loadDiseaseData(): Promise<void> {
    try {
      const url = 'https://raw.githubusercontent.com/NCI-CBIIT/FHH/master/data/diseases.json';
      const corsProxy = 'https://corsproxy.io/?';

      const diseaseData = await firstValueFrom(
        this.http.get<Record<string, Disease[]>>(corsProxy + encodeURIComponent(url))
      );

      const diseases: Disease[] = [];
      for (const category in diseaseData) {
        diseases.push(...diseaseData[category]);
      }
      console.log('Disease data fetched:', diseases);

      this.allDiseases.set(diseases);
      this.isLoading.set(false);
      console.log(`Loaded ${diseases.length} diseases`);
    } catch (error) {
      console.error('Error loading disease data:', error);
      this.errorMessage.set('Error loading data. Please refresh.');
      this.isLoading.set(false);
    }
  }

}
