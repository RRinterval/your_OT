import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

const FEATURES = [
  {
    numeral: "壹",
    label: "建議",
    title: "給你一個小小的、做得到的改變",
    body: "從作息、活動安排、能量分配與感官調節出發，給出今天就能試試看的具體建議，而不是遙遠的大道理。",
  },
  {
    numeral: "貳",
    label: "追問",
    title: "在你還沒說完的地方，多問一句",
    body: "當故事只寫了一半，OT 會溫柔地追問情境與感受，陪你把模糊的不舒服，慢慢說清楚。",
  },
  {
    numeral: "參",
    label: "回答",
    title: "有疑問，就直接問",
    body: "關於睡眠、專注、久坐痠痛或生活節奏的問題，以職能治療的角度給出清楚、好懂的回答。",
  },
];

const STEPS = [
  { title: "翻到今天", body: "從日曆選一個日子，日記會翻到那一頁。預設就是今天。" },
  { title: "寫下此刻", body: "心情、身體的狀態、一件小事，或一個卡住的問題，都可以。" },
  { title: "收到回信", body: "按下「紀錄」，OT 會讀完你的文字，回你一段溫暖而實際的話。" },
];

const FAQ = [
  {
    q: "your OT 是真正的職能治療師嗎？",
    a: "your OT 是以職能治療觀點設計的 AI 對話夥伴，能陪你整理生活、提供日常建議，但不能取代專業人員的評估與治療。",
  },
  {
    q: "我寫的日記會存在哪裡？",
    a: "日記內容保存在你自己的瀏覽器中。送出紀錄時，該則內容會傳送至 AI 服務以產生回覆。",
  },
  {
    q: "需要每天都寫嗎？",
    a: "不需要。想寫的時候再寫就好；日曆上的小圓點會替你記得，哪些日子曾經被好好記錄過。",
  },
  {
    q: "如果我的狀況很不好怎麼辦？",
    a: "請優先聯繫身邊信任的人或專業協助。台灣可撥打安心專線 1925、生命線 1995、張老師 1980，緊急情況請撥 119。",
  },
];

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="mb-14 text-center">
      <p className="mb-3 text-xs tracking-[0.4em] text-accent">{eyebrow}</p>
      <h2 className="font-serif text-3xl leading-snug md:text-4xl">{children}</h2>
    </div>
  );
}

function DiaryPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* stacked pages behind */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-2xl border border-line bg-card" />
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-1 rounded-2xl border border-line bg-paper" />

      <div className="paper-lines relative rounded-2xl border border-line bg-paper p-6 shadow-xl shadow-foreground/5">
        <div className="mb-5 flex items-baseline justify-between border-b border-line pb-3">
          <span className="font-serif text-lg">十月十二日・週一</span>
          <span className="text-xs tracking-widest text-muted">晴時多雲</span>
        </div>

        <p className="mb-1 ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-sm bg-accent-soft px-4 py-2.5 text-sm leading-7">
          今天開了很久的車，脖子跟肩膀又開始緊緊的，回到家什麼都不想做。
        </p>
        <p className="mb-5 text-right text-[11px] text-muted">21:40</p>

        <div className="mb-1 flex items-center gap-2 text-xs text-muted">
          <span className="font-medium text-foreground">OT</span>
          <span className="rounded-full border border-accent px-2 py-px text-accent">建議</span>
        </div>
        <p className="max-w-[92%] rounded-2xl rounded-tl-sm border border-line bg-card px-4 py-2.5 text-sm leading-7">
          辛苦了，長時間維持同一個姿勢，身體會用痠緊提醒你休息。今晚先試試熱敷肩頸十分鐘，下次長途開車時，每一個小時停下來伸展一次就好。
        </p>
      </div>

      <span className="absolute -right-3 -top-4 rotate-6 rounded-[3px] border-2 border-seal px-2 py-1 font-serif text-xs tracking-widest text-seal">
        今日已記
      </span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 pt-16 pb-24 md:grid-cols-[1.1fr_1fr] md:pt-24 md:pb-32">
            <div className="relative">
              <p
                aria-hidden
                className="absolute -left-2 top-0 hidden font-serif text-sm tracking-[0.6em] text-muted [writing-mode:vertical-rl] lg:block lg:-left-12"
              >
                日日書寫・日日是好日
              </p>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-xs tracking-widest text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                以職能治療為視角的 AI 日記
              </p>
              <h1 className="font-serif text-4xl leading-[1.35] tracking-wide md:text-6xl md:leading-[1.3]">
                把今天，
                <br />
                好好<span className="relative isolate inline-block">
                  寫下來
                  <span className="absolute inset-x-0 bottom-1 -z-10 h-3 bg-accent-soft md:h-4" />
                </span>
                。
              </h1>
              <p className="mt-8 max-w-md leading-8 text-muted">
                your OT 是一本會回信的日記。寫下心情、身體的狀態或心裡的問題，職能治療師會陪你看見生活的節奏，給你一個今天就做得到的小改變。
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/diary"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 tracking-widest text-background transition-transform hover:-translate-y-0.5"
                >
                  開始寫日記
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link href="#how" className="px-2 py-3 text-sm tracking-widest text-muted underline-offset-8 hover:underline">
                  看看怎麼運作
                </Link>
              </div>
              <p className="mt-6 text-xs tracking-wider text-muted">免註冊・打開就能寫・日記只存在你的瀏覽器</p>
            </div>

            <DiaryPreview />
          </div>
        </section>

        {/* Philosophy */}
        <section id="philosophy" className="scroll-mt-20 border-y border-line bg-paper">
          <div className="mx-auto max-w-3xl px-5 py-24 text-center">
            <p className="mb-8 text-xs tracking-[0.4em] text-accent">我們的理念</p>
            <blockquote className="font-serif text-2xl leading-[1.9] md:text-3xl md:leading-[1.9]">
              「生活不是等狀態變好才開始，
              <br className="hidden md:block" />
              而是從每一件小事裡，慢慢把自己找回來。」
            </blockquote>
            <p className="mx-auto mt-10 max-w-xl leading-8 text-muted">
              職能治療相信，人是透過「做事」來照顧自己的：起床、吃飯、工作、散步、休息。當生活失去節奏，我們不急著修補你，而是陪你從日常裡，找回一點點可以掌握的感覺。
            </p>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <SectionTitle eyebrow="三種回應">一位懂得傾聽的書寫夥伴</SectionTitle>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
              {FEATURES.map((f) => (
                <article key={f.label} className="group bg-background p-8 transition-colors hover:bg-paper md:p-10">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="font-serif text-5xl text-line transition-colors group-hover:text-accent">
                      {f.numeral}
                    </span>
                    <span className="rounded-full border border-accent px-3 py-0.5 text-xs tracking-widest text-accent">
                      {f.label}
                    </span>
                  </div>
                  <h3 className="mb-4 font-serif text-xl leading-snug">{f.title}</h3>
                  <p className="text-sm leading-7 text-muted">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-20 bg-paper">
          <div className="mx-auto max-w-5xl px-5 py-24">
            <SectionTitle eyebrow="使用方式">三個步驟，寫給今天的自己</SectionTitle>
            <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative text-center">
                  <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-foreground font-serif text-xl">
                    {i + 1}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="absolute left-[calc(50%+3.5rem)] top-7 hidden h-px w-[calc(100%-7rem)] border-t border-dashed border-muted/50 md:block" />
                  )}
                  <h3 className="mb-3 font-serif text-xl">{s.title}</h3>
                  <p className="mx-auto max-w-[16rem] text-sm leading-7 text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20">
          <div className="mx-auto max-w-3xl px-5 py-24">
            <SectionTitle eyebrow="常見問題">寫之前，你可能想知道</SectionTitle>
            <div className="divide-y divide-line border-y border-line">
              {FAQ.map((item) => (
                <details key={item.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-lg">
                    {item.q}
                    <span className="text-2xl font-light text-muted transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 leading-8 text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-5 pb-24">
          <div className="paper-lines mx-auto max-w-5xl rounded-3xl border border-line bg-paper px-6 py-20 text-center">
            <h2 className="font-serif text-3xl leading-snug md:text-4xl">今天過得如何？</h2>
            <p className="mx-auto mt-5 max-w-md leading-8 text-muted">不用寫得很好，也不用寫得很多。一句話，就是一個開始。</p>
            <Link
              href="/diary"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 tracking-widest text-background transition-transform hover:-translate-y-0.5"
            >
              翻開今天的日記
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
