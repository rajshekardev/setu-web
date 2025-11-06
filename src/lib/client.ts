import { createAuthClient } from "better-auth/solid";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { QueryCache, QueryClient } from "@tanstack/solid-query";
import { RPCLink } from "@orpc/client/fetch";
import { createORPCClient } from "@orpc/client";
import type { AppRouterClient } from "../types/orpc-types";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

const apiUrl = import.meta.env.PUBLIC_API_URL as string;

export const authCLient = createAuthClient({
  baseUrl: apiUrl,
  plugins: [
    inferAdditionalFields({
      user: { role: { type: "string" } },
    }),
  ],
});

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error(`Error: ${error.message}`);
    },
  }),
});

export const link = new RPCLink({
  url: `${apiUrl}/rpc`,
  fetch(url, options) {
    return fetch(url, {
      ...options,
      credentials: "include",
    });
  },
});

export const client: AppRouterClient = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
