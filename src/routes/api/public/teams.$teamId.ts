import { createFileRoute } from "@tanstack/react-router";

import { fail, handle } from "@/lib/api-response.server";
import { loadTeamProfile, resolveTeam } from "@/lib/filgoal.server";

export const Route = createFileRoute("/api/public/teams/$teamId")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const team = resolveTeam(params.teamId);
        if (!team) return fail("فريق غير معروف", 404);
        return handle(() => loadTeamProfile(team), 600);
      },
    },
  },
});
