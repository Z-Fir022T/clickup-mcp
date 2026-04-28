import { api } from "../clickup-client.js";

export const timeTrackingTools = [
  {
    name: "get_time_entries",
    description: "Get time entries for a team/workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        start_date: { type: "number", description: "Unix ms" },
        end_date: { type: "number" },
        assignee: { type: "number", description: "Filter by user ID" },
        include_task_tags: { type: "boolean" },
        include_location_names: { type: "boolean" },
        space_id: { type: "string" },
        folder_id: { type: "string" },
        list_id: { type: "string" },
        task_id: { type: "string" },
        page: { type: "number" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string; [key: string]: unknown }) => {
      const { team_id, ...params } = args;
      return api.get(
        `/team/${team_id}/time_entries`,
        params as Record<string, string | number | boolean | undefined>
      );
    },
  },
  {
    name: "get_time_entry",
    description: "Get a single time entry",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        timer_id: { type: "string" },
      },
      required: ["team_id", "timer_id"],
    },
    handler: async (args: { team_id: string; timer_id: string }) =>
      api.get(`/team/${args.team_id}/time_entries/${args.timer_id}`),
  },
  {
    name: "get_time_entry_history",
    description: "Get change history for a single time entry",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        timer_id: { type: "string" },
      },
      required: ["team_id", "timer_id"],
    },
    handler: async (args: { team_id: string; timer_id: string }) =>
      api.get(`/team/${args.team_id}/time_entries/${args.timer_id}/history`),
  },
  {
    name: "create_time_entry",
    description: "Create a time entry/log time on a task",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        task_id: { type: "string" },
        start: { type: "number", description: "Start time Unix ms" },
        duration: { type: "number", description: "Duration in ms" },
        description: { type: "string" },
        tags: { type: "array", items: { type: "object" } },
        billable: { type: "boolean" },
        assignee: { type: "number" },
      },
      required: ["team_id", "start", "duration"],
    },
    handler: async (args: { team_id: string; [key: string]: unknown }) => {
      const { team_id, ...body } = args;
      return api.post(`/team/${team_id}/time_entries`, body);
    },
  },
  {
    name: "update_time_entry",
    description: "Update a time entry",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        timer_id: { type: "string" },
        start: { type: "number" },
        duration: { type: "number" },
        description: { type: "string" },
        billable: { type: "boolean" },
        tags: { type: "array" },
        tag_action: { type: "string", description: "add or replace" },
      },
      required: ["team_id", "timer_id"],
    },
    handler: async (args: { team_id: string; timer_id: string; [key: string]: unknown }) => {
      const { team_id, timer_id, ...body } = args;
      return api.put(`/team/${team_id}/time_entries/${timer_id}`, body);
    },
  },
  {
    name: "delete_time_entry",
    description: "Delete a time entry",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        timer_id: { type: "string" },
      },
      required: ["team_id", "timer_id"],
    },
    handler: async (args: { team_id: string; timer_id: string }) =>
      api.delete(`/team/${args.team_id}/time_entries/${args.timer_id}`),
  },
  {
    name: "start_timer",
    description: "Start a timer on a task",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        task_id: { type: "string" },
        description: { type: "string" },
        billable: { type: "boolean" },
      },
      required: ["team_id", "task_id"],
    },
    handler: async (args: { team_id: string; task_id: string; [key: string]: unknown }) => {
      const { team_id, ...body } = args;
      return api.post(`/team/${team_id}/time_entries/start`, body);
    },
  },
  {
    name: "stop_timer",
    description: "Stop the currently running timer",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string }) =>
      api.post(`/team/${args.team_id}/time_entries/stop`),
  },
  {
    name: "get_running_timer",
    description: "Get the currently running timer for a user",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        assignee: { type: "number", description: "User ID (defaults to authenticated user)" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string; assignee?: number }) =>
      api.get(`/team/${args.team_id}/time_entries/current`, {
        assignee: args.assignee,
      }),
  },
  {
    name: "get_time_entry_tags",
    description: "Get all time entry tags for a team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string }) =>
      api.get(`/team/${args.team_id}/time_entries/tags`),
  },
  {
    name: "add_tags_to_time_entries",
    description: "Add labels/tags to time entries in a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Workspace ID" },
        time_entry_ids: {
          type: "array",
          items: { type: "string" },
          description: "Array of time entry IDs to tag",
        },
        tags: {
          type: "array",
          items: {
            type: "object",
            description: "Tag object with name and optional color fields",
          },
          description: "Array of tag objects to add",
        },
      },
      required: ["team_id", "time_entry_ids", "tags"],
    },
    handler: async (args: {
      team_id: string;
      time_entry_ids: string[];
      tags: unknown[];
    }) =>
      api.post(`/team/${args.team_id}/time_entries/tags`, {
        time_entry_ids: args.time_entry_ids,
        tags: args.tags,
      }),
  },
  {
    name: "remove_tags_from_time_entries",
    description: "Remove labels/tags from time entries in a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Workspace ID" },
        time_entry_ids: {
          type: "array",
          items: { type: "string" },
          description: "Array of time entry IDs",
        },
        tags: {
          type: "array",
          items: {
            type: "object",
            description: "Tag object with name field",
          },
          description: "Array of tag objects to remove",
        },
      },
      required: ["team_id", "time_entry_ids", "tags"],
    },
    handler: async (args: {
      team_id: string;
      time_entry_ids: string[];
      tags: unknown[];
    }) =>
      api.delete(`/team/${args.team_id}/time_entries/tags`, {
        time_entry_ids: args.time_entry_ids,
        tags: args.tags,
      }),
  },
  {
    name: "change_tag_name_from_time_entries",
    description: "Rename an existing time entry tag across a workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string", description: "Workspace ID" },
        name: { type: "string", description: "Current tag name" },
        new_name: { type: "string", description: "New tag name" },
        tag_fg: { type: "string", description: "Foreground color hex" },
        tag_bg: { type: "string", description: "Background color hex" },
      },
      required: ["team_id", "name", "new_name"],
    },
    handler: async (args: {
      team_id: string;
      name: string;
      new_name: string;
      tag_fg?: string;
      tag_bg?: string;
    }) => {
      const { team_id, name, ...body } = args;
      return api.put(`/team/${team_id}/time_entries/tags`, {
        name,
        ...body,
      });
    },
  },
];
