import { createFileRoute } from "@tanstack/react-router";

import { json } from "@/lib/api-response.server";
import { TEAMS, crestUrl } from "@/lib/teams";

export const Route = createFileRoute("/api/public/teams")({
  server: {
    handlers: {
      GET: () =>
        json(
          {
            teams: Object.values(TEAMS).map((t) => ({
              key: t.key,
              id: t.id,
              name: t.name,
              kind: t.kind,
              leagueId: t.leagueId,
              crestUrl: crestUrl(t.id),
            })),
          },
          3600,
        ),
    },
  },
});
