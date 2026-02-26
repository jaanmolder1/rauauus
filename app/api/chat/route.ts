import { NextRequest, NextResponse } from "next/server";

const CHATBOT_API_URL = process.env.CHATBOT_API_URL;

export async function GET() {
  const configured = !!CHATBOT_API_URL;
  return NextResponse.json({ configured });
}

export async function POST(req: NextRequest) {
  if (!CHATBOT_API_URL) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let messages: { role: string; content: string }[];
  try {
    const body = await req.json();
    messages = body.messages;
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

  try {
    const res = await fetch(`${CHATBOT_API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: lastUserMessage.content }),
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
