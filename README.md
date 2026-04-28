# ClickUp MCP Server

![Tools](https://img.shields.io/badge/tools-182-blue)
![ClickUp API](https://img.shields.io/badge/ClickUp%20API-v2%20%2B%20v3-orange)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![MCP](https://img.shields.io/badge/protocol-MCP-purple)

A Model Context Protocol (MCP) server that exposes the ClickUp API to any MCP-compatible AI client. The current server exposes 182 MCP tools and includes an audit matrix for the documented ClickUp v2 and v3 surface.

---

## Features
 
Coverage is broader than the original README text below. Use this snapshot as the current source of truth.
 
### Coverage Snapshot
 
- 182 MCP tools currently exposed by the server
- 172 documented ClickUp API operations mapped in the audit matrix
- 0 documented operations currently marked as missing
- Audit artifacts: `AUDIT_MATRIX.md` and `audit-matrix.json`

Complete ClickUp API coverage through a single MCP server. Connect Claude Desktop, Cursor, or any MCP client to your ClickUp workspace and manage tasks, docs, goals, time tracking, webhooks, and more — all from natural language.

### Tool Categories (26 total)

| Category | Tools | Description |
|----------|-------|-------------|
| Tasks | 20 | Full task lifecycle, assignees, dependencies, links, tags, merge, and time-in-status |
| Spaces | 9 | Space management and space-level tags |
| Lists | 12 | Folder-based and folderless lists, list members, and list templates |
| Folders | 6 | Folder CRUD within spaces plus folder-from-template |
| Comments | 10 | Task, list, chat-view, and threaded comments |
| Goals | 8 | Goals and key results (OKRs) |
| Time Tracking (v2) | 13 | Time entries, timers, tags, and entry history for the modern v2 endpoint |
| Time Tracking Legacy | 4 | Per-task time tracking (legacy endpoint) |
| Webhooks | 4 | Webhook CRUD with full event filtering |
| Views | 12 | Team, space, folder, and list views with create, update, and delete |
| Checklists | 6 | Checklists and checklist items on tasks |
| Custom Fields | 6 | Workspace, space, folder, and list field access plus set/clear values |
| Docs (v2 compatibility) | 3 | Legacy aliases mapped onto the current docs implementation |
| Docs (v3) | 7 | Search, retrieve, create, update, and delete docs and pages via v3 API |
| Chat (v3) | 15 | Channel, follower, member, message, reaction, reply, and delete flows |
| Audit Logs (v3) | 1 | Workspace audit logs (Enterprise) |
| Authorization | 3 | Authenticated user info and OAuth token exchange |
| Teams / Workspaces | 5 | Workspace info, members, seats, and plan |
| Users | 4 | Invite, update, and remove workspace members |
| Guests | 10 | Guest invitations and scoped access to tasks/lists/folders |
| Roles | 1 | Custom role listing |
| User Groups | 4 | User group (team) management |
| Shared Hierarchy | 1 | Items shared with the authenticated user |
| Attachments | 2 | Task attachments in v2 and chat/message attachments in v3 |
| Templates | 4 | Task, folder, and list template discovery/instantiation |
| Custom Task Types | 1 | List custom task types in a workspace |

---

## Prerequisites

- **Node.js 18+** (uses native `fetch` and `FormData`)
- **ClickUp account** with a Personal API Token
- To get your token: ClickUp Settings → Apps → API Token → Generate

Your token starts with `pk_`.

---

## Installation

```bash
git clone https://github.com/your-username/clickup-mcp.git
cd clickup-mcp
npm install
npm run build
```

This compiles TypeScript to `dist/index.js` and `dist/http-server.js`.

---

## Configuration

```bash
cp .env.example .env
```

Edit `.env` and set your token:

```env
CLICKUP_API_TOKEN=pk_your_personal_api_token_here
```

The server reads `CLICKUP_API_TOKEN` from the environment for local/stdio usage. For the hosted server (Railway), each user passes their token in the connection URL — no installation required.

---

## Running

**Local (compiled, stdio transport):**

```bash
npm start
```

**Dev mode (no compile step):**

```bash
npm run dev
```

**HTTP/SSE server (for Railway or self-hosted):**

```bash
npm run start:http
```

---

## Using the Hosted Server (no installation)

If the server is deployed on Railway (or any public URL), users only need to add one entry to their MCP client config — no Node.js, no cloning, no environment variables to manage.

Each user passes their own ClickUp API token in the URL:

```
https://your-app.railway.app/sse?token=pk_YOUR_TOKEN_HERE
```

**Claude Desktop** (`%APPDATA%\Claude\claude_desktop_config.json` on Windows, `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "clickup": {
      "type": "sse",
      "url": "https://your-app.railway.app/sse?token=pk_YOUR_TOKEN_HERE"
    }
  }
}
```

**Cursor / Claude Code** (`.cursor/mcp.json` or `~/.claude/settings.json`):

```json
{
  "mcpServers": {
    "clickup": {
      "type": "sse",
      "url": "https://your-app.railway.app/sse?token=pk_YOUR_TOKEN_HERE"
    }
  }
}
```

Replace `pk_YOUR_TOKEN_HERE` with the user's personal ClickUp API token (Settings → Apps → API Token).

> **Security note**: The token travels over HTTPS and is scoped per SSE connection via `AsyncLocalStorage` — each user's requests are fully isolated even on a shared server instance.

---

## Local MCP Client Configuration (self-hosted)

If running the server locally instead of on Railway:

**Claude Desktop:**

```json
{
  "mcpServers": {
    "clickup": {
      "command": "node",
      "args": ["C:/path/to/clickup-mcp/dist/index.js"],
      "env": {
        "CLICKUP_API_TOKEN": "pk_your_token_here"
      }
    }
  }
}
```

Replace the path with the absolute path to your local clone.

---

## Tool Reference

For the authoritative endpoint-to-tool mapping, use:

- `AUDIT_MATRIX.md`
- `audit-matrix.json`

Those files are the best source of truth for documented ClickUp parity and live validation status.

### Authorization (3 tools)

| Tool | Description |
|------|-------------|
| `get_authorized_user` | Get the authenticated user's info |
| `get_authorized_teams` | Get all workspaces the authorized user belongs to |
| `get_access_token` | Exchange an OAuth authorization code for an access token |

### Teams / Workspaces (5 tools)

| Tool | Description |
|------|-------------|
| `get_teams` | Get all workspaces/teams the authenticated user belongs to |
| `get_team` | Get a specific team/workspace by ID |
| `get_team_members` | Get all members of a team/workspace |
| `get_workspace_seats` | View used, total, and available member and guest seats |
| `get_workspace_plan` | View the current plan for the specified workspace |

### Spaces (9 tools)

| Tool | Description |
|------|-------------|
| `get_spaces` | Get all spaces in a team/workspace |
| `get_space` | Get a specific space by ID |
| `create_space` | Create a new space in a team/workspace |
| `update_space` | Update an existing space |
| `delete_space` | Delete a space permanently |
| `get_space_tags` | Get all tags in a space |
| `create_space_tag` | Create a tag in a space |
| `update_space_tag` | Update (rename or recolor) a tag in a space |
| `delete_space_tag` | Delete a tag from a space |

### Folders (5 tools)

| Tool | Description |
|------|-------------|
| `get_folders` | Get all folders in a space |
| `get_folder` | Get a specific folder by ID |
| `create_folder` | Create a folder in a space |
| `update_folder` | Update a folder |
| `delete_folder` | Delete a folder permanently |

### Lists (10 tools)

| Tool | Description |
|------|-------------|
| `get_lists` | Get all lists in a folder |
| `get_folderless_lists` | Get all folderless lists in a space |
| `get_list` | Get a specific list by ID |
| `create_list` | Create a list in a folder |
| `create_folderless_list` | Create a folderless list directly in a space |
| `update_list` | Update an existing list |
| `delete_list` | Delete a list permanently |
| `get_list_members` | Get members of a list |
| `add_task_to_list` | Add an existing task to an additional list |
| `remove_task_from_list` | Remove a task from a list (does not delete the task) |

### Tasks (17 tools)

| Tool | Description |
|------|-------------|
| `get_tasks` | Get tasks from a list with optional filters |
| `get_task` | Get a specific task by ID |
| `create_task` | Create a new task in a list |
| `update_task` | Update an existing task |
| `delete_task` | Delete a task permanently |
| `get_filtered_team_tasks` | Get tasks from an entire workspace with filters |
| `move_task_to_list` | Move a task to a different list (API v3) |
| `get_task_members` | Get members assigned to a task |
| `add_task_assignee` | Add an assignee to a task |
| `remove_task_assignee` | Remove an assignee from a task |
| `get_task_dependencies` | Get task dependencies |
| `add_task_dependency` | Add a dependency between tasks |
| `delete_task_dependency` | Remove a dependency from a task |
| `link_tasks` | Create a link between two tasks |
| `delete_task_link` | Remove a link between two tasks |
| `add_task_tag` | Add a tag to a task |
| `remove_task_tag` | Remove a tag from a task |

### Comments (8 tools)

| Tool | Description |
|------|-------------|
| `get_task_comments` | Get all comments on a task |
| `create_task_comment` | Create a comment on a task |
| `get_list_comments` | Get all comments on a list |
| `create_list_comment` | Create a comment on a list |
| `get_chat_view_comments` | Get comments on a chat view |
| `create_chat_view_comment` | Create a comment on a chat view |
| `update_comment` | Update an existing comment |
| `delete_comment` | Delete a comment |

### Checklists (6 tools)

| Tool | Description |
|------|-------------|
| `create_checklist` | Create a checklist on a task |
| `update_checklist` | Update a checklist (rename or reorder) |
| `delete_checklist` | Delete a checklist |
| `create_checklist_item` | Create an item in a checklist |
| `update_checklist_item` | Update a checklist item (mark resolved, rename, assign) |
| `delete_checklist_item` | Delete a checklist item |

### Attachments (1 tool)

| Tool | Description |
|------|-------------|
| `create_task_attachment` | Upload a file attachment to a task (base64-encoded content) |

### Time Tracking — v2 (12 tools)

| Tool | Description |
|------|-------------|
| `get_time_entries` | Get time entries for a team/workspace |
| `get_time_entry` | Get a single time entry |
| `create_time_entry` | Create a time entry / log time on a task |
| `update_time_entry` | Update a time entry |
| `delete_time_entry` | Delete a time entry |
| `start_timer` | Start a timer on a task |
| `stop_timer` | Stop the currently running timer |
| `get_running_timer` | Get the currently running timer for a user |
| `get_time_entry_tags` | Get all time entry tags for a team |
| `add_tags_to_time_entries` | Add labels/tags to time entries in a workspace |
| `remove_tags_from_time_entries` | Remove labels/tags from time entries in a workspace |
| `change_tag_name_from_time_entries` | Rename an existing time entry tag across a workspace |

### Time Tracking — Legacy (4 tools)

| Tool | Description |
|------|-------------|
| `get_task_time_tracked` | Get tracked time for a specific task (legacy endpoint) |
| `track_time_on_task` | Log time on a task (legacy endpoint) |
| `update_task_time_tracked` | Update a time entry on a task (legacy endpoint) |
| `delete_task_time_tracked` | Delete a time entry from a task (legacy endpoint) |

### Goals (8 tools)

| Tool | Description |
|------|-------------|
| `get_goals` | Get all goals in a team/workspace |
| `get_goal` | Get a specific goal by ID |
| `create_goal` | Create a new goal |
| `update_goal` | Update a goal |
| `delete_goal` | Delete a goal |
| `create_key_result` | Create a key result (target) for a goal |
| `update_key_result` | Update a key result |
| `delete_key_result` | Delete a key result |

### Views (6 tools)

| Tool | Description |
|------|-------------|
| `get_team_views` | Get all views in a team/workspace (Everything level) |
| `get_space_views` | Get all views in a space |
| `get_folder_views` | Get all views in a folder |
| `get_list_views` | Get all views in a list |
| `get_view` | Get a specific view by ID |
| `get_view_tasks` | Get tasks visible in a specific view |

### Webhooks (4 tools)

| Tool | Description |
|------|-------------|
| `get_webhooks` | Get all webhooks for a team/workspace |
| `create_webhook` | Create a webhook for a team |
| `update_webhook` | Update a webhook |
| `delete_webhook` | Delete a webhook |

### Custom Fields (3 tools)

| Tool | Description |
|------|-------------|
| `get_accessible_custom_fields` | Get all custom fields accessible in a list |
| `set_custom_field_value` | Set the value of a custom field on a task |
| `remove_custom_field_value` | Remove/clear a custom field value from a task |

### Custom Task Types (1 tool)

| Tool | Description |
|------|-------------|
| `get_custom_task_types` | Get all custom task types available in a workspace |

### Docs — v2 (3 tools)

| Tool | Description |
|------|-------------|
| `search_docs` | Search docs in a workspace |
| `get_doc` | Get a specific doc by ID |
| `get_doc_pages` | Get all pages of a doc |

### Docs — v3 (5 tools)

| Tool | Description |
|------|-------------|
| `create_doc` | Create a new doc in a workspace (API v3) |
| `create_doc_page` | Create a page in a doc (API v3) |
| `update_doc_page` | Update a doc page's content (API v3) |
| `get_doc_page` | Get a single page from a doc by page ID (API v3) |
| `delete_doc_page` | Delete a page from a doc (API v3) |

### Chat — v3 (4 tools)

| Tool | Description |
|------|-------------|
| `get_chat_channels` | Get chat channels in a workspace (API v3) |
| `create_chat_channel` | Create a chat channel (API v3) |
| `get_channel_messages` | Get messages from a chat channel (API v3) |
| `send_chat_message` | Send a message to a chat channel (API v3) |

### Audit Logs — v3 (1 tool)

| Tool | Description |
|------|-------------|
| `get_audit_logs` | Get audit logs for a workspace (API v3, requires Enterprise plan) |

### Users (4 tools)

| Tool | Description |
|------|-------------|
| `get_user` | Get a user in a workspace by user ID |
| `invite_user_to_workspace` | Invite a new member to a workspace |
| `update_user_on_workspace` | Update a user's role or admin status in a workspace |
| `remove_user_from_workspace` | Remove a user from a workspace |

### Guests (10 tools)

| Tool | Description |
|------|-------------|
| `invite_guest_to_workspace` | Invite a guest to a workspace |
| `get_guest` | Get info about a guest in a workspace |
| `update_guest_on_workspace` | Update a guest's permissions in a workspace |
| `remove_guest_from_workspace` | Remove a guest from a workspace |
| `add_guest_to_task` | Give a guest access to a task |
| `remove_guest_from_task` | Remove a guest's access from a task |
| `add_guest_to_list` | Give a guest access to a list |
| `remove_guest_from_list` | Remove a guest's access from a list |
| `add_guest_to_folder` | Give a guest access to a folder |
| `remove_guest_from_folder` | Remove a guest's access from a folder |

### Roles (1 tool)

| Tool | Description |
|------|-------------|
| `get_custom_roles` | Get all custom roles in a workspace |

### User Groups (4 tools)

| Tool | Description |
|------|-------------|
| `get_user_groups` | Get all user groups (teams) in a workspace |
| `create_user_group` | Create a user group in a workspace |
| `update_user_group` | Update a user group (rename, add/remove members) |
| `delete_user_group` | Delete a user group |

### Shared Hierarchy (1 tool)

| Tool | Description |
|------|-------------|
| `get_shared_hierarchy` | Get tasks and lists shared with the authenticated user |

### Templates (2 tools)

| Tool | Description |
|------|-------------|
| `get_task_templates` | Get all task templates in a workspace |
| `create_task_from_template` | Create a new task using a task template |

---

## Common Workflows

### Create and manage tasks

```
1. Call get_authorized_teams to find your workspace (team_id).
2. Call get_spaces with that team_id to find a space (space_id).
3. Call get_folders with the space_id, then get_lists with a folder_id.
4. Call create_task with list_id and name (plus optional status, priority, assignees, due_date).
5. Call update_task to change status, reassign, or set a due date later.
6. Call delete_task when the task is no longer needed.
```

Example — create a high-priority task:

```json
{
  "tool": "create_task",
  "arguments": {
    "list_id": "901234567",
    "name": "Implement login page",
    "status": "In Progress",
    "priority": 2,
    "assignees": [12345678],
    "due_date": 1735689600000
  }
}
```

### Track time on tasks

```
1. Call start_timer with team_id and task_id to begin tracking.
2. Call stop_timer with team_id when done.
3. Call get_time_entries with team_id to review logged time.
4. Call create_time_entry to log time retroactively.
```

Example — log time retroactively:

```json
{
  "tool": "create_time_entry",
  "arguments": {
    "team_id": "9012345",
    "task_id": "abc123",
    "start": 1735600000000,
    "duration": 3600000,
    "description": "Code review",
    "billable": true
  }
}
```

### Manage goals and key results

```
1. Call create_goal with team_id, name, and due_date.
2. Call create_key_result with goal_id, name, type (e.g. "number"), steps_start, steps_end.
3. Call update_key_result with key_result_id and steps_current to report progress.
4. Call get_goal to check completion percentage.
```

Example — create a goal with a numeric key result:

```json
{
  "tool": "create_goal",
  "arguments": {
    "team_id": "9012345",
    "name": "Q1 Revenue Target",
    "due_date": 1743465600000,
    "owners": [12345678]
  }
}
```

```json
{
  "tool": "create_key_result",
  "arguments": {
    "goal_id": "goal_abc",
    "name": "Close 50 deals",
    "type": "number",
    "steps_start": 0,
    "steps_end": 50,
    "owners": [12345678]
  }
}
```

### Work with Docs (v3)

```
1. Call create_doc with workspace_id and name to create a new doc.
2. Call create_doc_page with workspace_id, doc_id, name, and markdown content.
3. Call update_doc_page to overwrite or append content to a page.
4. Call get_doc_pages (v2) to list all pages in a doc.
```

Example — create a doc and add a page:

```json
{
  "tool": "create_doc",
  "arguments": {
    "workspace_id": "9012345",
    "name": "Product Roadmap",
    "visibility": "public"
  }
}
```

```json
{
  "tool": "create_doc_page",
  "arguments": {
    "workspace_id": "9012345",
    "doc_id": "doc_xyz",
    "name": "Q1 Milestones",
    "content": "## Goals\n- Launch beta\n- Onboard 100 users"
  }
}
```

### Set up webhooks

```
1. Call create_webhook with team_id, your HTTPS endpoint URL, and the event list.
2. Call get_webhooks to verify creation and get the webhook_id.
3. Call update_webhook to add/remove events or change the endpoint.
4. Call delete_webhook to remove when no longer needed.
```

Available events include: `taskCreated`, `taskUpdated`, `taskDeleted`, `taskStatusUpdated`, `taskAssigneeUpdated`, `taskCommentPosted`, `listCreated`, `folderCreated`, `spaceCreated`, `goalCreated`, and more.

Example — watch for task status changes in a space:

```json
{
  "tool": "create_webhook",
  "arguments": {
    "team_id": "9012345",
    "endpoint": "https://your-server.example.com/clickup-events",
    "events": ["taskStatusUpdated", "taskCommentPosted"],
    "space_id": "12345"
  }
}
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CLICKUP_API_TOKEN` | Yes | Your ClickUp personal API token (starts with `pk_`) |

The token is read at startup via `process.env.CLICKUP_API_TOKEN`. If it is missing the server will throw an error on the first API call.

---

## Development

```bash
# Compile TypeScript to dist/
npm run build

# Run without compiling (uses tsx, auto-reloads on file change with nodemon if desired)
npm run dev

# Run a live integration test against the real ClickUp API
node test-live.mjs
```

### Project structure

```
clickup-mcp/
  src/
    index.ts              # MCP server entry point, tool registry
    clickup-client.ts     # Shared HTTP client (api.get/post/put/delete)
    tools/
      authorization.ts    # Auth / OAuth tools
      teams.ts            # Workspace tools
      spaces.ts           # Space + tag tools
      folders.ts          # Folder tools
      lists.ts            # List tools
      tasks.ts            # Task tools (v2 + v3)
      comments.ts         # Comment tools
      checklists.ts       # Checklist tools
      attachments.ts      # File upload
      time-tracking.ts    # Time tracking v2
      time-tracking-legacy.ts  # Per-task time tracking
      goals.ts            # Goals + key results
      views.ts            # Views
      webhooks.ts         # Webhooks
      custom-fields.ts    # Custom fields
      custom-task-types.ts
      docs.ts             # Docs v2
      users.ts            # Member management
      guests.ts           # Guest access management
      roles.ts            # Custom roles
      user-groups.ts      # User groups
      shared-hierarchy.ts
      templates.ts
      v3-docs.ts          # Docs API v3
      v3-chat.ts          # Chat API v3
      v3-audit.ts         # Audit logs API v3
  dist/                   # Compiled output (after npm run build)
  test-live.mjs           # Live integration tests
  .env.example            # Environment template
  package.json
  tsconfig.json
```

### Adding a new tool

1. Add a new object to the relevant array in `src/tools/<category>.ts`. Each object needs `name`, `description`, `inputSchema`, and `handler`.
2. The tool is automatically registered — no changes to `index.ts` are needed unless you are creating an entirely new category file (in which case import and spread it into `allTools`).
3. Run `npm run build` and restart the MCP client to pick up the new tool.

### API versions

- Most tools use the ClickUp **v2** API (`https://api.clickup.com/api/v2`).
- Tools in `v3-docs.ts`, `v3-chat.ts`, `v3-audit.ts`, and `move_task_to_list` use the **v3** API (`https://api.clickup.com/api/v3`).
- The v3 endpoints use the same `CLICKUP_API_TOKEN` for authentication.
