import { createFileRoute } from "@tanstack/react-router";

import { fail, handle } from "@/lib/api-response.server";
import { loadTeamStandings, resolveTeam } from "@/lib/filgoal.server";

export const Route = createFileRoute("/api/public/teams/$teamId/standings")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const team = resolveTeam(params.teamId);
        if (!team) return fail("فريق غير معروف", 404);
        return handle(async () => {
          const { groups, source } = await loadTeamStandings(team);
          return {
            team: { key: team.key, id: team.id, name: team.name },
            groups,
            source,
          };
        }, 300);
      },
    },
  },
});
