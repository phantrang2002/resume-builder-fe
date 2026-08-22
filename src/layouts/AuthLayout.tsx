import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-lightBg">
      <section className="w-[min(92vw,480px)] rounded-lg bg-white px-10 py-10 shadow-sm">
        {children}
      </section>
    </main>
  );
}
