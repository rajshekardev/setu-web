import { useQuery } from "@tanstack/solid-query";
import { orpc } from "../../lib/client";
import { Match, Switch } from "solid-js";
import { withQuery } from "./utils/query-hoc";

const Health = () => {
  const healthCheck = useQuery(() => orpc.healthCheck.queryOptions());

  return (
    <div>
      <section class="rounded-lg border p-4">
        <h2 class="mb-2 font-medium">API Status</h2>
        <Switch>
          <Match when={healthCheck.isPending}>
            <div class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-gray-500 animate-pulse" />{" "}
              <span class="text-sm text-muted-foreground">Checking...</span>
            </div>
          </Match>
          <Match when={healthCheck.isError}>
            <div class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-red-500" />
              <span class="text-sm text-muted-foreground">Disconnected</span>
            </div>
          </Match>
          <Match when={healthCheck.isSuccess}>
            <div class="flex items-center gap-2">
              <div
                class={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
              />
              <span class="text-sm text-muted-foreground">
                {healthCheck.data ? "Connected" : "Disconnected"}
              </span>
            </div>
          </Match>
        </Switch>
      </section>
    </div>
  );
};

export default withQuery(Health);
