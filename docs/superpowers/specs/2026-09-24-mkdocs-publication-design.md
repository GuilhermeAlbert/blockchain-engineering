# Material for MkDocs Publication Design

## Objective

Replace the GitHub Pages Jekyll/Cayman publication with a Material for MkDocs site that renders the existing English and Brazilian Portuguese books correctly. Preserve the Markdown manuscripts and their repository paths.

## Constraints

- Work directly on `main`, as requested.
- Keep English source files at the repository root and Portuguese files under `pt-BR/`.
- Do not duplicate or move the seven executable examples.
- Keep relative Markdown links useful on GitHub.
- Publish English at `/blockchain-engineering/` and Portuguese at `/blockchain-engineering/pt-BR/`.
- Retain protocol names, code, identifiers, and primary-source quotations in their appropriate original form.

## Architecture

The repository will contain two MkDocs configuration files, one per language. A preparation script will copy the relevant Markdown, shared cover image, license, and required example documentation into ignored staging directories. MkDocs will build the English site into a temporary output root and the Portuguese site into its `pt-BR/` subdirectory.

A single GitHub Actions workflow will install pinned Python dependencies, run the preparation script, build both configurations in strict mode, assemble the Pages artifact, and deploy it. The repository-based Jekyll configuration will no longer control the public site.

## Navigation

Each edition receives explicit navigation generated from its existing `SUMMARY.md` order. The visible labels come from the corresponding language. Material provides the left navigation, per-page table of contents, search, and previous/next controls.

The language selector links the English root to `/pt-BR/` and the Portuguese root back to `/`. Because both editions preserve the same chapter paths, a small client-side enhancement may retain the current relative page when switching languages; the root links remain a reliable fallback.

## Markdown Compatibility

The build enables:

- admonitions and collapsible details;
- fenced code blocks and syntax highlighting;
- Mermaid fences;
- tables, footnotes, attributes, task lists, and anchors;
- automatic rewriting of `.md` links to generated pages.

GitHub alert blocks such as `[!NOTE]`, `[!IMPORTANT]`, and `[!WARNING]` will be converted during staging, not in the manuscripts. Code fences, inline code, URLs, and quoted source material remain unchanged.

## Visual Direction

Use a compact technical presentation:

- sans-serif typography;
- dark code surfaces;
- purple accent derived from the cover;
- restrained spacing and decoration;
- light and dark palettes with an explicit toggle;
- system color preference as the initial default;
- responsive navigation for phones and tablets.

Custom CSS will adjust colors, typography, content width, navigation density, tables, code blocks, and admonitions without replacing Material's accessible layout primitives.

## Build Boundaries

Focused files have separate responsibilities:

- `scripts/prepare-mkdocs.mjs`: staging, alert conversion, link and asset preparation, and generated navigation data.
- `mkdocs.en.yml`: English metadata, navigation, theme, and extensions.
- `mkdocs.pt-BR.yml`: Portuguese metadata, navigation, theme, and extensions.
- `docs-site/stylesheets/extra.css`: shared visual customization.
- `requirements-docs.txt`: pinned documentation dependencies.
- `.github/workflows/pages.yml`: build, validation, artifact upload, and deployment.

Generated staging and site output remain ignored by Git.

## Failure Handling

The preparation script exits nonzero when a configured source file is missing or when English and Portuguese chapter inventories diverge. MkDocs runs with `--strict`, so unresolved internal links and configuration warnings fail CI. The existing book checker remains the source-of-truth validation for manuscript links, navigation, editorial rules, and translation parity.

## Verification

Completion requires:

1. Existing checker tests pass.
2. English and Portuguese book checks report zero errors.
3. Preparation tests cover alert conversion, source selection, and language navigation.
4. Both MkDocs builds pass in strict mode.
5. Generated HTML contains rendered admonitions, Mermaid containers, search assets, language links, and no links to raw `README.md` pages.
6. The GitHub Pages workflow deploys the final commit successfully.
7. Production checks return HTTP 200 for both language roots and representative chapters.

## Out of Scope

- Rewriting the manuscripts solely to suit the site generator.
- Adding accounts, comments, analytics, or a backend.
- Replacing the existing cover artwork.
- Publishing the executable examples as interactive applications.
