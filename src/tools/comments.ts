import { api } from "../clickup-client.js";

export const commentTools = [
  {
    name: "get_task_comments",
    description: "Get all comments on a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        custom_task_ids: { type: "boolean" },
        team_id: { type: "string" },
        start: { type: "number", description: "Start comment ID for pagination" },
        start_id: { type: "string" },
      },
      required: ["task_id"],
    },
    handler: async (args: { task_id: string; [key: string]: unknown }) => {
      const { task_id, ...params } = args;
      return api.get(`/task/${task_id}/comment`, params as Record<string, string | number | boolean | undefined>);
    },
  },
  {
    name: "create_task_comment",
    description: "Create a comment on a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        comment_text: { type: "string", description: "Plain text comment" },
        assignee: { type: "number", description: "User ID to assign comment to" },
        notify_all: { type: "boolean" },
      },
      required: ["task_id", "comment_text"],
    },
    handler: async (args: { task_id: string; [key: string]: unknown }) => {
      const { task_id, ...body } = args;
      return api.post(`/task/${task_id}/comment`, body);
    },
  },
  {
    name: "get_list_comments",
    description: "Get all comments on a list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
        start: { type: "number" },
        start_id: { type: "string" },
      },
      required: ["list_id"],
    },
    handler: async (args: { list_id: string; [key: string]: unknown }) => {
      const { list_id, ...params } = args;
      return api.get(`/list/${list_id}/comment`, params as Record<string, string | number | boolean | undefined>);
    },
  },
  {
    name: "create_list_comment",
    description: "Create a comment on a list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
        comment_text: { type: "string" },
        assignee: { type: "number" },
        notify_all: { type: "boolean" },
      },
      required: ["list_id", "comment_text"],
    },
    handler: async (args: { list_id: string; [key: string]: unknown }) => {
      const { list_id, ...body } = args;
      return api.post(`/list/${list_id}/comment`, body);
    },
  },
  {
    name: "get_chat_view_comments",
    description: "Get comments on a chat view",
    inputSchema: {
      type: "object",
      properties: {
        view_id: { type: "string" },
        start: { type: "number" },
        start_id: { type: "string" },
      },
      required: ["view_id"],
    },
    handler: async (args: { view_id: string; [key: string]: unknown }) => {
      const { view_id, ...params } = args;
      return api.get(`/view/${view_id}/comment`, params as Record<string, string | number | boolean | undefined>);
    },
  },
  {
    name: "create_chat_view_comment",
    description: "Create a comment on a chat view",
    inputSchema: {
      type: "object",
      properties: {
        view_id: { type: "string" },
        comment_text: { type: "string" },
        notify_all: { type: "boolean" },
      },
      required: ["view_id", "comment_text"],
    },
    handler: async (args: { view_id: string; [key: string]: unknown }) => {
      const { view_id, ...body } = args;
      return api.post(`/view/${view_id}/comment`, body);
    },
  },
  {
    name: "update_comment",
    description: "Update an existing comment",
    inputSchema: {
      type: "object",
      properties: {
        comment_id: { type: "string" },
        comment_text: { type: "string" },
        assignee: { type: "number" },
        resolved: { type: "boolean" },
      },
      required: ["comment_id"],
    },
    handler: async (args: { comment_id: string; [key: string]: unknown }) => {
      const { comment_id, ...body } = args;
      return api.put(`/comment/${comment_id}`, body);
    },
  },
  {
    name: "delete_comment",
    description: "Delete a comment",
    inputSchema: {
      type: "object",
      properties: {
        comment_id: { type: "string" },
      },
      required: ["comment_id"],
    },
    handler: async (args: { comment_id: string }) =>
      api.delete(`/comment/${args.comment_id}`),
  },
];
