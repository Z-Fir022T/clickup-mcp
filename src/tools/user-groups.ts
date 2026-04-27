import { api } from "../clickup-client.js";

export const userGroupTools = [
  {
    name: "get_user_groups",
    description: "Get all user groups (teams) in a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        group_ids: { type: "string", description: "Comma-separated group IDs to filter" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string; group_ids?: string }) =>
      api.get(`/group`, { team_id: args.team_id, group_ids: args.group_ids }),
  },
  {
    name: "create_user_group",
    description: "Create a user group in a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        name: { type: "string" },
        member_ids: {
          type: "array",
          items: { type: "number" },
          description: "Array of user IDs to include",
        },
      },
      required: ["team_id", "name"],
    },
    handler: async (args: { team_id: string; name: string; member_ids?: number[] }) =>
      api.post(`/team/${args.team_id}/group`, {
        name: args.name,
        members: args.member_ids?.map((id) => ({ id })),
      }),
  },
  {
    name: "update_user_group",
    description: "Update a user group (rename, add/remove members)",
    inputSchema: {
      type: "object",
      properties: {
        group_id: { type: "string" },
        name: { type: "string" },
        add_member_ids: {
          type: "array",
          items: { type: "number" },
        },
        remove_member_ids: {
          type: "array",
          items: { type: "number" },
        },
      },
      required: ["group_id"],
    },
    handler: async (args: {
      group_id: string;
      name?: string;
      add_member_ids?: number[];
      remove_member_ids?: number[];
    }) =>
      api.put(`/group/${args.group_id}`, {
        name: args.name,
        members: {
          add: args.add_member_ids?.map((id) => ({ id })),
          rem: args.remove_member_ids?.map((id) => ({ id })),
        },
      }),
  },
  {
    name: "delete_user_group",
    description: "Delete a user group",
    inputSchema: {
      type: "object",
      properties: {
        group_id: { type: "string" },
      },
      required: ["group_id"],
    },
    handler: async (args: { group_id: string }) =>
      api.delete(`/group/${args.group_id}`),
  },
];
