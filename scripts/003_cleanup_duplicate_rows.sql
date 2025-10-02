-- Clean up duplicate rows, keeping only the first row (lowest id) in each table

-- Clean hero_section table
DELETE FROM public.hero_section
WHERE id NOT IN (
  SELECT MIN(id) FROM public.hero_section
);

-- Clean about_section table
DELETE FROM public.about_section
WHERE id NOT IN (
  SELECT MIN(id) FROM public.about_section
);

-- Clean contact_info table
DELETE FROM public.contact_info
WHERE id NOT IN (
  SELECT MIN(id) FROM public.contact_info
);

-- Clean site_config table
DELETE FROM public.site_config
WHERE id NOT IN (
  SELECT MIN(id) FROM public.site_config
);
