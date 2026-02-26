"use client";

import { useState, useRef, useEffect } from "react";
import type { ApartmentInfo } from "@/lib/apartmentData";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  apartment: ApartmentInfo;
  lang: "et" | "en";
  onClose: () => void;
}

function fmtPrice(n: number) {
  return new Intl.NumberFormat("et-EE", { maximumFractionDigits: 0 }).format(n) + " €";
}

const SUGGESTIONS: Record<"et" | "en", string[]> = {
  et: [
    "Milliseid renoveerimistöid tehti?",
    "Mis läheduses on?",
    "Kuidas on maja turvatud?",
  ],
  en: [
    "What restoration work was carried out?",
    "What's in the neighbourhood?",
    "How is the building secured?",
  ],
};

export default function ChatWidget({ apartment, lang, onClose }: ChatWidgetProps) {
  const welcomeMessage: Message = {
    role: "assistant",
    content:
      lang === "et"
        ? `Tere! Olen siin, et vastata teie küsimustele ${apartment.number} kohta (${apartment.area}, ${apartment.floor}, ${fmtPrice(apartment.price)}). Mida soovite teada?`
        : `Hello! I'm here to answer your questions about ${apartment.number} (${apartment.area}, ${apartment.floor}, ${fmtPrice(apartment.price)}). What would you like to know?`,
  };

  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showSuggestions = messages.length === 1 && !loading;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function sendText(text: string) {
    if (!text.trim() || loading) return;

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
          messages: nextMessages,
          apartmentId: apartment.id,
          lang,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            lang === "et"
              ? "Vabandust, midagi läks valesti. Palun proovige uuesti või kirjutage meile info@raua22.ee."
              : "Sorry, something went wrong. Please try again or contact us at info@raua22.ee.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function sendMessage() {
    sendText(input.trim());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const placeholder = lang === "et" ? "Kirjutage küsimus…" : "Type your question…";
  const sendLabel = lang === "et" ? "Saada" : "Send";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/40 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[420px] bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-stone-950 px-6 py-5 flex items-start justify-between gap-4 shrink-0">
          <div>
            <p className="label-eyebrow text-stone-500 mb-1">{apartment.number}</p>
            <p
              className="font-serif font-light text-stone-100 leading-snug"
              style={{ fontSize: "clamp(1rem, 1.3vw, 1.1rem)" }}
            >
              {apartment.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-100 transition-colors duration-200 mt-0.5 shrink-0"
            aria-label={lang === "et" ? "Sulge" : "Close"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4 bg-stone-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] px-4 py-3 leading-relaxed text-sm ${
                  msg.role === "user"
                    ? "bg-stone-800 text-stone-100 font-sans font-light"
                    : "bg-white text-stone-700 font-sans font-light border border-stone-100 shadow-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Suggestion chips — visible only before the first question */}
          {showSuggestions && (
            <div className="flex flex-col gap-2 mt-1">
              {SUGGESTIONS[lang].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendText(suggestion)}
                  className="self-start text-left font-sans text-sm font-light text-stone-600 bg-white border border-stone-200 px-4 py-2.5 hover:border-stone-400 hover:text-stone-900 transition-colors duration-200 shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

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
        <div className="shrink-0 border-t border-stone-200 bg-white px-4 py-4 flex gap-3 items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={loading}
            className="flex-1 font-sans text-sm font-light text-stone-800 placeholder:text-stone-400 bg-stone-50 border border-stone-200 px-4 py-2.5 outline-none focus:border-stone-400 transition-colors duration-200 disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="font-sans text-xs tracking-widest uppercase text-stone-100 bg-stone-800 hover:bg-stone-950 disabled:bg-stone-300 px-5 py-2.5 transition-colors duration-200 whitespace-nowrap"
          >
            {sendLabel}
          </button>
        </div>
      </div>
    </>
  );
}
