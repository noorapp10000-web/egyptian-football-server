import { createFileRoute } from "@tanstack/react-router";

import { fail, handle } from "@/lib/api-response.server";
import { loadNews, resolveTeam } from "@/lib/filgoal.server";

export const Route = createFileRoute("/api/public/teams/$teamId/news")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const team = resolveTeam(params.teamId);
        if (!team) return fail("فريق غير معروف", 404);
        const limit = Number(new URL(request.url).searchParams.get("limit") ?? 0);
        return handle(async () => {
          const { news, source } = await loadNews(team);
          const list = Number.isInteger(limit) && limit > 0 ? news.slice(0, limit) : news;
          return {
            team: { key: team.key, id: team.id, name: team.name },
            count: list.length,
            news: list,
            source,
          };
        }, 120);
      },
    },
  },
});
