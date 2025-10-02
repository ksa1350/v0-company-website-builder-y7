-- Insert default site configuration
insert into public.site_config (primary_color, secondary_color, accent_color, background_color, text_color)
values ('#2563eb', '#7c3aed', '#f59e0b', '#ffffff', '#1f2937')
on conflict (id) do nothing;

-- Insert default hero section
insert into public.hero_section (title, subtitle, description, button_text, button_link)
values (
  'شركة المناسبات الدولية',
  'نحول أحلامك إلى واقع مبهر',
  'نقدم خدمات تنظيم المناسبات والفعاليات بأعلى معايير الجودة والاحترافية',
  'تواصل معنا',
  '#contact'
)
on conflict (id) do nothing;

-- Insert default about section
insert into public.about_section (title, content)
values (
  'من نحن',
  'شركة المناسبات الدولية هي شركة رائدة في مجال تنظيم الفعاليات والمناسبات الخاصة والعامة. نفخر بخبرتنا الواسعة في تقديم حلول متكاملة لجميع أنواع المناسبات من حفلات الزفاف والمؤتمرات إلى الفعاليات الرياضية والثقافية.'
)
on conflict (id) do nothing;

-- Insert default services
insert into public.services (title, description, display_order, icon)
values 
  ('تنظيم حفلات الزفاف', 'نقدم خدمات تنظيم حفلات الزفاف الفاخرة بكل تفاصيلها من الديكور إلى التنسيق الكامل', 1, '💍'),
  ('المؤتمرات والفعاليات', 'تنظيم المؤتمرات والفعاليات الكبرى بأعلى معايير الاحترافية', 2, '🎤'),
  ('الفعاليات الرياضية', 'إدارة وتنظيم الفعاليات الرياضية والبطولات', 3, '⚽'),
  ('الحفلات الخاصة', 'تنظيم الحفلات الخاصة وأعياد الميلاد والمناسبات العائلية', 4, '🎉')
on conflict (id) do nothing;

-- Insert default contact info
insert into public.contact_info (phone, email, address)
values (
  '+966 50 123 4567',
  'info@internationalevents.com',
  'الرياض، المملكة العربية السعودية'
)
on conflict (id) do nothing;
