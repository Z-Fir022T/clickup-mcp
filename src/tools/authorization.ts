import { api } from "../clickup-client.js";

export const authorizationTools = [
  {
    name: "get_authorized_user",
    description: "Get the authenticated user's info",
    inputSchema: {
      type: "object",
      properties: {},
    },
    handler: async () => api.get("/user"),
  },
  {
    name: "get_authorized_teams",
    description: "Get all workspaces the authorized user belongs to",
    inputSchema: {
      type: "object",
      properties: {},
    },
    handler: async () => api.get("/team"),
  },
  {
    name: "get_access_token",
    description: "Exchange an OAuth authorization code for an access token (OAuth flow). POST to /api/v2/oauth/token.",
    inputSchema: {
      type: "object",
      properties: {
        client_id: { type: "string", description: "OAuth app client ID" },
        client_secret: { type: "string", description: "OAuth app client secret" },
        code: { type: "string", description: "Authorization code received from the OAuth redirect" },
      },
      required: ["client_id", "client_secret", "code"],
    },
    handler: async (args: { client_id: string; client_secret: string; code: string }) =>
      api.post("/oauth/token", {
        client_id: args.client_id,
        client_secret: args.client_secret,
        code: args.code,
      }),
  },
];
