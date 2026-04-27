import { getApiToken } from "../clickup-client.js";

const BASE_URL = "https://api.clickup.com/api/v2";

export const attachmentTools = [
  {
    name: "create_task_attachment",
    description:
      "Upload a file attachment to a task. Provide file as base64 content + filename.",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        custom_task_ids: { type: "boolean" },
        team_id: { type: "string" },
        filename: { type: "string", description: "Name of the file to upload" },
        file_content_base64: {
          type: "string",
          description: "Base64-encoded file content",
        },
        mime_type: {
          type: "string",
          description: "MIME type e.g. image/png, application/pdf",
        },
      },
      required: ["task_id", "filename", "file_content_base64", "mime_type"],
    },
    handler: async (args: {
      task_id: string;
      custom_task_ids?: boolean;
      team_id?: string;
      filename: string;
      file_content_base64: string;
      mime_type: string;
    }) => {
      const token = getApiToken();
      const params = new URLSearchParams();
      if (args.custom_task_ids) params.set("custom_task_ids", "true");
      if (args.team_id) params.set("team_id", args.team_id);

      const qs = params.toString();
      const url = `${BASE_URL}/task/${args.task_id}/attachment${qs ? `?${qs}` : ""}`;

      const buffer = Buffer.from(args.file_content_base64, "base64");
      const blob = new Blob([buffer], { type: args.mime_type });

      const form = new FormData();
      form.append("attachment", blob, args.filename);

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: token },
        body: form,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(`ClickUp API error ${res.status}: ${JSON.stringify(data)}`);
      }
      return data;
    },
  },
];
