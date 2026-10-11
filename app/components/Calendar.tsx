"use client";

import { useState } from "react";
import { WEEKDAYS, fromKey, toKey } from "@/lib/date";

type Props = {
  selected: string;
  today: string;
  marked: Set<string>;
  onSelect: (key: string) => void;
};

export default function Calendar({ selected, today, marked, onSelect }: Props) {
  const [view, setView] = useState(() => {
    const d = fromKey(selected);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const first = new Date(view.year, view.month, 1);
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells: (string | null)[] = [
    ...Array<null>(first.getDay()).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => toKey(new Date(view.year, view.month, i + 1))),
  ];

  const shift = (delta: number) => {
    const d = new Date(view.year, view.month + delta, 1);
    setView({ year: d.getFullYear(), month: d.getMonth() });
  };

  const goToday = () => {
    const d = fromKey(today);
    setView({ year: d.getFullYear(), month: d.getMonth() });
    onSelect(today);
  };

  return (
    <section className="rounded-2xl border border-line bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => shift(-1)}
          className="rounded-full px-3 py-1 text-lg text-muted hover:bg-accent-soft"
          aria-label="上個月"
        >
          ‹
        </button>
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">
            {view.year} 年 {view.month + 1} 月
          </h2>
          <button
            onClick={goToday}
            className="rounded-full border border-line px-3 py-0.5 text-sm text-muted hover:bg-accent-soft"
          >
            今天
          </button>
        </div>
        <button
          onClick={() => shift(1)}
          className="rounded-full px-3 py-1 text-lg text-muted hover:bg-accent-soft"
          aria-label="下個月"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1 text-xs text-muted">
            {w}
          </div>
        ))}
        {cells.map((key, i) =>
          key ? (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={[
                "relative flex aspect-square items-center justify-center rounded-xl transition-colors",
                key === selected
                  ? "bg-accent text-white"
                  : key === today
                    ? "ring-2 ring-accent ring-inset hover:bg-accent-soft"
                    : "hover:bg-accent-soft",
              ].join(" ")}
              aria-pressed={key === selected}
            >
              {Number(key.slice(8))}
              {marked.has(key) && (
                <span
                  className={`absolute bottom-1.5 h-1 w-1 rounded-full ${key === selected ? "bg-white" : "bg-accent"}`}
                />
              )}
            </button>
          ) : (
            <div key={`blank-${i}`} />
          ),
        )}
      </div>
    </section>
  );
}
