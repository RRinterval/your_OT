import Link from "next/link";
import { Logo } from "./SiteHeader";

const COLUMNS = [
  {
    title: "產品",
    links: [
      { href: "/diary", label: "開始寫日記" },
      { href: "/#features", label: "功能介紹" },
      { href: "/#how", label: "使用方式" },
    ],
  },
  {
    title: "關於",
    links: [
      { href: "/#philosophy", label: "我們的理念" },
      { href: "/#faq", label: "常見問題" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs font-serif text-sm leading-7 text-muted">
            把日子寫下來，
            <br />
            讓生活慢慢長回自己的樣子。
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-xs tracking-[0.3em] text-muted">{col.title}</h3>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs leading-6 text-muted md:flex-row md:items-center md:justify-between">
          <p>
            your OT 提供生活層面的陪伴與建議，不能取代醫療診斷或治療。若有立即危險，請撥打 119 或安心專線 1925。
          </p>
          <p className="shrink-0">© 2026 your OT</p>
        </div>
      </div>
    </footer>
  );
}
