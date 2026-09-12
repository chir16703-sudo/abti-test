module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!req.headers["x-admin-token"] || req.headers["x-admin-token"] !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: "Unauthorized" });
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(503).json({ error: "Analytics is not configured" });
  const upstream = await fetch(url + "/rest/v1/abti_results?select=result_code,result_name,created_at,dimensions&order=created_at.desc&limit=5000", { headers: { apikey: key, Authorization: "Bearer " + key } });
  if (!upstream.ok) return res.status(502).json({ error: "Could not load statistics" });
  const rows = await upstream.json();
  const now = Date.now(), week = 7 * 86400000, byResult = {}, dimensions = {};
  rows.forEach((row) => {
    byResult[row.result_code] ||= { code: row.result_code, name: row.result_name, count: 0 };
    byResult[row.result_code].count += 1;
    if (now - new Date(row.created_at).getTime() < week) Object.entries(row.dimensions || {}).forEach(([key, value]) => { dimensions[key] = (dimensions[key] || 0) + Number(value || 0); });
  });
  return res.status(200).json({ total: rows.length, last7Days: rows.filter((row) => now - new Date(row.created_at).getTime() < week).length, byResult: Object.values(byResult).sort((a, b) => b.count - a.count), dimensions });
};
