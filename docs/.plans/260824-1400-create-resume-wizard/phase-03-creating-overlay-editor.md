# Phase 03: Creating overlay, editor stub, polish

## Objective

- Complete the create path with a staged “Creating your resume…” overlay, navigate to the placeholder editor with a mock id, and polish responsive/footer behavior for a full manual acceptance pass.

## Scope

- Files/modules this phase may touch:
  - `src/components/page/create-resume/CreatingOverlay.tsx` (new)
  - `src/pages/resumes/new/page.tsx` (wire Create / Use this template → overlay)
  - `src/pages/resumes/edit/page.tsx` (show draft name/template from `location.state` if passed)
  - Minor styling fixes in create-resume components / layout
  - Optional: disable Cancel during overlay
- Files/modules this phase must not touch:
  - Real API / RTK Query resume endpoints
  - Real PDF/editor canvas implementation

## Preconditions

- Phase 2 complete: template selection works; Create / Use actions exist or are ready to hook.

## Tasks

1. Context: confirm selected `templateId` + details fields available from draft context before starting overlay.
2. Implement `CreatingOverlay`:
   - Modal/card centered over wizard (dimmed backdrop)
   - Copy: “Creating your resume…” + subtitle with name + template
   - Progress bar + staged checklist:
     1. Creating the resume record
     2. Adding your nine sections
     3. Applying the {Template} template
     4. Opening the editor
   - Drive stages with timers totaling ~2–3 seconds (no network)
   - Footer note: usually takes two or three seconds
3. On final stage: `navigate(/resumes/${id}/edit, { state: { draftSnapshot } })` using a generated id
4. Editor placeholder: display name/template from location state when present; CTA link back to dashboard
5. Polish:
   - Mobile stacking for method cards / template grid
   - Footer actions remain reachable
   - Prevent double-submit while overlay is open
   - Ensure Cancel during overlay either hidden or confirms discard (prefer hide/disable)
6. Verify: `npm run typecheck`, `npm run lint`, optional `npm run build`
7. Confirm full manual acceptance from plan SUMMARY Validation section

## Acceptance Criteria

- User-visible or system-observable result:
  - Create from gallery or preview runs overlay then lands on `/resumes/:id/edit`
  - Overlay stages visibly advance
  - Editor stub shows enough context to prove handoff
- Required changed files: overlay + create handlers + editor placeholder polish
- Required unchanged behavior: no backend create; auth guards intact; dashboard empty state still correct when returning via Cancel before create

## Verification

- Commands:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run build` (final gate)
- Expected results:
  - All pass
- Evidence to record in `SUMMARY.md`:
  - Command exit codes
  - Manual full-flow checklist (dashboard → wizard → overlay → editor)

### Manual full-flow checklist

1. Empty dashboard → Create my first resume
2. Select Template method → Continue
3. Fill Details → Continue
4. Select template → Preview → Use this template (or Create resume from gallery)
5. Overlay completes → editor placeholder
6. Repeat path with Scratch method
7. Cancel from step 2 returns dashboard
8. Logged-out access to `/resumes/new` redirects to login

## Idempotence and Recovery

- Safe to re-run: yes
- Recovery if interrupted: if navigation fires mid-timer, ensure overlay cleanup on unmount (`clearTimeout`)
- Rollback notes: remove overlay and restore disabled Create handler

## Exit Criteria

- [ ] Overlay implemented with staged progress
- [ ] Navigation to editor stub works with mock id
- [ ] Double-submit prevented
- [ ] Full manual checklist done
- [ ] typecheck + lint (+ build) pass
- [ ] Plan SUMMARY Progress/Phases/Outcomes updated for handoff completion
