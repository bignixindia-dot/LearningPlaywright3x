# Test Plan - VWO-49: [VWO] Add Passkey and SSO Login Options to VWO Login Page

> Status: **DRAFT - pending human review.** Not approved until a QA owner signs off.

## Ticket Snapshot

- **Jira key:** VWO-49
- **Type:** Story
- **Jira priority field:** Medium
- **Description priority:** High
- **Epic:** Authentication Enhancements
- **Components:** Not specified
- **Fix version:** Not specified
- **Labels:** Not specified
- **Linked issues:** None
- **Attachments:** None

## 1. Scope & Objectives

- **In scope:**
  - Verify the VWO login page displays `Sign in using SSO` and `Sign in with Passkey` below `Sign in with Google`.
  - Verify successful and failed SSO login behavior for configured identity providers.
  - Verify successful and failed passkey login behavior for registered passkeys, missing passkeys, unsupported devices, and unsupported browsers.
  - Verify user redirect to dashboard after successful authentication.
  - Verify authentication error messaging, security behavior, accessibility, responsiveness, and regression impact on existing login methods.
- **Out of scope:**
  - Passkey registration flow, because the ticket explicitly says it is covered in a separate story.
  - SSO provider configuration, because the ticket explicitly excludes it.
  - Backend identity-provider provisioning unless required to execute the login flow.
  - New dashboard functionality after login.
- **Objective:**
  - Testing means proving that the new SSO and Passkey login options are visible, usable, secure, accessible, compatible with supported environments, and do not regress existing login methods.

## 2. Gaps & Questions for the author

### Requirement Checklist Result

| Area | Checklist item | Status | Notes |
|---|---|---:|---|
| Functional | Clear user story / goal | ✅ | Story explains secure and convenient login via SSO or Passkey. |
| Functional | Acceptance criteria are testable | ⚠️ | Core paths are testable, but wording like proper, fallback, supported, and configured is not concrete. |
| Functional | Happy path fully described | ⚠️ | SSO and Passkey success paths are present, but provider selection, callback, account mapping, and session behavior are not defined. |
| Functional | Negative / error paths described | ⚠️ | Error categories are listed, but exact trigger conditions and expected messages are missing. |
| Functional | Boundary and empty states | ⚠️ | No-passkey state is listed, but first-time user, multiple passkeys, disabled passkey, multiple IdPs, and locked accounts are not covered. |
| Functional | State transitions / workflow steps | ⚠️ | Login to dashboard is described, but redirect/callback/session transitions are not enumerated. |
| Data & environment | Required test data specified | ❌ | No test users, IdPs, registered passkeys, account states, or device data are named. |
| Data & environment | Environment / config / feature flags named | ❌ | DoD mentions staging, but no environment URL, flag, tenant, or rollout config is specified. |
| Data & environment | External dependencies and integrations listed | ⚠️ | SSO, OAuth/SAML, and WebAuthn are implied, but actual providers and passkey platforms are missing. |
| Data & environment | Preconditions / setup stated | ⚠️ | Some preconditions are implied, but user state and provider setup are not listed. |
| Non-functional | Performance / load expectations | ❌ | No login-page or authentication redirect timing expectations are specified. |
| Non-functional | Security / authorization | ⚠️ | Secure protocols and no sensitive exposure are stated, but concrete controls are not listed. |
| Non-functional | Accessibility expectations | ⚠️ | Accessibility is mentioned in test scenarios, but WCAG target and expected keyboard/screen-reader behavior are absent. |
| Non-functional | Internationalization / localization | ❌ | No language, locale, or translated error-message expectations are specified. |
| Non-functional | Audit / logging / observability | ❌ | No login event, failure event, or security telemetry expectations are specified. |
| Cross-cutting | Impact on existing features | ❌ | Regression scope for email/password, Google login, forgot password, and account verification is not specified. |
| Cross-cutting | Backward compatibility / migration | ❌ | No behavior is defined for existing users without passkeys or SSO. |
| Cross-cutting | Mobile / responsive / browser matrix | ⚠️ | Supported browsers/devices are referenced but not named. |
| Cross-cutting | Rollback / feature-flag behavior | ❌ | No rollback or flag behavior is specified. |
| Clarity | No ambiguous wording | ⚠️ | Ambiguous terms include seamlessly, smooth, proper error messages, fallback or guidance, supported browsers/devices, and configured identity providers. |
| Clarity | Terms defined consistently | ⚠️ | Passkey, SSO, supported environment, and configured provider are not explicitly defined. |
| Clarity | Mockups / designs linked | ❌ | No screenshot, Figma, or visual placement reference is attached. |

### Open Questions

| # | Area | Finding | Question to author |
|---|---|---|---|
| 1 | Priority | Jira priority is Medium but description says High. | Which priority should QA use for risk and release gating? |
| 2 | SSO provider | "All configured identity providers" is not enumerated. | Which IdPs must be tested for this story, such as Okta, Azure AD, Google Workspace, OneLogin, or custom SAML? |
| 3 | SSO entry flow | Button behavior is not described. | After clicking `Sign in using SSO`, does the user enter email/domain first, select an IdP, or get redirected directly? |
| 4 | SSO errors | Error message text is not defined. | What exact messages should appear for invalid credentials, canceled IdP login, disabled user, unassigned user, expired session, and provider outage? |
| 5 | Account mapping | User provisioning rules are missing. | Should SSO auto-provision users, require an existing VWO user, or block unknown users? |
| 6 | Passkey support | Supported browser/device matrix is missing. | Which browsers, OS versions, devices, and authenticators are officially supported for passkey login? |
| 7 | Passkey fallback | "Fallback or guidance message" is vague. | What should happen if no passkey exists: show message only, suggest password login, route to registration, or show support guidance? |
| 8 | Passkey failures | Failure states are broad. | What should happen for biometric failure, user cancellation, authenticator timeout, revoked passkey, and mismatched account? |
| 9 | Existing login regression | Regression scope is not specified. | Should email/password, Google login, forgot password, account verification, and logout be included in release sign-off? |
| 10 | Security | Protocol requirements are high level. | Which security checks are mandatory: CSRF state validation, secure cookies, no token in URL, no PII in logs, replay protection, rate limits? |
| 11 | Accessibility | Accessibility target is missing. | Should this meet WCAG 2.2 AA, and are there required labels, focus order, and keyboard-only flows? |
| 12 | Performance | No timing target is defined. | What are acceptable page-load, IdP redirect, passkey prompt, and dashboard redirect timings? |
| 13 | Observability | Audit logging is absent. | Should successful and failed SSO/passkey attempts be logged in audit/security telemetry? |
| 14 | Feature control | Rollback behavior is absent. | Is this behind a feature flag, tenant allowlist, or phased rollout control? |
| 15 | Design | No mockup is linked. | Is there an approved design for button copy, order, spacing, icons, responsive placement, and disabled/unsupported states? |

## 3. Test Scenarios

| ID | Priority | Type | Scenario | Maps to |
|---|---:|---|---|---|
| TS-01 | P0 | Positive | Open the login page and verify `Sign in using SSO` and `Sign in with Passkey` are visible below `Sign in with Google`. | AC1 |
| TS-02 | P0 | Regression | Verify existing email/password login still appears and authenticates successfully. | Gap 9 |
| TS-03 | P0 | Regression | Verify existing Google login still appears above the new buttons and authenticates successfully. | AC1, Gap 9 |
| TS-04 | P1 | UI | Verify button copy, order, spacing, icons if applicable, hover/focus states, and disabled states match approved design. | AC1, Gap 15 |
| TS-05 | P1 | Responsive | Verify button layout on desktop, tablet, and mobile breakpoints without overlap or clipping. | AC5, Gap 6 |
| TS-06 | P0 | Positive | Click `Sign in using SSO`, complete valid IdP authentication, and verify redirect to the dashboard. | AC2 |
| TS-07 | P0 | Negative | Attempt SSO with invalid credentials and verify the user remains unauthenticated with a clear error message. | AC2, AC4 |
| TS-08 | P0 | Negative | Cancel SSO authentication at the IdP and verify the login page handles the return safely. | AC4, Gap 4 |
| TS-09 | P0 | Negative | Attempt SSO with a valid IdP user who is not authorized for the VWO account and verify access is blocked. | Gap 5 |
| TS-10 | P0 | Security | Verify SSO callback validates state/nonce and rejects tampered or replayed callback requests. | AC6, Gap 10 |
| TS-11 | P1 | Integration | Verify each configured IdP follows the expected login and error behavior. | AC5, Gap 2 |
| TS-12 | P1 | Boundary | Verify SSO behavior for a user mapped to multiple VWO accounts or workspaces. | Gap 5 |
| TS-13 | P0 | Positive | Click `Sign in with Passkey`, authenticate with a registered passkey, and verify redirect to dashboard. | AC3 |
| TS-14 | P0 | Negative | Attempt passkey login when no passkey is registered and verify the expected guidance/fallback message. | AC3, AC4, Gap 7 |
| TS-15 | P0 | Negative | Fail passkey authentication through biometric/PIN failure and verify the user remains unauthenticated. | AC4, Gap 8 |
| TS-16 | P1 | Negative | Cancel the browser passkey prompt and verify the login page recovers without stale loading state. | AC4, Gap 8 |
| TS-17 | P1 | Boundary | Let the passkey prompt time out and verify the expected timeout handling and retry option. | AC4, Gap 8 |
| TS-18 | P1 | Boundary | Verify behavior when multiple registered passkeys are available for the same user. | Gap 8 |
| TS-19 | P0 | Compatibility | Verify passkey login on supported browsers/devices from the approved matrix. | AC5, Gap 6 |
| TS-20 | P0 | Compatibility | Verify unsupported browsers/devices show a clear unsupported/guidance message and do not start a broken passkey flow. | AC4, AC5 |
| TS-21 | P0 | Security | Verify SSO and Passkey login do not expose credentials, assertions, access tokens, or sensitive identifiers in UI, URLs, console logs, or network logs. | AC6, Gap 10 |
| TS-22 | P0 | Security | Verify authenticated sessions use secure cookies/session storage and cannot be created after failed SSO/passkey attempts. | AC6 |
| TS-23 | P1 | Accessibility | Verify both new buttons are keyboard reachable, have visible focus, have accessible names, and work with screen-reader navigation. | Gap 11 |
| TS-24 | P1 | Accessibility | Verify error and guidance messages are announced to assistive technologies and are associated with the triggering control. | AC4, Gap 11 |
| TS-25 | P1 | Performance | Measure login page load, SSO redirect round trip, passkey prompt start, and dashboard redirect against agreed targets. | Gap 12 |
| TS-26 | P2 | Localization | Verify new button labels and error/guidance messages are localizable or remain acceptable in supported locales. | Gap 14 |
| TS-27 | P1 | Observability | Verify successful and failed SSO/passkey login attempts emit required security/audit events if logging is in scope. | Gap 13 |
| TS-28 | P1 | Rollback | If feature flagged, disable the flag and verify the new buttons disappear while existing login methods continue working. | Gap 14 |
| TS-29 | P1 | Error handling | Simulate IdP outage/network failure and verify a clear recoverable error, retry path, and no partial login. | AC4, Gap 4 |
| TS-30 | P2 | Browser history | After failed and successful SSO/passkey attempts, verify back/refresh behavior does not expose stale auth state. | AC6 |

## 4. Test Data & Environment

- **Data:**
  - User with existing VWO account and valid email/password credentials.
  - User with valid Google login, if Google auth is available in the environment.
  - User with valid SSO access for each configured IdP.
  - User with valid IdP credentials but no VWO account or no account access.
  - User with registered passkey.
  - User with no registered passkey.
  - User with multiple registered passkeys, if supported.
  - Locked, disabled, or deactivated user, if supported by current authentication rules.
- **Environment / flags:**
  - Staging or QA environment with the new login options deployed.
  - VWO tenant/account configured for SSO login.
  - Passkey/WebAuthn enabled over HTTPS.
  - Feature flag or tenant allowlist details, if applicable.
  - Browser/device matrix approved by product and engineering.
- **Roles / permissions:**
  - Standard active user.
  - Admin user if SSO/passkey behavior varies by role.
  - Deactivated or access-revoked user.
  - New/unprovisioned SSO user if account mapping is in scope.

## 5. Risks & Assumptions

- **Assumptions made:**
  - `Sign in with Google` already exists and must remain above the new SSO and Passkey buttons.
  - A successful login by any supported method lands the user on the same default dashboard.
  - SSO provider setup and passkey registration are already available in the test environment.
  - The new options are enabled for the target test tenant.
  - Security validation is required because the story changes authentication entry points.
- **Risks:**
  - Priority mismatch can cause under-testing if the team treats this as Medium while the description says High.
  - Passkey behavior varies heavily by OS, browser, authenticator, and device state.
  - SSO behavior can differ across IdPs and account provisioning models.
  - Missing design references can cause UI placement disputes late in QA.
  - Weak error handling can lock users out or leak sensitive authentication details.
  - Regression in existing login methods would block all users, even if new methods work.

## 6. Entry / Exit criteria

- **Entry:**
  - VWO-49 is deployed to a QA/staging environment.
  - Test tenant has SSO enabled and at least one configured IdP.
  - Test tenant has passkey login enabled and at least one user with a registered passkey.
  - Existing login methods are available for regression testing.
  - Product/engineering confirms supported browser/device matrix.
  - Expected error/guidance messages are provided or approved during review.
- **Exit:**
  - All P0 scenarios are executed and pass, or have approved release-risk exceptions.
  - All P1 scenarios are executed or explicitly deferred by QA/product.
  - No Critical or High defects remain open for authentication success, authentication failure, security, or existing login regression.
  - Product/engineering answers open questions that affect sign-off.
  - QA owner reviews and approves the draft test plan.

---

## HUMAN REVIEW GATE

- **I assumed:**
  - SSO and passkey setup already exists in the target environment.
  - Existing email/password and Google login are regression-critical.
  - The new buttons are part of the same login page and not a separate route.
  - Dashboard redirect is the expected success destination for both new methods.
- **I could not confirm:**
  - Exact IdPs to test.
  - Exact supported browser/device matrix for passkeys.
  - Exact error and guidance message text.
  - Whether the feature is behind a flag or tenant rollout.
  - Whether audit/security telemetry is required.
  - Whether WCAG 2.2 AA is the accessibility target.
- **Open questions blocking sign-off:**
  - Resolve the priority mismatch: Medium in Jira field vs High in description.
  - Provide IdP list and SSO entry flow behavior.
  - Provide supported passkey browser/device matrix.
  - Provide expected error/guidance copy.
  - Confirm whether existing login methods are part of release sign-off.
  - Confirm security, performance, accessibility, logging, and rollback requirements.
- **Reviewer action:**
  - Approve or edit this draft before test cases or automation are written.
