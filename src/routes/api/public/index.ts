import { createFileRoute } from "@tanstack/react-router";

import { json } from "@/lib/api-response.server";
import { TEAMS, DEFAULT_LEAGUE_ID } from "@/lib/teams";

const docs = {
  name: "Egyptian Football API",
  description:
    "API عام لبيانات كرة القدم المصرية من في الجول: النادي المصري ومنتخب مصر وأي فريق آخر.",
  teams: Object.values(TEAMS).map((t) => ({
    key: t.key,
    id: t.id,
    name: t.name,
    kind: t.kind,
  })),
  note: "في كل مسار، {team} يقبل مفتاح نصي (masry, egypt, ahly, zamalek) أو رقم الفريق في فيلجول.",
  endpoints: [
    { path: "/api/public/teams", method: "GET", description: "قائمة الفرق المعروفة" },
    { path: "/api/public/teams/{team}", method: "GET", description: "بيانات الفريق والمدرب" },
    { path: "/api/public/teams/{team}/matches", method: "GET", description: "المباريات: مباشر ثم قادم ثم منتهي" },
    { path: "/api/public/teams/{team}/squad", method: "GET", description: "قائمة اللاعبين والهدافين" },
    { path: "/api/public/teams/{team}/standings", method: "GET", description: "ترتيب الفريق في كل بطولاته" },
    { path: "/api/public/teams/{team}/news", method: "GET", description: "أخبار الفريق" },
    { path: "/api/public/teams/{team}/overview", method: "GET", description: "كل حاجة في طلب واحد" },
    { path: "/api/public/matches/{matchId}", method: "GET", description: "تفاصيل مباراة: أحداث وتشكيل وتعليق وإحصائيات" },
    { path: "/api/public/players/{playerId}", method: "GET", description: "بيانات لاعب وإحصائياته ومسيرته" },
    { path: `/api/public/standings/{leagueId}`, method: "GET", description: `ترتيب بطولة كاملة (الدوري المصري = ${DEFAULT_LEAGUE_ID})` },
  ],
  examples: [
    "/api/public/teams/egypt/matches",
    "/api/public/teams/egypt/overview",
    "/api/public/teams/masry/squad",
    `/api/public/standings/${DEFAULT_LEAGUE_ID}`,
  ],
};

export const Route = createFileRoute("/api/public/")({
  server: {
    handlers: {
      GET: () => json(docs, 3600),
    },
  },
});
