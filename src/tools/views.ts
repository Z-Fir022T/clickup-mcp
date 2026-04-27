import { api } from "../clickup-client.js";

export const viewTools = [
  {
    name: "get_team_views",
    description: "Get all views in a team/workspace (Everything level)",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string }) =>
      api.get(`/team/${args.team_id}/view`),
  },
  {
    name: "get_space_views",
    description: "Get all views in a space",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string" },
      },
      required: ["space_id"],
    },
    handler: async (args: { space_id: string }) =>
      api.get(`/space/${args.space_id}/view`),
  },
  {
    name: "get_folder_views",
    description: "Get all views in a folder",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string" },
      },
      required: ["folder_id"],
    },
    handler: async (args: { folder_id: string }) =>
      api.get(`/folder/${args.folder_id}/view`),
  },
  {
    name: "get_list_views",
    description: "Get all views in a list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
      },
      required: ["list_id"],
    },
    handler: async (args: { list_id: string }) =>
      api.get(`/list/${args.list_id}/view`),
  },
  {
    name: "get_view",
    description: "Get a specific view by ID",
    inputSchema: {
      type: "object",
      properties: {
        view_id: { type: "string" },
      },
      required: ["view_id"],
    },
    handler: async (args: { view_id: string }) =>
      api.get(`/view/${args.view_id}`),
  },
  {
    name: "get_view_tasks",
    description: "Get tasks visible in a specific view",
    inputSchema: {
      type: "object",
      properties: {
        view_id: { type: "string" },
        page: { type: "number" },
      },
      required: ["view_id"],
    },
    handler: async (args: { view_id: string; page?: number }) =>
      api.get(`/view/${args.view_id}/task`, { page: args.page }),
  },
];
