import { api } from "../clickup-client.js";

export const userTools = [
  {
    name: "get_user",
    description: "Get a user in a workspace by user ID",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        user_id: { type: "number" },
      },
      required: ["team_id", "user_id"],
    },
    handler: async (args: { team_id: string; user_id: number }) =>
      api.get(`/team/${args.team_id}/user/${args.user_id}`),
  },
  {
    name: "invite_user_to_workspace",
    description: "Invite a new member to a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        email: { type: "string" },
        admin: { type: "boolean" },
        custom_role_id: { type: "number" },
      },
      required: ["team_id", "email"],
    },
    handler: async (args: { team_id: string; [key: string]: unknown }) => {
      const { team_id, ...body } = args;
      return api.post(`/team/${team_id}/user`, body);
    },
  },
  {
    name: "update_user_on_workspace",
    description: "Update a user's role or admin status in a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        user_id: { type: "number" },
        username: { type: "string" },
        admin: { type: "boolean" },
        custom_role_id: { type: "number" },
      },
      required: ["team_id", "user_id"],
    },
    handler: async (args: {
      team_id: string;
      user_id: number;
      [key: string]: unknown;
    }) => {
      const { team_id, user_id, ...body } = args;
      return api.put(`/team/${team_id}/user/${user_id}`, body);
    },
  },
  {
    name: "remove_user_from_workspace",
    description: "Remove a user from a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        user_id: { type: "number" },
      },
      required: ["team_id", "user_id"],
    },
    handler: async (args: { team_id: string; user_id: number }) =>
      api.delete(`/team/${args.team_id}/user/${args.user_id}`),
  },
];
