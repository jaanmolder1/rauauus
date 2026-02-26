import { NextRequest } from "next/server";

const CHATBOT_API_URL = process.env.CHATBOT_API_URL ?? "";
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY ?? "";
const ADMIN_KEY = process.env.ADMIN_KEY ?? "";

interface LogMessage {
  question: string;
  answer: string;
  at: string;
}

interface Session {
  session_id: string;
  started_at: string;
  last_at: string;
  messages: LogMessage[];
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString("et-EE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function getLogs(): Promise<{ sessions: Session[]; total_exchanges: number } | null> {
  try {
    const res = await fetch(`${CHATBOT_API_URL}/api/admin/logs`, {
      headers: { "X-Internal-Key": INTERNAL_API_KEY },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const params = await searchParams;
  const provided = params.key ?? "";

  if (!ADMIN_KEY || provided !== ADMIN_KEY) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="bg-white p-8 w-full max-w-sm">
          <p className="font-serif text-stone-800 text-xl mb-6">Admin</p>
          <form method="GET">
            <input
              name="key"
              type="password"
              placeholder="Password"
              className="w-full border border-stone-300 px-4 py-2.5 text-sm font-sans mb-4 outline-none focus:border-stone-600"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-stone-900 text-stone-100 text-xs tracking-widest uppercase px-4 py-2.5 font-sans hover:bg-stone-950 transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  const data = await getLogs();

  return (
    <div className="min-h-screen bg-stone-100 font-sans">
      <div className="bg-stone-950 px-8 py-5 flex items-center justify-between">
        <p className="font-serif text-stone-100 text-lg">Raua 22 — Chat Logs</p>
        {data && (
          <p className="text-stone-400 text-sm">
            {data.sessions.length} sessions · {data.total_exchanges} exchanges
          </p>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">
        {!data && (
          <p className="text-stone-500 text-sm">Could not load logs. Check backend connectivity.</p>
        )}

        {data?.sessions.length === 0 && (
          <p className="text-stone-500 text-sm">No conversations yet.</p>
        )}

        {data?.sessions.map((session) => (
          <div key={session.session_id} className="bg-white border border-stone-200 shadow-sm">
            <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between gap-4">
              <span className="text-xs text-stone-400 font-mono">{session.session_id.slice(0, 8)}…</span>
              <span className="text-xs text-stone-500">
                {fmt(session.started_at)}
                {session.messages.length > 1 && ` — ${fmt(session.last_at)}`}
              </span>
              <span className="text-xs text-stone-400">
                {session.messages.length} {session.messages.length === 1 ? "exchange" : "exchanges"}
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {session.messages.map((msg, i) => (
                <div key={i} className="px-5 py-4 flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="text-xs font-medium text-stone-400 w-16 shrink-0 pt-0.5">Client</span>
                    <p className="text-sm text-stone-800 leading-relaxed">{msg.question}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xs font-medium text-stone-400 w-16 shrink-0 pt-0.5">Bot</span>
                    <p className="text-sm text-stone-600 leading-relaxed">{msg.answer}</p>
                  </div>
                  <p className="text-xs text-stone-300 text-right">{fmt(msg.at)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
