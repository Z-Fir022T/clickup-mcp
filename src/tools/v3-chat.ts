import { clickupV3Request } from "../clickup-client-v3.js";

type Params = Record<string, string | number | boolean | undefined>;

export const chatTools = [
  {
    name: "get_chat_channels",
    description: "Get chat channels in a workspace (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        description_format: { type: "string", description: "text/md or text/plain" },
        cursor: { type: "string", description: "Pagination cursor" },
        limit: { type: "number" },
        is_follower: { type: "boolean" },
        include_closed: { type: "boolean" },
        with_message_since: { type: "string" },
        channel_types: { type: "string", description: "Comma-separated channel types" },
      },
      required: ["workspace_id"],
    },
    handler: async (args: { workspace_id: string; [key: string]: unknown }) => {
      const { workspace_id, ...params } = args;
      return clickupV3Request(
        "GET",
        `/api/v3/workspaces/${workspace_id}/chat/channels`,
        { params: params as Params }
      );
    },
  },
  {
    name: "create_chat_channel",
    description: "Create a chat channel (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        name: { type: "string" },
        is_private: { type: "boolean" },
        description: { type: "string" },
        member_ids: { type: "array", items: { type: "number" } },
      },
      required: ["workspace_id", "name"],
    },
    handler: async (args: { workspace_id: string; [key: string]: unknown }) => {
      const { workspace_id, ...body } = args;
      return clickupV3Request("POST", `/api/v3/workspaces/${workspace_id}/chat/channels`, { body });
    },
  },
  {
    name: "create_direct_message_channel",
    description: "Create a direct message channel between users (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        user_ids: { type: "array", items: { type: "number" } },
      },
      required: ["workspace_id"],
    },
    handler: async (args: { workspace_id: string; [key: string]: unknown }) => {
      const { workspace_id, ...body } = args;
      return clickupV3Request("POST", `/api/v3/workspaces/${workspace_id}/chat/channels/direct_message`, { body });
    },
  },
  {
    name: "create_location_chat_channel",
    description: "Create or return a channel on a space, folder, or list (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        description: { type: "string" },
        topic: { type: "string" },
        user_ids: { type: "array", items: { type: "number" } },
        visibility: { type: "string", description: "PUBLIC or PRIVATE" },
        location: {
          type: "object",
          description: "Location object, for example { type: 'SPACE', id: '123' }",
        },
      },
      required: ["workspace_id", "location"],
    },
    handler: async (args: { workspace_id: string; [key: string]: unknown }) => {
      const { workspace_id, ...body } = args;
      return clickupV3Request("POST", `/api/v3/workspaces/${workspace_id}/chat/channels/location`, { body });
    },
  },
  {
    name: "get_chat_channel",
    description: "Retrieve a single chat channel by ID (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        channel_id: { type: "string" },
        description_format: { type: "string", description: "text/md or text/plain" },
      },
      required: ["workspace_id", "channel_id"],
    },
    handler: async (args: {
      workspace_id: string;
      channel_id: string;
      description_format?: string;
    }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.workspace_id}/chat/channels/${args.channel_id}`,
        { params: { description_format: args.description_format } }
      ),
  },
  {
    name: "update_chat_channel",
    description: "Update a chat channel (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        channel_id: { type: "string" },
        content_format: { type: "string", description: "text/md or text/plain" },
        description: { type: "string" },
        location: { type: "object" },
        name: { type: "string" },
        topic: { type: "string" },
        visibility: { type: "string", description: "PUBLIC or PRIVATE" },
      },
      required: ["workspace_id", "channel_id"],
    },
    handler: async (args: { workspace_id: string; channel_id: string; [key: string]: unknown }) => {
      const { workspace_id, channel_id, ...body } = args;
      return clickupV3Request(
        "PATCH",
        `/api/v3/workspaces/${workspace_id}/chat/channels/${channel_id}`,
        { body }
      );
    },
  },
  {
    name: "delete_chat_channel",
    description: "Delete a chat channel (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        channel_id: { type: "string" },
      },
      required: ["workspace_id", "channel_id"],
    },
    handler: async (args: { workspace_id: string; channel_id: string }) =>
      clickupV3Request(
        "DELETE",
        `/api/v3/workspaces/${args.workspace_id}/chat/channels/${args.channel_id}`
      ),
  },
  {
    name: "get_chat_channel_followers",
    description: "Get followers of a chat channel (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        channel_id: { type: "string" },
        cursor: { type: "string" },
        limit: { type: "number" },
      },
      required: ["workspace_id", "channel_id"],
    },
    handler: async (args: {
      workspace_id: string;
      channel_id: string;
      cursor?: string;
      limit?: number;
    }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.workspace_id}/chat/channels/${args.channel_id}/followers`,
        { params: { cursor: args.cursor, limit: args.limit } }
      ),
  },
  {
    name: "get_chat_channel_members",
    description: "Get members of a chat channel (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        channel_id: { type: "string" },
        cursor: { type: "string" },
        limit: { type: "number" },
      },
      required: ["workspace_id", "channel_id"],
    },
    handler: async (args: {
      workspace_id: string;
      channel_id: string;
      cursor?: string;
      limit?: number;
    }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.workspace_id}/chat/channels/${args.channel_id}/members`,
        { params: { cursor: args.cursor, limit: args.limit } }
      ),
  },
  {
    name: "get_channel_messages",
    description: "Get messages from a chat channel (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        channel_id: { type: "string" },
        cursor: { type: "string" },
        limit: { type: "number" },
        content_format: { type: "string", description: "text/md or text/plain" },
      },
      required: ["workspace_id", "channel_id"],
    },
    handler: async (args: {
      workspace_id: string;
      channel_id: string;
      cursor?: string;
      limit?: number;
      content_format?: string;
    }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.workspace_id}/chat/channels/${args.channel_id}/messages`,
        { params: { cursor: args.cursor, limit: args.limit, content_format: args.content_format } }
      ),
  },
  {
    name: "send_chat_message",
    description: "Send a message to a chat channel (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        channel_id: { type: "string" },
        content: { type: "string", description: "Message text" },
      },
      required: ["workspace_id", "channel_id", "content"],
    },
    handler: async (args: {
      workspace_id: string;
      channel_id: string;
      content: string;
    }) =>
      clickupV3Request(
        "POST",
        `/api/v3/workspaces/${args.workspace_id}/chat/channels/${args.channel_id}/messages`,
        { body: { content: args.content } }
      ),
  },
  {
    name: "update_chat_message",
    description: "Update a chat message (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        message_id: { type: "string" },
        assignee: { type: "string" },
        group_assignee: { type: "string" },
        content: { type: "string" },
        content_format: { type: "string", description: "text/md or text/plain" },
        post_data: { type: "object" },
        resolved: { type: "boolean" },
      },
      required: ["workspace_id", "message_id"],
    },
    handler: async (args: { workspace_id: string; message_id: string; [key: string]: unknown }) => {
      const { workspace_id, message_id, ...body } = args;
      return clickupV3Request(
        "PATCH",
        `/api/v3/workspaces/${workspace_id}/chat/messages/${message_id}`,
        { body }
      );
    },
  },
  {
    name: "delete_chat_message",
    description: "Delete a chat message (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        message_id: { type: "string" },
      },
      required: ["workspace_id", "message_id"],
    },
    handler: async (args: { workspace_id: string; message_id: string }) =>
      clickupV3Request(
        "DELETE",
        `/api/v3/workspaces/${args.workspace_id}/chat/messages/${args.message_id}`
      ),
  },
  {
    name: "get_chat_message_reactions",
    description: "Get reactions for a chat message (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        message_id: { type: "string" },
        cursor: { type: "string" },
        limit: { type: "number" },
      },
      required: ["workspace_id", "message_id"],
    },
    handler: async (args: {
      workspace_id: string;
      message_id: string;
      cursor?: string;
      limit?: number;
    }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.workspace_id}/chat/messages/${args.message_id}/reactions`,
        { params: { cursor: args.cursor, limit: args.limit } }
      ),
  },
  {
    name: "create_chat_reaction",
    description: "Create a reaction on a chat message (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        message_id: { type: "string" },
        reaction: { type: "string", description: "Lowercase emoji name" },
      },
      required: ["workspace_id", "message_id", "reaction"],
    },
    handler: async (args: { workspace_id: string; message_id: string; reaction: string }) =>
      clickupV3Request(
        "POST",
        `/api/v3/workspaces/${args.workspace_id}/chat/messages/${args.message_id}/reactions`,
        { body: { reaction: args.reaction } }
      ),
  },
  {
    name: "delete_chat_reaction",
    description: "Delete a reaction from a chat message (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        message_id: { type: "string" },
        reaction: { type: "string" },
      },
      required: ["workspace_id", "message_id", "reaction"],
    },
    handler: async (args: { workspace_id: string; message_id: string; reaction: string }) =>
      clickupV3Request(
        "DELETE",
        `/api/v3/workspaces/${args.workspace_id}/chat/messages/${args.message_id}/reactions/${encodeURIComponent(args.reaction)}`
      ),
  },
  {
    name: "get_chat_message_replies",
    description: "Get replies to a chat message (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        message_id: { type: "string" },
        cursor: { type: "string" },
        limit: { type: "number" },
        content_format: { type: "string", description: "text/md or text/plain" },
      },
      required: ["workspace_id", "message_id"],
    },
    handler: async (args: {
      workspace_id: string;
      message_id: string;
      cursor?: string;
      limit?: number;
      content_format?: string;
    }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.workspace_id}/chat/messages/${args.message_id}/replies`,
        { params: { cursor: args.cursor, limit: args.limit, content_format: args.content_format } }
      ),
  },
  {
    name: "create_reply_message",
    description: "Create a reply to a chat message (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        message_id: { type: "string" },
        type: { type: "string", description: "message or post" },
        content: { type: "string" },
        assignee: { type: "string" },
        group_assignee: { type: "string" },
        triaged_action: { type: "number" },
        triaged_object_id: { type: "string" },
        triaged_object_type: { type: "number" },
        reactions: { type: "array" },
        followers: { type: "array" },
        content_format: { type: "string", description: "text/md or text/plain" },
        post_data: { type: "object" },
      },
      required: ["workspace_id", "message_id", "type", "content"],
    },
    handler: async (args: { workspace_id: string; message_id: string; [key: string]: unknown }) => {
      const { workspace_id, message_id, ...body } = args;
      return clickupV3Request(
        "POST",
        `/api/v3/workspaces/${workspace_id}/chat/messages/${message_id}/replies`,
        { body }
      );
    },
  },
  {
    name: "get_chat_message_tagged_users",
    description: "Get @mentioned users for a chat message (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        message_id: { type: "string" },
        cursor: { type: "string" },
        limit: { type: "number" },
      },
      required: ["workspace_id", "message_id"],
    },
    handler: async (args: {
      workspace_id: string;
      message_id: string;
      cursor?: string;
      limit?: number;
    }) =>
      clickupV3Request(
        "GET",
        `/api/v3/workspaces/${args.workspace_id}/chat/messages/${args.message_id}/tagged_users`,
        { params: { cursor: args.cursor, limit: args.limit } }
      ),
  },
];
