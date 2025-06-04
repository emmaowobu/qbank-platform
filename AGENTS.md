# QBank Platform – AI-Powered Question Bank

## 📌 Overview
QBank Platform is a Next.js 15.3 application using Supabase for authentication and data storage. The project aims to provide an AI-enhanced question bank system for medical licensing exam preparation (MCCQE, USMLE, etc.).

---

## 🛠️ Stack
- Next.js 15.3 with App Router and Turbopack
- Supabase (Auth + Database)
- TypeScript
- Tailwind CSS (planned)
- GitHub + Codex Integration

---

## ✅ Implemented So Far
- `/signup`: Page allows new user registration via `supabase.auth.signUp`.
- `/test`: Debug page for verifying Supabase connection.

---

## 🔜 Planned Pages
- `/login`: Email/password authentication with redirect to `/dashboard`
- `/dashboard`: Logged-in home with streaks, question feed, and AI suggestions
- `/quiz`: Dynamically generated quiz interface
- `/performance`: User-specific performance analytics

---

## 📦 Folder Structure

src/
 └── app/
      ├── signup/          → Sign-up UI and logic
      ├── login/           → 🔜 To be created
      ├── dashboard/       → 🔜 Placeholder for post-login redirect
      └── test/            → Supabase connection test
lib/
 └── supabaseClient.ts     → Supabase client config

---

## 🧠 Codex Agent Guidelines
- Use `use client` for all interactive pages
- Use `useState`, `useEffect`, and `useRouter` where applicable
- Handle errors clearly via UI (e.g., `setError(msg)`)
- Keep UI minimal for MVP; use Tailwind (if included later)
- Prefer clean, reusable components