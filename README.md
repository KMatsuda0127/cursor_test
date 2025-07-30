# Chrome Extension

A Chrome extension built with React 19, TypeScript, Vite, and Vitest.

## Features

- React 19.1 with latest features
- TypeScript for type safety
- Vite for fast development and building
- Vitest for testing with coverage
- Biome for linting and formatting
- TDD approach with t-wada's methodology
- Kent Beck's development philosophy

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Run tests:
```bash
npm test
```

4. Run tests with UI:
```bash
npm run test:ui
```

5. Run tests with coverage:
```bash
npm run test:coverage
```

6. Lint code:
```bash
npm run lint
```

7. Format code:
```bash
npm run format
```

8. Build for production:
```bash
npm run build
```

## Project Structure

```
chrome-extension/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Extension pages (popup, options, background)
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   └── assets/             # Static files (icons, images)
├── tests/                  # Test files
│   ├── components/         # Component tests
│   ├── utils/              # Utility tests
│   └── __mocks__/          # Mock files
├── public/                 # Build output
├── dist/                   # Production build output
├── coverage/               # Test coverage reports
├── manifest.json           # Chrome extension manifest
├── package.json
├── vite.config.ts
├── vitest.config.ts        # Vitest configuration
├── biome.json
└── tsconfig.json
```

## Development Approach

This project follows:

- **TDD (Test-Driven Development)** based on t-wada's approach
- **Red-Green-Refactor** cycle
- **Kent Beck's development philosophy**:
  - Simple Design
  - YAGNI (You Aren't Gonna Need It)
  - DRY (Don't Repeat Yourself)
  - Clean Code
  - Continuous Refactoring

## Chrome Extension Structure

- **manifest.json**: Extension configuration (Manifest V3)
- **Popup**: Extension icon click display
- **Background Script**: Background processing (Service Worker)
- **Content Script**: Web page execution
- **Options Page**: Settings page

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview build results
- `npm test`: Run tests
- `npm run test:ui`: Run tests with UI
- `npm run test:coverage`: Run tests with coverage
- `npm run test:run`: Run tests (no watch mode)
- `npm run lint`: Lint with Biome
- `npm run format`: Format with Biome
- `npm run check`: Check and format with Biome 