import { getApiToken } from "../clickup-client.js";

const BASE_V3 = "https://api.clickup.com/api/v3";

async function v3Request<T>(
  method: string,
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const token = getApiToken();
  let url = `${BASE_V3}${path}`;
  if (params) {
    const qs = Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join("&");
    if (qs) url += `?${qs}`;
  }
  const res = await fetch(url, {
    method,
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`ClickUp v3 API error ${res.status}: ${JSON.stringify(data)}`);
  return data as T;
}

export const auditTools = [
  {
    name: "get_audit_logs",
    description:
      "Get audit logs for a workspace (API v3, requires Enterprise plan)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        start_date: { type: "string", description: "ISO 8601 date" },
        end_date: { type: "string" },
        event_type: { type: "string" },
        user_id: { type: "number" },
        cursor: { type: "string" },
        limit: { type: "number", description: "Max 100" },
      },
      required: ["workspace_id"],
    },
    handler: async (args: { workspace_id: string; [key: string]: unknown }) => {
      const { workspace_id, ...params } = args;
      return v3Request(
        "GET",
        `/workspaces/${workspace_id}/auditlogs`,
        params as Record<string, string | number | boolean | undefined>
      );
    },
  },
];
