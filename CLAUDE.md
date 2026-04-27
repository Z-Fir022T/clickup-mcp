# ClickUp MCP — Claude Instructions

This file teaches Claude how to use the ClickUp MCP server tools correctly and efficiently. There are 137 tools across 18 categories covering the full ClickUp API (v2 and v3).

---

## Critical Rules

1. **Always call `get_teams` first** — most tools require a `team_id` (workspace ID). This is the single most common mistake. Never assume you know the team_id; always retrieve it.

2. **ID types matter**:
   - `team_id`, `space_id`, `folder_id`, `list_id`, `task_id`, `view_id`, `doc_id`, `goal_id`, `webhook_id`, `comment_id`, `checklist_id` — all **strings**
   - `user_id`, `guest_id`, `assignee_id` — **numbers**
   - `key_result_id`, `timer_id`, `page_id`, `channel_id` — strings

3. **Dates use Unix timestamps in milliseconds** — multiply seconds by 1000. Example: `Date.now()` in JS, or `int(time.time() * 1000)` in Python.

4. **Custom task IDs**: When a task was created with a custom ID (like `CU-123`), you must pass `custom_task_ids=true` AND `team_id` together on any task operation.

5. **DELETE endpoints return an empty body (HTTP 204)** — do not attempt to parse or display the response body. An empty result is success.

6. **v3 API tools** (`create_doc`, `create_doc_page`, `update_doc_page`, `get_doc_page`, `delete_doc_page`, `get_chat_channels`, `create_chat_channel`, `get_channel_messages`, `send_chat_message`, `move_task_to_list`) use `workspace_id` — this is the **same value** as `team_id`. Use the value returned by `get_teams`.

7. **Priority values**: 1 = urgent, 2 = high, 3 = normal, 4 = low.

8. **Assignees on tasks**: `create_task` takes an array of user IDs (numbers). `update_task` takes `{ add: [userId], rem: [userId] }` as an object.

---

## Discovery Flow

Navigate the ClickUp hierarchy in this order to find IDs:

```
get_teams
  └─ team_id
       └─ get_spaces(team_id)
            └─ space_id
                 ├─ get_folders(space_id)
                 │    └─ folder_id
                 │         └─ get_lists(folder_id)
                 │              └─ list_id
                 │                   └─ get_tasks(list_id)
                 │                        └─ task_id
                 └─ get_folderless_lists(space_id)
                      └─ list_id  (lists that live directly in the space, no folder)
                           └─ get_tasks(list_id)
                                └─ task_id
```

When you need to find a specific list or task by name, retrieve one level at a time and match by name from the results. Do not skip levels.

---

## Common Patterns

### 1. Create a Task

```
1. get_teams                          → grab team_id
2. get_spaces(team_id)                → find space_id by name
3. get_folders(space_id)              → find folder_id by name
        OR get_folderless_lists(space_id) if the list is not inside a folder
4. get_lists(folder_id)               → find list_id by name
5. create_task(list_id, name, ...)    → done
```

Optional fields on `create_task`: `description`, `markdown_description`, `assignees` (array of user ID numbers), `tags`, `status`, `priority` (1-4), `due_date` (Unix ms), `time_estimate` (ms), `start_date` (Unix ms), `parent` (task_id for subtask), `custom_fields` (array of `{id, value}`).

### 2. Track Time

**Start a live timer** (stops when you call stop):
```
1. get_teams              → team_id
2. start_timer(team_id, task_id, description?, billable?)
3. stop_timer(team_id)    → when done
```

**Log a completed time entry** (no live timer):
```
1. get_teams
2. create_time_entry(team_id, task_id, start (Unix ms), duration (ms))
```

**Check what is running now**:
```
get_running_timer(team_id)
```

**Query past entries with a date range**:
```
get_time_entries(team_id, start_date (Unix ms), end_date (Unix ms))
```

### 3. Create a Doc (v3 API)

```
1. get_teams                                      → workspace_id = team_id
2. create_doc(workspace_id, name, visibility?)    → returns doc_id
3. create_doc_page(workspace_id, doc_id, name, content (markdown), parent_page_id?)
```

Read an existing doc:
```
search_docs(team_id, query?)          → find doc_id
get_doc(team_id, doc_id)              → doc metadata
get_doc_pages(team_id, doc_id)        → all pages (v2)
get_doc_page(workspace_id, doc_id, page_id)  → single page content (v3)
```

### 4. Set a Custom Field Value on a Task

```
1. get_accessible_custom_fields(list_id)           → lists all fields with their field_id and type
2. set_custom_field_value(task_id, field_id, value)
```

Value format depends on field type:
- Text field: `"string value"`
- Number field: `42`
- Checkbox/boolean: `true` or `false`
- Dropdown: the option's `id` (a string from the field definition)
- Date: Unix ms number
- Users: array of user ID numbers

Remove a custom field value: `remove_custom_field_value(task_id, field_id)`

### 5. Manage Goals and Key Results

```
1. get_teams                                                → team_id
2. create_goal(team_id, name, due_date (Unix ms), owners?)  → returns goal_id
3. create_key_result(goal_id, name, owners, type, steps_start, steps_end)
        type options: "number" | "currency" | "boolean" | "percentage" | "automatic"
4. update_key_result(key_result_id, steps_current, note?)   → updates progress
```

### 6. Set Up a Webhook

```
1. get_teams         → team_id
2. create_webhook(team_id, endpoint (HTTPS URL), events (array of event name strings))
```

Available event names:
`taskCreated`, `taskUpdated`, `taskDeleted`, `taskPriorityUpdated`, `taskStatusUpdated`,
`taskAssigneeUpdated`, `taskDueDateUpdated`, `taskTagUpdated`, `taskMoved`,
`taskCommentPosted`, `taskCommentUpdated`, `taskTimeEstimateUpdated`, `taskTimeTrackedUpdated`,
`listCreated`, `listUpdated`, `listDeleted`, `folderCreated`, `folderUpdated`, `folderDeleted`,
`spaceCreated`, `spaceUpdated`, `spaceDeleted`, `goalCreated`, `goalUpdated`, `goalDeleted`,
`keyResultCreated`, `keyResultUpdated`, `keyResultDeleted`

Optionally scope the webhook to a specific `task_id`, `list_id`, `folder_id`, or `space_id`.

### 7. Upload a File Attachment

```
create_task_attachment(task_id, filename, file_content_base64, mime_type)
```

The file must be base64-encoded. Common mime types: `image/png`, `image/jpeg`, `application/pdf`, `text/plain`.

### 8. Work with Chat (v3 API)

```
1. get_teams                              → workspace_id = team_id
2. get_chat_channels(workspace_id)        → find channel_id by name
3. get_channel_messages(workspace_id, channel_id)
4. send_chat_message(workspace_id, channel_id, content)
```

Create a new channel: `create_chat_channel(workspace_id, name, is_private?, member_ids?)`

### 9. Manage Checklists on a Task

```
1. create_checklist(task_id, name)                             → returns checklist_id
2. create_checklist_item(checklist_id, name, assignee?)
3. update_checklist_item(checklist_id, checklist_item_id, resolved=true)  → mark done
4. delete_checklist_item(checklist_id, checklist_item_id)
```

### 10. Move a Task to Another List (v3 API)

```
move_task_to_list(workspace_id, task_id, list_id)
```

`workspace_id` here is the same as `team_id`.

---

## Tool Quick Reference

### Teams / Workspace

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_teams` | (none) | Always call this first. Returns all workspaces. |
| `get_team` | `team_id` | Single workspace details |
| `get_team_members` | `team_id` | All members with their user IDs |
| `get_workspace_seats` | `team_id` | Used/available seat counts |
| `get_workspace_plan` | `team_id` | Current billing plan |

### Spaces

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_spaces` | `team_id` | `archived` optional |
| `get_space` | `space_id` | |
| `create_space` | `team_id`, `name` | `features`, `multiple_assignees` optional |
| `update_space` | `space_id` | `name`, `color`, `private`, `multiple_assignees` |
| `delete_space` | `space_id` | Permanent, 204 response |
| `get_space_tags` | `space_id` | |
| `create_space_tag` | `space_id`, `name` | `tag_fg`, `tag_bg` hex colors |
| `update_space_tag` | `space_id`, `tag_name` | Pass current name in path; new name in body |
| `delete_space_tag` | `space_id`, `tag_name` | |

### Folders

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_folders` | `space_id` | `archived` optional |
| `get_folder` | `folder_id` | |
| `create_folder` | `space_id`, `name` | |
| `update_folder` | `folder_id`, `name` | |
| `delete_folder` | `folder_id` | Permanent, 204 response |

### Lists

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_lists` | `folder_id` | Lists inside a folder |
| `get_folderless_lists` | `space_id` | Lists directly in space |
| `get_list` | `list_id` | |
| `create_list` | `folder_id`, `name` | `content`, `due_date`, `priority`, `assignee`, `status` |
| `create_folderless_list` | `space_id`, `name` | Same optional params as above |
| `update_list` | `list_id` | `name`, `content`, `due_date`, `priority`, `assignee`, `status`, `unset_status` |
| `delete_list` | `list_id` | Permanent |
| `get_list_members` | `list_id` | Members who can see the list |
| `add_task_to_list` | `list_id`, `task_id` | Adds existing task to additional list |
| `remove_task_from_list` | `list_id`, `task_id` | Does NOT delete the task |

### Tasks

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_tasks` | `list_id` | Many optional filters (status, assignee, tags, dates, page) |
| `get_task` | `task_id` | `include_subtasks`, `include_markdown_description` |
| `create_task` | `list_id`, `name` | Full field list in patterns section above |
| `update_task` | `task_id` | Same fields as create; assignees uses `{add, rem}` object |
| `delete_task` | `task_id` | Permanent |
| `get_filtered_team_tasks` | `team_id` | Search across entire workspace; supports `space_ids`, `list_ids`, `statuses`, date filters |
| `move_task_to_list` | `workspace_id`, `task_id`, `list_id` | v3 API |
| `get_task_members` | `task_id` | |
| `add_task_assignee` | `task_id`, `assignee_id` (number) | |
| `remove_task_assignee` | `task_id`, `assignee_id` (number) | |
| `get_task_dependencies` | `task_id` | |
| `add_task_dependency` | `task_id` | `depends_on` or `dependency_of` (task IDs) |
| `delete_task_dependency` | `task_id` | `depends_on` or `dependency_of` |
| `link_tasks` | `task_id`, `links_to` | Creates a task-to-task link |
| `delete_task_link` | `task_id`, `links_to` | |
| `add_task_tag` | `task_id`, `tag_name` | Tag must exist in the space |
| `remove_task_tag` | `task_id`, `tag_name` | |

### Comments

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_task_comments` | `task_id` | Pagination via `start` / `start_id` |
| `create_task_comment` | `task_id`, `comment_text` | `assignee` (user ID), `notify_all` |
| `get_list_comments` | `list_id` | |
| `create_list_comment` | `list_id`, `comment_text` | |
| `get_chat_view_comments` | `view_id` | Chat view comments |
| `create_chat_view_comment` | `view_id`, `comment_text` | |
| `update_comment` | `comment_id` | `comment_text`, `resolved` (boolean) |
| `delete_comment` | `comment_id` | |

### Checklists

| Tool | Required Params | Notes |
|------|----------------|-------|
| `create_checklist` | `task_id`, `name` | Returns `checklist_id` |
| `update_checklist` | `checklist_id` | `name`, `position` |
| `delete_checklist` | `checklist_id` | |
| `create_checklist_item` | `checklist_id`, `name` | `assignee` (user ID number) |
| `update_checklist_item` | `checklist_id`, `checklist_item_id` | `name`, `resolved`, `assignee`, `parent` |
| `delete_checklist_item` | `checklist_id`, `checklist_item_id` | |

### Goals and Key Results

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_goals` | `team_id` | `include_completed` optional |
| `get_goal` | `goal_id` | |
| `create_goal` | `team_id`, `name`, `due_date` | `owners` (array of user IDs), `color`, `description` |
| `update_goal` | `goal_id` | `name`, `due_date`, `add_owners`, `rem_owners`, `color` |
| `delete_goal` | `goal_id` | |
| `create_key_result` | `goal_id`, `name`, `owners`, `type`, `steps_start`, `steps_end` | type: number/currency/boolean/percentage/automatic |
| `update_key_result` | `key_result_id` | `steps_current`, `note` |
| `delete_key_result` | `key_result_id` | |

### Time Tracking

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_time_entries` | `team_id` | `start_date`, `end_date` (Unix ms), `assignee`, `task_id`, `space_id`, `list_id` filters |
| `get_time_entry` | `team_id`, `timer_id` | Single entry |
| `create_time_entry` | `team_id`, `start`, `duration` | `task_id`, `description`, `billable`, `assignee` |
| `update_time_entry` | `team_id`, `timer_id` | `start`, `duration`, `description`, `billable`, `tags`, `tag_action` (add/replace) |
| `delete_time_entry` | `team_id`, `timer_id` | |
| `start_timer` | `team_id`, `task_id` | Starts live timer; `description`, `billable` |
| `stop_timer` | `team_id` | Stops any running timer |
| `get_running_timer` | `team_id` | `assignee` (user ID) to check another user |
| `get_time_entry_tags` | `team_id` | All tags used in time entries |
| `add_tags_to_time_entries` | `team_id`, `time_entry_ids`, `tags` | `tags` is array of `{name, ...}` objects |
| `remove_tags_from_time_entries` | `team_id`, `time_entry_ids`, `tags` | |
| `change_tag_name_from_time_entries` | `team_id`, `name`, `new_name` | Rename a time entry tag workspace-wide |

### Views

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_team_views` | `team_id` | Everything-level views |
| `get_space_views` | `space_id` | |
| `get_folder_views` | `folder_id` | |
| `get_list_views` | `list_id` | |
| `get_view` | `view_id` | |
| `get_view_tasks` | `view_id` | Tasks visible in that view; `page` for pagination |

### Webhooks

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_webhooks` | `team_id` | All webhooks in workspace |
| `create_webhook` | `team_id`, `endpoint`, `events` | `endpoint` must be HTTPS; see event names above |
| `update_webhook` | `webhook_id` | `endpoint`, `events`, `status` (active/inactive) |
| `delete_webhook` | `webhook_id` | |

### Custom Fields

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_accessible_custom_fields` | `list_id` | Returns field definitions with IDs and types |
| `set_custom_field_value` | `task_id`, `field_id`, `value` | Value type depends on field type |
| `remove_custom_field_value` | `task_id`, `field_id` | Clears the field value |

### Docs (v2 — read-only access)

| Tool | Required Params | Notes |
|------|----------------|-------|
| `search_docs` | `team_id` | `query`, `parent_id`, `parent_type` optional |
| `get_doc` | `team_id`, `doc_id` | Doc metadata |
| `get_doc_pages` | `team_id`, `doc_id` | All pages; `max_page_depth` optional |

### Docs (v3 — full CRUD)

| Tool | Required Params | Notes |
|------|----------------|-------|
| `create_doc` | `workspace_id`, `name` | `parent` object `{id, type}`, `visibility` (public/private), `create_page` |
| `create_doc_page` | `workspace_id`, `doc_id`, `name` | `content` (markdown), `sub_title`, `parent_page_id` |
| `update_doc_page` | `workspace_id`, `doc_id`, `page_id` | `name`, `content`, `content_edit_mode` (overwrite/append) |
| `get_doc_page` | `workspace_id`, `doc_id`, `page_id` | Single page content |
| `delete_doc_page` | `workspace_id`, `doc_id`, `page_id` | |

### Chat (v3)

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_chat_channels` | `workspace_id` | `include_archived`, `cursor`, `limit` |
| `create_chat_channel` | `workspace_id`, `name` | `is_private`, `description`, `member_ids` |
| `get_channel_messages` | `workspace_id`, `channel_id` | `cursor`, `limit` for pagination |
| `send_chat_message` | `workspace_id`, `channel_id`, `content` | |

### Users (Workspace Members)

| Tool | Required Params | Notes |
|------|----------------|-------|
| `get_user` | `team_id`, `user_id` (number) | Get one member's profile |
| `invite_user_to_workspace` | `team_id`, `email` | `admin` boolean, `custom_role_id` |
| `update_user_on_workspace` | `team_id`, `user_id` (number) | `admin`, `custom_role_id` |
| `remove_user_from_workspace` | `team_id`, `user_id` (number) | |

### Guests

| Tool | Required Params | Notes |
|------|----------------|-------|
| `invite_guest_to_workspace` | `team_id`, `email` | `can_see_time_spent`, `can_see_time_estimated`, `can_create_views`, `custom_role_id` |
| `get_guest` | `team_id`, `guest_id` (number) | |
| `update_guest_on_workspace` | `team_id`, `guest_id` (number) | Same optional fields as invite |
| `remove_guest_from_workspace` | `team_id`, `guest_id` (number) | |
| `add_guest_to_task` | `task_id`, `guest_id` (number), `permission_level` | Levels: read, comment, create, edit |
| `remove_guest_from_task` | `task_id`, `guest_id` (number) | |
| `add_guest_to_list` | `list_id`, `guest_id` (number), `permission_level` | |
| `remove_guest_from_list` | `list_id`, `guest_id` (number) | |
| `add_guest_to_folder` | `folder_id`, `guest_id` (number), `permission_level` | |
| `remove_guest_from_folder` | `folder_id`, `guest_id` (number) | |

### Attachments

| Tool | Required Params | Notes |
|------|----------------|-------|
| `create_task_attachment` | `task_id`, `filename`, `file_content_base64`, `mime_type` | File must be base64-encoded |

---

## v3 API Notes

Several tools use ClickUp API v3 instead of v2. These are:

- **Doc creation/editing**: `create_doc`, `create_doc_page`, `update_doc_page`, `get_doc_page`, `delete_doc_page`
- **Chat**: `get_chat_channels`, `create_chat_channel`, `get_channel_messages`, `send_chat_message`
- **Task home list**: `move_task_to_list`

Key differences with v3 tools:
- They accept `workspace_id` instead of `team_id` — but the value is identical. Use the ID returned from `get_teams`.
- `update_doc_page` supports `content_edit_mode: "append"` to add content without overwriting the existing page.
- Chat channels use cursor-based pagination (not page numbers). Use the `cursor` field from the response to fetch the next page.
- Doc pages support nested structure via `parent_page_id`.

---

## Error Handling

| HTTP Status | Meaning | Action |
|-------------|---------|--------|
| 401 | Invalid or missing API token | Check `CLICKUP_API_KEY` environment variable |
| 403 | Insufficient permissions | The authenticated user lacks access to that resource |
| 404 | Resource not found | One of the IDs is wrong; navigate the hierarchy again |
| 429 | Rate limited | Slow down; ClickUp limits requests per minute |
| 400 | Bad request / validation error | Check required params, ID types (string vs number), and date format (Unix ms) |
| 204 | Success with no body | Normal for DELETE operations — do not try to parse response |

---

## Workflow Reminders

- When the user says "my workspace" or "my team", call `get_teams` to find it — never guess.
- When the user says "find a task", use `get_filtered_team_tasks` with relevant filters, or navigate the hierarchy to the right list then call `get_tasks`.
- When a user ID is needed for assignee, tags, or key results, call `get_team_members(team_id)` to find users by name.
- When the user asks about "this week's" time, calculate Unix ms timestamps for start/end of the current week and pass them to `get_time_entries`.
- `get_folderless_lists` is easy to forget — many workspaces have lists that live directly in a space with no folder.
