import { createFileRoute } from "@tanstack/react-router";

import { fail, handle } from "@/lib/api-response.server";
import { loadMatchDetail } from "@/lib/filgoal.server";

export const Route = createFileRoute("/api/public/matches/$matchId")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const matchId = Number(params.matchId);
        if (!Number.isInteger(matchId) || matchId <= 0) return fail("رقم مباراة غير صحيح", 400);
        return handle(() => loadMatchDetail(matchId), 20);
      },
    },
  },
});
