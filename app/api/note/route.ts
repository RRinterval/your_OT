import type { ChatMessage, NoteResponse, ReplyType } from "@/lib/types";

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const MAX_CONTENT = 2000;
const MAX_HISTORY = 20;

const SYSTEM_PROMPT = `你是一位溫暖、專業的職能治療師（Occupational Therapist, OT），透過「每日日記」陪伴使用者。
使用者會寫下今天的心情、狀態、感受或問題。請以職能治療的觀點（日常活動參與、作息與習慣、能量管理、感官調節、角色與興趣、環境調整）回應。

每次回應時，請從以下三種方式中選擇「最適合」的一種：
1. "suggestion"（提出建議）：給予 1–3 個具體、可在日常中立即執行的小建議。
2. "question"（追問問題）：當資訊不足以給出好建議時，溫和地追問 1–2 個問題，以了解情境、活動或感受。
3. "answer"（回答問題）：當使用者明確提出問題時，直接、清楚地回答。

規則：
- 一律使用繁體中文，語氣溫暖、不批判，先簡短同理再進入重點。
- 回覆精簡，約 200 字以內。
- 你不做醫療診斷，也不開藥；需要時建議尋求醫師或相關專業協助。
- 若使用者透露自我傷害或自殺的念頭，請溫和表達關心，並鼓勵立即聯繫身邊信任的人或專業資源（台灣：安心專線 1925、生命線 1995、張老師 1980；緊急情況請撥 119）。
- 參考同一天先前的對話脈絡，若使用者是在回答你的追問，請接續回應。

請只輸出 JSON，格式為：{"type": "suggestion" | "question" | "answer", "reply": "回覆內容"}`;

const REPLY_TYPES: ReplyType[] = ["suggestion", "question", "answer"];

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return error("伺服器未設定 OPENAI_API_KEY", 500);

  let body: { date?: unknown; content?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return error("請求格式錯誤", 400);
  }

  const { date, content } = body;
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return error("日期格式錯誤", 400);
  }
  if (typeof content !== "string" || !content.trim()) {
    return error("請輸入內容", 400);
  }
  if (content.length > MAX_CONTENT) {
    return error(`內容請在 ${MAX_CONTENT} 字以內`, 400);
  }

  const history = Array.isArray(body.history)
    ? (body.history as ChatMessage[])
        .filter((m) => (m.role === "user" || m.role === "ot") && typeof m.content === "string")
        .slice(-MAX_HISTORY)
    : [];

  const messages = [
    { role: "system", content: `${SYSTEM_PROMPT}\n\n今天的日記日期：${date}` },
    ...history.map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.role === "user" ? m.content : JSON.stringify({ type: m.type, reply: m.content }),
    })),
    { role: "user", content: content.trim() },
  ];

  let res: Response;
  try {
    res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });
  } catch {
    return error("無法連線到 OpenAI", 502);
  }

  if (!res.ok) {
    console.error("OpenAI error", res.status, await res.text());
    return error("OT 暫時無法回應，請稍後再試", 502);
  }

  const data = await res.json();
  const raw: string = data.choices?.[0]?.message?.content ?? "";

  let parsed: Partial<NoteResponse> = {};
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = { reply: raw };
  }

  const type = REPLY_TYPES.includes(parsed.type as ReplyType) ? (parsed.type as ReplyType) : "suggestion";
  const reply = typeof parsed.reply === "string" && parsed.reply.trim() ? parsed.reply.trim() : raw;
  if (!reply) return error("OT 沒有回覆內容，請再試一次", 502);

  return Response.json({ type, reply } satisfies NoteResponse);
}
