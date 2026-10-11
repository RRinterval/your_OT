// Launch the Next.js CLI trusting the Windows/macOS system certificate store.
// Needed on networks that intercept TLS (antivirus, campus/corporate proxies),
// otherwise server-side fetch to OpenAI fails with SELF_SIGNED_CERT_IN_CHAIN.
// `next dev` forks a child process, so the env var (inherited) is what reaches it;
// the --use-system-ca flag in package.json covers the in-process `next start`.
process.env.NODE_USE_SYSTEM_CA = "1";
await import("next/dist/bin/next");
