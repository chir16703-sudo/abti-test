create table if not exists public.abti_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  result_code text not null check (result_code in ('CSRI','CSRT','ASRI','AWFT','CSFI','CSFT','ASFI','CWFI','CWRT','AWRI','AWRT','AWFI','CWRI','CWFT','ASRT','ASFT')),
  result_name text not null,
  answers jsonb not null,
  dimensions jsonb not null
);

alter table public.abti_results enable row level security;

-- 浏览器不直接访问这张表；读写均由 Vercel 服务端使用 service role 完成。
