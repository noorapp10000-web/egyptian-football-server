import { createFileRoute } from "@tanstack/react-router";

import { fail, handle } from "@/lib/api-response.server";
import { loadPlayerDetail } from "@/lib/filgoal.server";

export const Route = createFileRoute("/api/public/players/$playerId")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const playerId = Number(params.playerId);
        if (!Number.isInteger(playerId) || playerId <= 0) return fail("رقم لاعب غير صحيح", 400);
        return handle(() => loadPlayerDetail(playerId), 300);
      },
    },
  },
});
