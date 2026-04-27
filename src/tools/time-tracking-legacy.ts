import { api } from "../clickup-client.js";

// Legacy time tracking endpoints (v2 original, per-task based)
export const timeTrackingLegacyTools = [
  {
    name: "get_task_time_tracked",
    description: "Get tracked time for a specific task (legacy endpoint)",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        custom_task_ids: { type: "boolean" },
        team_id: { type: "string" },
      },
      required: ["task_id"],
    },
    handler: async (args: {
      task_id: string;
      custom_task_ids?: boolean;
      team_id?: string;
    }) =>
      api.get(`/task/${args.task_id}/time`, {
        custom_task_ids: args.custom_task_ids,
        team_id: args.team_id,
      }),
  },
  {
    name: "track_time_on_task",
    description: "Log time on a task (legacy endpoint)",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        start: { type: "number", description: "Start time Unix ms" },
        end: { type: "number", description: "End time Unix ms" },
        time: { type: "number", description: "Duration in ms" },
      },
      required: ["task_id", "start", "end", "time"],
    },
    handler: async (args: {
      task_id: string;
      start: number;
      end: number;
      time: number;
    }) =>
      api.post(`/task/${args.task_id}/time`, {
        start: args.start,
        end: args.end,
        time: args.time,
      }),
  },
  {
    name: "update_task_time_tracked",
    description: "Update a time entry on a task (legacy endpoint)",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        interval_id: { type: "string" },
        start: { type: "number" },
        end: { type: "number" },
        time: { type: "number" },
      },
      required: ["task_id", "interval_id"],
    },
    handler: async (args: {
      task_id: string;
      interval_id: string;
      [key: string]: unknown;
    }) => {
      const { task_id, interval_id, ...body } = args;
      return api.put(`/task/${task_id}/time/${interval_id}`, body);
    },
  },
  {
    name: "delete_task_time_tracked",
    description: "Delete a time entry from a task (legacy endpoint)",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        interval_id: { type: "string" },
      },
      required: ["task_id", "interval_id"],
    },
    handler: async (args: { task_id: string; interval_id: string }) =>
      api.delete(`/task/${args.task_id}/time/${args.interval_id}`),
  },
];
