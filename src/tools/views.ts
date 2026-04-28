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
    name: "create_team_view",
    description: "Create a workspace-level view",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        name: { type: "string" },
        type: { type: "string", description: "list, board, calendar, table, timeline, workload, activity, map, chat, or gantt" },
        grouping: { type: "object" },
        divide: { type: "object" },
        sorting: { type: "object" },
        filters: { type: "object" },
        columns: { type: "array" },
        team_sidebar: { type: "object" },
        settings: { type: "object" },
      },
      required: ["team_id", "name", "type"],
    },
    handler: async (args: { team_id: string; [key: string]: unknown }) => {
      const { team_id, ...body } = args;
      return api.post(`/team/${team_id}/view`, body);
    },
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
    name: "create_space_view",
    description: "Create a view in a space",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string" },
        name: { type: "string" },
        type: { type: "string" },
        grouping: { type: "object" },
        divide: { type: "object" },
        sorting: { type: "object" },
        filters: { type: "object" },
        columns: { type: "array" },
        team_sidebar: { type: "object" },
        settings: { type: "object" },
      },
      required: ["space_id", "name", "type"],
    },
    handler: async (args: { space_id: string; [key: string]: unknown }) => {
      const { space_id, ...body } = args;
      return api.post(`/space/${space_id}/view`, body);
    },
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
    name: "create_folder_view",
    description: "Create a view in a folder",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string" },
        name: { type: "string" },
        type: { type: "string" },
        grouping: { type: "object" },
        divide: { type: "object" },
        sorting: { type: "object" },
        filters: { type: "object" },
        columns: { type: "array" },
        team_sidebar: { type: "object" },
        settings: { type: "object" },
      },
      required: ["folder_id", "name", "type"],
    },
    handler: async (args: { folder_id: string; [key: string]: unknown }) => {
      const { folder_id, ...body } = args;
      return api.post(`/folder/${folder_id}/view`, body);
    },
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
    name: "create_list_view",
    description: "Create a view in a list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
        name: { type: "string" },
        type: { type: "string" },
        grouping: { type: "object" },
        divide: { type: "object" },
        sorting: { type: "object" },
        filters: { type: "object" },
        columns: { type: "array" },
        team_sidebar: { type: "object" },
        settings: { type: "object" },
      },
      required: ["list_id", "name", "type"],
    },
    handler: async (args: { list_id: string; [key: string]: unknown }) => {
      const { list_id, ...body } = args;
      return api.post(`/list/${list_id}/view`, body);
    },
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
    name: "update_view",
    description: "Update an existing view",
    inputSchema: {
      type: "object",
      properties: {
        view_id: { type: "string" },
        name: { type: "string" },
        grouping: { type: "object" },
        divide: { type: "object" },
        sorting: { type: "object" },
        filters: { type: "object" },
        columns: { type: "array" },
        team_sidebar: { type: "object" },
        settings: { type: "object" },
      },
      required: ["view_id"],
    },
    handler: async (args: { view_id: string; [key: string]: unknown }) => {
      const { view_id, ...body } = args;
      return api.put(`/view/${view_id}`, body);
    },
  },
  {
    name: "delete_view",
    description: "Delete a view",
    inputSchema: {
      type: "object",
      properties: {
        view_id: { type: "string" },
      },
      required: ["view_id"],
    },
    handler: async (args: { view_id: string }) =>
      api.delete(`/view/${args.view_id}`),
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
