import type { UserProfile, UserRole } from "@/shared/types";

export type SessionPayload = {
  userId: number;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  initTime: string;
};

export type AuthState = {
  session: SessionPayload | null;
  isBootstrapped: boolean;
};

export function profileToSession(profile: UserProfile): SessionPayload {
  return {
    userId: profile.id,
    email: profile.email,
    role: profile.role,
    firstName: profile.profile?.firstName,
    lastName: profile.profile?.lastName,
    initTime: new Date().toISOString(),
  };
}
