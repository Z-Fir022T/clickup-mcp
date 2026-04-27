import { api } from "../clickup-client.js";

export const webhookTools = [
  {
    name: "get_webhooks",
    description: "Get all webhooks for a team/workspace",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string }) =>
      api.get(`/team/${args.team_id}/webhook`),
  },
  {
    name: "create_webhook",
    description: "Create a webhook for a team",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        endpoint: { type: "string", description: "HTTPS URL to receive events" },
        events: {
          type: "array",
          items: { type: "string" },
          description:
            "Events: taskCreated, taskUpdated, taskDeleted, taskPriorityUpdated, taskStatusUpdated, taskAssigneeUpdated, taskDueDateUpdated, taskTagUpdated, taskMoved, taskCommentPosted, taskCommentUpdated, taskTimeEstimateUpdated, taskTimeTrackedUpdated, listCreated, listUpdated, listDeleted, folderCreated, folderUpdated, folderDeleted, spaceCreated, spaceUpdated, spaceDeleted, goalCreated, goalUpdated, goalDeleted, keyResultCreated, keyResultUpdated, keyResultDeleted",
        },
        task_id: { type: "string", description: "Filter events to specific task" },
        list_id: { type: "string" },
        folder_id: { type: "string" },
        space_id: { type: "string" },
      },
      required: ["team_id", "endpoint", "events"],
    },
    handler: async (args: { team_id: string; [key: string]: unknown }) => {
      const { team_id, ...body } = args;
      return api.post(`/team/${team_id}/webhook`, body);
    },
  },
  {
    name: "update_webhook",
    description: "Update a webhook",
    inputSchema: {
      type: "object",
      properties: {
        webhook_id: { type: "string" },
        endpoint: { type: "string" },
        events: { type: "array", items: { type: "string" } },
        status: { type: "string", description: "active or inactive" },
      },
      required: ["webhook_id"],
    },
    handler: async (args: { webhook_id: string; [key: string]: unknown }) => {
      const { webhook_id, ...body } = args;
      return api.put(`/webhook/${webhook_id}`, body);
    },
  },
  {
    name: "delete_webhook",
    description: "Delete a webhook",
    inputSchema: {
      type: "object",
      properties: {
        webhook_id: { type: "string" },
      },
      required: ["webhook_id"],
    },
    handler: async (args: { webhook_id: string }) =>
      api.delete(`/webhook/${args.webhook_id}`),
  },
];
