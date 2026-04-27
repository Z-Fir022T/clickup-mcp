import { getApiToken } from "../clickup-client.js";

const BASE_V3 = "https://api.clickup.com/api/v3";

async function v3Fetch<T>(method: string, path: string, body?: unknown): Promise<T> {
  const token = getApiToken();
  const res = await fetch(`${BASE_V3}${path}`, {
    method,
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`ClickUp v3 API error ${res.status}: ${JSON.stringify(data)}`);
  return data as T;
}

export const v3DocTools = [
  {
    name: "create_doc",
    description: "Create a new doc in a workspace (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        name: { type: "string" },
        parent: {
          type: "object",
          description: "Parent location: { id: string, type: number }",
        },
        visibility: { type: "string", description: "public or private" },
        create_page: { type: "boolean" },
      },
      required: ["workspace_id", "name"],
    },
    handler: async (args: { workspace_id: string; [key: string]: unknown }) => {
      const { workspace_id, ...body } = args;
      return v3Fetch("POST", `/workspaces/${workspace_id}/docs`, body);
    },
  },
  {
    name: "create_doc_page",
    description: "Create a page in a doc (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        doc_id: { type: "string" },
        name: { type: "string" },
        content: { type: "string", description: "Page content in markdown" },
        sub_title: { type: "string" },
        parent_page_id: { type: "string" },
      },
      required: ["workspace_id", "doc_id", "name"],
    },
    handler: async (args: {
      workspace_id: string;
      doc_id: string;
      [key: string]: unknown;
    }) => {
      const { workspace_id, doc_id, ...body } = args;
      return v3Fetch(
        "POST",
        `/workspaces/${workspace_id}/docs/${doc_id}/pages`,
        body
      );
    },
  },
  {
    name: "update_doc_page",
    description: "Update a doc page content (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        doc_id: { type: "string" },
        page_id: { type: "string" },
        name: { type: "string" },
        content: { type: "string" },
        content_edit_mode: {
          type: "string",
          description: "overwrite or append (default: overwrite)",
        },
      },
      required: ["workspace_id", "doc_id", "page_id"],
    },
    handler: async (args: {
      workspace_id: string;
      doc_id: string;
      page_id: string;
      [key: string]: unknown;
    }) => {
      const { workspace_id, doc_id, page_id, ...body } = args;
      return v3Fetch(
        "PUT",
        `/workspaces/${workspace_id}/docs/${doc_id}/pages/${page_id}`,
        body
      );
    },
  },
  {
    name: "get_doc_page",
    description: "Get a single page from a doc by page ID (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        doc_id: { type: "string" },
        page_id: { type: "string" },
      },
      required: ["workspace_id", "doc_id", "page_id"],
    },
    handler: async (args: {
      workspace_id: string;
      doc_id: string;
      page_id: string;
    }) =>
      v3Fetch(
        "GET",
        `/workspaces/${args.workspace_id}/docs/${args.doc_id}/pages/${args.page_id}`
      ),
  },
  {
    name: "delete_doc_page",
    description: "Delete a page from a doc (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        doc_id: { type: "string" },
        page_id: { type: "string" },
      },
      required: ["workspace_id", "doc_id", "page_id"],
    },
    handler: async (args: {
      workspace_id: string;
      doc_id: string;
      page_id: string;
    }) =>
      v3Fetch(
        "DELETE",
        `/workspaces/${args.workspace_id}/docs/${args.doc_id}/pages/${args.page_id}`
      ),
  },
];
