Hier ist eine aktualisierte README mit allen wichtigen Infos zu deinem Projekt und Deployment:

```markdown
# DiseaseOrCode

Eine Angular-Anwendung, die auf GitHub Pages gehostet wird.

🌐 **Live Demo**: [https://fenta23.github.io/diseaseorcode/](https://fenta23.github.io/diseaseorcode/)

## Entwicklung

### Voraussetzungen

- Node.js (aktuelle LTS-Version)
- Angular CLI (`npm install -g @angular/cli`)

### Lokaler Development Server

```bash
ng serve
```

Die App läuft dann auf `http://localhost:4200/`.

## Deployment auf GitHub Pages

### Automatisches Deployment

Bei jedem Push auf `main` wird die App automatisch über GitHub Actions deployed.

### Manuelles Deployment

```bash
# 1. Build erstellen
ng build --base-href="/diseaseorcode/"

# 2. Auf GitHub Pages deployen
npx angular-cli-ghpages --dir=dist/diseaseOrCode/browser --no-silent
```

**Wichtig**:
- Der `--base-href` muss `/diseaseorcode/` sein (Repository-Name)
- Der Build liegt in `dist/diseaseOrCode/browser/` (nicht `dist/diseaseOrCode/`)
- Nach dem Deployment 2-3 Minuten warten, bis die Änderungen live sind

### Deployment überprüfen

```bash
# gh-pages Branch anschauen
git checkout gh-pages
ls -la  # Sollte nur index.html, *.js, *.css enthalten

# Zurück zu main
git checkout main
```
## Tests

```bash
# Unit Tests
ng test

# End-to-End Tests
ng e2e
```

## Projekt-Struktur

```
diseaseOrCode/
├── src/                    # Source-Code
├── dist/                   # Build-Output (nicht committen)
└── angular.json            # Angular-Konfiguration
```

## Weitere Infos

- Angular CLI: [https://angular.dev/tools/cli](https://angular.dev/tools/cli)
- GitHub Pages: [https://docs.github.com/pages](https://docs.github.com/pages)
```
