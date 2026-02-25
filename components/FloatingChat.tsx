"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

interface FloatingChatProps {
  lang: "et" | "en";
}

const copy = {
  et: {
    buttonLabel: "Küsi meilt",
    headerTitle: "Raua 22",
    headerSub: "Müügikonsultant",
    welcome: "Tere! Olen siin, et vastata teie küsimustele Raua 22 korterite kohta. Mida soovite teada?",
    placeholder: "Kirjutage küsimus…",
    send: "Saada",
    close: "Sulge",
    unavailable:
      "Vestlusfunktsioon ei ole hetkel saadaval. Palun kirjutage meile:",
    errorGeneral:
      "Midagi läks valesti. Palun proovige uuesti või kirjutage meile:",
  },
  en: {
    buttonLabel: "Ask us",
    headerTitle: "Raua 22",
    headerSub: "Sales consultant",
    welcome: "Hello! I'm here to answer your questions about Raua 22 residences. What would you like to know?",
    placeholder: "Type your question…",
    send: "Send",
    close: "Close",
    unavailable:
      "The chat is not available at the moment. Please contact us at:",
    errorGeneral:
      "Something went wrong. Please try again or contact us at:",
  },
};

const EMAIL = "info@raua22.ee";

export default function FloatingChat({ lang }: FloatingChatProps) {
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.welcome },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => inputRef.current?.focus(), 100);

    if (checkedRef.current) return;
    checkedRef.current = true;

    fetch("/api/chat")
      .then((r) => r.json())
      .then((data) => {
        if (!data.configured) {
          setMessages([{ role: "assistant", content: t.unavailable, isError: true }]);
          setDisabled(true);
        }
      })
      .catch(() => {});
  }, [open, messages, t.unavailable]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          lang,
        }),
      });

      if (res.status === 503) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: t.unavailable, isError: true },
        ]);
        return;
      }

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t.errorGeneral, isError: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-stone-900 hover:bg-stone-950 text-stone-100 px-5 py-3.5 shadow-lg transition-all duration-300 group"
          aria-label={t.buttonLabel}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-sans text-xs tracking-widest uppercase">{t.buttonLabel}</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 bg-stone-950/40 z-40 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-100 bg-white flex flex-col shadow-2xl md:max-h-150">
            {/* Header */}
            <div className="bg-stone-950 px-5 py-4 flex items-center justify-between shrink-0">
              <div>
                <p className="font-serif font-light text-stone-100 text-base">{t.headerTitle}</p>
                <p className="label-eyebrow text-stone-500 mt-0.5">{t.headerSub}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-stone-400 hover:text-stone-100 transition-colors duration-200"
                aria-label={t.close}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3 bg-stone-50 min-h-70 max-h-100 md:max-h-none">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed font-sans font-light ${
                      msg.role === "user"
                        ? "bg-stone-800 text-stone-100"
                        : "bg-white text-stone-700 border border-stone-100 shadow-sm"
                    }`}
                  >
                    {msg.content}
                    {msg.isError && (
                      <a
                        href={`mailto:${EMAIL}`}
                        className="block mt-1.5 underline text-stone-500 hover:text-stone-800 transition-colors duration-200"
                      >
                        {EMAIL}
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-stone-100 shadow-sm px-4 py-3 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-stone-200 bg-white px-4 py-3 flex gap-2.5 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.placeholder}
                disabled={loading || disabled}
                className="flex-1 font-sans text-sm font-light text-stone-800 placeholder:text-stone-400 bg-stone-50 border border-stone-200 px-4 py-2.5 outline-none focus:border-stone-400 transition-colors duration-200 disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={loading || disabled || !input.trim()}
                className="font-sans text-xs tracking-widest uppercase text-stone-100 bg-stone-800 hover:bg-stone-950 disabled:bg-stone-300 px-4 py-2.5 transition-colors duration-200 whitespace-nowrap"
              >
                {t.send}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
