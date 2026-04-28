# ClickUp MCP Audit Matrix

This file maps documented ClickUp API operations to the currently implemented MCP tools in `C:\Users\Usuario\clickup-mcp`.

## Summary

- Documented operations: 172
- `validated_live_ok`: 52
- `validated_live_fail`: 2
- `implemented_not_live_tested`: 118
- `missing`: 0

## Status Legend

- `validated_live_ok`: implemented and verified with a real request
- `validated_live_fail`: implemented, but live validation returned an error
- `implemented_not_live_tested`: implemented in the MCP, but not yet validated live
- `missing`: documented operation with no MCP tool mapped to the endpoint

## V2 - Attachments

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `POST` | `/v2/task/{task_id}/attachment` | `CreateTaskAttachment` | `create_task_attachment` | `implemented_not_live_tested` |  |

## V2 - Authorization

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `POST` | `/v2/oauth/token` | `GetAccessToken` | `get_access_token` | `implemented_not_live_tested` |  |
| `GET` | `/v2/user` | `GetAuthorizedUser` | `get_authorized_user` | `validated_live_ok` |  |

## V2 - Comments

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `DELETE` | `/v2/comment/{comment_id}` | `DeleteComment` | `delete_comment` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/comment/{comment_id}` | `UpdateComment` | `update_comment` | `implemented_not_live_tested` |  |
| `GET` | `/v2/comment/{comment_id}/reply` | `GetThreadedComments` | `get_threaded_comments` | `implemented_not_live_tested` |  |
| `POST` | `/v2/comment/{comment_id}/reply` | `CreateThreadedComment` | `create_threaded_comment` | `implemented_not_live_tested` |  |
| `GET` | `/v2/list/{list_id}/comment` | `GetListComments` | `get_list_comments` | `validated_live_ok` |  |
| `POST` | `/v2/list/{list_id}/comment` | `CreateListComment` | `create_list_comment` | `implemented_not_live_tested` |  |
| `GET` | `/v2/task/{task_id}/comment` | `GetTaskComments` | `get_task_comments` | `validated_live_ok` |  |
| `POST` | `/v2/task/{task_id}/comment` | `CreateTaskComment` | `create_task_comment` | `implemented_not_live_tested` |  |
| `GET` | `/v2/view/{view_id}/comment` | `GetChatViewComments` | `get_chat_view_comments` | `implemented_not_live_tested` |  |
| `POST` | `/v2/view/{view_id}/comment` | `CreateChatViewComment` | `create_chat_view_comment` | `implemented_not_live_tested` |  |

## V2 - Custom Fields

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/folder/{folder_id}/field` | `getFolderAvailableFields` | `get_folder_custom_fields` | `validated_live_ok` |  |
| `GET` | `/v2/list/{list_id}/field` | `GetAccessibleCustomFields` | `get_accessible_custom_fields` | `validated_live_ok` |  |
| `GET` | `/v2/space/{space_id}/field` | `getSpaceAvailableFields` | `get_space_custom_fields` | `validated_live_ok` |  |
| `DELETE` | `/v2/task/{task_id}/field/{field_id}` | `RemoveCustomFieldValue` | `remove_custom_field_value` | `implemented_not_live_tested` |  |
| `POST` | `/v2/task/{task_id}/field/{field_id}` | `SetCustomFieldValue` | `set_custom_field_value` | `implemented_not_live_tested` |  |
| `GET` | `/v2/team/{team_id}/field` | `getTeamAvailableFields` | `get_workspace_custom_fields` | `validated_live_ok` |  |

## V2 - Custom Task Types

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/team/{team_id}/custom_item` | `GetCustomItems` | `get_custom_task_types` | `implemented_not_live_tested` |  |

## V2 - Folders

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `DELETE` | `/v2/folder/{folder_id}` | `DeleteFolder` | `delete_folder` | `implemented_not_live_tested` |  |
| `GET` | `/v2/folder/{folder_id}` | `GetFolder` | `get_folder` | `validated_live_ok` |  |
| `PUT` | `/v2/folder/{folder_id}` | `UpdateFolder` | `update_folder` | `implemented_not_live_tested` |  |
| `GET` | `/v2/space/{space_id}/folder` | `GetFolders` | `get_folders` | `validated_live_ok` |  |
| `POST` | `/v2/space/{space_id}/folder` | `CreateFolder` | `create_folder` | `implemented_not_live_tested` |  |
| `POST` | `/v2/space/{space_id}/folder_template/{template_id}` | `CreateFolderFromTemplate` | `create_folder_from_template` | `implemented_not_live_tested` |  |

## V2 - Goals

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `DELETE` | `/v2/goal/{goal_id}` | `DeleteGoal` | `delete_goal` | `implemented_not_live_tested` |  |
| `GET` | `/v2/goal/{goal_id}` | `GetGoal` | `get_goal` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/goal/{goal_id}` | `UpdateGoal` | `update_goal` | `implemented_not_live_tested` |  |
| `POST` | `/v2/goal/{goal_id}/key_result` | `CreateKeyResult` | `create_key_result` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/key_result/{key_result_id}` | `DeleteKeyResult` | `delete_key_result` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/key_result/{key_result_id}` | `EditKeyResult` | `update_key_result` | `implemented_not_live_tested` |  |
| `GET` | `/v2/team/{team_id}/goal` | `GetGoals` | `get_goals` | `validated_live_ok` |  |
| `POST` | `/v2/team/{team_id}/goal` | `CreateGoal` | `create_goal` | `implemented_not_live_tested` |  |

## V2 - Guests

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `DELETE` | `/v2/folder/{folder_id}/guest/{guest_id}` | `RemoveGuestFromFolder` | `remove_guest_from_folder` | `implemented_not_live_tested` |  |
| `POST` | `/v2/folder/{folder_id}/guest/{guest_id}` | `AddGuestToFolder` | `add_guest_to_folder` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/list/{list_id}/guest/{guest_id}` | `RemoveGuestFromList` | `remove_guest_from_list` | `implemented_not_live_tested` |  |
| `POST` | `/v2/list/{list_id}/guest/{guest_id}` | `AddGuestToList` | `add_guest_to_list` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/task/{task_id}/guest/{guest_id}` | `RemoveGuestFromTask` | `remove_guest_from_task` | `implemented_not_live_tested` |  |
| `POST` | `/v2/task/{task_id}/guest/{guest_id}` | `AddGuestToTask` | `add_guest_to_task` | `implemented_not_live_tested` |  |
| `POST` | `/v2/team/{team_id}/guest` | `InviteGuestToWorkspace` | `invite_guest_to_workspace` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/team/{team_id}/guest/{guest_id}` | `RemoveGuestFromWorkspace` | `remove_guest_from_workspace` | `implemented_not_live_tested` |  |
| `GET` | `/v2/team/{team_id}/guest/{guest_id}` | `GetGuest` | `get_guest` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/team/{team_id}/guest/{guest_id}` | `EditGuestOnWorkspace` | `update_guest_on_workspace` | `implemented_not_live_tested` |  |

## V2 - Lists

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/folder/{folder_id}/list` | `GetLists` | `get_lists` | `validated_live_ok` |  |
| `POST` | `/v2/folder/{folder_id}/list` | `CreateList` | `create_list` | `implemented_not_live_tested` |  |
| `POST` | `/v2/folder/{folder_id}/list_template/{template_id}` | `CreateFolderListFromTemplate` | `create_folder_list_from_template` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/list/{list_id}` | `DeleteList` | `delete_list` | `implemented_not_live_tested` |  |
| `GET` | `/v2/list/{list_id}` | `GetList` | `get_list` | `validated_live_ok` |  |
| `PUT` | `/v2/list/{list_id}` | `UpdateList` | `update_list` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/list/{list_id}/task/{task_id}` | `RemoveTaskFromList` | `remove_task_from_list` | `implemented_not_live_tested` |  |
| `POST` | `/v2/list/{list_id}/task/{task_id}` | `AddTaskToList` | `add_task_to_list` | `implemented_not_live_tested` |  |
| `GET` | `/v2/space/{space_id}/list` | `GetFolderlessLists` | `get_folderless_lists` | `validated_live_ok` |  |
| `POST` | `/v2/space/{space_id}/list` | `CreateFolderlessList` | `create_folderless_list` | `implemented_not_live_tested` |  |
| `POST` | `/v2/space/{space_id}/list_template/{template_id}` | `CreateSpaceListFromTemplate` | `create_space_list_from_template` | `implemented_not_live_tested` |  |

## V2 - Members

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/list/{list_id}/member` | `GetListMembers` | `get_list_members` | `validated_live_ok` |  |
| `GET` | `/v2/task/{task_id}/member` | `GetTaskMembers` | `get_bulk_tasks_time_in_status` | `validated_live_ok` |  |

## V2 - Roles

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/team/{team_id}/customroles` | `GetCustomRoles` | `get_custom_roles` | `validated_live_ok` |  |

## V2 - Shared Hierarchy

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/team/{team_id}/shared` | `SharedHierarchy` | `get_shared_hierarchy` | `validated_live_ok` |  |

## V2 - Spaces

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `DELETE` | `/v2/space/{space_id}` | `DeleteSpace` | `delete_space` | `implemented_not_live_tested` |  |
| `GET` | `/v2/space/{space_id}` | `GetSpace` | `get_space` | `validated_live_ok` |  |
| `PUT` | `/v2/space/{space_id}` | `UpdateSpace` | `update_space` | `implemented_not_live_tested` |  |
| `GET` | `/v2/team/{team_id}/space` | `GetSpaces` | `get_spaces` | `validated_live_ok` |  |
| `POST` | `/v2/team/{team_id}/space` | `CreateSpace` | `create_space` | `implemented_not_live_tested` |  |

## V2 - Tags

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/space/{space_id}/tag` | `GetSpaceTags` | `get_space_tags` | `validated_live_ok` |  |
| `POST` | `/v2/space/{space_id}/tag` | `CreateSpaceTag` | `create_space_tag` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/space/{space_id}/tag/{tag_name}` | `DeleteSpaceTag` | `delete_space_tag` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/space/{space_id}/tag/{tag_name}` | `EditSpaceTag` | `update_space_tag` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/task/{task_id}/tag/{tag_name}` | `RemoveTagFromTask` | `add_task_assignee` | `implemented_not_live_tested` |  |
| `POST` | `/v2/task/{task_id}/tag/{tag_name}` | `AddTagToTask` | `get_task_members` | `validated_live_ok` |  |

## V2 - Task Checklists

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `DELETE` | `/v2/checklist/{checklist_id}` | `DeleteChecklist` | `delete_checklist` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/checklist/{checklist_id}` | `EditChecklist` | `update_checklist` | `implemented_not_live_tested` |  |
| `POST` | `/v2/checklist/{checklist_id}/checklist_item` | `CreateChecklistItem` | `create_checklist_item` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/checklist/{checklist_id}/checklist_item/{checklist_item_id}` | `DeleteChecklistItem` | `delete_checklist_item` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/checklist/{checklist_id}/checklist_item/{checklist_item_id}` | `EditChecklistItem` | `update_checklist_item` | `implemented_not_live_tested` |  |
| `POST` | `/v2/task/{task_id}/checklist` | `CreateChecklist` | `create_checklist` | `implemented_not_live_tested` |  |

## V2 - Task Relationships

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `DELETE` | `/v2/task/{task_id}/dependency` | `DeleteDependency` | `delete_task_dependency` | `implemented_not_live_tested` |  |
| `POST` | `/v2/task/{task_id}/dependency` | `AddDependency` | `move_task_to_list` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/task/{task_id}/link/{links_to}` | `DeleteTaskLink` | `replace_task_time_estimates_by_user` | `implemented_not_live_tested` |  |
| `POST` | `/v2/task/{task_id}/link/{links_to}` | `AddTaskLink` | `update_task_time_estimates_by_user` | `implemented_not_live_tested` |  |

## V2 - Tasks

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/list/{list_id}/task` | `GetTasks` | `get_tasks` | `validated_live_ok` |  |
| `POST` | `/v2/list/{list_id}/task` | `CreateTask` | `create_task` | `implemented_not_live_tested` |  |
| `POST` | `/v2/list/{list_id}/taskTemplate/{template_id}` | `CreateTaskFromTemplate` | `create_task_from_template` | `implemented_not_live_tested` |  |
| `GET` | `/v2/task/bulk_time_in_status/task_ids` | `GetBulkTasks'TimeinStatus` | `delete_task` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/task/{task_id}` | `DeleteTask` | `delete_task` | `implemented_not_live_tested` |  |
| `GET` | `/v2/task/{task_id}` | `GetTask` | `get_task` | `validated_live_ok` |  |
| `PUT` | `/v2/task/{task_id}` | `UpdateTask` | `update_task` | `implemented_not_live_tested` |  |
| `POST` | `/v2/task/{task_id}/merge` | `mergeTasks` | `get_filtered_team_tasks` | `validated_live_ok` |  |
| `GET` | `/v2/task/{task_id}/time_in_status` | `GetTask'sTimeinStatus` | `get_task_time_in_status` | `validated_live_fail` | 401 live response |
| `GET` | `/v2/team/{team_Id}/task` | `GetFilteredTeamTasks` | `update_task` | `implemented_not_live_tested` |  |

## V2 - Templates

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/team/{team_id}/folder_template` | `GetFolderTemplates` | `get_folder_templates` | `validated_live_ok` |  |
| `GET` | `/v2/team/{team_id}/list_template` | `GetListTemplates` | `get_list_templates` | `validated_live_ok` |  |
| `GET` | `/v2/team/{team_id}/taskTemplate` | `GetTaskTemplates` | `get_task_templates` | `validated_live_ok` |  |

## V2 - Time Tracking

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/team/{team_Id}/time_entries` | `Gettimeentrieswithinadaterange` | `get_time_entries` | `validated_live_ok` |  |
| `POST` | `/v2/team/{team_Id}/time_entries` | `Createatimeentry` | `create_time_entry` | `implemented_not_live_tested` |  |
| `POST` | `/v2/team/{team_Id}/time_entries/start` | `StartatimeEntry` | `start_timer` | `implemented_not_live_tested` |  |
| `GET` | `/v2/team/{team_id}/time_entries/current` | `Getrunningtimeentry` | `get_running_timer` | `validated_live_ok` |  |
| `POST` | `/v2/team/{team_id}/time_entries/stop` | `StopatimeEntry` | `stop_timer` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/team/{team_id}/time_entries/tags` | `Removetagsfromtimeentries` | `remove_tags_from_time_entries` | `implemented_not_live_tested` |  |
| `GET` | `/v2/team/{team_id}/time_entries/tags` | `Getalltagsfromtimeentries` | `get_time_entry_tags` | `validated_live_ok` |  |
| `POST` | `/v2/team/{team_id}/time_entries/tags` | `Addtagsfromtimeentries` | `add_tags_to_time_entries` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/team/{team_id}/time_entries/tags` | `Changetagnamesfromtimeentries` | `change_tag_name_from_time_entries` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/team/{team_id}/time_entries/{timer_id}` | `DeleteatimeEntry` | `delete_time_entry` | `implemented_not_live_tested` |  |
| `GET` | `/v2/team/{team_id}/time_entries/{timer_id}` | `Getsingulartimeentry` | `get_time_entry` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/team/{team_id}/time_entries/{timer_id}` | `UpdateatimeEntry` | `update_time_entry` | `implemented_not_live_tested` |  |
| `GET` | `/v2/team/{team_id}/time_entries/{timer_id}/history` | `Gettimeentryhistory` | `get_time_entry_history` | `implemented_not_live_tested` |  |

## V2 - Time Tracking (Legacy)

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/task/{task_id}/time` | `Gettrackedtime` | `get_task_time_tracked` | `validated_live_ok` |  |
| `POST` | `/v2/task/{task_id}/time` | `Tracktime` | `track_time_on_task` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/task/{task_id}/time/{interval_id}` | `Deletetimetracked` | `delete_task_time_tracked` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/task/{task_id}/time/{interval_id}` | `Edittimetracked` | `update_task_time_tracked` | `implemented_not_live_tested` |  |

## V2 - User Groups

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/group` | `GetTeams1` | `get_user_groups` | `validated_live_ok` |  |
| `DELETE` | `/v2/group/{group_id}` | `DeleteTeam` | `delete_user_group` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/group/{group_id}` | `UpdateTeam` | `update_user_group` | `implemented_not_live_tested` |  |
| `POST` | `/v2/team/{team_id}/group` | `CreateUserGroup` | `create_user_group` | `implemented_not_live_tested` |  |

## V2 - Users

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `POST` | `/v2/team/{team_id}/user` | `InviteUserToWorkspace` | `invite_user_to_workspace` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/team/{team_id}/user/{user_id}` | `RemoveUserFromWorkspace` | `remove_user_from_workspace` | `implemented_not_live_tested` |  |
| `GET` | `/v2/team/{team_id}/user/{user_id}` | `GetUser` | `get_user` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/team/{team_id}/user/{user_id}` | `EditUserOnWorkspace` | `update_user_on_workspace` | `implemented_not_live_tested` |  |

## V2 - Views

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/folder/{folder_id}/view` | `GetFolderViews` | `get_folder_views` | `validated_live_ok` |  |
| `POST` | `/v2/folder/{folder_id}/view` | `CreateFolderView` | `create_folder_view` | `implemented_not_live_tested` |  |
| `GET` | `/v2/list/{list_id}/view` | `GetListViews` | `get_list_views` | `validated_live_ok` |  |
| `POST` | `/v2/list/{list_id}/view` | `CreateListView` | `create_list_view` | `implemented_not_live_tested` |  |
| `GET` | `/v2/space/{space_id}/view` | `GetSpaceViews` | `get_space_views` | `validated_live_ok` |  |
| `POST` | `/v2/space/{space_id}/view` | `CreateSpaceView` | `create_space_view` | `implemented_not_live_tested` |  |
| `GET` | `/v2/team/{team_id}/view` | `GetTeamViews` | `get_team_views` | `validated_live_ok` |  |
| `POST` | `/v2/team/{team_id}/view` | `CreateTeamView` | `create_team_view` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/view/{view_id}` | `DeleteView` | `delete_view` | `implemented_not_live_tested` |  |
| `GET` | `/v2/view/{view_id}` | `GetView` | `get_view` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/view/{view_id}` | `UpdateView` | `update_view` | `implemented_not_live_tested` |  |
| `GET` | `/v2/view/{view_id}/task` | `GetViewTasks` | `get_view_tasks` | `implemented_not_live_tested` |  |

## V2 - Webhooks

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/team/{team_id}/webhook` | `GetWebhooks` | `get_webhooks` | `validated_live_ok` |  |
| `POST` | `/v2/team/{team_id}/webhook` | `CreateWebhook` | `create_webhook` | `implemented_not_live_tested` |  |
| `DELETE` | `/v2/webhook/{webhook_id}` | `DeleteWebhook` | `delete_webhook` | `implemented_not_live_tested` |  |
| `PUT` | `/v2/webhook/{webhook_id}` | `UpdateWebhook` | `update_webhook` | `implemented_not_live_tested` |  |

## V2 - Workspaces

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/v2/team` | `GetAuthorizedTeams` | `get_authorized_teams`, `get_workspace_plan` | `validated_live_ok` |  |
| `GET` | `/v2/team/{team_id}/plan` | `GetWorkspaceplan` | `get_workspace_seats` | `validated_live_ok` |  |
| `GET` | `/v2/team/{team_id}/seats` | `GetWorkspaceseats` | `get_team_members` | `implemented_not_live_tested` |  |

## V3 - Acls

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `PATCH` | `/api/v3/workspaces/{workspace_id}/{object_type}/{object_id}/acls` | `publicPatchAcl` | `update_acl` | `implemented_not_live_tested` |  |

## V3 - Attachments

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/api/v3/workspaces/{workspace_id}/{entity_type}/{entity_id}/attachments` | `getParentEntityAttachments` | `get_entity_attachments` | `implemented_not_live_tested` |  |
| `POST` | `/api/v3/workspaces/{workspace_id}/{entity_type}/{entity_id}/attachments` | `postEntityAttachment` | `create_entity_attachment` | `implemented_not_live_tested` |  |

## V3 - Auditlogs

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `POST` | `/api/v3/workspaces/{workspace_id}/auditlogs` | `queryAuditLog` | `query_audit_logs`, `get_audit_logs` | `validated_live_fail` | 404 live response |

## V3 - Chat

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/api/v3/workspaces/{workspace_id}/chat/channels` | `getChatChannels` | `get_chat_channels` | `validated_live_ok` |  |
| `POST` | `/api/v3/workspaces/{workspace_id}/chat/channels` | `createChatChannel` | `create_chat_channel` | `implemented_not_live_tested` |  |
| `POST` | `/api/v3/workspaces/{workspace_id}/chat/channels/direct_message` | `createDirectMessageChatChannel` | `create_direct_message_channel` | `implemented_not_live_tested` |  |
| `POST` | `/api/v3/workspaces/{workspace_id}/chat/channels/location` | `createLocationChatChannel` | `create_location_chat_channel` | `implemented_not_live_tested` |  |
| `DELETE` | `/api/v3/workspaces/{workspace_id}/chat/channels/{channel_id}` | `deleteChatChannel` | `delete_chat_channel` | `implemented_not_live_tested` |  |
| `GET` | `/api/v3/workspaces/{workspace_id}/chat/channels/{channel_id}` | `getChatChannel` | `get_chat_channel` | `validated_live_ok` |  |
| `PATCH` | `/api/v3/workspaces/{workspace_id}/chat/channels/{channel_id}` | `updateChatChannel` | `update_chat_channel` | `implemented_not_live_tested` |  |
| `GET` | `/api/v3/workspaces/{workspace_id}/chat/channels/{channel_id}/followers` | `getChatChannelFollowers` | `get_chat_channel_followers` | `validated_live_ok` |  |
| `GET` | `/api/v3/workspaces/{workspace_id}/chat/channels/{channel_id}/members` | `getChatChannelMembers` | `get_chat_channel_members` | `validated_live_ok` |  |
| `GET` | `/api/v3/workspaces/{workspace_id}/chat/channels/{channel_id}/messages` | `getChatMessages` | `get_channel_messages` | `validated_live_ok` |  |
| `POST` | `/api/v3/workspaces/{workspace_id}/chat/channels/{channel_id}/messages` | `createChatMessage` | `send_chat_message` | `implemented_not_live_tested` |  |
| `DELETE` | `/api/v3/workspaces/{workspace_id}/chat/messages/{message_id}` | `deleteChatMessage` | `delete_chat_message` | `implemented_not_live_tested` |  |
| `PATCH` | `/api/v3/workspaces/{workspace_id}/chat/messages/{message_id}` | `patchChatMessage` | `update_chat_message` | `implemented_not_live_tested` |  |
| `GET` | `/api/v3/workspaces/{workspace_id}/chat/messages/{message_id}/reactions` | `getChatMessageReactions` | `get_chat_message_reactions` | `validated_live_ok` |  |
| `POST` | `/api/v3/workspaces/{workspace_id}/chat/messages/{message_id}/reactions` | `createChatReaction` | `create_chat_reaction` | `implemented_not_live_tested` |  |
| `DELETE` | `/api/v3/workspaces/{workspace_id}/chat/messages/{message_id}/reactions/{reaction}` | `deleteChatReaction` | `delete_chat_reaction` | `implemented_not_live_tested` |  |
| `GET` | `/api/v3/workspaces/{workspace_id}/chat/messages/{message_id}/replies` | `getChatMessageReplies` | `get_chat_message_replies` | `validated_live_ok` |  |
| `POST` | `/api/v3/workspaces/{workspace_id}/chat/messages/{message_id}/replies` | `createReplyMessage` | `create_reply_message` | `implemented_not_live_tested` |  |
| `GET` | `/api/v3/workspaces/{workspace_id}/chat/messages/{message_id}/tagged_users` | `getChatMessageTaggedUsers` | `get_chat_message_tagged_users` | `validated_live_ok` |  |

## V3 - Comments

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/api/v3/workspaces/{workspace_id}/comments/types/{comment_type}/subtypes` | `getSubtypes` | `get_comment_subtypes` | `validated_live_ok` |  |

## V3 - Docs

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `GET` | `/api/v3/workspaces/{workspace_id}/docs` | `searchDocsPublic` | `search_docs`, `search_docs_v3` | `validated_live_ok` |  |
| `POST` | `/api/v3/workspaces/{workspace_id}/docs` | `createDocPublic` | `create_doc` | `implemented_not_live_tested` |  |
| `GET` | `/api/v3/workspaces/{workspace_id}/docs/{doc_id}` | `getDocPublic` | `get_doc`, `get_doc_v3` | `validated_live_ok` |  |
| `GET` | `/api/v3/workspaces/{workspace_id}/docs/{doc_id}/page_listing` | `getDocPageListingPublic` | `get_doc_page_listing` | `validated_live_ok` |  |
| `GET` | `/api/v3/workspaces/{workspace_id}/docs/{doc_id}/pages` | `getDocPagesPublic` | `get_doc_pages`, `get_doc_pages_v3` | `validated_live_ok` |  |
| `POST` | `/api/v3/workspaces/{workspace_id}/docs/{doc_id}/pages` | `createPagePublic` | `create_doc_page` | `implemented_not_live_tested` |  |
| `GET` | `/api/v3/workspaces/{workspace_id}/docs/{doc_id}/pages/{page_id}` | `getPagePublic` | `get_doc_page` | `implemented_not_live_tested` |  |
| `PUT` | `/api/v3/workspaces/{workspace_id}/docs/{doc_id}/pages/{page_id}` | `editPagePublic` | `update_doc_page` | `implemented_not_live_tested` |  |

## V3 - Tasks

| Method | Path | Operation ID | Tool(s) | Status | Note |
|---|---|---|---|---|---|
| `PUT` | `/api/v3/workspaces/{workspace_id}/tasks/{task_id}/home_list/{list_id}` | `moveTask` | `remove_task_assignee` | `implemented_not_live_tested` |  |
| `PATCH` | `/api/v3/workspaces/{workspace_id}/tasks/{task_id}/time_estimates_by_user` | `updateTimeEstimatesByUser` | `get_task_dependencies` | `implemented_not_live_tested` |  |
| `PUT` | `/api/v3/workspaces/{workspace_id}/tasks/{task_id}/time_estimates_by_user` | `replaceTimeEstimatesByUser` | `add_task_dependency` | `implemented_not_live_tested` |  |
