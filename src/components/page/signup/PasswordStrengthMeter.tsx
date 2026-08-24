const SEGMENT_COUNT = 4;

function scorePassword(password: string): number {
  if (!password) {
    return 0;
  }

  let score = 0;
  if (password.length >= 10) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return Math.min(score, SEGMENT_COUNT);
}

function strengthLabel(score: number): string {
  if (score <= 1) return "Weak password";
  if (score === 2) return "Fair password";
  return "Strong password";
}

function strengthColor(score: number): string {
  if (score <= 1) return "bg-error";
  if (score === 2) return "bg-amber-500";
  return "bg-[#2D9F6F]";
}

function labelColor(score: number): string {
  if (score <= 1) return "text-error";
  if (score === 2) return "text-amber-600";
  return "text-[#2D9F6F]";
}

type PasswordStrengthMeterProps = {
  password: string;
};

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (!password) {
    return null;
  }

  const score = scorePassword(password);
  const filledClass = strengthColor(score);

  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1.5" role="meter" aria-valuemin={0} aria-valuemax={SEGMENT_COUNT} aria-valuenow={score} aria-label="Password strength">
        {Array.from({ length: SEGMENT_COUNT }, (_, index) => (
          <span
            key={index}
            className={[
              "h-1.5 flex-1 rounded-full transition-colors",
              index < score ? filledClass : "bg-[#E8E6E1]",
            ].join(" ")}
          />
        ))}
      </div>
      <p className={["mt-1.5 text-sm font-medium", labelColor(score)].join(" ")}>{strengthLabel(score)}</p>
    </div>
  );
}
