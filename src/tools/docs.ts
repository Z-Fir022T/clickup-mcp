import { api } from "../clickup-client.js";

export const docTools = [
  {
    name: "search_docs",
    description: "Search docs in a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        query: { type: "string", description: "Search query" },
        parent_id: { type: "string" },
        parent_type: { type: "string" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string; [key: string]: unknown }) => {
      const { team_id, ...params } = args;
      return api.get(
        `/team/${team_id}/docs`,
        params as Record<string, string | number | boolean | undefined>
      );
    },
  },
  {
    name: "get_doc",
    description: "Get a specific doc by ID",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        doc_id: { type: "string" },
      },
      required: ["team_id", "doc_id"],
    },
    handler: async (args: { team_id: string; doc_id: string }) =>
      api.get(`/team/${args.team_id}/docs/${args.doc_id}`),
  },
  {
    name: "get_doc_pages",
    description: "Get all pages of a doc",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        doc_id: { type: "string" },
        max_page_depth: { type: "number" },
      },
      required: ["team_id", "doc_id"],
    },
    handler: async (args: { team_id: string; doc_id: string; max_page_depth?: number }) =>
      api.get(`/team/${args.team_id}/docs/${args.doc_id}/pages`, {
        max_page_depth: args.max_page_depth,
      }),
  },
];
