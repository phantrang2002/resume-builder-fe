let accessToken: string | null = null;

/** In-memory access token — cleared on page reload. */
export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string): void {
  accessToken = token;
}

export function clearAccessToken(): void {
  accessToken = null;
}

export function hasAccessToken(): boolean {
  return Boolean(accessToken);
}
