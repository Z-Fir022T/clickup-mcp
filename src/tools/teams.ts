import { api } from "../clickup-client.js";

export const teamTools = [
  {
    name: "get_teams",
    description: "Get all workspaces/teams the authenticated user belongs to",
    inputSchema: {
      type: "object",
      properties: {},
    },
    handler: async () => api.get("/team"),
  },
  {
    name: "get_team",
    description: "Get a specific team/workspace by ID",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team/Workspace ID" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string }) =>
      api.get(`/team/${args.team_id}`),
  },
  {
    name: "get_team_members",
    description: "Get all members of a team/workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team/Workspace ID" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string }) =>
      api.get(`/team/${args.team_id}/member`),
  },
  {
    name: "get_workspace_seats",
    description: "View the used, total, and available member and guest seats for a Workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Workspace ID" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string }) =>
      api.get(`/team/${args.team_id}/seats`),
  },
  {
    name: "get_workspace_plan",
    description: "View the current Plan for the specified Workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Workspace ID" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string }) =>
      api.get(`/team/${args.team_id}/plan`),
  },
];
