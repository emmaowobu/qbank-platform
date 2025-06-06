-- SQL migration for user_topic_stats table
create table if not exists public.user_topic_stats (
  user_id uuid references auth.users(id) on delete cascade,
  topic text not null,
  attempted int not null default 0,
  correct int not null default 0,
  accuracy numeric,
  primary key (user_id, topic)
);

alter table public.user_topic_stats enable row level security;

create policy "Allow user update" on public.user_topic_stats
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
