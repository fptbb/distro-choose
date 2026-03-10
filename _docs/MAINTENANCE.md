# DistroChoose — Project Maintenance Guide

## Project Structure

```
distro-choose/
├── index.html, quiz.html, results.html, ...   ← HTML pages (read from data/)
├── quiz.js                                     ← quiz engine (fetches data/questions.json)
├── style.css                                   ← all styling
├── icons/                                      ← SVG icons by category
├── data/                                       ← PRODUCTION (generated, do not edit)
│   ├── data.js                                 ← all distro data, scoring, glossary
│   └── questions.json                          ← assembled question trees
└── docs/                                       ← SOURCE & DOCUMENTATION
    ├── data/                                   ← source JSON files
    │   ├── categories.json                     ← leaf values & display names
    │   ├── meta.json                           ← category order, titles, subcategories
    │   ├── de_profiles.json                    ← DE/WM profiles
    │   ├── glossary.json                       ← glossary terms
    │   ├── distros_debian.json                 ← Debian family profiles
    │   ├── distros_arch.json                   ← Arch family profiles
    │   ├── distros_rpm.json                    ← RPM family profiles
    │   ├── distros_independent.json            ← Independent distro profiles
    │   ├── distros_specialist.json             ← Specialist distro profiles
    │   └── questions/                          ← question trees by category
    │       ├── use_case.json
    │       ├── experience.json
    │       ├── philosophy.json
    │       ├── customization.json
    │       ├── hardware.json
    │       ├── stability.json
    │       └── desktop_environment.json
    ├── build_data.js                           ← build script
    ├── scoring_system.md                       ← scoring algorithm docs
    ├── categories.md                           ← category & leaf value docs
    └── MAINTENANCE.md                          ← this file
```

## How to Build

After editing any source JSON in `docs/data/`, rebuild the production files:

```bash
bun docs/build_data.js
# or
node docs/build_data.js
```

This reads all `docs/data/*.json` and `docs/data/questions/*.json`, then generates:
- `data/data.js` — single JS file loaded by all HTML pages
- `data/questions.json` — assembled question tree loaded by quiz.js

## Common Tasks

### Adding a New Distro

1. Open the appropriate family file in `docs/data/` (e.g., `distros_debian.json`)
2. Add a new entry with name, family, de, website, color, description, and scores
3. Scores are 0.0–1.0 per leaf value per category (see `docs/scoring_system.md`)
4. Run `bun docs/build_data.js`

### Adding a New Question / Leaf Value

1. Add the leaf to `docs/data/categories.json` (under the right category)
2. Add the leaf to the question tree in `docs/data/questions/<category>.json`
3. Add the leaf to `docs/data/meta.json` subcategories if applicable
4. Add scores for the new leaf in all relevant distro profiles
5. Create an icon SVG in `icons/<category>/<leaf_id>.svg`
6. Run `bun docs/build_data.js`

### Adding a New Category

1. Add category to `docs/data/meta.json` → `categories` array and `categoryTitles`
2. Add leaf values to `docs/data/categories.json`
3. Create `docs/data/questions/<category>.json` with the question tree
4. Add subcategories to `docs/data/meta.json` → `subCategories`
5. Add scores for the new category in all distro profiles
6. Create icons in `icons/<category>/`
7. Update `quiz.js` → `categoryOrder` array
8. Run `bun docs/build_data.js`

### Adding a Glossary Term

1. Add key-value to `docs/data/glossary.json`
2. Run `bun docs/build_data.js`

### Modifying the Scoring Algorithm

The scoring function is written as a string in `docs/build_data.js` and emitted into `data/data.js`. Edit the source in the build script, then rebuild.

## Rules

- **Never edit `data/data.js` or `data/questions.json` directly** — they are overwritten on rebuild
- **Always edit source files in `docs/data/`** and then rebuild
- **HTML pages reference `data/data.js`** — this path must not change
- **`quiz.js` fetches `data/questions.json`** — this path must not change
