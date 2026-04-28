import { clickupV3Request } from "../clickup-client-v3.js";

export const docTools = [
  {
    name: "search_docs",
    description: "Search docs in a workspace. Backward-compatible alias that now uses API v3.",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        id: { type: "string", description: "Filter by doc ID" },
        creator: { type: "number", description: "Filter by creator user ID" },
        deleted: { type: "boolean" },
        archived: { type: "boolean" },
        parent_id: { type: "string" },
        parent_type: { type: "string" },
        limit: { type: "number" },
        cursor: { type: "string" },
        next_cursor: { type: "string", description: "Deprecated cursor parameter" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string; [key: string]: unknown }) => {
      const { team_id, ...params } = args;
      return clickupV3Request(
        "GET",
        `/api/v3/workspaces/${team_id}/docs`,
        { params: params as Record<string, string | number | boolean | undefined> }
      );
    },
  },
  {
    name: "get_doc",
    description: "Get a specific doc by ID. Backward-compatible alias that now uses API v3.",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        doc_id: { type: "string" },
      },
      required: ["team_id", "doc_id"],
    },
    handler: async (args: { team_id: string; doc_id: string }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.team_id}/docs/${args.doc_id}`
      ),
  },
  {
    name: "get_doc_pages",
    description: "Get all pages of a doc. Backward-compatible alias that now uses API v3.",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        doc_id: { type: "string" },
        max_page_depth: { type: "number" },
        content_format: { type: "string", description: "text/md or text/plain" },
      },
      required: ["team_id", "doc_id"],
    },
    handler: async (args: {
      team_id: string;
      doc_id: string;
      max_page_depth?: number;
      content_format?: string;
    }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.team_id}/docs/${args.doc_id}/pages`,
        {
          params: {
            max_page_depth: args.max_page_depth,
            content_format: args.content_format,
          },
        }
      ),
  },
];
