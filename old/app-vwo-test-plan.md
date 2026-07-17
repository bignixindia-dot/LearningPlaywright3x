# Test Plan: app.vwo.com

## 1. Objective

Validate that `https://app.vwo.com` works reliably for key user journeys across authentication, workspace setup, experimentation, behavior analytics, personalization, reporting, integrations, and account administration.

## 2. Product Context

VWO is a digital experience optimization platform covering testing, behavior analytics, personalization, feature experimentation, and web rollouts. The public `app.vwo.com` endpoint loads a JavaScript application shell, so full validation of authenticated flows requires valid test accounts and appropriate product entitlements.

## 3. Scope

### In Scope

- Login, logout, account verification, session handling, and password recovery.
- Workspace/account switching, user roles, permissions, and billing/usage visibility.
- Website/project setup, tracking code installation, and installation verification.
- Campaign creation and management for A/B tests, split URL tests, multivariate tests, personalization, and rollout/feature experiments.
- Goal setup, audience targeting, segmentation, traffic allocation, QA preview, launch, pause, archive, and duplicate flows.
- Behavior analytics modules such as heatmaps, session recordings, funnels, form analytics, filters, exports, and privacy masking.
- Reporting dashboards, statistical calculations, data freshness, exports, sharing, and alerts.
- Integrations, APIs, webhooks, notification settings, and support/help entry points.
- Cross-browser, accessibility, performance, security, privacy, and regression coverage.

### Out of Scope

- Production customer data validation.
- Third-party systems beyond agreed sandbox integrations.
- Load testing at production scale unless separate capacity targets are provided.
- Payment gateway settlement testing unless billing ownership is included.

## 4. Assumptions

- Test credentials will be provided for Admin, Marketer, Analyst, Developer, and Read-only roles.
- At least one sandbox website/app property is available for tracking-code verification and campaign execution.
- Product entitlements include Testing, Behavior Analytics, Personalization, and Feature Experimentation/Web Rollouts.
- Test data can be safely generated and deleted.
- Email inbox access is available for verification, invitations, password reset, and alert testing.

## 5. Test Environments

| Environment | Purpose | Data |
| --- | --- | --- |
| Production-like sandbox | Functional, regression, integration, and UAT testing | Synthetic accounts, websites, campaigns, and events |
| Local/demo website | Tracking code, visual editor, heatmap, recording, and goal validation | Controlled pages and conversion events |
| Browser/device lab | Compatibility, responsive, and accessibility testing | Synthetic user sessions |

## 6. User Personas

| Persona | Key Needs |
| --- | --- |
| Admin | Manage account, users, roles, billing, workspaces, integrations, and security settings |
| Marketer/CRO user | Create experiments, define audiences/goals, launch campaigns, and review results |
| Analyst | Inspect reports, behavior analytics, funnels, exports, and data quality |
| Developer | Install tracking code, configure feature flags/SDKs, APIs, and debugging tools |
| Read-only stakeholder | View dashboards and reports without changing campaign configuration |

## 7. Functional Test Areas

### 7.1 Authentication and Account Access

- Verify app shell loads with JavaScript enabled and shows a useful fallback when JavaScript is disabled.
- Validate login with valid, invalid, locked, unverified, and expired accounts.
- Validate forgot password, password reset, email verification, invitation acceptance, and resend flows.
- Validate SSO/login provider behavior if enabled.
- Validate logout, session timeout, concurrent sessions, remember-me behavior, and secure redirect handling.
- Validate user cannot access protected routes without authentication.

### 7.2 Dashboard and Navigation

- Verify default landing page loads correct account/workspace context.
- Validate global navigation, breadcrumbs, search, filters, empty states, and recently used items.
- Validate account/workspace switching preserves permissions and product entitlements.
- Validate loading, error, retry, and offline states.
- Validate browser back/forward, deep links, and refresh behavior.

### 7.3 Project and Tracking Setup

- Create, edit, archive, and restore website/app properties.
- Generate and copy tracking code or SDK keys.
- Verify tracking installation detection for installed, missing, duplicate, and outdated snippets.
- Validate domain restrictions, staging/production environment selection, and setup guidance.
- Confirm events, page views, conversions, and visitor identity are captured correctly.

### 7.4 Experiment Campaigns

- Create A/B, split URL, and multivariate campaigns.
- Configure campaign name, hypothesis, URLs, variations, goals, audience, schedule, and traffic allocation.
- Validate visual editor changes, undo/redo, preview, responsive views, and conflict handling.
- Validate campaign QA mode, shareable preview links, and device/browser preview behavior.
- Launch, pause, resume, duplicate, archive, restore, and delete campaigns.
- Validate edit restrictions after launch and data preservation after changes.
- Confirm visitors are bucketed consistently and exclusions are respected.

### 7.5 Personalization

- Create personalization experiences for defined audiences.
- Validate targeting rules based on URL, device, location, behavior, cookies, query parameters, and custom attributes.
- Validate priority/conflict rules when multiple experiences match the same visitor.
- Confirm personalized content renders correctly and does not affect non-targeted visitors.
- Validate reporting by audience, variation, and goal.

### 7.6 Feature Experimentation and Web Rollouts

- Create feature flags and rollout campaigns.
- Validate SDK/environment key generation and access control.
- Validate percentage rollouts, segment-based rollouts, staged rollouts, and kill switch behavior.
- Confirm assignment consistency across sessions and devices where identity is stable.
- Validate rollback, audit history, and exposure/conversion event capture.

### 7.7 Behavior Analytics

- Validate heatmap creation, data capture, device filters, URL filters, scroll maps, and click maps.
- Validate session recording playback, masking, filters, tags, notes, and share links.
- Validate funnel creation, step ordering, drop-off calculations, segment filters, and date ranges.
- Validate form analytics for field focus, hesitation, drop-off, validation errors, and completion.
- Confirm sensitive fields are masked and excluded as configured.

### 7.8 Goals, Segments, and Audiences

- Create goals using page visits, clicks, form submits, revenue, custom events, and JavaScript triggers.
- Validate goal firing accuracy, de-duplication, attribution, and delayed event handling.
- Create reusable segments and audiences.
- Validate include/exclude logic, nested conditions, AND/OR behavior, and preview counts.
- Confirm invalid or conflicting rule combinations show clear validation errors.

### 7.9 Reporting and Data Quality

- Validate dashboard metrics, conversion rates, revenue, confidence/statistical status, lift, and sample size.
- Validate date ranges, timezone handling, segments, filters, and comparison views.
- Validate real-time or near-real-time data freshness expectations.
- Validate export to CSV/PDF, scheduled reports, share links, and permissions.
- Cross-check selected reports against raw/synthetic test events.

### 7.10 Integrations, APIs, and Notifications

- Validate setup, authorization, sync, disconnect, and error handling for enabled integrations.
- Validate analytics integrations such as GA4 or tag managers if included.
- Validate APIs/webhooks for authentication, permissions, rate limits, payload schema, retries, and failure logging.
- Validate notification preferences, campaign alerts, report emails, and support/contact entry points.

### 7.11 Admin, Roles, and Auditability

- Invite, remove, deactivate, and reactivate users.
- Validate role-based access for campaign creation, launch, reporting, billing, integrations, and admin settings.
- Validate audit logs for login, user changes, campaign changes, launches, pauses, and integration changes.
- Validate account verification banners, billing/plan limits, usage limits, and upgrade prompts.

## 8. Non-Functional Test Areas

| Area | Coverage |
| --- | --- |
| Security | Authentication, authorization, RBAC, CSRF, XSS, open redirects, secure cookies, CORS, rate limits, sensitive-data exposure |
| Privacy | PII masking, consent-aware tracking, data deletion/export, recording exclusions, GDPR/CCPA-related controls |
| Performance | App shell load, dashboard load, large report rendering, editor responsiveness, recording playback, export generation |
| Accessibility | Keyboard navigation, focus order, screen reader labels, contrast, form errors, modal/dialog behavior, WCAG 2.2 AA checks |
| Compatibility | Chrome, Firefox, Safari, Edge; desktop and mobile breakpoints; incognito/private browsing |
| Reliability | Retry behavior, partial API failures, network drops, stale sessions, background jobs, duplicate submissions |
| Usability | Clear empty states, validation messages, onboarding guidance, destructive-action confirmations, discoverability |

## 9. Priority Test Scenarios

| Priority | Scenario | Expected Outcome |
| --- | --- | --- |
| P0 | Login with valid admin account | Dashboard loads in correct workspace |
| P0 | Unauthorized user opens protected route | User is redirected or blocked safely |
| P0 | Create and launch A/B campaign | Campaign launches with correct URL, variation, goals, audience, and traffic allocation |
| P0 | Verify tracking code installation | App detects installed snippet and records page/conversion events |
| P0 | Pause active campaign | Campaign stops serving variations without data loss |
| P0 | RBAC blocks restricted action | Non-authorized user cannot launch/edit/administer restricted resources |
| P1 | Create heatmap and collect interactions | Click/scroll data appears with correct filters and masking |
| P1 | Play session recording | Recording loads, masks sensitive fields, and supports filters/tags |
| P1 | Export campaign report | Export matches filtered dashboard data |
| P1 | Create personalized experience | Targeted users see experience; excluded users do not |
| P1 | Configure feature rollout kill switch | Rollout can be stopped quickly and safely |
| P2 | Validate onboarding empty states | New account sees clear setup guidance |
| P2 | Validate browser refresh/deep links | App state remains consistent |
| P2 | Validate help/support actions | Support paths open with useful context |

## 10. Test Data

- Test users for each role and permission level.
- Sandbox website with pages for homepage, product, cart, checkout, form, thank-you, and error states.
- Synthetic visitors with different devices, locations, browsers, cookies, query parameters, and custom attributes.
- Test campaigns in draft, scheduled, running, paused, completed, archived, and deleted states.
- Known conversion events and revenue values for report reconciliation.
- Sample sensitive fields to validate masking and privacy exclusions.

## 11. Execution Plan

| Phase | Duration | Activities | Exit Criteria |
| --- | --- | --- | --- |
| Phase 1: Preparation | 1 day | Confirm access, roles, entitlements, environments, test website, integrations, and test data | Test accounts and sandbox are ready |
| Phase 2: Smoke Testing | 1 day | Validate login, navigation, project setup, tracking detection, campaign draft creation, and basic reports | No P0 blockers |
| Phase 3: Functional Testing | 4 days | Execute core module coverage for campaigns, analytics, personalization, reporting, integrations, and admin | All P0/P1 scenarios executed |
| Phase 4: Non-Functional Testing | 2 days | Run security checks, accessibility scan, browser/device coverage, performance checks, and privacy masking validation | Critical risks documented or resolved |
| Phase 5: Regression and UAT | 2 days | Re-test fixes, run regression suite, validate stakeholder workflows | Sign-off ready |
| Phase 6: Closure | 1 day | Publish test summary, defect metrics, risk list, and release recommendation | Final test report shared |

## 12. Defect Severity

| Severity | Definition | Example |
| --- | --- | --- |
| Critical | Blocks login, launch, data capture, security, or major customer workflows | Users cannot log in or campaigns serve wrong variations |
| High | Breaks important workflow with no acceptable workaround | Reports show incorrect conversion data |
| Medium | Workflow issue with workaround or limited impact | Export fails for one filtered view |
| Low | Cosmetic, copy, minor UX, or edge-case issue | Tooltip alignment issue |

## 13. Entry Criteria

- Test environment is stable and accessible.
- Test accounts, roles, websites, and entitlements are available.
- Tracking/SDK setup can be installed on a sandbox property.
- Test cases and expected outcomes are reviewed.
- Known limitations and excluded modules are documented.

## 14. Exit Criteria

- 100% of P0 and P1 scenarios executed.
- 0 open Critical defects.
- No open High defects without approved workaround or release-risk acceptance.
- Regression completed for fixed defects.
- Test summary includes coverage, defects, risks, and recommendation.

## 15. Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| No authenticated VWO account | Full app flows cannot be verified | Use provided sandbox credentials or limit scope to unauthenticated checks |
| Missing product entitlements | Modules may not be testable | Confirm enabled modules before execution |
| No sandbox website | Tracking, goals, editor, and analytics cannot be validated end-to-end | Use a controlled demo website |
| Third-party integration limits | Integration tests may be incomplete | Use sandbox accounts and mock endpoints where possible |
| Real data privacy constraints | Recordings/reports may expose customer data | Use only synthetic data and masking rules |

## 16. Deliverables

- Reviewed test cases and execution checklist.
- Defect report with severity, repro steps, screenshots/videos, logs, and owner.
- Daily execution status during active testing.
- Final test summary with pass/fail metrics, open risks, and release recommendation.

## 17. References

- `https://app.vwo.com`
- `https://vwo.com`
