/** سجل الفرق — ملف آمن للمتصفح والسيرفر (بدون أي كود سحب بيانات). */

export type TeamKind = "club" | "national";

export type TeamConfig = {
  key: string;
  id: number;
  name: string;
  kind: TeamKind;
  /** بطولة الترتيب الأساسية (اختياري) */
  leagueId: number | null;
  /** استعلام خلاصة أخبار جوجل */
  newsQuery: string;
  /** كلمات لازم توجد في العنوان */
  newsInclude: string[];
  /** كلمات نستبعد بيها الأخبار المشابهة في الاسم */
  newsExclude: string[];
};

export const DEFAULT_LEAGUE_ID = 1667;

export const TEAMS: Record<string, TeamConfig> = {
  masry: {
    key: "masry",
    id: 8,
    name: "النادي المصري",
    kind: "club",
    leagueId: DEFAULT_LEAGUE_ID,
    newsQuery: '"المصري البورسعيدي" OR "النادي المصري"',
    newsInclude: ["المصري", "بورسعيد"],
    newsExclude: ["المصري للألومنيوم", "مصري المقاصة"],
  },
  egypt: {
    key: "egypt",
    id: 18,
    name: "منتخب مصر",
    kind: "national",
    leagueId: null,
    newsQuery: '"منتخب مصر" OR "الفراعنة"',
    newsInclude: ["منتخب مصر", "الفراعنة", "المنتخب"],
    newsExclude: ["منتخب مصر للشباب", "الأولمبي"],
  },
  ahly: {
    key: "ahly",
    id: 1,
    name: "النادي الأهلي",
    kind: "club",
    leagueId: DEFAULT_LEAGUE_ID,
    newsQuery: '"النادي الأهلي" كرة قدم',
    newsInclude: ["الأهلي"],
    newsExclude: ["الأهلي السعودي", "أهلي جدة", "الأهلي الليبي"],
  },
  zamalek: {
    key: "zamalek",
    id: 2,
    name: "نادي الزمالك",
    kind: "club",
    leagueId: DEFAULT_LEAGUE_ID,
    newsQuery: '"نادي الزمالك"',
    newsInclude: ["الزمالك"],
    newsExclude: [],
  },
};

export const crestUrl = (teamId: number) =>
  `https://semedia.filgoal.com/Photos/Team/Medium/${teamId}.png`;

/** يحوّل مُعرّف من الرابط (مفتاح نصي أو رقم) إلى إعدادات فريق. */
export function resolveTeam(param: string): TeamConfig | null {
  const key = decodeURIComponent(param).trim().toLowerCase();
  const known = TEAMS[key];
  if (known) return known;
  const id = Number(key);
  if (!Number.isInteger(id) || id <= 0) return null;
  const byId = Object.values(TEAMS).find((t) => t.id === id);
  if (byId) return byId;
  return {
    key: String(id),
    id,
    name: `فريق ${id}`,
    kind: "club",
    leagueId: null,
    newsQuery: "",
    newsInclude: [],
    newsExclude: [],
  };
}
