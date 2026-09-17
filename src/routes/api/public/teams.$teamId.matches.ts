import { createFileRoute } from "@tanstack/react-router";

import { fail, handle } from "@/lib/api-response.server";
import { loadMatches, resolveTeam, type Match } from "@/lib/filgoal.server";

export const Route = createFileRoute("/api/public/teams/$teamId/matches")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const team = resolveTeam(params.teamId);
        if (!team) return fail("فريق غير معروف", 404);
        const url = new URL(request.url);
        const status = url.searchParams.get("status");
        const limit = Number(url.searchParams.get("limit") ?? 0);

        return handle(async () => {
          const { matches, source } = await loadMatches(team);
          let list: Match[] = matches;
          if (status) {
            const wanted = status.split(",").map((s) => s.trim());
            list = list.filter((m) => wanted.includes(m.status));
          }
          if (Number.isInteger(limit) && limit > 0) list = list.slice(0, limit);
          return {
            team: { key: team.key, id: team.id, name: team.name },
            count: list.length,
            matches: list,
            source,
          };
        }, 20);
      },
    },
  },
});
