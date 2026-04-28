import { clickupV3Request } from "../clickup-client-v3.js";

export const v3AclTools = [
  {
    name: "update_acl",
    description: "Update privacy and sharing ACLs for an object or location (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        object_type: { type: "string", description: "Object type accepted by ClickUp ACLs" },
        object_id: { type: "string" },
        private: { type: "boolean" },
        entries: {
          type: "array",
          description: "ACL entries to add, edit, or remove",
        },
      },
      required: ["workspace_id", "object_type", "object_id"],
    },
    handler: async (args: {
      workspace_id: string;
      object_type: string;
      object_id: string;
      [key: string]: unknown;
    }) => {
      const { workspace_id, object_type, object_id, ...body } = args;
      return clickupV3Request(
        "PATCH",
        `/api/v3/workspaces/${workspace_id}/${object_type}/${object_id}/acls`,
        { body }
      );
    },
  },
];
