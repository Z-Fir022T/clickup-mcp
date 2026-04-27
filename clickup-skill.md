# ClickUp Skill

Use this skill when the user wants to interact with ClickUp: create or update tasks, track time, manage spaces, read or write docs, send chat messages, manage goals, invite users, set up webhooks, or do anything else in their ClickUp workspace.

## Available MCP Server

The `clickup` MCP server exposes 137 tools covering the full ClickUp API (v2 and v3). All tools are prefixed and callable directly.

---

## Workflow

Follow this order for every ClickUp request:

1. **Always start with `get_teams`** — this returns the workspace ID (`team_id`) required by nearly all other tools. Never hardcode or assume a team_id.

2. **Navigate the hierarchy** to find the target resource ID:
   - `get_teams` → `team_id`
   - `get_spaces(team_id)` → `space_id`
   - `get_folders(space_id)` → `folder_id` (or `get_folderless_lists(space_id)` for folder-free lists)
   - `get_lists(folder_id)` → `list_id`
   - `get_tasks(list_id)` → `task_id`

3. **Act** — call the write/read tool once you have the required IDs.

4. **Confirm** — report the result back to the user with relevant IDs or names from the response.

---

## Tool Categories

### 1. Teams (5 tools)
`get_teams`, `get_team`, `get_team_members`, `get_workspace_seats`, `get_workspace_plan`

### 2. Spaces (9 tools)
`get_spaces`, `get_space`, `create_space`, `update_space`, `delete_space`,
`get_space_tags`, `create_space_tag`, `update_space_tag`, `delete_space_tag`

### 3. Folders (5 tools)
`get_folders`, `get_folder`, `create_folder`, `update_folder`, `delete_folder`

### 4. Lists (10 tools)
`get_lists`, `get_folderless_lists`, `get_list`, `create_list`, `create_folderless_list`,
`update_list`, `delete_list`, `get_list_members`, `add_task_to_list`, `remove_task_from_list`

### 5. Tasks (17 tools)
`get_tasks`, `get_task`, `create_task`, `update_task`, `delete_task`,
`get_filtered_team_tasks`, `move_task_to_list`,
`get_task_members`, `add_task_assignee`, `remove_task_assignee`,
`get_task_dependencies`, `add_task_dependency`, `delete_task_dependency`,
`link_tasks`, `delete_task_link`,
`add_task_tag`, `remove_task_tag`

### 6. Comments (8 tools)
`get_task_comments`, `create_task_comment`,
`get_list_comments`, `create_list_comment`,
`get_chat_view_comments`, `create_chat_view_comment`,
`update_comment`, `delete_comment`

### 7. Checklists (6 tools)
`create_checklist`, `update_checklist`, `delete_checklist`,
`create_checklist_item`, `update_checklist_item`, `delete_checklist_item`

### 8. Goals (8 tools)
`get_goals`, `get_goal`, `create_goal`, `update_goal`, `delete_goal`,
`create_key_result`, `update_key_result`, `delete_key_result`

### 9. Time Tracking (12 tools)
`get_time_entries`, `get_time_entry`, `create_time_entry`, `update_time_entry`, `delete_time_entry`,
`start_timer`, `stop_timer`, `get_running_timer`,
`get_time_entry_tags`, `add_tags_to_time_entries`, `remove_tags_from_time_entries`, `change_tag_name_from_time_entries`

### 10. Views (6 tools)
`get_team_views`, `get_space_views`, `get_folder_views`, `get_list_views`, `get_view`, `get_view_tasks`

### 11. Webhooks (4 tools)
`get_webhooks`, `create_webhook`, `update_webhook`, `delete_webhook`

### 12. Custom Fields (3 tools)
`get_accessible_custom_fields`, `set_custom_field_value`, `remove_custom_field_value`

### 13. Docs v2 — Read (3 tools)
`search_docs`, `get_doc`, `get_doc_pages`

### 14. Docs v3 — Full CRUD (5 tools)
`create_doc`, `create_doc_page`, `update_doc_page`, `get_doc_page`, `delete_doc_page`

### 15. Chat v3 (4 tools)
`get_chat_channels`, `create_chat_channel`, `get_channel_messages`, `send_chat_message`

### 16. Users (4 tools)
`get_user`, `invite_user_to_workspace`, `update_user_on_workspace`, `remove_user_from_workspace`

### 17. Guests (10 tools)
`invite_guest_to_workspace`, `get_guest`, `update_guest_on_workspace`, `remove_guest_from_workspace`,
`add_guest_to_task`, `remove_guest_from_task`,
`add_guest_to_list`, `remove_guest_from_list`,
`add_guest_to_folder`, `remove_guest_from_folder`

### 18. Attachments (1 tool)
`create_task_attachment`

---

## Key ID Types

| ID | Type | How to get it |
|----|------|---------------|
| `team_id` | string | `get_teams` — always the first call |
| `space_id` | string | `get_spaces(team_id)` |
| `folder_id` | string | `get_folders(space_id)` |
| `list_id` | string | `get_lists(folder_id)` or `get_folderless_lists(space_id)` |
| `task_id` | string | `get_tasks(list_id)` or `get_filtered_team_tasks(team_id)` |
| `user_id` | **number** | `get_team_members(team_id)` — field is `id` in the member object |
| `guest_id` | **number** | `get_guest` or returned when guest is invited |
| `goal_id` | string | `get_goals(team_id)` |
| `key_result_id` | string | returned inside goal from `get_goal(goal_id)` |
| `timer_id` | string | returned by `create_time_entry` or `get_time_entries` |
| `view_id` | string | `get_team_views`, `get_space_views`, `get_list_views`, etc. |
| `doc_id` | string | `search_docs(team_id)` or returned by `create_doc` |
| `page_id` | string | `get_doc_pages(team_id, doc_id)` or returned by `create_doc_page` |
| `channel_id` | string | `get_chat_channels(workspace_id)` |
| `webhook_id` | string | `get_webhooks(team_id)` or returned by `create_webhook` |
| `checklist_id` | string | returned by `create_checklist` |
| `comment_id` | string | returned in comment list responses |

**Note**: `workspace_id` (used in v3 tools) is the same value as `team_id`. Use the one returned by `get_teams`.

**Note on dates**: All date/time values are Unix timestamps in **milliseconds**. Multiply epoch seconds by 1000, or use language-level time utilities.

---

## Example Prompts and Tool Chains

### "Create a task called X in my project"
```
get_teams
  → get_spaces(team_id)          [find the right space by name]
  → get_folders(space_id)        [find the right folder, or...]
  → get_folderless_lists(space_id) [if the list is not in a folder]
  → get_lists(folder_id)         [find the right list]
  → create_task(list_id, name="X", ...)
```

### "Assign this task to John"
```
get_teams
  → get_team_members(team_id)    [find John's user_id number]
  → add_task_assignee(task_id, assignee_id=<John's numeric ID>)
```

### "How much time did I track this week?"
```
get_teams
  → get_time_entries(team_id, start_date=<Monday Unix ms>, end_date=<Sunday Unix ms>)
```

### "Start tracking time on my current task"
```
get_teams
  → [navigate to find task_id if not provided]
  → start_timer(team_id, task_id)
```

### "Log 2 hours on task ABC-123"
```
get_teams
  → create_time_entry(team_id, task_id="ABC-123", start=<now minus 2h in ms>, duration=7200000)
```

### "Create a doc for my sprint"
```
get_teams
  → create_doc(workspace_id=team_id, name="Sprint Doc")
  → create_doc_page(workspace_id, doc_id, name="Sprint Overview", content="## Goals\n...")
```

### "Show me all tasks due this week across the workspace"
```
get_teams
  → get_filtered_team_tasks(team_id, due_date_gt=<Monday ms>, due_date_lt=<Sunday ms>)
```

### "Invite someone to my workspace"
```
get_teams
  → invite_user_to_workspace(team_id, email="someone@example.com", admin=false)
```

### "Invite a guest to view a specific task"
```
get_teams
  → invite_guest_to_workspace(team_id, email="guest@example.com")
  → [get guest_id from response]
  → add_guest_to_task(task_id, guest_id, permission_level="read")
```

### "Set up a webhook for new tasks"
```
get_teams
  → create_webhook(team_id, endpoint="https://my-server.com/hook", events=["taskCreated"])
```

### "Set the custom field 'Story Points' to 5 on this task"
```
get_accessible_custom_fields(list_id)   [find the field_id for "Story Points"]
  → set_custom_field_value(task_id, field_id, value=5)
```

### "Create a goal for Q3 with a percentage key result"
```
get_teams
  → create_goal(team_id, name="Q3 Goal", due_date=<Unix ms>)
  → create_key_result(goal_id, name="Complete 80% of planned features", owners=[user_id],
                      type="percentage", steps_start=0, steps_end=100)
```

### "Update my Q3 goal progress to 60%"
```
[get goal_id and key_result_id from get_goals or get_goal]
  → update_key_result(key_result_id, steps_current=60, note="Completed 3 of 5 epics")
```

### "Send a message in the #engineering channel"
```
get_teams
  → get_chat_channels(workspace_id=team_id)   [find channel_id by name]
  → send_chat_message(workspace_id, channel_id, content="Hello team!")
```

### "Add a checklist to this task"
```
create_checklist(task_id, name="Pre-launch checklist")
  → create_checklist_item(checklist_id, name="Write tests")
  → create_checklist_item(checklist_id, name="Update docs")
```

### "Attach a file to a task"
```
create_task_attachment(task_id, filename="report.pdf", file_content_base64="...", mime_type="application/pdf")
```

### "Move this task to a different list"
```
get_teams
  → [navigate to find target list_id if needed]
  → move_task_to_list(workspace_id=team_id, task_id, list_id)
```

---

## Important Reminders

- **Priority numbers**: 1 = urgent, 2 = high, 3 = normal, 4 = low
- **Assignees on create_task**: pass an array of numeric user IDs — `[12345, 67890]`
- **Assignees on update_task**: pass an object — `{ "add": [12345], "rem": [67890] }`
- **DELETE responses**: HTTP 204 with empty body — this is success, not an error
- **Folderless lists**: always check `get_folderless_lists(space_id)` in addition to `get_folders` — many workspaces have lists that live directly in a space
- **v3 workspace_id = team_id**: they are the same value
- **doc content_edit_mode**: use `"append"` in `update_doc_page` to add to existing content without overwriting
