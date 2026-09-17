import { createFileRoute } from "@tanstack/react-router";

import { DEFAULT_LEAGUE_ID, TEAMS } from "@/lib/filgoal.server";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Egyptian Football API — بيانات منتخب مصر والنادي المصري" },
      {
        name: "description",
        content:
          "API مجاني لبيانات كرة القدم المصرية من في الجول: مباريات منتخب مصر والنادي المصري، القوائم، الترتيب، الأخبار وتفاصيل المباريات.",
      },
      { property: "og:title", content: "Egyptian Football API — منتخب مصر والنادي المصري" },
      {
        property: "og:description",
        content: "مباريات وقوائم وترتيب وأخبار وتفاصيل مباريات لحظية من في الجول عبر API واحد.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const groups: { title: string; items: { path: string; description: string }[] }[] = [
  {
    title: "الفرق",
    items: [
      { path: "/api/public/", description: "دليل كل المسارات" },
      { path: "/api/public/teams", description: "الفرق الجاهزة بمفاتيحها" },
      { path: "/api/public/teams/{team}", description: "بيانات الفريق والمدير الفني" },
      { path: "/api/public/teams/{team}/overview", description: "كل حاجة في طلب واحد" },
    ],
  },
  {
    title: "المباريات واللاعبين",
    items: [
      {
        path: "/api/public/teams/{team}/matches",
        description: "المباريات مرتبة: مباشر ← قادم ← منتهي (status، limit)",
      },
      { path: "/api/public/teams/{team}/squad", description: "قائمة اللاعبين + الهدافين" },
      { path: "/api/public/matches/{matchId}", description: "أحداث وتشكيل وتعليق حي وإحصائيات" },
      { path: "/api/public/players/{playerId}", description: "بيانات لاعب وإحصائياته ومسيرته" },
    ],
  },
  {
    title: "الترتيب والأخبار",
    items: [
      { path: "/api/public/teams/{team}/standings", description: "ترتيب الفريق في كل بطولاته" },
      {
        path: `/api/public/standings/${DEFAULT_LEAGUE_ID}`,
        description: "ترتيب بطولة كاملة (?team=masry لتحديد الفريق)",
      },
      { path: "/api/public/teams/{team}/news", description: "أخبار الفريق من في الجول وجوجل" },
    ],
  },
];

function Index() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-5 py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            FilGoal data · REST API
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Egyptian Football API
          </h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            بيانات منتخب مصر والنادي المصري وأي فريق تاني من "في الجول": المباريات، القوائم،
            الترتيب، الأخبار، وتفاصيل المباريات لحظة بلحظة. كل القراءات على السيرفر مع كاش، والردود
            JSON ومفتوحة (CORS).
          </p>
          <a
            href="/api/public/teams/egypt/overview"
            className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            جرّب بيانات منتخب مصر
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10">
        <section>
          <h2 className="text-lg font-semibold">مفاتيح الفرق</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.values(TEAMS).map((team) => (
              <div
                key={team.key}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
              >
                <div>
                  <p className="font-medium">{team.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {team.kind === "national" ? "منتخب" : "نادي"} · رقم {team.id}
                  </p>
                </div>
                <code className="rounded bg-muted px-2 py-1 text-xs">{team.key}</code>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            بدل <code className="rounded bg-muted px-1">{"{team}"}</code> بأي مفتاح من دول أو برقم
            الفريق في فيلجول مباشرة.
          </p>
        </section>

        {groups.map((group) => (
          <section key={group.title} className="mt-10">
            <h2 className="text-lg font-semibold">{group.title}</h2>
            <ul className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
              {group.items.map((item) => (
                <li key={item.path} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <code dir="ltr" className="text-sm font-medium">
                    GET {item.path}
                  </code>
                  <span className="text-sm text-muted-foreground">{item.description}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          المصدر: FilGoal. البيانات محدّثة تلقائيًا مع كاش قصير، ولو المصدر وقع بيرجّع آخر بيانات ناجحة.
        </footer>
      </main>
    </div>
  );
}
