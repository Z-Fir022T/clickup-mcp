import { api } from "../clickup-client.js";

export const spaceTools = [
  {
    name: "get_spaces",
    description: "Get all spaces in a team/workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team/Workspace ID" },
        archived: { type: "boolean", description: "Include archived spaces" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string; archived?: boolean }) =>
      api.get(`/team/${args.team_id}/space`, { archived: args.archived }),
  },
  {
    name: "get_space",
    description: "Get a specific space by ID",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string", description: "Space ID" },
      },
      required: ["space_id"],
    },
    handler: async (args: { space_id: string }) =>
      api.get(`/space/${args.space_id}`),
  },
  {
    name: "create_space",
    description: "Create a new space in a team/workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Team/Workspace ID" },
        name: { type: "string", description: "Space name" },
        multiple_assignees: { type: "boolean" },
        features: {
          type: "object",
          description: "Feature flags (due_dates, time_tracking, tags, etc.)",
        },
      },
      required: ["team_id", "name"],
    },
    handler: async (args: {
      team_id: string;
      name: string;
      multiple_assignees?: boolean;
      features?: Record<string, unknown>;
    }) => {
      const { team_id, ...body } = args;
      return api.post(`/team/${team_id}/space`, body);
    },
  },
  {
    name: "update_space",
    description: "Update an existing space",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string", description: "Space ID" },
        name: { type: "string" },
        color: { type: "string" },
        private: { type: "boolean" },
        multiple_assignees: { type: "boolean" },
      },
      required: ["space_id"],
    },
    handler: async (args: { space_id: string; [key: string]: unknown }) => {
      const { space_id, ...body } = args;
      return api.put(`/space/${space_id}`, body);
    },
  },
  {
    name: "delete_space",
    description: "Delete a space permanently",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string", description: "Space ID" },
      },
      required: ["space_id"],
    },
    handler: async (args: { space_id: string }) =>
      api.delete(`/space/${args.space_id}`),
  },
  {
    name: "get_space_tags",
    description: "Get all tags in a space",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string", description: "Space ID" },
      },
      required: ["space_id"],
    },
    handler: async (args: { space_id: string }) =>
      api.get(`/space/${args.space_id}/tag`),
  },
  {
    name: "create_space_tag",
    description: "Create a tag in a space",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string" },
        name: { type: "string", description: "Tag name" },
        tag_fg: { type: "string", description: "Foreground color hex" },
        tag_bg: { type: "string", description: "Background color hex" },
      },
      required: ["space_id", "name"],
    },
    handler: async (args: {
      space_id: string;
      name: string;
      tag_fg?: string;
      tag_bg?: string;
    }) => {
      const { space_id, ...tag } = args;
      return api.post(`/space/${space_id}/tag`, { tag });
    },
  },
  {
    name: "update_space_tag",
    description: "Update (rename or recolor) a tag in a space",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string" },
        tag_name: { type: "string", description: "Current tag name (URL path)" },
        name: { type: "string", description: "New tag name" },
        tag_fg: { type: "string", description: "Foreground color hex" },
        tag_bg: { type: "string", description: "Background color hex" },
      },
      required: ["space_id", "tag_name"],
    },
    handler: async (args: {
      space_id: string;
      tag_name: string;
      name?: string;
      tag_fg?: string;
      tag_bg?: string;
    }) => {
      const { space_id, tag_name, ...rest } = args;
      return api.put(`/space/${space_id}/tag/${encodeURIComponent(tag_name)}`, { tag: rest });
    },
  },
  {
    name: "delete_space_tag",
    description: "Delete a tag from a space",
    inputSchema: {
      type: "object",
      properties: {
        space_id: { type: "string" },
        tag_name: { type: "string", description: "Tag name to delete" },
      },
      required: ["space_id", "tag_name"],
    },
    handler: async (args: { space_id: string; tag_name: string }) =>
      api.delete(`/space/${args.space_id}/tag/${args.tag_name}`),
  },
];
