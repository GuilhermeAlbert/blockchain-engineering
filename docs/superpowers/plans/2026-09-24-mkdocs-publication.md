# Material for MkDocs Publication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the English and Brazilian Portuguese books with Material for MkDocs at the existing GitHub Pages URLs.

**Architecture:** A tested Node script stages the existing manuscripts without moving source files, converts GitHub alert syntax for MkDocs, and prepares language-specific trees. Two MkDocs configurations build into one Pages artifact, deployed by GitHub Actions.

**Tech Stack:** Node.js 20, Python 3, MkDocs, Material for MkDocs, PyMdown Extensions, GitHub Actions, GitHub Pages

---

### Task 1: Test and implement source staging

**Files:**
- Create: `scripts/prepare-mkdocs.test.mjs`
- Create: `scripts/prepare-mkdocs.mjs`
- Modify: `.gitignore`

- [ ] Write fixture-based tests that require the staging script to select one edition, preserve code fences, convert `[!NOTE]` blocks, copy shared assets, and fail on a missing source.
- [ ] Run `node scripts/prepare-mkdocs.test.mjs` and confirm the tests fail because the implementation is absent.
- [ ] Implement pure transformation helpers plus a CLI that accepts `--edition`, `--destination`, and `--nav-output`.
- [ ] Run the tests and confirm all staging cases pass.
- [ ] Ignore `.mkdocs-stage/` and `site/`.
- [ ] Commit with `feat: add MkDocs source staging`.

### Task 2: Configure both language sites

**Files:**
- Create: `requirements-docs.txt`
- Create: `mkdocs.en.yml`
- Create: `mkdocs.pt-BR.yml`
- Create: `docs-site/stylesheets/extra.css`
- Create: `docs-site/javascripts/language-switcher.js`

- [ ] Pin compatible MkDocs, Material, and Markdown extension versions.
- [ ] Configure English metadata, explicit navigation, search, Mermaid, admonitions, code highlighting, light/dark palettes, and the Portuguese alternate.
- [ ] Configure the corresponding Portuguese metadata and English alternate.
- [ ] Implement the selected compact technical visual direction in shared CSS.
- [ ] Implement progressive language switching that retains equivalent page paths and falls back to each edition root.
- [ ] Commit with `feat: configure bilingual Material site`.

### Task 3: Assemble and test the complete site

**Files:**
- Create: `scripts/build-docs.mjs`
- Create: `scripts/check-built-site.mjs`
- Create: `scripts/check-built-site.test.mjs`

- [ ] Write failing generated-site tests for language roots, representative chapters, rendered admonitions, Mermaid initialization, search assets, and absence of raw `README.md` navigation.
- [ ] Implement the build orchestrator to stage both editions, build English at the artifact root, and build Portuguese into `pt-BR/`.
- [ ] Implement the generated-site checker.
- [ ] Install the pinned documentation dependencies in an isolated environment.
- [ ] Run both unit suites and build both sites with strict validation.
- [ ] Run the generated-site checker and inspect representative HTML.
- [ ] Commit with `test: verify bilingual documentation build`.

### Task 4: Deploy through GitHub Actions

**Files:**
- Create: `.github/workflows/pages.yml`
- Modify: `_config.yml`
- Modify: `README.md`
- Modify: `pt-BR/README.md`

- [ ] Add an Actions workflow with Pages permissions, concurrency control, dependency caching, book checks, strict MkDocs builds, artifact upload, and deployment.
- [ ] Retire the Cayman configuration from active publication and document the new local preview/build commands.
- [ ] Ensure repository and site language links target clean routes.
- [ ] Validate workflow syntax and rerun all book, staging, and generated-site checks.
- [ ] Commit with `ci: deploy bilingual MkDocs site`.

### Task 5: Publish and verify production

**Files:**
- Verify only; change files only if production evidence reveals a defect.

- [ ] Run `git diff --check` and confirm the working tree contains only intended changes.
- [ ] Push `main` to `origin`.
- [ ] Wait for the Pages deployment associated with the new head commit.
- [ ] Confirm HTTP 200 and Material-rendered HTML at the English root, Portuguese root, one chapter per language, search index, CSS, and JavaScript assets.
- [ ] Confirm the production language selector and Mermaid initialization.
- [ ] Report commit IDs, verification counts, and final URLs.
