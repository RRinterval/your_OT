"use client";

import dynamic from "next/dynamic";

// Client-only: "today" and saved entries depend on the user's local clock and localStorage.
const Diary = dynamic(() => import("../components/Diary"), { ssr: false });

export default function DiaryPage() {
  return <Diary />;
}
