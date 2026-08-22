import authResumePreview from "@/assets/images/auth-resume-preview.png";
import { CheckOutlined } from "@ant-design/icons";

const FEATURES = [
  "3 print-ready templates",
  "ATS-safe output",
  "Free to export",
] as const;

export default function AuthPromoPanel() {
  return (
    <aside className="relative flex min-h-screen flex-col overflow-hidden bg-authNavy px-[56px] py-[56px]">
      <div className="inline-flex shrink-0 items-baseline gap-[8px] font-serif text-[26px] leading-none tracking-tight text-white">
        Rezum
        <span className="size-[5px] shrink-0 rounded-full bg-white/50" aria-hidden="true" />
      </div>

      <div className="mt-14 w-full shrink-0">
        <h1 className="font-serif text-[50px] font-semibold leading-[1.1] text-white">
          A resume you can actually keep up to date.
        </h1>
        <p className="mt-4 text-base leading-[1.6] text-white/70">
          Edit on the left, watch the page on the right. Export a PDF that looks exactly like what
          you saw.
        </p>
      </div>

      <div className="relative mt-8 min-h-0 w-full flex-1 overflow-hidden">
        <img
          src={authResumePreview}
          alt="Sample resume preview for Nguyen Minh Tran, Backend Engineer"
          className="w-full rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
        />
      </div>

      <ul className="mt-6 flex w-full shrink-0 flex-wrap items-center gap-x-8 gap-y-2 text-[14px] leading-none text-white/90">
        {FEATURES.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <CheckOutlined className="text-[12px] text-white/90" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
