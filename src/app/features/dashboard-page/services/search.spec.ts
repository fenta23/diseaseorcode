import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Search } from './search';

const DISEASE_URL = 'https://raw.githubusercontent.com/NCI-CBIIT/FHH/master/data/diseases.json';

const mockApiResponse = {
  Cancer: [
    { name: 'Breast Cancer', code: 'BC', abbr: 'BC' },
    { name: 'Lung Cancer', code: 'LC', abbr: 'LC' },
  ],
  Cardiovascular: [
    { name: 'Heart Disease', code: 'HD', abbr: 'HD' },
  ],
};

describe('Search', () => {
  let service: Search;
  let httpMock: HttpTestingController;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        Search,
      ],
    });

    service = TestBed.inject(Search);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    httpMock.expectOne(DISEASE_URL).flush({});
    expect(service).toBeTruthy();
  });

  it('should start with empty allDiseases', () => {
    httpMock.expectOne(DISEASE_URL).flush({});
    expect(service.allDiseases()).toEqual([]);
  });

  it('should flatten categorized disease data into a single array', () => {
    httpMock.expectOne(DISEASE_URL).flush(mockApiResponse);

    expect(service.allDiseases()).toEqual([
      { name: 'Breast Cancer', code: 'BC', abbr: 'BC' },
      { name: 'Lung Cancer', code: 'LC', abbr: 'LC' },
      { name: 'Heart Disease', code: 'HD', abbr: 'HD' },
    ]);
  });

  it('should set allDiseases to [] on HTTP error', () => {
    httpMock.expectOne(DISEASE_URL).error(new ProgressEvent('network error'));

    expect(service.allDiseases()).toEqual([]);
  });

  it('should return null errorMessage when diseases are loaded', () => {
    httpMock.expectOne(DISEASE_URL).flush(mockApiResponse);

    expect(service.errorMessage()).toBeNull();
  });

  it('should return errorMessage when allDiseases is empty', () => {
    httpMock.expectOne(DISEASE_URL).flush({});

    expect(service.errorMessage()).toBeTruthy();
  });
});
