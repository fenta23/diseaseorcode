import { Component } from '@angular/core';
import { DiseaseSearchForm } from './disease-search-form/disease-search-form';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    DiseaseSearchForm
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {

}
