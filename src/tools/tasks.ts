import { api, getApiToken } from "../clickup-client.js";

const BASE_V3 = "https://api.clickup.com/api/v3";

async function v3Put<T>(path: string, body?: unknown): Promise<T> {
  const token = getApiToken();
  const res = await fetch(`${BASE_V3}${path}`, {
    method: "PUT",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`ClickUp v3 API error ${res.status}: ${JSON.stringify(data)}`);
  return data as T;
}

export const taskTools = [
  {
    name: "get_tasks",
    description: "Get tasks from a list with optional filters",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string", description: "List ID" },
        archived: { type: "boolean" },
        include_markdown_description: { type: "boolean" },
        page: { type: "number", description: "Page number (0-indexed)" },
        order_by: { type: "string", description: "id, created, updated, due_date" },
        reverse: { type: "boolean" },
        subtasks: { type: "boolean" },
        statuses: { type: "string", description: "Comma-separated statuses" },
        include_closed: { type: "boolean" },
        assignees: { type: "string", description: "Comma-separated user IDs" },
        tags: { type: "string", description: "Comma-separated tag names" },
        due_date_gt: { type: "number", description: "Unix ms" },
        due_date_lt: { type: "number" },
        date_created_gt: { type: "number" },
        date_created_lt: { type: "number" },
        date_updated_gt: { type: "number" },
        date_updated_lt: { type: "number" },
      },
      required: ["list_id"],
    },
    handler: async (args: { list_id: string; [key: string]: unknown }) => {
      const { list_id, ...params } = args;
      return api.get(`/list/${list_id}/task`, params as Record<string, string | number | boolean | undefined>);
    },
  },
  {
    name: "get_task",
    description: "Get a specific task by ID",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        custom_task_ids: { type: "boolean", description: "Use custom task ID instead of ClickUp ID" },
        team_id: { type: "string", description: "Required if custom_task_ids=true" },
        include_subtasks: { type: "boolean" },
        include_markdown_description: { type: "boolean" },
      },
      required: ["task_id"],
    },
    handler: async (args: { task_id: string; [key: string]: unknown }) => {
      const { task_id, ...params } = args;
      return api.get(`/task/${task_id}`, params as Record<string, string | number | boolean | undefined>);
    },
  },
  {
    name: "create_task",
    description: "Create a new task in a list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "string" },
        name: { type: "string", description: "Task name" },
        description: { type: "string" },
        markdown_description: { type: "string" },
        assignees: { type: "array", items: { type: "number" }, description: "Array of user IDs" },
        tags: { type: "array", items: { type: "string" } },
        status: { type: "string" },
        priority: { type: "number", description: "1=urgent 2=high 3=normal 4=low" },
        due_date: { type: "number", description: "Unix ms timestamp" },
        due_date_time: { type: "boolean" },
        time_estimate: { type: "number", description: "Time estimate in ms" },
        start_date: { type: "number" },
        start_date_time: { type: "boolean" },
        notify_all: { type: "boolean" },
        parent: { type: "string", description: "Parent task ID to create as subtask" },
        links_to: { type: "string", description: "Task ID to link to" },
        check_required_custom_fields: { type: "boolean" },
        custom_fields: {
          type: "array",
          description: "Array of {id, value} objects for custom fields",
        },
      },
      required: ["list_id", "name"],
    },
    handler: async (args: { list_id: string; [key: string]: unknown }) => {
      const { list_id, ...body } = args;
      return api.post(`/list/${list_id}/task`, body);
    },
  },
  {
    name: "update_task",
    description: "Update an existing task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        custom_task_ids: { type: "boolean" },
        team_id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        markdown_description: { type: "string" },
        status: { type: "string" },
        priority: { type: "number" },
        due_date: { type: "number" },
        due_date_time: { type: "boolean" },
        parent: { type: "string" },
        time_estimate: { type: "number" },
        start_date: { type: "number" },
        start_date_time: { type: "boolean" },
        assignees: {
          type: "object",
          description: "{ add: [userId], rem: [userId] }",
        },
        archived: { type: "boolean" },
      },
      required: ["task_id"],
    },
    handler: async (args: {
      task_id: string;
      custom_task_ids?: boolean;
      team_id?: string;
      [key: string]: unknown;
    }) => {
      const { task_id, custom_task_ids, team_id, ...body } = args;
      // Build query string for custom task ID support
      let path = `/task/${task_id}`;
      const qs: string[] = [];
      if (custom_task_ids) qs.push(`custom_task_ids=true`);
      if (team_id) qs.push(`team_id=${encodeURIComponent(team_id)}`);
      if (qs.length) path += `?${qs.join("&")}`;
      return api.put(path, body);
    },
  },
  {
    name: "delete_task",
    description: "Delete a task permanently",
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
    }) => {
      let path = `/task/${args.task_id}`;
      const qs: string[] = [];
      if (args.custom_task_ids) qs.push(`custom_task_ids=true`);
      if (args.team_id) qs.push(`team_id=${encodeURIComponent(args.team_id)}`);
      if (qs.length) path += `?${qs.join("&")}`;
      return api.delete(path);
    },
  },
  {
    name: "get_filtered_team_tasks",
    description: "Get tasks from an entire workspace/team with filters",
    inputSchema: {
      type: "object",
      properties: {
        team_id: { type: "string" },
        page: { type: "number" },
        order_by: { type: "string" },
        reverse: { type: "boolean" },
        subtasks: { type: "boolean" },
        space_ids: { type: "array", items: { type: "string" } },
        project_ids: { type: "array", items: { type: "string" } },
        list_ids: { type: "array", items: { type: "string" } },
        statuses: { type: "array", items: { type: "string" } },
        include_closed: { type: "boolean" },
        assignees: { type: "array", items: { type: "string" } },
        tags: { type: "array", items: { type: "string" } },
        due_date_gt: { type: "number" },
        due_date_lt: { type: "number" },
        date_created_gt: { type: "number" },
        date_created_lt: { type: "number" },
        date_updated_gt: { type: "number" },
        date_updated_lt: { type: "number" },
        custom_fields: { type: "array" },
      },
      required: ["team_id"],
    },
    handler: async (args: { team_id: string; [key: string]: unknown }) => {
      const { team_id, ...params } = args;
      return api.get(
        `/team/${team_id}/task`,
        params as Record<string, string | number | boolean | undefined>
      );
    },
  },
  {
    name: "move_task_to_list",
    description: "Move a task to a different list (changes the task's home List). Uses ClickUp API v3.",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string", description: "Workspace (team) ID" },
        task_id: { type: "string" },
        list_id: { type: "string", description: "Destination list ID" },
      },
      required: ["workspace_id", "task_id", "list_id"],
    },
    handler: async (args: { workspace_id: string; task_id: string; list_id: string }) =>
      v3Put(`/workspaces/${args.workspace_id}/tasks/${args.task_id}/home_list/${args.list_id}`),
  },
  {
    name: "get_task_members",
    description: "Get members assigned to a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
      },
      required: ["task_id"],
    },
    handler: async (args: { task_id: string }) =>
      api.get(`/task/${args.task_id}/member`),
  },
  {
    name: "add_task_assignee",
    description: "Add an assignee to a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        assignee_id: { type: "number", description: "User ID to add" },
      },
      required: ["task_id", "assignee_id"],
    },
    handler: async (args: { task_id: string; assignee_id: number }) =>
      api.post(`/task/${args.task_id}/member`, { id: args.assignee_id }),
  },
  {
    name: "remove_task_assignee",
    description: "Remove an assignee from a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        assignee_id: { type: "number" },
      },
      required: ["task_id", "assignee_id"],
    },
    handler: async (args: { task_id: string; assignee_id: number }) =>
      api.delete(`/task/${args.task_id}/member`, { id: args.assignee_id }),
  },
  {
    name: "get_task_dependencies",
    description: "Get task dependencies",
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
    }) => {
      const qs: string[] = [];
      if (args.custom_task_ids) qs.push(`custom_task_ids=true`);
      if (args.team_id) qs.push(`team_id=${encodeURIComponent(args.team_id)}`);
      const path = `/task/${args.task_id}/dependency${qs.length ? `?${qs.join("&")}` : ""}`;
      return api.get(path);
    },
  },
  {
    name: "add_task_dependency",
    description: "Add a dependency between tasks",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        depends_on: { type: "string", description: "Task ID this task depends on" },
        dependency_of: { type: "string", description: "Task ID that depends on this task" },
      },
      required: ["task_id"],
    },
    handler: async (args: { task_id: string; depends_on?: string; dependency_of?: string }) => {
      const { task_id, ...body } = args;
      return api.post(`/task/${task_id}/dependency`, body);
    },
  },
  {
    name: "delete_task_dependency",
    description: "Remove a dependency from a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        depends_on: { type: "string" },
        dependency_of: { type: "string" },
      },
      required: ["task_id"],
    },
    handler: async (args: { task_id: string; depends_on?: string; dependency_of?: string }) => {
      const qs: string[] = [];
      if (args.depends_on) qs.push(`depends_on=${encodeURIComponent(args.depends_on)}`);
      if (args.dependency_of) qs.push(`dependency_of=${encodeURIComponent(args.dependency_of)}`);
      const path = `/task/${args.task_id}/dependency${qs.length ? `?${qs.join("&")}` : ""}`;
      return api.delete(path);
    },
  },
  {
    name: "link_tasks",
    description: "Create a link between two tasks",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        links_to: { type: "string", description: "Target task ID" },
      },
      required: ["task_id", "links_to"],
    },
    handler: async (args: { task_id: string; links_to: string }) =>
      api.post(`/task/${args.task_id}/link/${args.links_to}`),
  },
  {
    name: "delete_task_link",
    description: "Remove a link between two tasks",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        links_to: { type: "string" },
      },
      required: ["task_id", "links_to"],
    },
    handler: async (args: { task_id: string; links_to: string }) =>
      api.delete(`/task/${args.task_id}/link/${args.links_to}`),
  },
  {
    name: "add_task_tag",
    description: "Add a tag to a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        tag_name: { type: "string" },
      },
      required: ["task_id", "tag_name"],
    },
    handler: async (args: { task_id: string; tag_name: string }) =>
      api.post(`/task/${args.task_id}/tag/${args.tag_name}`),
  },
  {
    name: "remove_task_tag",
    description: "Remove a tag from a task",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        tag_name: { type: "string" },
      },
      required: ["task_id", "tag_name"],
    },
    handler: async (args: { task_id: string; tag_name: string }) =>
      api.delete(`/task/${args.task_id}/tag/${args.tag_name}`),
  },
];
