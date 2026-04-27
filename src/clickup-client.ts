import { AsyncLocalStorage } from "node:async_hooks";

const BASE_URL = "https://api.clickup.com/api/v2";

// Per-connection token storage — used by the HTTP/SSE multi-tenant server.
// Falls back to CLICKUP_API_TOKEN env var for stdio (local) usage.
export const tokenStorage = new AsyncLocalStorage<string>();

export function getApiToken(): string {
  const token = tokenStorage.getStore() ?? process.env.CLICKUP_API_TOKEN;
  if (!token) throw new Error("CLICKUP_API_TOKEN not set. Pass it via ?token= in the SSE URL or set the env var.");
  return token;
}

export async function clickupRequest<T>(
  method: string,
  path: string,
  body?: unknown,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const token = getApiToken();

  let url = `${BASE_URL}${path}`;
  if (params) {
    const qs = Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join("&");
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // ClickUp returns 204 No Content for successful deletes — guard before parsing
  const contentType = res.headers.get("content-type") ?? "";
  const hasBody = res.status !== 204 && contentType.includes("application/json");
  const data = hasBody ? await res.json() : {};

  if (!res.ok) {
    throw new Error(`ClickUp API error ${res.status}: ${JSON.stringify(data)}`);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, params?: Record<string, string | number | boolean | undefined>) =>
    clickupRequest<T>("GET", path, undefined, params),
  post: <T>(path: string, body?: unknown) =>
    clickupRequest<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) =>
    clickupRequest<T>("PUT", path, body),
  patch: <T>(path: string, body?: unknown) =>
    clickupRequest<T>("PATCH", path, body),
  delete: <T>(path: string, body?: unknown) =>
    clickupRequest<T>("DELETE", path, body),
};
