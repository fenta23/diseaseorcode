# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200
npm test           # Run Jest tests once
npm run test:watch # Run Jest in watch mode
npm run test:coverage # Run tests with coverage report
npm run build      # Production build to dist/diseaseOrCode/
```

To run a single test file:
```bash
npx jest src/app/features/dashboard-page/pipes/highlight-pipe.spec.ts
```

To deploy to GitHub Pages:
```bash
ng build --base-href="/diseaseorcode/"
npx angular-cli-ghpages --dir=dist/diseaseOrCode/browser --no-silent
```

## Architecture

This is a single-route Angular 20 app. The root path renders `DashboardPage`, which contains the `DiseaseSearchForm` component. There are no lazy-loaded routes.

**Data flow:**
1. `Search` service (root-provided singleton) fetches disease data from an external NCI JSON endpoint on startup and flattens the categorized response into a `Disease[]` signal (`allDiseases`).
2. `DiseaseSearchForm` injects `Search`, binds a `FormControl` to an autocomplete input, and computes `filteredOptions` as a signal that regex-filters diseases by name or code. Filtering is suppressed until the user types at least 2 characters.
3. `HighlightPipe` wraps matched substrings in `<mark class="hl">` via `DomSanitizer.bypassSecurityTrustHtml` — this is intentional for the search highlight feature.

**Key patterns used throughout:**
- **Zoneless change detection** — `provideZonelessChangeDetection()` is in `app.config.ts` and must also be provided in `TestBed` for specs.
- **Signals over subscriptions** — components use `toSignal()` and `computed()` rather than subscribing to observables directly.
- **Standalone components** — no NgModules; all imports are declared directly on the component decorator.
- **`inject()` for DI** — prefer `inject(Service)` over constructor injection in components and services.

## Conventions

- Prettier is configured: 100-char line width, single quotes, Angular HTML parser for `.html` files.
- TypeScript strict mode is fully enabled including `noImplicitReturns`, `strictTemplates`, and `strictInjectionParameters`.
- Tests use Jest via `jest-preset-angular`. The setup in `setup-jest.ts` intentionally omits `zone.js` imports to match zoneless mode.
