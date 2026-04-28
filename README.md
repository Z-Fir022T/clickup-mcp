# ClickUp MCP Server

![Tools](https://img.shields.io/badge/tools-183-blue)
![ClickUp API](https://img.shields.io/badge/ClickUp%20API-v2%20%2B%20v3-orange)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![MCP](https://img.shields.io/badge/protocol-MCP-purple)

A Model Context Protocol (MCP) server that exposes the ClickUp API to any MCP-compatible AI client.

The current server exposes 183 MCP tools across ClickUp API v2 and v3. This repo also includes an audit matrix that maps documented ClickUp operations to MCP tools and records live validation status.

---

## Features

- 183 MCP tools currently exposed by the server
- 172 documented ClickUp API operations mapped in the audit matrix
- 0 documented operations currently marked as missing
- Audit artifacts included: `AUDIT_MATRIX.md` and `audit-matrix.json`
- Supports local stdio usage and hosted HTTP/SSE usage
- Uses per-connection token isolation for the hosted server

Note: the tool count is higher than the documented operation count because this server includes backward-compatible aliases and a few convenience tools around the published API surface.

### Tool Categories (28 total)

| Category | Tools | Description |
|----------|-------|-------------|
| Tasks | 22 | Full task lifecycle, dependencies, links, tags, move, merge, and time-in-status |
| Spaces | 9 | Space management and space-level tags |
| Lists | 12 | Folder-based and folderless lists, members, and template-based creation |
| Folders | 6 | Folder CRUD plus folder-from-template |
| Comments | 10 | Task, list, chat-view, and threaded comments |
| Goals | 8 | Goals and key results |
| Time Tracking (v2) | 13 | Time entries, timers, tags, and time entry history |
| Time Tracking Legacy | 4 | Per-task time tracking legacy endpoints |
| Webhooks | 4 | Webhook CRUD with event filtering |
| Views | 12 | Team, space, folder, and list views with create, update, and delete |
| Checklists | 6 | Checklists and checklist items on tasks |
| Custom Fields | 6 | Workspace, space, folder, and list field access plus set/clear |
| Docs (v2 compatibility) | 3 | Backward-compatible doc aliases routed through v3 |
| Docs (v3) | 9 | Search, retrieve, create, update, and delete docs and pages |
| Chat (v3) | 19 | Channel, follower, member, message, reaction, reply, and delete flows |
| Audit Logs (v3) | 2 | Official query tool plus compatibility alias |
| Authorization | 3 | Authenticated user info and OAuth token exchange |
| Teams / Workspaces | 5 | Workspace info, members, seats, and plan |
| Users | 4 | Invite, update, and remove workspace members |
| Guests | 10 | Guest invitations and scoped access management |
| Roles | 1 | Custom role listing |
| User Groups | 4 | User group management |
| Shared Hierarchy | 1 | Items shared with the authenticated user |
| Attachments | 3 | Task attachments in v2 and entity attachments in v3 |
| Templates | 4 | Folder, list, and task template discovery/instantiation |
| Custom Task Types | 1 | Custom task type listing |
| ACLs (v3) | 1 | Privacy and sharing ACL updates |
| Comment Types (v3) | 1 | Comment subtype discovery |

---

## Prerequisites

- Node.js 18+ (uses native `fetch` and `FormData`)
- A ClickUp account with a Personal API Token
- To get your token: ClickUp Settings -> Apps -> API Token -> Generate

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

The server reads `CLICKUP_API_TOKEN` from the environment for local/stdio usage. For the hosted server, each user passes their token in the connection URL.

---

## Running

Local compiled stdio transport:

```bash
npm start
```

Dev mode:

```bash
npm run dev
```

HTTP/SSE server:

```bash
npm run start:http
```

---

## Using the Hosted Server

If the server is deployed on Railway or any public URL, users only need one MCP config entry.

Each user passes their own ClickUp token in the SSE URL:

```text
https://your-app.railway.app/sse?token=pk_YOUR_TOKEN_HERE
```

Claude Desktop example:

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

Cursor / Claude Code example:

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

Security note: the token travels over HTTPS and is scoped per SSE connection via `AsyncLocalStorage`, so requests remain isolated per user session.

---

## Local MCP Client Configuration

If you run the server locally instead of on Railway:

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

Those files are the source of truth for documented ClickUp parity and live validation status.

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
| `update_space_tag` | Update a tag in a space |
| `delete_space_tag` | Delete a tag from a space |

### Folders (6 tools)

| Tool | Description |
|------|-------------|
| `get_folders` | Get all folders in a space |
| `get_folder` | Get a specific folder by ID |
| `create_folder` | Create a folder in a space |
| `update_folder` | Update a folder |
| `delete_folder` | Delete a folder permanently |
| `create_folder_from_template` | Create a new folder from a folder template |

### Lists (12 tools)

| Tool | Description |
|------|-------------|
| `get_lists` | Get all lists in a folder |
| `get_folderless_lists` | Get all folderless lists in a space |
| `get_list` | Get a specific list by ID |
| `create_list` | Create a list in a folder |
| `create_folder_list_from_template` | Create a new list in a folder from a list template |
| `create_folderless_list` | Create a folderless list directly in a space |
| `create_space_list_from_template` | Create a new folderless list in a space from a list template |
| `update_list` | Update an existing list |
| `delete_list` | Delete a list permanently |
| `get_list_members` | Get members of a list |
| `add_task_to_list` | Add an existing task to an additional list |
| `remove_task_from_list` | Remove a task from a list without deleting the task |

### Tasks (22 tools)

| Tool | Description |
|------|-------------|
| `get_tasks` | Get tasks from a list with optional filters |
| `get_task` | Get a specific task by ID |
| `create_task` | Create a new task in a list |
| `update_task` | Update an existing task |
| `delete_task` | Delete a task permanently |
| `get_filtered_team_tasks` | Get tasks from an entire workspace with filters |
| `get_bulk_tasks_time_in_status` | Get time in status for multiple tasks |
| `merge_tasks` | Merge one or more tasks into a target task |
| `get_task_time_in_status` | Get how long a task has spent in each status |
| `move_task_to_list` | Move a task to a different list using API v3 |
| `update_task_time_estimates_by_user` | Patch time estimates for specific assignees on a task using API v3 |
| `replace_task_time_estimates_by_user` | Replace all time estimates on a task using API v3 |
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

### Comments (10 tools)

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
| `get_threaded_comments` | Get threaded replies for a parent comment |
| `create_threaded_comment` | Create a threaded reply to an existing comment |

### Checklists (6 tools)

| Tool | Description |
|------|-------------|
| `create_checklist` | Create a checklist on a task |
| `update_checklist` | Update a checklist |
| `delete_checklist` | Delete a checklist |
| `create_checklist_item` | Create an item in a checklist |
| `update_checklist_item` | Update a checklist item |
| `delete_checklist_item` | Delete a checklist item |

### Attachments (3 tools)

| Tool | Description |
|------|-------------|
| `create_task_attachment` | Upload a file attachment to a task |
| `get_entity_attachments` | Get attachments for a task or file-type custom field using API v3 |
| `create_entity_attachment` | Upload an attachment to a task or file-type custom field using API v3 |

### Time Tracking (v2) (13 tools)

| Tool | Description |
|------|-------------|
| `get_time_entries` | Get time entries for a team/workspace |
| `get_time_entry` | Get a single time entry |
| `get_time_entry_history` | Get change history for a single time entry |
| `create_time_entry` | Create a time entry |
| `update_time_entry` | Update a time entry |
| `delete_time_entry` | Delete a time entry |
| `start_timer` | Start a timer on a task |
| `stop_timer` | Stop the currently running timer |
| `get_running_timer` | Get the currently running timer for a user |
| `get_time_entry_tags` | Get all time entry tags for a team |
| `add_tags_to_time_entries` | Add labels/tags to time entries |
| `remove_tags_from_time_entries` | Remove labels/tags from time entries |
| `change_tag_name_from_time_entries` | Rename an existing time entry tag across a workspace |

### Time Tracking Legacy (4 tools)

| Tool | Description |
|------|-------------|
| `get_task_time_tracked` | Get tracked time for a specific task |
| `track_time_on_task` | Log time on a task |
| `update_task_time_tracked` | Update a time entry on a task |
| `delete_task_time_tracked` | Delete a time entry from a task |

### Goals (8 tools)

| Tool | Description |
|------|-------------|
| `get_goals` | Get all goals in a team/workspace |
| `get_goal` | Get a specific goal by ID |
| `create_goal` | Create a new goal |
| `update_goal` | Update a goal |
| `delete_goal` | Delete a goal |
| `create_key_result` | Create a key result for a goal |
| `update_key_result` | Update a key result |
| `delete_key_result` | Delete a key result |

### Views (12 tools)

| Tool | Description |
|------|-------------|
| `get_team_views` | Get all views in a team/workspace |
| `create_team_view` | Create a workspace-level view |
| `get_space_views` | Get all views in a space |
| `create_space_view` | Create a view in a space |
| `get_folder_views` | Get all views in a folder |
| `create_folder_view` | Create a view in a folder |
| `get_list_views` | Get all views in a list |
| `create_list_view` | Create a view in a list |
| `get_view` | Get a specific view by ID |
| `update_view` | Update an existing view |
| `delete_view` | Delete a view |
| `get_view_tasks` | Get tasks visible in a specific view |

### Webhooks (4 tools)

| Tool | Description |
|------|-------------|
| `get_webhooks` | Get all webhooks for a team/workspace |
| `create_webhook` | Create a webhook for a team |
| `update_webhook` | Update a webhook |
| `delete_webhook` | Delete a webhook |

### Custom Fields (6 tools)

| Tool | Description |
|------|-------------|
| `get_folder_custom_fields` | Get custom fields available at the folder level |
| `get_accessible_custom_fields` | Get all custom fields accessible in a list |
| `get_space_custom_fields` | Get custom fields available at the space level |
| `get_workspace_custom_fields` | Get custom fields available at the workspace level |
| `set_custom_field_value` | Set the value of a custom field on a task |
| `remove_custom_field_value` | Remove or clear a custom field value from a task |

### Custom Task Types (1 tool)

| Tool | Description |
|------|-------------|
| `get_custom_task_types` | Get all custom task types available in a workspace |

### Docs (v2 compatibility) (3 tools)

| Tool | Description |
|------|-------------|
| `search_docs` | Search docs in a workspace using the backward-compatible v3 alias |
| `get_doc` | Get a specific doc by ID using the backward-compatible v3 alias |
| `get_doc_pages` | Get all pages of a doc using the backward-compatible v3 alias |

### Docs (v3) (9 tools)

| Tool | Description |
|------|-------------|
| `search_docs_v3` | Search docs in a workspace using API v3 |
| `create_doc` | Create a new doc in a workspace |
| `get_doc_v3` | Get a specific doc by ID |
| `get_doc_page_listing` | Get the page tree listing for a doc |
| `get_doc_pages_v3` | Get all pages of a doc |
| `create_doc_page` | Create a page in a doc |
| `get_doc_page` | Get a single page from a doc by page ID |
| `update_doc_page` | Update a doc page content |
| `delete_doc_page` | Delete a page from a doc |

### Chat (v3) (19 tools)

| Tool | Description |
|------|-------------|
| `get_chat_channels` | Get chat channels in a workspace |
| `create_chat_channel` | Create a chat channel |
| `create_direct_message_channel` | Create a direct message channel between users |
| `create_location_chat_channel` | Create or return a channel on a space, folder, or list |
| `get_chat_channel` | Retrieve a single chat channel by ID |
| `update_chat_channel` | Update a chat channel |
| `delete_chat_channel` | Delete a chat channel |
| `get_chat_channel_followers` | Get followers of a chat channel |
| `get_chat_channel_members` | Get members of a chat channel |
| `get_channel_messages` | Get messages from a chat channel |
| `send_chat_message` | Send a message to a chat channel |
| `update_chat_message` | Update a chat message |
| `delete_chat_message` | Delete a chat message |
| `get_chat_message_reactions` | Get reactions for a chat message |
| `create_chat_reaction` | Create a reaction on a chat message |
| `delete_chat_reaction` | Delete a reaction from a chat message |
| `get_chat_message_replies` | Get replies to a chat message |
| `create_reply_message` | Create a reply to a chat message |
| `get_chat_message_tagged_users` | Get tagged users for a chat message |

### Audit Logs (v3) (2 tools)

| Tool | Description |
|------|-------------|
| `query_audit_logs` | Query audit logs for a workspace using the official API v3 request shape |
| `get_audit_logs` | Compatibility alias for querying audit logs |

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
| `get_user_groups` | Get all user groups in a workspace |
| `create_user_group` | Create a user group in a workspace |
| `update_user_group` | Update a user group |
| `delete_user_group` | Delete a user group |

### Shared Hierarchy (1 tool)

| Tool | Description |
|------|-------------|
| `get_shared_hierarchy` | Get tasks and lists shared with the authenticated user |

### Templates (4 tools)

| Tool | Description |
|------|-------------|
| `get_folder_templates` | Get all folder templates in a workspace |
| `get_list_templates` | Get all list templates in a workspace |
| `get_task_templates` | Get all task templates in a workspace |
| `create_task_from_template` | Create a new task using a task template |

### ACLs (v3) (1 tool)

| Tool | Description |
|------|-------------|
| `update_acl` | Update privacy and sharing ACLs for an object or location |

### Comment Types (v3) (1 tool)

| Tool | Description |
|------|-------------|
| `get_comment_subtypes` | Get available post subtypes for a workspace |

---

## Common Workflows

### Create and manage tasks

1. Call `get_authorized_teams` to find your workspace `team_id`.
2. Call `get_spaces` with that `team_id` to find a `space_id`.
3. Call `get_folders` with the `space_id`, then `get_lists` with a `folder_id`.
4. Call `create_task` with `list_id` and `name`.
5. Call `update_task` to change status, reassign, or set dates later.
6. Call `delete_task` when the task is no longer needed.

Example:

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

1. Call `start_timer` with `team_id` and `task_id`.
2. Call `stop_timer` with `team_id` when done.
3. Call `get_time_entries` with `team_id` to review logged time.
4. Call `create_time_entry` to log time retroactively if needed.

Example:

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

### Work with docs

1. Call `create_doc` with `workspace_id` and `name`.
2. Call `create_doc_page` with `workspace_id`, `doc_id`, and `name`.
3. Call `update_doc_page` to replace, append, or prepend content.
4. Call `get_doc_pages_v3` or `get_doc_page_listing` to inspect the doc structure.

Example:

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

1. Call `create_webhook` with `team_id`, your HTTPS endpoint, and the event list.
2. Call `get_webhooks` to confirm creation and obtain the webhook ID.
3. Call `update_webhook` to change the endpoint or event set.
4. Call `delete_webhook` when no longer needed.

Example:

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
| `CLICKUP_API_TOKEN` | Yes | Your ClickUp personal API token |

The token is read at startup via `process.env.CLICKUP_API_TOKEN`. If it is missing, the first API call will fail.

---

## Development

```bash
# Compile TypeScript to dist/
npm run build

# Run without compiling
npm run dev

# Run the hosted HTTP/SSE server locally
npm run start:http
```

---

## Project Structure

```text
clickup-mcp/
  src/
    index.ts                 # Stdio MCP server entry point
    http-server.ts           # HTTP/SSE MCP server entry point
    clickup-client.ts        # Shared ClickUp v2 client
    clickup-client-v3.ts     # Shared ClickUp v3 client
    tools/
      authorization.ts
      attachments.ts
      teams.ts
      spaces.ts
      folders.ts
      lists.ts
      tasks.ts
      comments.ts
      checklists.ts
      time-tracking.ts
      time-tracking-legacy.ts
      goals.ts
      views.ts
      webhooks.ts
      custom-fields.ts
      custom-task-types.ts
      docs.ts
      users.ts
      guests.ts
      roles.ts
      user-groups.ts
      shared-hierarchy.ts
      templates.ts
      v3-docs.ts
      v3-chat.ts
      v3-audit.ts
      v3-attachments.ts
      v3-acls.ts
      v3-comments.ts
  dist/
  AUDIT_MATRIX.md
  audit-matrix.json
  .env.example
  package.json
  tsconfig.json
  Dockerfile
  railway.json
```

### Adding a New Tool

1. Add a new object to the relevant array in `src/tools/<category>.ts`.
2. Each tool object needs `name`, `description`, `inputSchema`, and `handler`.
3. If you create a new category file, import and spread it into `allTools` in both `src/index.ts` and `src/http-server.ts`.
4. Run `npm run build`.
5. Restart your MCP client or redeploy the hosted server.

### API Versions

- Most tools use the ClickUp v2 API at `https://api.clickup.com/api/v2`.
- v3-specific tools use `https://api.clickup.com/api/v3`.
- The doc compatibility tools in `docs.ts` are aliases that now route through v3.
- The same `CLICKUP_API_TOKEN` is used for both v2 and v3 requests.
