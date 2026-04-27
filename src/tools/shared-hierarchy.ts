import { api } from "../clickup-client.js";

export const sharedHierarchyTools = [
  {
    name: "get_shared_hierarchy",
    description:
      "Get tasks and lists shared with the authenticated user in a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string }) =>
      api.get(`/team/${args.team_id}/shared`),
  },
];
