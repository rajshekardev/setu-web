import type { Component } from "solid-js";
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

interface WithQueryConfig {
  queryClient?: QueryClient
}

export function withQuery<T extends Record<string, any>>(
  WrappedComponent: Component<T>,
  config?: WithQueryConfig
) {
  return (props: T) => {
    const client = config?.queryClient || queryClient

    return (
      <QueryClientProvider client={client}>
        <WrappedComponent {...props} />
      </QueryClientProvider>
    )
  }
}
