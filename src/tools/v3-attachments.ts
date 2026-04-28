import { clickupV3Request } from "../clickup-client-v3.js";

export const v3AttachmentTools = [
  {
    name: "get_entity_attachments",
    description: "Get attachments for a task or file-type custom field (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        entity_type: { type: "string", description: "attachments or custom_fields" },
        entity_id: { type: "string" },
        cursor: { type: "string" },
        limit: { type: "number" },
      },
      required: ["workspace_id", "entity_type", "entity_id"],
    },
    handler: async (args: {
      workspace_id: string;
      entity_type: string;
      entity_id: string;
      cursor?: string;
      limit?: number;
    }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.workspace_id}/${args.entity_type}/${args.entity_id}/attachments`,
        { params: { cursor: args.cursor, limit: args.limit } }
      ),
  },
  {
    name: "create_entity_attachment",
    description: "Upload an attachment to a task or file-type custom field (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        entity_type: { type: "string", description: "attachments or custom_fields" },
        entity_id: { type: "string" },
        filename: { type: "string", description: "Optional filename override" },
        file_name: { type: "string", description: "Name of the uploaded file" },
        file_content_base64: { type: "string", description: "Base64-encoded file content" },
        content_type: { type: "string", description: "MIME type, defaults to application/octet-stream" },
      },
      required: ["workspace_id", "entity_type", "entity_id", "file_name", "file_content_base64"],
    },
    handler: async (args: {
      workspace_id: string;
      entity_type: string;
      entity_id: string;
      filename?: string;
      file_name: string;
      file_content_base64: string;
      content_type?: string;
    }) => {
      const form = new FormData();
      const bytes = Buffer.from(args.file_content_base64, "base64");
      const blob = new Blob([bytes], {
        type: args.content_type || "application/octet-stream",
      });

      form.append("attachment", blob, args.file_name);
      if (args.filename) {
        form.append("filename", args.filename);
      }

      return clickupV3Request(
        "POST",
        `/api/v3/workspaces/${args.workspace_id}/${args.entity_type}/${args.entity_id}/attachments`,
        { body: form }
      );
    },
  },
];
