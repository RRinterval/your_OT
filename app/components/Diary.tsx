"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Calendar from "./Calendar";
import { formatLong, toKey } from "@/lib/date";
import type { ChatMessage, NoteResponse, ReplyType } from "@/lib/types";

const STORAGE_KEY = "your_ot:entries";

const TYPE_LABEL: Record<ReplyType, string> = {
  suggestion: "建議",
  question: "追問",
  answer: "回答",
};

function loadEntries(): Record<string, ChatMessage[]> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function nowTime() {
  return new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function Diary() {
  const today = useMemo(() => toKey(new Date()), []);
  const [selected, setSelected] = useState(today);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [entries, setEntries] = useState<Record<string, ChatMessage[]>>(loadEntries);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const messages = entries[selected] ?? [];
  const marked = useMemo(
    () => new Set(Object.keys(entries).filter((k) => entries[k].length > 0)),
    [entries],
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // storage unavailable (private mode etc.) — entries stay in memory
    }
  }, [entries]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages.length, pending]);

  const selectDate = (key: string) => {
    if (key !== selected) {
      setDirection(key > selected ? "next" : "prev");
      setSelected(key);
      setError(null);
    }
    pageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const append = (date: string, msg: ChatMessage) =>
    setEntries((prev) => ({ ...prev, [date]: [...(prev[date] ?? []), msg] }));

  const submit = async () => {
    const content = draft.trim();
    if (!content || pending) return;
    const date = selected;
    const history = entries[date] ?? [];

    append(date, { role: "user", content, time: nowTime() });
    setDraft("");
    setError(null);
    setPending(date);

    try {
      const res = await fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, content, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "發生錯誤");
      const { type, reply } = data as NoteResponse;
      append(date, { role: "ot", type, content: reply, time: nowTime() });
    } catch (e) {
      setError(e instanceof Error ? e.message : "發生錯誤");
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8">
      <header className="text-center">
        <h1 className="font-serif text-2xl tracking-wide">今日的日記</h1>
        <p className="mt-1 text-sm text-muted">寫下今天的心情與狀態，職能治療師陪你一起看見生活的節奏</p>
      </header>

      <Calendar selected={selected} today={today} marked={marked} onSelect={selectDate} />

      <div ref={pageRef} className="scroll-mt-4 [perspective:1600px]">
        <article
          key={selected}
          className={`diary-paper rounded-2xl border border-line bg-paper p-5 shadow-md sm:p-7 ${
            direction === "next" ? "animate-flip-next" : "animate-flip-prev"
          }`}
        >
          <div className="mb-4 flex items-baseline justify-between border-b border-line pb-3">
            <h2 className="font-serif text-lg">{formatLong(selected)}</h2>
            {selected === today && <span className="text-sm text-accent">今天</span>}
          </div>

          <div className="flex min-h-48 flex-col gap-4">
            {messages.length === 0 && !pending && (
              <p className="my-auto text-center text-sm text-muted">
                這一頁還是空白的。今天過得如何？
              </p>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="self-end max-w-[85%]">
                  <div className="whitespace-pre-wrap rounded-2xl rounded-br-sm bg-accent-soft px-4 py-2.5 leading-relaxed">
                    {m.content}
                  </div>
                  <div className="mt-1 text-right text-xs text-muted">{m.time}</div>
                </div>
              ) : (
                <div key={i} className="self-start max-w-[85%]">
                  <div className="mb-1 flex items-center gap-2 text-xs text-muted">
                    <span className="font-medium text-foreground">OT</span>
                    <span className="rounded-full border border-accent px-2 py-px text-accent">
                      {TYPE_LABEL[m.type]}
                    </span>
                    <span>{m.time}</span>
                  </div>
                  <div className="whitespace-pre-wrap rounded-2xl rounded-tl-sm border border-line bg-card px-4 py-2.5 leading-relaxed">
                    {m.content}
                  </div>
                </div>
              ),
            )}

            {pending === selected && (
              <div className="self-start text-sm text-muted animate-pulse">OT 正在思考…</div>
            )}
            {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}
            <div ref={endRef} />
          </div>

          <div className="mt-6 border-t border-line pt-4">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) submit();
              }}
              rows={4}
              maxLength={2000}
              placeholder="今天的心情、狀態、感受，或想問的問題…"
              className="w-full resize-y rounded-xl border border-line bg-card p-3 leading-relaxed outline-none focus:border-accent"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted">Ctrl + Enter 快速送出</span>
              <button
                onClick={submit}
                disabled={!draft.trim() || pending !== null}
                className="rounded-full bg-accent px-6 py-2 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                紀錄
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
