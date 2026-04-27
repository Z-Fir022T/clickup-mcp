import { api } from "../clickup-client.js";

export const roleTools = [
  {
    name: "get_custom_roles",
    description: "Get all custom roles in a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        include_members: { type: "boolean" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string; include_members?: boolean }) =>
      api.get(`/team/${args.team_id}/customroles`, {
        include_members: args.include_members,
      }),
  },
];
