module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const allowed = new Set(["CSRI", "CSRT", "ASRI", "AWFT", "CSFI", "CSFT", "ASFI", "CWFI", "CWRT", "AWRI", "AWRT", "AWFI", "CWRI", "CWFT", "ASRT", "ASFT"]);
  if (!allowed.has(body.resultCode) || typeof body.resultName !== "string" || !Array.isArray(body.answers) || body.answers.length !== 12) return res.status(400).json({ error: "Invalid result payload" });
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(503).json({ error: "Analytics is not configured" });
  const upstream = await fetch(url + "/rest/v1/abti_results", { method: "POST", headers: { apikey: key, Authorization: "Bearer " + key, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify({ result_code: body.resultCode, result_name: body.resultName, answers: body.answers, dimensions: body.dimensions }) });
  if (!upstream.ok) return res.status(502).json({ error: "Could not save result" });
  return res.status(201).json({ ok: true });
};
