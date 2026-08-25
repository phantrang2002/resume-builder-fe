import type { CreateResumeLocationState } from "@/shared/types";
import { ROUTER_PATH } from "@/shared/constants";
import { Link, useLocation, useParams } from "react-router-dom";

export default function ResumeEditorPlaceholderPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = (location.state as CreateResumeLocationState | null) ?? null;
  const draft = state?.draftSnapshot;
  const resumeName = draft?.name?.trim() || "Untitled resume";
  const templateName = state?.templateName;
  const targetJobTitle = draft?.targetJobTitle?.trim();

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex shrink-0 items-center justify-between border-b border-[#E5E3DE] bg-white px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="inline-flex shrink-0 items-baseline gap-1.5 font-serif text-[20px] font-semibold leading-none tracking-tight text-[#333333]">
            Rezum
            <span className="size-[5px] shrink-0 rounded-full bg-primary" aria-hidden="true" />
          </div>
          <span className="truncate text-sm font-medium text-pageTitle">{resumeName}</span>
        </div>
        <Link
          to={ROUTER_PATH.DASHBOARD}
          className="rounded-lg px-3 py-2 text-sm font-medium text-subtle transition-colors hover:bg-gray-50 hover:text-pageTitle"
        >
          Back to dashboard
        </Link>
      </header>

      <main className="flex min-h-0 flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-lg rounded-2xl border border-[#E5E3DE] bg-white p-8 text-center">
          <h1 className="font-serif text-2xl font-semibold text-pageTitle">Editor coming soon</h1>
          <p className="mt-3 text-sm leading-relaxed text-subtle">
            Your create flow handed off successfully. The full editor will land here in a later
            release.
          </p>

          <dl className="mt-6 space-y-2 rounded-xl bg-lightBg px-4 py-4 text-left text-sm">
            {id ? (
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">Resume id</dt>
                <dd className="truncate font-mono text-xs text-pageTitle">{id}</dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-3">
              <dt className="text-subtle">Name</dt>
              <dd className="truncate font-medium text-pageTitle">{resumeName}</dd>
            </div>
            {templateName ? (
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">Template</dt>
                <dd className="truncate font-medium text-pageTitle">{templateName}</dd>
              </div>
            ) : null}
            {targetJobTitle ? (
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">Target role</dt>
                <dd className="truncate font-medium text-pageTitle">{targetJobTitle}</dd>
              </div>
            ) : null}
          </dl>

          <Link
            to={ROUTER_PATH.DASHBOARD}
            className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
