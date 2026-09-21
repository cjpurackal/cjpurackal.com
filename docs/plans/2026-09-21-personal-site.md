# Personal Site Implementation Plan

**Goal:** Implement the approved minimal personal page and generated geometry study.

**Architecture:** A single static HTML page with local CSS and a local image. No JavaScript, build system, or remote dependencies.

**Tech Stack:** HTML, CSS, PNG.

### Task 1: Preserve the illustration

Copy the approved generated PNG into `assets/images/geometry-study.png`. Preserve the original output and record its provenance.

### Task 2: Build the page

Replace `index.html` with semantic main content: Christie Jacob heading, the two approved introductory paragraphs, decorative illustration, and a labelled navigation element containing GitHub, Email, and Résumé links. Retain the existing résumé download and email address. Add a concise page description.

Replace `styles.css` with a warm off-white palette, dark serif text, a column capped at 36rem, fluid vertical spacing, responsive artwork, wrapping links, and visible keyboard focus. Remove Bootstrap imports and JavaScript.

### Task 3: Verify

Run `git diff --check`. Parse HTML and confirm every local linked asset exists. If browser tooling is available, inspect desktop and mobile renders and check for horizontal overflow. Do not add a test framework for this static content change.
