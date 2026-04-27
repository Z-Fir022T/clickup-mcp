import { api } from "../clickup-client.js";

export const goalTools = [
  {
    name: "get_goals",
    description: "Get all goals in a team/workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        include_completed: { type: "boolean" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string; include_completed?: boolean }) =>
      api.get(`/team/${args.team_id}/goal`, {
        include_completed: args.include_completed,
      }),
  },
  {
    name: "get_goal",
    description: "Get a specific goal by ID",
    inputSchema: {
      type: "object",
      properties: {
        goal_id: { type: "string" },
      },
      required: ["goal_id"],
    },
    handler: async (args: { goal_id: string }) =>
      api.get(`/goal/${args.goal_id}`),
  },
  {
    name: "create_goal",
    description: "Create a new goal",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        name: { type: "string" },
        due_date: { type: "number", description: "Unix ms" },
        description: { type: "string" },
        multiple_owners: { type: "boolean" },
        owners: { type: "array", items: { type: "number" }, description: "Array of user IDs" },
        color: { type: "string" },
      },
      required: ["team_id", "name", "due_date"],
    },
    handler: async (args: { team_id: string; [key: string]: unknown }) => {
      const { team_id, ...body } = args;
      return api.post(`/team/${team_id}/goal`, body);
    },
  },
  {
    name: "update_goal",
    description: "Update a goal",
    inputSchema: {
      type: "object",
      properties: {
        goal_id: { type: "string" },
        name: { type: "string" },
        due_date: { type: "number" },
        description: { type: "string" },
        rem_owners: { type: "array", items: { type: "number" } },
        add_owners: { type: "array", items: { type: "number" } },
        color: { type: "string" },
      },
      required: ["goal_id"],
    },
    handler: async (args: { goal_id: string; [key: string]: unknown }) => {
      const { goal_id, ...body } = args;
      return api.put(`/goal/${goal_id}`, body);
    },
  },
  {
    name: "delete_goal",
    description: "Delete a goal",
    inputSchema: {
      type: "object",
      properties: {
        goal_id: { type: "string" },
      },
      required: ["goal_id"],
    },
    handler: async (args: { goal_id: string }) =>
      api.delete(`/goal/${args.goal_id}`),
  },
  {
    name: "create_key_result",
    description: "Create a key result (target) for a goal",
    inputSchema: {
      type: "object",
      properties: {
        goal_id: { type: "string" },
        name: { type: "string" },
        owners: { type: "array", items: { type: "number" } },
        type: {
          type: "string",
          description: "number, currency, boolean, percentage, automatic",
        },
        steps_start: { type: "number" },
        steps_end: { type: "number" },
        unit: { type: "string" },
        task_ids: { type: "array", items: { type: "string" } },
        list_ids: { type: "array", items: { type: "string" } },
      },
      required: ["goal_id", "name", "owners", "type", "steps_start", "steps_end"],
    },
    handler: async (args: { goal_id: string; [key: string]: unknown }) => {
      const { goal_id, ...body } = args;
      return api.post(`/goal/${goal_id}/key_result`, body);
    },
  },
  {
    name: "update_key_result",
    description: "Update a key result",
    inputSchema: {
      type: "object",
      properties: {
        key_result_id: { type: "string" },
        steps_current: { type: "number" },
        note: { type: "string" },
      },
      required: ["key_result_id"],
    },
    handler: async (args: { key_result_id: string; [key: string]: unknown }) => {
      const { key_result_id, ...body } = args;
      return api.put(`/key_result/${key_result_id}`, body);
    },
  },
  {
    name: "delete_key_result",
    description: "Delete a key result",
    inputSchema: {
      type: "object",
      properties: {
        key_result_id: { type: "string" },
      },
      required: ["key_result_id"],
    },
    handler: async (args: { key_result_id: string }) =>
      api.delete(`/key_result/${args.key_result_id}`),
  },
];
