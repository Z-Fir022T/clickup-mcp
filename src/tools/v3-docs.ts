import { clickupV3Request } from "../clickup-client-v3.js";

type Params = Record<string, string | number | boolean | undefined>;

export const v3DocTools = [
  {
    name: "search_docs_v3",
    description: "Search docs in a workspace using API v3",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        id: { type: "string" },
        creator: { type: "number" },
        deleted: { type: "boolean" },
        archived: { type: "boolean" },
        parent_id: { type: "string" },
        parent_type: { type: "string" },
        limit: { type: "number" },
        cursor: { type: "string" },
        next_cursor: { type: "string", description: "Deprecated cursor parameter" },
      },
      required: ["workspace_id"],
    },
    handler: async (args: { workspace_id: string; [key: string]: unknown }) => {
      const { workspace_id, ...params } = args;
      return clickupV3Request("GET", `/api/v3/workspaces/${workspace_id}/docs`, {
        params: params as Params,
      });
    },
  },
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
          description: "Parent location: { id: string, type: number | string }",
        },
        visibility: { type: "string", description: "public or private" },
        create_page: { type: "boolean" },
      },
      required: ["workspace_id", "name"],
    },
    handler: async (args: { workspace_id: string; [key: string]: unknown }) => {
      const { workspace_id, ...body } = args;
      return clickupV3Request("POST", `/api/v3/workspaces/${workspace_id}/docs`, { body });
    },
  },
  {
    name: "get_doc_v3",
    description: "Get a specific doc by ID using API v3",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        doc_id: { type: "string" },
      },
      required: ["workspace_id", "doc_id"],
    },
    handler: async (args: { workspace_id: string; doc_id: string }) =>
      clickupV3Request("GET", `/api/v3/workspaces/${args.workspace_id}/docs/${args.doc_id}`),
  },
  {
    name: "get_doc_page_listing",
    description: "Get the page tree listing for a doc (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        doc_id: { type: "string" },
        max_page_depth: { type: "number" },
      },
      required: ["workspace_id", "doc_id"],
    },
    handler: async (args: { workspace_id: string; doc_id: string; max_page_depth?: number }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.workspace_id}/docs/${args.doc_id}/page_listing`,
        { params: { max_page_depth: args.max_page_depth } }
      ),
  },
  {
    name: "get_doc_pages_v3",
    description: "Get all pages of a doc using API v3",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        doc_id: { type: "string" },
        max_page_depth: { type: "number" },
        content_format: { type: "string", description: "text/md or text/plain" },
      },
      required: ["workspace_id", "doc_id"],
    },
    handler: async (args: {
      workspace_id: string;
      doc_id: string;
      max_page_depth?: number;
      content_format?: string;
    }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.workspace_id}/docs/${args.doc_id}/pages`,
        { params: { max_page_depth: args.max_page_depth, content_format: args.content_format } }
      ),
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
        content: { type: "string", description: "Page content" },
        content_format: { type: "string", description: "text/md or text/plain" },
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
      return clickupV3Request(
        "POST",
        `/api/v3/workspaces/${workspace_id}/docs/${doc_id}/pages`,
        { body }
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
        content_format: { type: "string", description: "text/md or text/plain" },
      },
      required: ["workspace_id", "doc_id", "page_id"],
    },
    handler: async (args: {
      workspace_id: string;
      doc_id: string;
      page_id: string;
      content_format?: string;
    }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.workspace_id}/docs/${args.doc_id}/pages/${args.page_id}`,
        { params: { content_format: args.content_format } }
      ),
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
        sub_title: { type: "string" },
        content: { type: "string" },
        content_edit_mode: {
          type: "string",
          description: "replace, append, or prepend",
        },
        content_format: { type: "string", description: "text/md or text/plain" },
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
      return clickupV3Request(
        "PUT",
        `/api/v3/workspaces/${workspace_id}/docs/${doc_id}/pages/${page_id}`,
        { body }
      );
    },
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
      clickupV3Request(
        "DELETE",
        `/api/v3/workspaces/${args.workspace_id}/docs/${args.doc_id}/pages/${args.page_id}`
      ),
  },
];
