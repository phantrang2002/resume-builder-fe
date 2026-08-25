export type UserAvatarSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<UserAvatarSize, { box: string; text: string }> = {
  sm: {
    box: "size-[28px]",
    text: "text-[10px]",
  },
  md: {
    box: "size-[36px]",
    text: "text-xs",
  },
  lg: {
    box: "size-[56px]",
    text: "text-base",
  },
};

export function getUserInitials(firstName?: string, lastName?: string, email?: string) {
  const fromName = [firstName?.[0], lastName?.[0]].filter(Boolean).join("");
  if (fromName) {
    return fromName.toUpperCase();
  }
  return (email?.[0] ?? "?").toUpperCase();
}

type UserAvatarProps = {
  initials: string;
  size?: UserAvatarSize;
  className?: string;
  "aria-label"?: string;
};

export default function UserAvatar({
  initials,
  size = "sm",
  className = "",
  "aria-label": ariaLabel = "User profile",
}: UserAvatarProps) {
  const styles = SIZE_CLASSES[size];

  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center rounded-full border border-[#C4D2E3] bg-[#F2F5F9] font-semibold tracking-wide text-[#253D5D]",
        styles.box,
        styles.text,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={ariaLabel}
    >
      {initials}
    </div>
  );
}
