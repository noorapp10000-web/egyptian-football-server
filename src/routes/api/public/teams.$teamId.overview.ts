import { createFileRoute } from "@tanstack/react-router";

import { fail, handle } from "@/lib/api-response.server";
import {
  loadMatches,
  loadNews,
  loadSquad,
  loadTeamProfile,
  loadTeamStandings,
  resolveTeam,
} from "@/lib/filgoal.server";

/** كل بيانات الفريق في طلب واحد: بروفايل + مباريات + قائمة + ترتيب + أخبار. */
export const Route = createFileRoute("/api/public/teams/$teamId/overview")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const team = resolveTeam(params.teamId);
        if (!team) return fail("فريق غير معروف", 404);

        return handle(async () => {
          const [profile, matches, squad, standings, news] = await Promise.all([
            loadTeamProfile(team).catch(() => null),
            loadMatches(team).catch(() => null),
            loadSquad(team).catch(() => null),
            loadTeamStandings(team).catch(() => null),
            loadNews(team).catch(() => null),
          ]);

          const all = matches?.matches ?? [];
          return {
            team: {
              key: team.key,
              id: team.id,
              name: team.name,
              kind: team.kind,
              profile: profile?.team ?? null,
            },
            live: all.filter((m) => m.status === "live"),
            nextMatch: all.find((m) => m.status === "upcoming") ?? null,
            lastMatch: all.find((m) => m.status === "finished") ?? null,
            matches: all,
            players: squad?.players ?? [],
            coach: squad?.coach ?? null,
            scorers: squad?.scorers ?? [],
            standings: standings?.groups ?? [],
            news: news?.news ?? [],
            sources: [profile?.source, matches?.source, squad?.source, standings?.source, news?.source].filter(
              Boolean,
            ),
          };
        }, 30);
      },
    },
  },
});
