import { getApiToken } from "./clickup-client.js";

const BASE_V3 = "https://api.clickup.com";

type Primitive = string | number | boolean | undefined;

type V3RequestOptions = {
  body?: BodyInit | Record<string, unknown> | unknown[];
  params?: Record<string, Primitive>;
  headers?: Record<string, string>;
};

function buildQuery(params?: Record<string, Primitive>): string {
  if (!params) return "";

  const qs = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join("&");

  return qs ? `?${qs}` : "";
}

function isBodyInit(value: unknown): value is BodyInit {
  return value instanceof FormData || value instanceof Blob || value instanceof URLSearchParams;
}

export async function clickupV3Request<T>(
  method: string,
  path: string,
  options: V3RequestOptions = {}
): Promise<T> {
  const token = getApiToken();
  const url = `${BASE_V3}${path}${buildQuery(options.params)}`;
  const headers: Record<string, string> = {
    Authorization: token,
    ...(options.headers ?? {}),
  };

  let body: BodyInit | undefined;
  if (options.body !== undefined) {
    if (isBodyInit(options.body)) {
      body = options.body;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(options.body);
    }
  }

  const res = await fetch(url, {
    method,
    headers,
    body,
  });

  const contentType = res.headers.get("content-type") ?? "";
  const hasJsonBody = res.status !== 204 && contentType.includes("application/json");
  const hasTextBody = res.status !== 204 && !hasJsonBody && contentType.startsWith("text/");

  const data = hasJsonBody ? await res.json() : hasTextBody ? await res.text() : {};

  if (!res.ok) {
    throw new Error(`ClickUp v3 API error ${res.status}: ${typeof data === "string" ? data : JSON.stringify(data)}`);
  }

  return data as T;
}
