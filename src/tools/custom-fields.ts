import { api } from "../clickup-client.js";

export const customFieldTools = [
  {
    name: "get_folder_custom_fields",
    description: "Get custom fields available at the folder level",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string" },
      },
      required: ["folder_id"],
    },
    handler: async (args: { folder_id: string }) =>
      api.get(`/folder/${args.folder_id}/field`),
  },
  {
    name: "get_accessible_custom_fields",
    description: "Get all custom fields accessible in a list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
      },
      required: ["list_id"],
    },
    handler: async (args: { list_id: string }) =>
      api.get(`/list/${args.list_id}/field`),
  },
  {
    name: "get_space_custom_fields",
    description: "Get custom fields available at the space level",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string" },
      },
      required: ["space_id"],
    },
    handler: async (args: { space_id: string }) =>
      api.get(`/space/${args.space_id}/field`),
  },
  {
    name: "get_workspace_custom_fields",
    description: "Get custom fields available at the workspace level",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string }) =>
      api.get(`/team/${args.team_id}/field`),
  },
  {
    name: "set_custom_field_value",
    description: "Set the value of a custom field on a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        field_id: { type: "string" },
        value: {
          description: "Value to set (type depends on field type — string, number, boolean, array, or object)",
        },
        value_options: { type: "object" },
      },
      required: ["task_id", "field_id", "value"],
    },
    handler: async (args: { task_id: string; field_id: string; value: unknown; value_options?: unknown }) =>
      api.post(`/task/${args.task_id}/field/${args.field_id}`, {
        value: args.value,
        value_options: args.value_options,
      }),
  },
  {
    name: "remove_custom_field_value",
    description: "Remove/clear a custom field value from a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        field_id: { type: "string" },
      },
      required: ["task_id", "field_id"],
    },
    handler: async (args: { task_id: string; field_id: string }) =>
      api.delete(`/task/${args.task_id}/field/${args.field_id}`),
  },
];
