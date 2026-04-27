import { api } from "../clickup-client.js";

export const folderTools = [
  {
    name: "get_folders",
    description: "Get all folders in a space",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string", description: "Space ID" },
        archived: { type: "boolean" },
      },
      required: ["space_id"],
    },
    handler: async (args: { space_id: string; archived?: boolean }) =>
      api.get(`/space/${args.space_id}/folder`, { archived: args.archived }),
  },
  {
    name: "get_folder",
    description: "Get a specific folder by ID",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string", description: "Folder ID" },
      },
      required: ["folder_id"],
    },
    handler: async (args: { folder_id: string }) =>
      api.get(`/folder/${args.folder_id}`),
  },
  {
    name: "create_folder",
    description: "Create a folder in a space",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string" },
        name: { type: "string", description: "Folder name" },
      },
      required: ["space_id", "name"],
    },
    handler: async (args: { space_id: string; name: string }) =>
      api.post(`/space/${args.space_id}/folder`, { name: args.name }),
  },
  {
    name: "update_folder",
    description: "Update a folder",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string" },
        name: { type: "string" },
      },
      required: ["folder_id", "name"],
    },
    handler: async (args: { folder_id: string; name: string }) =>
      api.put(`/folder/${args.folder_id}`, { name: args.name }),
  },
  {
    name: "delete_folder",
    description: "Delete a folder permanently",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: { type: "string" },
      },
      required: ["folder_id"],
    },
    handler: async (args: { folder_id: string }) =>
      api.delete(`/folder/${args.folder_id}`),
  },
];
