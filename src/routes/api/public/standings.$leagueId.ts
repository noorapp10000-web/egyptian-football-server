import { createFileRoute } from "@tanstack/react-router";

import { fail, handle } from "@/lib/api-response.server";
import { loadLeagueStandings, resolveTeam } from "@/lib/filgoal.server";

export const Route = createFileRoute("/api/public/standings/$leagueId")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const leagueId = Number(params.leagueId);
        if (!Number.isInteger(leagueId) || leagueId <= 0) return fail("رقم بطولة غير صحيح", 400);
        const highlight = new URL(request.url).searchParams.get("team");
        const teamId = highlight ? resolveTeam(highlight)?.id ?? null : null;
        return handle(() => loadLeagueStandings(leagueId, teamId), 300);
      },
    },
  },
});
