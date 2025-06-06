-- SQL migration for questions table
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  question_text text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_option text not null,
  topic text not null,
  difficulty text not null,
  tags text[],
  explanation text,
  created_at timestamptz not null default now()
);

alter table public.questions enable row level security;

create policy "Allow read for authenticated users" on public.questions
  for select to authenticated
  using (true);
