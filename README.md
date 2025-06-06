# QBank Platform

QBank Platform is an AI-powered question bank for medical licensing exams. It uses Next.js 15.3 and Supabase to handle authentication and data storage.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file with your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

Visit the following pages to explore the app:

- `/signup` – create a new account
- `/login` – sign in to an existing account
- `/dashboard` – home page after login
- `/quiz` – quiz interface (in development)
- `/profile` – manage your user details

### Planned Features

The quiz page will support dynamically generated questions and track your performance over time.
