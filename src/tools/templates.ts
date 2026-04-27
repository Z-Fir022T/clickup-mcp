import { api } from "../clickup-client.js";

export const templateTools = [
  {
    name: "get_task_templates",
    description: "Get all task templates in a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        page: { type: "number", description: "Page number (0-indexed)" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string; page?: number }) =>
      api.get(`/team/${args.team_id}/taskTemplate`, { page: args.page }),
  },
  {
    name: "create_task_from_template",
    description: "Create a new task using a task template",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
        template_id: { type: "string" },
        name: { type: "string", description: "Override the template task name" },
      },
      required: ["list_id", "template_id", "name"],
    },
    handler: async (args: { list_id: string; template_id: string; name: string }) =>
      api.post(`/list/${args.list_id}/taskTemplate/${args.template_id}`, {
        name: args.name,
      }),
  },
];
