import Link from "next/link";

const NAV = [
  { href: "/#philosophy", label: "理念" },
  { href: "/#features", label: "功能" },
  { href: "/#how", label: "使用方式" },
  { href: "/#faq", label: "常見問題" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-[3px] bg-seal font-serif text-sm text-white shadow-sm">
        職
      </span>
      <span className="font-serif text-lg tracking-wide">
        your <span className="italic">OT</span>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="tracking-wider transition-colors hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/diary"
          className="rounded-full border border-foreground px-4 py-1.5 text-sm tracking-wider transition-colors hover:bg-foreground hover:text-background"
        >
          開始書寫
        </Link>
      </div>
    </header>
  );
}
