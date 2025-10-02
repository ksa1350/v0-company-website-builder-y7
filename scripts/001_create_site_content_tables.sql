-- Create table for site configuration (colors, fonts, general settings)
create table if not exists public.site_config (
  id uuid primary key default gen_random_uuid(),
  primary_color text not null default '#2563eb',
  secondary_color text not null default '#7c3aed',
  accent_color text not null default '#f59e0b',
  background_color text not null default '#ffffff',
  text_color text not null default '#1f2937',
  font_heading text not null default 'Inter',
  font_body text not null default 'Inter',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create table for hero section
create table if not exists public.hero_section (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'شركة المناسبات الدولية',
  subtitle text not null default 'نحول أحلامك إلى واقع مبهر',
  description text not null default 'نقدم خدمات تنظيم المناسبات والفعاليات بأعلى معايير الجودة والاحترافية',
  button_text text not null default 'تواصل معنا',
  button_link text not null default '#contact',
  background_image text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create table for about section
create table if not exists public.about_section (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'من نحن',
  content text not null default 'شركة المناسبات الدولية هي شركة رائدة في مجال تنظيم الفعاليات والمناسبات الخاصة والعامة',
  image text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create table for services
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text,
  image text,
  display_order integer not null default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create table for gallery/portfolio
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  display_order integer not null default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create table for contact info
create table if not exists public.contact_info (
  id uuid primary key default gen_random_uuid(),
  phone text not null default '+966 50 123 4567',
  email text not null default 'info@internationalevents.com',
  address text not null default 'الرياض، المملكة العربية السعودية',
  whatsapp text,
  instagram text,
  twitter text,
  facebook text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.site_config enable row level security;
alter table public.hero_section enable row level security;
alter table public.about_section enable row level security;
alter table public.services enable row level security;
alter table public.gallery enable row level security;
alter table public.contact_info enable row level security;

-- Create policies for public read access (anyone can view the website)
create policy "Allow public read access to site_config"
  on public.site_config for select
  using (true);

create policy "Allow public read access to hero_section"
  on public.hero_section for select
  using (true);

create policy "Allow public read access to about_section"
  on public.about_section for select
  using (true);

create policy "Allow public read access to services"
  on public.services for select
  using (true);

create policy "Allow public read access to gallery"
  on public.gallery for select
  using (true);

create policy "Allow public read access to contact_info"
  on public.contact_info for select
  using (true);

-- Create policies for authenticated admin users (only authenticated users can modify)
create policy "Allow authenticated users to update site_config"
  on public.site_config for update
  using (auth.role() = 'authenticated');

create policy "Allow authenticated users to update hero_section"
  on public.hero_section for update
  using (auth.role() = 'authenticated');

create policy "Allow authenticated users to update about_section"
  on public.about_section for update
  using (auth.role() = 'authenticated');

create policy "Allow authenticated users to insert services"
  on public.services for insert
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated users to update services"
  on public.services for update
  using (auth.role() = 'authenticated');

create policy "Allow authenticated users to delete services"
  on public.services for delete
  using (auth.role() = 'authenticated');

create policy "Allow authenticated users to insert gallery"
  on public.gallery for insert
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated users to update gallery"
  on public.gallery for update
  using (auth.role() = 'authenticated');

create policy "Allow authenticated users to delete gallery"
  on public.gallery for delete
  using (auth.role() = 'authenticated');

create policy "Allow authenticated users to update contact_info"
  on public.contact_info for update
  using (auth.role() = 'authenticated');
