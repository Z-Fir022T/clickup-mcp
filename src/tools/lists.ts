import { api } from "../clickup-client.js";

export const listTools = [
  {
    name: "get_lists",
    description: "Get all lists in a folder",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string", description: "Folder ID" },
        archived: { type: "boolean" },
      },
      required: ["folder_id"],
    },
    handler: async (args: { folder_id: string; archived?: boolean }) =>
      api.get(`/folder/${args.folder_id}/list`, { archived: args.archived }),
  },
  {
    name: "get_folderless_lists",
    description: "Get all folderless lists in a space",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string", description: "Space ID" },
        archived: { type: "boolean" },
      },
      required: ["space_id"],
    },
    handler: async (args: { space_id: string; archived?: boolean }) =>
      api.get(`/space/${args.space_id}/list`, { archived: args.archived }),
  },
  {
    name: "get_list",
    description: "Get a specific list by ID",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string", description: "List ID" },
      },
      required: ["list_id"],
    },
    handler: async (args: { list_id: string }) =>
      api.get(`/list/${args.list_id}`),
  },
  {
    name: "create_list",
    description: "Create a list in a folder",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string" },
        name: { type: "string" },
        content: { type: "string", description: "List description" },
        due_date: { type: "number", description: "Due date as Unix ms" },
        priority: { type: "number", description: "1=urgent 2=high 3=normal 4=low" },
        assignee: { type: "number", description: "User ID to assign" },
        status: { type: "string" },
      },
      required: ["folder_id", "name"],
    },
    handler: async (args: { folder_id: string; [key: string]: unknown }) => {
      const { folder_id, ...body } = args;
      return api.post(`/folder/${folder_id}/list`, body);
    },
  },
  {
    name: "create_folderless_list",
    description: "Create a folderless list directly in a space",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string" },
        name: { type: "string" },
        content: { type: "string" },
        due_date: { type: "number" },
        priority: { type: "number" },
        assignee: { type: "number" },
        status: { type: "string" },
      },
      required: ["space_id", "name"],
    },
    handler: async (args: { space_id: string; [key: string]: unknown }) => {
      const { space_id, ...body } = args;
      return api.post(`/space/${space_id}/list`, body);
    },
  },
  {
    name: "update_list",
    description: "Update an existing list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
        name: { type: "string" },
        content: { type: "string" },
        due_date: { type: "number" },
        due_date_time: { type: "boolean" },
        priority: { type: "number" },
        assignee: { type: "number", description: "User ID to assign" },
        status: { type: "string" },
        unset_status: { type: "boolean" },
      },
      required: ["list_id"],
    },
    handler: async (args: { list_id: string; [key: string]: unknown }) => {
      const { list_id, ...body } = args;
      return api.put(`/list/${list_id}`, body);
    },
  },
  {
    name: "delete_list",
    description: "Delete a list permanently",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
      },
      required: ["list_id"],
    },
    handler: async (args: { list_id: string }) =>
      api.delete(`/list/${args.list_id}`),
  },
  {
    name: "get_list_members",
    description: "Get members of a list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
      },
      required: ["list_id"],
    },
    handler: async (args: { list_id: string }) =>
      api.get(`/list/${args.list_id}/member`),
  },
  {
    name: "add_task_to_list",
    description: "Add an existing task to an additional list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
        task_id: { type: "string" },
      },
      required: ["list_id", "task_id"],
    },
    handler: async (args: { list_id: string; task_id: string }) =>
      api.post(`/list/${args.list_id}/task/${args.task_id}`),
  },
  {
    name: "remove_task_from_list",
    description: "Remove a task from a list (does not delete the task)",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
        task_id: { type: "string" },
      },
      required: ["list_id", "task_id"],
    },
    handler: async (args: { list_id: string; task_id: string }) =>
      api.delete(`/list/${args.list_id}/task/${args.task_id}`),
  },
];
