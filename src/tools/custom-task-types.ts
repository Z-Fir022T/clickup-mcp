import { api } from "../clickup-client.js";

export const customTaskTypeTools = [
  {
    name: "get_custom_task_types",
    description: "Get all custom task types available in a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string }) =>
      api.get(`/team/${args.team_id}/custom_item`),
  },
];
