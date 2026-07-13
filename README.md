# Skill Masterclass

A hands-on masterclass workspace for building reusable AI agent skills for QA and SDET workflows. The current project focuses on a review-gated **Test Plan Generator** skill that can fetch Jira tickets, analyze requirement gaps, and produce Markdown/PDF test-plan artifacts.

## What This Repository Contains

| Path | Purpose |
|---|---|
| `skillmasterclass/index.html` | Standalone Skill Masterclass web page by TheTestingAcademy. |
| `skillmasterclass/skills/README.md` | STLC-oriented skill-suite overview and installation notes. |
| `test-plan-creator/` | Main reusable skill package for creating review-ready test plans from Jira tickets. |
| `.claude/test-plan-creator/` | Claude-compatible copy of the test-plan skill. |
| `.gemini/test-plan-creator/` | Gemini-compatible copy of the test-plan skill. |
| `.github/test-plan-creator/` | GitHub/Copilot-oriented copy of the test-plan skill. |
| `output/test-plans/` | Generated Markdown test-plan outputs. |
| `output/pdf/` | Generated PDF test-plan outputs. |
| `old/` | Earlier simple skill and app-level VWO test-plan draft retained for reference. |

## Main Skill: Test Plan Creator

The primary skill lives in `test-plan-creator/` and is designed to turn a Jira ticket into a QA-owned draft test plan.

It follows this workflow:

1. Fetch the Jira ticket by key.
2. Capture the summary, description, acceptance criteria, links, attachments, components, and version metadata.
3. Run a requirement-gap analysis using `test-plan-creator/references/requirement-checklist.md`.
4. Fill the standard plan structure from `test-plan-creator/references/test-plan-template.md`.
5. End with a mandatory **Human Review Gate** so the plan is never treated as final without QA/product approval.

The skill intentionally avoids fabricating missing requirements. Missing acceptance criteria, unclear error states, undefined environments, unsupported edge cases, and vague non-functional expectations are surfaced as questions for the ticket author.

## Jira Fetching

The Jira helper script is:

```bash
bash test-plan-creator/scripts/fetch_jira.sh VWO-49
```

It expects these environment variables:

```bash
JIRA_BASE_URL="https://your-domain.atlassian.net"
JIRA_EMAIL="you@example.com"
JIRA_TOKEN="your-api-token"
```

Keep credentials in `.env`. The `.env` file is intentionally ignored by git.

## Generated Artifacts

### VWO App Test Plan

`old/app-vwo-test-plan.md` contains an earlier broad test plan for `app.vwo.com`, covering:

- Authentication and account access.
- Dashboard and navigation.
- Project/tracking setup.
- Experiments, personalization, feature rollouts, and behavior analytics.
- Reporting, integrations, roles, permissions, security, accessibility, and performance.

### Jira VWO-49 Test Plan

The current generated deliverables are:

- `output/test-plans/VWO-49-test-plan.md`
- `output/pdf/VWO-49-test-plan.pdf`

These were generated from Jira ticket `VWO-49`: **[VWO] Add Passkey and SSO Login Options to VWO Login Page**.

The plan includes:

- Ticket snapshot and scope.
- Requirement checklist results.
- Gaps and questions for the ticket author.
- P0/P1/P2 test scenarios.
- Test data and environment needs.
- Risks and assumptions.
- Entry and exit criteria.
- Human Review Gate.

## PDF Output

PDF generation was done from the Markdown test plan and visually verified from rendered PNG pages. Generated PDFs should stay in `output/pdf/`, while temporary render files belong under `tmp/` and are ignored by git.

## Recommended Usage

1. Add Jira credentials to `.env`.
2. Fetch a ticket using `test-plan-creator/scripts/fetch_jira.sh`.
3. Draft the test plan using the `test-plan-creator` skill.
4. Save Markdown under `output/test-plans/`.
5. Generate PDF under `output/pdf/`.
6. Review the Human Review Gate before converting the plan into detailed test cases or automation.

## Repository Hygiene

- Do not commit `.env`, tokens, screenshots from temporary rendering, or local dependency folders.
- Keep reusable skill instructions inside `test-plan-creator/`.
- Keep generated customer/ticket outputs inside `output/`.
- Keep draft or legacy examples inside `old/` only when they remain useful for reference.

## Current Status

- Skill package: created.
- Jira fetch helper: created.
- Requirement checklist: created.
- Test-plan template: created.
- VWO app-level plan: created.
- Jira `VWO-49` Markdown plan: created.
- Jira `VWO-49` PDF plan: created and verified.
