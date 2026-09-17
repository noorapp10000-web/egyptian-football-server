import { createFileRoute } from "@tanstack/react-router";

import { fail, handle } from "@/lib/api-response.server";
import { loadSquad, resolveTeam } from "@/lib/filgoal.server";

export const Route = createFileRoute("/api/public/teams/$teamId/squad")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const team = resolveTeam(params.teamId);
        if (!team) return fail("فريق غير معروف", 404);
        return handle(async () => {
          const data = await loadSquad(team);
          return {
            team: { key: team.key, id: team.id, name: team.name },
            count: data.players.length,
            ...data,
          };
        }, 300);
      },
    },
  },
});
