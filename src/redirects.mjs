// Gamle WordPress-adresser fra clinic360.dk/wp-sitemap.xml (hentet oktober 2026).
// 301 = indholdet findes på den nye side. 410 = indholdet er fjernet med vilje
// (temaets demo-indlæg, fremmede "læger", ydelser klinikken ikke tilbyder, webshop).
export const redirects301 = [
  ['/persondatapolitik/', '/cookie-og-privatlivspolitik/'],
  ['/services/botox/', '/botox/'],
  ['/services/microneedling/', '/skinpen/'],
  ['/service_category/microneedling-behandlinger/', '/skinpen/'],
  ['/service_category/treatments/', '/behandlinger/'],
  ['/trustpilot-reviews/super-grundig-og-aerlig-vejledning/', '/om-os/'],
  ['/trustpilot-reviews/fantastisk-oplevelse-og-professionelle-behandlinger/', '/om-os/'],
  ['/cmsms_doctor_services/sygeplejerske/', '/om-os/'],
  ['/cmsms_doctor_services/dermatolog/', '/om-os/'],
  ['/tag/botox/', '/botox/'],
  ['/feed/', '/'],
];

export const gone410 = [
  // Demo-blogindlæg fra WordPress-temaet (engelsk, ikke klinikkens indhold)
  '/how-to-improve-skin-condition-secrets-of-perfect-skin/',
  '/laser-facial-rejuvenation-what-is-worth-knowing-about-the-procedure/',
  '/aesthetic-medicine-choosing-a-specialist/',
  '/top-5-most-popular-anti-aging-procedures/',
  '/mesotherapy-cocktails-for-skin/',
  '/top-5-procedures-aimed-at-maximum-skin-hydration/',
  '/lip-fillers-the-best-drugs-and-brands/',
  '/how-to-care-for-your-skin-after-aesthetic-procedures/',
  '/5-tips-on-how-to-look-younger-than-your-age/',
  // Profiler, ydelser og anmeldelser der ikke hører til klinikken
  '/cmsms_doctor/*',
  '/cmsms_doctor_services/godkendt-behandler/',
  '/services/permanent-harfjerning/',
  '/services/negle/',
  '/service_category/professionelle-neglebehandlinger/',
  '/service_category/smooth-permanent-harfjerning/',
  '/trustpilot-reviews/*',
  // Webshop og WordPress-systemsider
  '/shop/', '/cart/', '/new-cart/', '/checkout/', '/my-account/', '/vipps_checkout/',
  '/product/*', '/product-category/*', '/step/*',
  '/category/*', '/tag/*', '/author/*', '/comments/feed/',
  '/wp-admin/*', '/wp-login.php', '/xmlrpc.php', '/wp-content/*', '/wp-json/*',
];
