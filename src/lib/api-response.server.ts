/** أدوات مشتركة لردود الـ API (JSON + CORS + كاش). */

const baseHeaders = (cacheSeconds: number) => ({
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": `public, max-age=${cacheSeconds}, stale-while-revalidate=60`,
});

export function json(data: unknown, cacheSeconds = 20, status = 200) {
  return new Response(JSON.stringify({ ok: status < 400, ...(data as object) }, null, 2), {
    status,
    headers: baseHeaders(cacheSeconds),
  });
}

export function fail(message: string, status = 500) {
  return new Response(JSON.stringify({ ok: false, error: message }, null, 2), {
    status,
    headers: baseHeaders(0),
  });
}

/** يشغّل المحمّل ويحوّل أي خطأ لرد JSON واضح. */
export async function handle<T>(loader: () => Promise<T>, cacheSeconds = 20) {
  try {
    const data = await loader();
    return json({ generatedAt: new Date().toISOString(), ...(data as object) }, cacheSeconds);
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطأ غير متوقع";
    console.error("API error:", message);
    return fail(message, 502);
  }
}
