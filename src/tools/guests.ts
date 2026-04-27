import { api } from "../clickup-client.js";

export const guestTools = [
  {
    name: "invite_guest_to_workspace",
    description: "Invite a guest to a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        email: { type: "string" },
        can_see_time_spent: { type: "boolean" },
        can_see_time_estimated: { type: "boolean" },
        can_create_views: { type: "boolean" },
        custom_role_id: { type: "number" },
      },
      required: ["team_id", "email"],
    },
    handler: async (args: { team_id: string; [key: string]: unknown }) => {
      const { team_id, ...body } = args;
      return api.post(`/team/${team_id}/guest`, body);
    },
  },
  {
    name: "get_guest",
    description: "Get info about a guest in a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        guest_id: { type: "number" },
      },
      required: ["team_id", "guest_id"],
    },
    handler: async (args: { team_id: string; guest_id: number }) =>
      api.get(`/team/${args.team_id}/guest/${args.guest_id}`),
  },
  {
    name: "update_guest_on_workspace",
    description: "Update a guest's permissions in a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        guest_id: { type: "number" },
        can_see_time_spent: { type: "boolean" },
        can_see_time_estimated: { type: "boolean" },
        can_create_views: { type: "boolean" },
        custom_role_id: { type: "number" },
      },
      required: ["team_id", "guest_id"],
    },
    handler: async (args: {
      team_id: string;
      guest_id: number;
      [key: string]: unknown;
    }) => {
      const { team_id, guest_id, ...body } = args;
      return api.put(`/team/${team_id}/guest/${guest_id}`, body);
    },
  },
  {
    name: "remove_guest_from_workspace",
    description: "Remove a guest from a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        guest_id: { type: "number" },
      },
      required: ["team_id", "guest_id"],
    },
    handler: async (args: { team_id: string; guest_id: number }) =>
      api.delete(`/team/${args.team_id}/guest/${args.guest_id}`),
  },
  {
    name: "add_guest_to_task",
    description: "Give a guest access to a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        guest_id: { type: "number" },
        permission_level: {
          type: "string",
          description: "read, comment, create, edit",
        },
        custom_task_ids: { type: "boolean" },
        team_id: { type: "string" },
      },
      required: ["task_id", "guest_id", "permission_level"],
    },
    handler: async (args: {
      task_id: string;
      guest_id: number;
      permission_level: string;
    }) =>
      api.post(`/task/${args.task_id}/guest/${args.guest_id}`, {
        permission_level: args.permission_level,
      }),
  },
  {
    name: "remove_guest_from_task",
    description: "Remove a guest's access from a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        guest_id: { type: "number" },
      },
      required: ["task_id", "guest_id"],
    },
    handler: async (args: { task_id: string; guest_id: number }) =>
      api.delete(`/task/${args.task_id}/guest/${args.guest_id}`),
  },
  {
    name: "add_guest_to_list",
    description: "Give a guest access to a list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
        guest_id: { type: "number" },
        permission_level: { type: "string", description: "read, comment, create, edit" },
      },
      required: ["list_id", "guest_id", "permission_level"],
    },
    handler: async (args: {
      list_id: string;
      guest_id: number;
      permission_level: string;
    }) =>
      api.post(`/list/${args.list_id}/guest/${args.guest_id}`, {
        permission_level: args.permission_level,
      }),
  },
  {
    name: "remove_guest_from_list",
    description: "Remove a guest's access from a list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
        guest_id: { type: "number" },
      },
      required: ["list_id", "guest_id"],
    },
    handler: async (args: { list_id: string; guest_id: number }) =>
      api.delete(`/list/${args.list_id}/guest/${args.guest_id}`),
  },
  {
    name: "add_guest_to_folder",
    description: "Give a guest access to a folder",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string" },
        guest_id: { type: "number" },
        permission_level: { type: "string", description: "read, comment, create, edit" },
      },
      required: ["folder_id", "guest_id", "permission_level"],
    },
    handler: async (args: {
      folder_id: string;
      guest_id: number;
      permission_level: string;
    }) =>
      api.post(`/folder/${args.folder_id}/guest/${args.guest_id}`, {
        permission_level: args.permission_level,
      }),
  },
  {
    name: "remove_guest_from_folder",
    description: "Remove a guest's access from a folder",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string" },
        guest_id: { type: "number" },
      },
      required: ["folder_id", "guest_id"],
    },
    handler: async (args: { folder_id: string; guest_id: number }) =>
      api.delete(`/folder/${args.folder_id}/guest/${args.guest_id}`),
  },
];
