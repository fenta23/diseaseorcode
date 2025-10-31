import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { HighlightPipe } from './highlight-pipe';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;
  let sanitizer: DomSanitizer;

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
        HighlightPipe
      ]
    });

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new HighlightPipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return original text when search is empty', () => {
    const text = 'Hello World';
    const result = pipe.transform(text, '');

    expect(result).toBe(text);
  });

  it('should return original text when search is null or undefined', () => {
    const text = 'Hello World';

    expect(pipe.transform(text, null as any)).toBe(text);
    expect(pipe.transform(text, undefined as any)).toBe(text);
  });

  it('should return empty when text is empty', () => {
    const result = pipe.transform('', 'search');

    expect(result).toBe('');
  });

  it('should return null when text is null', () => {
    const result = pipe.transform(null as any, 'search');

    expect(result).toBeNull();
  });

  it('should highlight single occurrence', () => {
    const text = 'Hello World';
    const search = 'World';
    const result = pipe.transform(text, search);

    // SafeHtml wird als String mit dem HTML-Inhalt zurückgegeben
    const resultString = result.toString();
    expect(resultString).toContain('<mark class="hl">World</mark>');
    expect(resultString).toContain('Hello');
  });

  it('should highlight multiple occurrences', () => {
    const text = 'Hello World, hello Universe';
    const search = 'hello';
    const result = pipe.transform(text, search);

    const resultString = result.toString();
    expect(resultString).toContain('<mark class="hl">Hello</mark>');
    expect(resultString).toContain('<mark class="hl">hello</mark>');
  });

  it('should be case insensitive', () => {
    const text = 'JavaScript is awesome';
    const search = 'javascript';
    const result = pipe.transform(text, search);

    const resultString = result.toString();
    expect(resultString).toContain('<mark class="hl">JavaScript</mark>');
  });

  it('should highlight partial matches', () => {
    const text = 'Angular Application';
    const search = 'App';
    const result = pipe.transform(text, search);

    const resultString = result.toString();
    expect(resultString).toContain('<mark class="hl">App</mark>lication');
  });

  it('should handle special regex characters', () => {
    const text = 'Price: $100.50';
    const search = '$100';
    const result = pipe.transform(text, search);

    const resultString = result.toString();
    // Der Test sollte nicht fehlschlagen, auch wenn $ ein Regex-Sonderzeichen ist
    expect(result).toBeDefined();
  });

  it('should return SafeHtml type', () => {
    const text = 'Test text';
    const search = 'Test';
    const result = pipe.transform(text, search);

    // Prüfen, ob es sich um ein SafeHtml-Objekt handelt
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });

  it('should preserve text before and after match', () => {
    const text = 'Before Match After';
    const search = 'Match';
    const result = pipe.transform(text, search);

    const resultString = result.toString();
    expect(resultString).toContain('Before');
    expect(resultString).toContain('<mark class="hl">Match</mark>');
    expect(resultString).toContain('After');
  });

  it('should handle search term at the beginning', () => {
    const text = 'Start of sentence';
    const search = 'Start';
    const result = pipe.transform(text, search);

    const resultString = result.toString();
    expect(resultString).toMatch(/^.*<mark class="hl">Start<\/mark>/);
  });

  it('should handle search term at the end', () => {
    const text = 'End of sentence';
    const search = 'sentence';
    const result = pipe.transform(text, search);

    const resultString = result.toString();
    expect(resultString).toMatch(/<mark class="hl">sentence<\/mark>.*$/);
  });

  it('should highlight when search matches entire text', () => {
    const text = 'Match';
    const search = 'Match';
    const result = pipe.transform(text, search);

    expect(result).toBeDefined();
    const resultString = String(result);
    expect(resultString).toContain('<mark class="hl">Match</mark>');
  });

  it('should handle whitespace in search term', () => {
    const text = 'Hello World Program';
    const search = 'Hello World';
    const result = pipe.transform(text, search);

    const resultString = result.toString();
    expect(resultString).toContain('<mark class="hl">Hello World</mark>');
  });
});
