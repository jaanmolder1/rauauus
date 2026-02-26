import { NextRequest, NextResponse } from "next/server";

const CHATBOT_API_URL = process.env.CHATBOT_API_URL;
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY ?? "";

export async function POST(req: NextRequest) {
  if (!CHATBOT_API_URL) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let messages: { role: string; content: string }[];
  let sessionId = "";
  try {
    const body = await req.json();
    messages = body.messages;
    sessionId = typeof body.sessionId === "string" ? body.sessionId.slice(0, 64) : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
  }

  // Extract the latest user message to send to the RAG backend
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUserMessage) {
    return NextResponse.json({ error: "No user message" }, { status: 400 });
  }

  // Pass recent history (all messages before the current question) for context
  const history = messages.slice(0, -1).slice(-6);

  try {
    const res = await fetch(`${CHATBOT_API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Key": INTERNAL_API_KEY,
      },
      body: JSON.stringify({ question: lastUserMessage.content, history, session_id: sessionId }),
    });

    if (!res.ok) {
      const status = res.status >= 500 ? 503 : res.status;
      return NextResponse.json({ error: "Backend error" }, { status });
    }

    const data = await res.json();
    return NextResponse.json({ message: data.answer });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
