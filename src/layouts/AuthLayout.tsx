import AuthPromoPanel from "@/components/layout/AuthPromoPanel";
import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-[5fr_7fr]">
      <div className="hidden min-h-screen lg:block">
        <AuthPromoPanel />
      </div>

      <section className="flex items-center justify-center bg-white px-6 py-10 sm:px-10">
        <div className="w-full max-w-[420px]">{children}</div>
      </section>
    </main>
  );
}
