import { clickupV3Request } from "../clickup-client-v3.js";

export const auditTools = [
  {
    name: "query_audit_logs",
    description:
      "Query audit logs for a workspace using the official API v3 request shape (Enterprise only)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        filter: { type: "object", description: "Filter object for the audit log query" },
        applicability: {
          type: "string",
          description: "auth-and-security, custom-fields, hierarchy-activity, user-activity, other-activity, or agent-settings-activity",
        },
        pagination: { type: "object", description: "Pagination object for the audit log query" },
      },
      required: ["workspace_id"],
    },
    handler: async (args: { workspace_id: string; [key: string]: unknown }) => {
      const { workspace_id, ...body } = args;
      return clickupV3Request("POST", `/api/v3/workspaces/${workspace_id}/auditlogs`, { body });
    },
  },
  {
    name: "get_audit_logs",
    description:
      "Alias for querying audit logs for a workspace (API v3, Enterprise only)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        filter: { type: "object", description: "Filter object for the audit log query" },
        applicability: {
          type: "string",
          description: "auth-and-security, custom-fields, hierarchy-activity, user-activity, other-activity, or agent-settings-activity",
        },
        pagination: { type: "object", description: "Pagination object for the audit log query" },
      },
      required: ["workspace_id"],
    },
    handler: async (args: { workspace_id: string; [key: string]: unknown }) => {
      const { workspace_id, ...body } = args;
      return clickupV3Request("POST", `/api/v3/workspaces/${workspace_id}/auditlogs`, { body });
    },
  },
];
