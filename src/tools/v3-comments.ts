import { clickupV3Request } from "../clickup-client-v3.js";

export const v3CommentTools = [
  {
    name: "get_comment_subtypes",
    description: "Get available post subtypes for a workspace (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        comment_type: { type: "string", description: "post, ai, syncup, or ai_via_brain" },
      },
      required: ["workspace_id", "comment_type"],
    },
    handler: async (args: { workspace_id: string; comment_type: string }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.workspace_id}/comments/types/${args.comment_type}/subtypes`
      ),
  },
];
