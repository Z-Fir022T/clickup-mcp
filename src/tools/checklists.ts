import { api } from "../clickup-client.js";

export const checklistTools = [
  {
    name: "create_checklist",
    description: "Create a checklist on a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        name: { type: "string", description: "Checklist name" },
      },
      required: ["task_id", "name"],
    },
    handler: async (args: { task_id: string; name: string }) =>
      api.post(`/task/${args.task_id}/checklist`, { name: args.name }),
  },
  {
    name: "update_checklist",
    description: "Update a checklist (rename or reorder)",
    inputSchema: {
      type: "object",
      properties: {
        checklist_id: { type: "string" },
        name: { type: "string" },
        position: { type: "number", description: "Order position" },
      },
      required: ["checklist_id"],
    },
    handler: async (args: { checklist_id: string; [key: string]: unknown }) => {
      const { checklist_id, ...body } = args;
      return api.put(`/checklist/${checklist_id}`, body);
    },
  },
  {
    name: "delete_checklist",
    description: "Delete a checklist",
    inputSchema: {
      type: "object",
      properties: {
        checklist_id: { type: "string" },
      },
      required: ["checklist_id"],
    },
    handler: async (args: { checklist_id: string }) =>
      api.delete(`/checklist/${args.checklist_id}`),
  },
  {
    name: "create_checklist_item",
    description: "Create an item in a checklist",
    inputSchema: {
      type: "object",
      properties: {
        checklist_id: { type: "string" },
        name: { type: "string" },
        assignee: { type: "number", description: "User ID" },
      },
      required: ["checklist_id", "name"],
    },
    handler: async (args: { checklist_id: string; [key: string]: unknown }) => {
      const { checklist_id, ...body } = args;
      return api.post(`/checklist/${checklist_id}/checklist_item`, body);
    },
  },
  {
    name: "update_checklist_item",
    description: "Update a checklist item (mark resolved, rename, assign)",
    inputSchema: {
      type: "object",
      properties: {
        checklist_id: { type: "string" },
        checklist_item_id: { type: "string" },
        name: { type: "string" },
        assignee: { type: "number" },
        resolved: { type: "boolean" },
        parent: { type: "string", description: "Parent checklist item ID (nest item)" },
      },
      required: ["checklist_id", "checklist_item_id"],
    },
    handler: async (args: {
      checklist_id: string;
      checklist_item_id: string;
      [key: string]: unknown;
    }) => {
      const { checklist_id, checklist_item_id, ...body } = args;
      return api.put(`/checklist/${checklist_id}/checklist_item/${checklist_item_id}`, body);
    },
  },
  {
    name: "delete_checklist_item",
    description: "Delete a checklist item",
    inputSchema: {
      type: "object",
      properties: {
        checklist_id: { type: "string" },
        checklist_item_id: { type: "string" },
      },
      required: ["checklist_id", "checklist_item_id"],
    },
    handler: async (args: { checklist_id: string; checklist_item_id: string }) =>
      api.delete(`/checklist/${args.checklist_id}/checklist_item/${args.checklist_item_id}`),
  },
];
