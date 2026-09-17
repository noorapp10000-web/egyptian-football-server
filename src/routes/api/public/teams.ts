import { createFileRoute } from "@tanstack/react-router";

import { json } from "@/lib/api-response.server";
import { TEAMS } from "@/lib/filgoal.server";

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
              crestUrl: `https://semedia.filgoal.com/Photos/Team/Medium/${t.id}.png`,
            })),
          },
          3600,
        ),
    },
  },
});
