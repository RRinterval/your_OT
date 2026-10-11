export type ReplyType = "suggestion" | "question" | "answer";

export type ChatMessage =
  | { role: "user"; content: string; time: string }
  | { role: "ot"; content: string; time: string; type: ReplyType };

export type NoteResponse = { type: ReplyType; reply: string };
