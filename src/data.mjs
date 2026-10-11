// Alt indhold til clinic360.dk samlet ét sted.
// Priser, åbningstider, anmeldelser og tekster rettes her, hvorefter `node build.mjs` genererer siderne.

export const site = {
  name: 'Clinic 360',
  legalName: 'Clinic360 I/S',
  tagline: 'Kosmetisk speciallægeklinik',
  url: 'https://clinic360.dk',
  bookingUrl: 'https://clinic360.planway.com/',
  phone: '+45 50 20 67 66',
  phoneHref: 'tel:+4550206766',
  email: 'clinic360@outlook.dk',
  cvr: '44601745',
  address: { street: 'Kallehave 24', zip: '6470', city: 'Sydals', area: 'Hørup på Als, nær Sønderborg' },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Clinic+360+Kallehave+24+6470+Sydals',
  // Officielt opslag i Styrelsen for Patientsikkerheds register (samme link som på den nuværende side)
  stpsUrl: 'https://www.eadministration.dk/kunde/kundelogin.asp?guid=01A47B1A-CF91-485E-AA26-21BF148FB290',
  facebook: 'https://www.facebook.com/clinic360sydals',
  instagram: 'https://www.instagram.com/clini_c360/',
  trustpilotUrl: 'https://dk.trustpilot.com/review/www.clinic360.dk',
  zoUrl: 'https://zoskinhealth.no/da/produkter/',
  // Kontaktformular: indsæt fx et Formspree-endpoint. Tom streng = formularen åbner brugerens mailprogram.
  formEndpoint: '',
};

// Opdateres manuelt fra Trustpilot (hentet oktober 2026)
export const rating = { score: '4,5', count: 17, label: 'Fremragende' };

export const hours = [
  { day: 'Mandag', time: '8.30 – 15.00', dow: 1 },
  { day: 'Tirsdag', time: '8.30 – 19.00', dow: 2 },
  { day: 'Onsdag', time: '8.30 – 15.00', dow: 3 },
  { day: 'Torsdag', time: '8.30 – 16.00', dow: 4 },
  { day: 'Fredag', time: '8.30 – 13.00', dow: 5 },
  { day: 'Lørdag – søndag', time: 'Lukket', dow: [6, 0] },
];

export const categories = [
  { id: 'injektion', name: 'Injektionsbehandlinger' },
  { id: 'hud', name: 'Hudbehandlinger' },
  { id: 'krop', name: 'Krop & hår' },
];

// pris = tal i kr. `from: true` viser "fra". `noFrom: true` udelader rækken, når "fra"-prisen beregnes.
export const treatments = [
  {
    slug: 'botox',
    name: 'Botox',
    category: 'injektion',
    img: 'consultation-mature',
    short: 'Blødgør mimiske rynker i panden, mellem brynene og ved øjnene.',
    headline: 'Bevar det friske og <em>åbne</em> udtryk',
    lead: 'Botox reducerer diskret synligheden af mimiske rynker, så du ser udhvilet ud, uden at dine nærmeste kan se, at du har fået en behandling.',
    discount: 10,
    facts: [
      ['Forundersøgelse', 'Online hos speciallæge, kun første gang'],
      ['Betænkningstid', '48 timer (lovkrav)'],
      ['Effekt', 'Gradvist over 2–10 dage, endeligt efter 14 dage'],
      ['Kontrol', 'Tilbydes altid efter 14 dage'],
    ],
    body: [
      {
        h: 'Naturlige resultater, ikke et nyt ansigt',
        p: [
          'Rynker er en naturlig del af livet. Nogle giver karakter, mens andre kan sende signaler om træthed eller negativitet, som du ikke føler. Vores botox-behandlinger mindsker de dynamiske rynker og giver et mere åbent og indbydende ansigtsudtryk.',
          'Mængden af botox og de områder, vi behandler, tilpasses dig. Målet er, at dine nærmeste ikke bemærker behandlingen, men kun den friske effekt.',
          'Botox er en ikke-invasiv behandling med mindre ubehag og hurtigere heling end fx et kirurgisk ansigtsløft.',
        ],
      },
    ],
    suited: ['Panderynker', 'Bekymringsrynke mellem brynene', 'Smilerynker ved øjnene', 'Brynløft', 'Gummy smile', 'Bunny lines'],
    steps: [
      { t: 'Forundersøgelse hos læge', d: 'Botox er et lægemiddel. Derfor vurderer vores speciallæge først din situation og dit helbred ved en online forkonsultation. Det er kun nødvendigt én gang hos Clinic360.' },
      { t: '48 timers betænkningstid', d: 'Efter forundersøgelsen er der en lovpligtig betænkningstid på 48 timer, før behandlingen må udføres.' },
      { t: 'Behandlingen', d: 'Huden renses omhyggeligt, og botox injiceres med en fin, tynd nål direkte i de relevante muskler.' },
      { t: 'Kontrol efter 14 dage', d: 'Effekten indtræder over 2–10 dage. Efter 14 dage ses det endelige resultat, og vi tilbyder altid en kontrol.' },
    ],
    prices: [
      {
        rows: [
          { label: '1 område', price: 1400 },
          { label: '2 områder', price: 2200 },
          { label: '3 områder', price: 3000 },
          { label: 'Brynløft, gummy smile eller bunny lines', price: 700 },
        ],
      },
    ],
    results: ['botox'],
    related: ['kosmetisk-filler', 'skinbooster', 'profhilo'],
  },
  {
    slug: 'kosmetisk-filler',
    name: 'Kosmetisk filler',
    category: 'injektion',
    img: 't-filler',
    short: 'Genskaber tabt volumen og former læber, kinder, hage og furer.',
    headline: 'Genskab volumen med et <em>naturligt</em> resultat',
    lead: 'Med ikke-permanente fillers genopbygger vi tabt volumen, mindsker rynker og forbedrer hudens fugt, så du stadig ser ud som dig selv, bare mere udhvilet.',
    discount: 10,
    facts: [
      ['Forundersøgelse', 'Hos kosmetisk sygeplejerske'],
      ['Betænkningstid', '48 timer (lovkrav)'],
      ['Varighed', 'Ca. 30 minutter'],
      ['Kontrol', 'Anbefales efter 14 dage'],
    ],
    body: [
      {
        h: 'Når huden mister fylde',
        p: [
          'Med alderen mister huden gradvist elasticitet og fylde. Rynker bliver tydeligere, der kan opstå mørke rande under øjnene, kinderne mister volumen, og ansigtets konturer ændres, så vi kan se mere trætte ud, end vi føler os.',
          'Filler er en skånsom og effektiv metode til at reducere rynker, forbedre hudens struktur og genskabe tabt volumen. Vores tilgang respekterer hudens naturlige aldring, og målet er altid et resultat, hvor du ser autentisk ud.',
          'I flere tilfælde kan det anbefales at kombinere filler med rynkebehandling for at opnå det bedste resultat og forlænge holdbarheden.',
        ],
      },
    ],
    suited: [
      'Læber: volumen og markering',
      'Tear trough: mørke rande under øjnene',
      'Mundvige: løft for et mere livligt udtryk',
      'Nasolabiale furer',
      'Kindben og kinder',
      'Rygerrynker omkring munden',
      'Hagekorrektion',
      'Rynker og furer',
    ],
    steps: [
      { t: 'Konsultation', d: 'En af vores kosmetiske sygeplejersker gennemgår dine ønsker og udarbejder en personlig behandlingsplan.' },
      { t: '48 timers betænkningstid', d: 'Ifølge lovgivningen skal der gå 48 timer mellem konsultation og behandling.' },
      { t: 'Behandlingen', d: 'Vi bruger bedøvende creme ud over det lidokain, der allerede er i produkterne. Resultatet ses med det samme.' },
      { t: 'Kontrol efter 14 dage', d: 'Vi evaluerer resultatet og giver dig vejledning i at vedligeholde det.' },
    ],
    prices: [
      {
        rows: [
          { label: 'Læber', price: 2600 },
          { label: 'Læber, opfølgning (maks. 2 måneder efter)', price: 1600, noFrom: true },
          { label: '1 ml', price: 2400 },
          { label: '2 ml', price: 4400 },
          { label: '3 ml', price: 5800 },
        ],
      },
    ],
    results: ['filler'],
    related: ['botox', 'skinbooster', 'profhilo'],
  },
  {
    slug: 'skinbooster',
    name: 'Skinbooster',
    category: 'injektion',
    img: 't-skinbooster',
    short: 'Dybdevirkende fugt, der giver glat, fast og glødende hud.',
    headline: 'Fugt og glød <em>indefra</em>',
    lead: 'Skinbooster tilfører huden dybdevirkende fugt med hyaluronsyre og glycerol. Huden bliver glattere, fastere og får sin naturlige glød tilbage.',
    discount: 10,
    facts: [
      ['Konsultation', 'Hos kosmetisk sygeplejerske (lovkrav)'],
      ['Betænkningstid', 'Mindst 48 timer'],
      ['Varighed', 'Ca. 30 minutter'],
      ['Forløb', 'Typisk 3 behandlinger med ca. 4 ugers interval'],
    ],
    body: [
      {
        h: 'Til dig, der ønsker en jævn og glat hud',
        p: [
          'Skinbooster genopbygger hudens struktur indefra. Behandlingen giver en let fyldning, fremhæver naturligt de ønskede områder og genopretter hudens elasticitet, fasthed og glød.',
          'Fine linjer udglattes, og huden fremstår frisk, glat og fyldig. Kliniske studier viser, at skinbooster fra blandt andet Restylane forbedrer hudens kvalitet i op til 9 måneder efter behandlingen.',
        ],
      },
    ],
    suited: ['Fine linjer', 'Træt og glansløs hud', 'Manglende fasthed', 'Tør, dehydreret hud'],
    steps: [
      { t: 'Konsultation', d: 'Du får mundtlig og skriftlig information om behandlingen af en af vores kosmetiske sygeplejersker.' },
      { t: '48 timers betænkningstid', d: 'Du er velkommen til at booke din behandling med det samme.' },
      { t: 'Behandlingen', d: 'Skinboosteren injiceres lige under hudens overflade i små mængder med en fin nål.' },
      { t: 'Resultatet', d: 'Ses over de kommende dage. Oftest gennemføres et forløb på 3 behandlinger.' },
    ],
    prices: [
      {
        rows: [
          { label: '1 ml', price: 2000 },
          { label: '2 ml', price: 3000 },
        ],
      },
      {
        group: 'Pakker',
        rows: [
          { label: '3 behandlinger med 1 ml', price: 5000 },
          { label: '3 behandlinger med 2 ml', price: 8000 },
        ],
      },
    ],
    results: [],
    related: ['profhilo', 'skinpen', 'pfr-hud'],
  },
  {
    slug: 'profhilo',
    name: 'Profhilo',
    category: 'injektion',
    img: 't-profhilo',
    short: 'Biostimulator, der strammer op og giver løs hud ny spændstighed.',
    headline: 'Genvind elasticitet og <em>spændstighed</em>',
    lead: 'Profhilo stimulerer hudens egen produktion af kollagen og giver over tid en naturlig opstramning af løs og rynket hud i ansigt, på hals og krop.',
    discount: 10,
    facts: [
      ['Forundersøgelse', 'Gratis hos specialsygeplejerske'],
      ['Betænkningstid', '48 timer (lovkrav)'],
      ['Forløb', '2 behandlinger med 4 ugers mellemrum'],
      ['Vedligehold', 'Årligt eller hver 6.–8. måned'],
    ],
    body: [
      {
        h: 'Mere end en filler',
        p: [
          'Med alderen taber huden kollagen, elastin, hyaluronsyre og fedtvæv og mister elasticitet. Profhilo stimulerer hudens regenerering og produktion af kollagen, så huden kan genoprette sig selv.',
          'Profhilo har en høj koncentration af hyaluronsyre (64 mg/2 ml), der er varmebehandlet på en særlig måde. Derfor virker den som en biostimulator og adskiller sig fra traditionelle fillers og skinboosters.',
          'Profhilo øger ikke volumen, som man kender det fra filler, og giver derfor altid et naturligt resultat.',
        ],
      },
    ],
    suited: ['Løs hud i ansigtet', 'Hals og décolleté', 'Fine linjer og rynker', 'Manglende elasticitet'],
    steps: [
      { t: 'Gratis forundersøgelse', d: 'Hos en af klinikkens specialsygeplejersker, hvor du bliver rådgivet om behandlingen.' },
      { t: '48 timers betænkningstid', d: 'Du kan booke behandlingen umiddelbart efter forundersøgelsen.' },
      { t: 'To behandlinger', d: 'Væsken injiceres i bestemte punkter og fordeler sig selv jævnt i ugerne efter. Små buler udjævnes på 12–48 timer.' },
      { t: 'Resultatet', d: 'Efter 3–4 uger ses en forskel i hudkvalitet. Den optimale effekt opnås efter 2. behandling.' },
    ],
    prices: [
      {
        rows: [
          { label: 'Profhilo (2 ml)', price: 3000 },
          { label: 'Profhilo Structura (2 ml)', price: 3400 },
        ],
      },
    ],
    results: [],
    related: ['skinbooster', 'pfr-hud', 'kosmetisk-filler'],
  },
  {
    slug: 'pfr-hud',
    name: 'PRF – hud',
    category: 'injektion',
    img: 't-prf-hud',
    short: '100 % biologisk hudforyngelse med kroppens egne vækstfaktorer.',
    headline: 'Hudforyngelse med <em>dine egne</em> celler',
    lead: 'PRF (Platelet Rich Fibrin) aktiverer hudens evne til at forny sig selv med kroppens egne vækstfaktorer. Helt uden kunstige tilsætningsstoffer.',
    discount: 10,
    facts: [
      ['Forundersøgelse', 'Hos sygeplejerske, behandling samme dag'],
      ['Forløb', '3 behandlinger med ca. 4 ugers mellemrum'],
      ['Resultat', 'Udvikler sig over 2–3 måneder'],
      ['Holdbarhed', 'Typisk 12–18 måneder'],
    ],
    body: [
      {
        h: 'Naturlig skønhed starter indefra',
        p: [
          'I dag handler skønhed mindre om at ændre sit udseende og mere om sundhed. Derfor vælger flere naturlige behandlinger, der styrker det udseende, man har.',
          'Ved en PRF-behandling udtages en lille mængde blod, som centrifugeres. Så kan vi isolere de mest værdifulde komponenter: blodplader, hvide blodlegemer og fibrin. Injiceret i huden stimulerer PRF kollagenproduktionen, øger blodcirkulationen og forbedrer hudens tekstur og elasticitet.',
          'Vi bruger en moderne centrifuge, der er op til fire gange mere effektiv end traditionelle modeller. Det giver en PRF med ekstra høj koncentration af vækstfaktorer.',
        ],
      },
      {
        h: 'PRF Kombi: microneedling og injektion i én behandling',
        p: [
          'Når PRF både injiceres og påføres gennem mikroskopiske kanaler fra microneedling med Skinpen, udnyttes kroppens egne vækstfaktorer optimalt. Kombinationen stimulerer kollagen og elastin i flere hudlag, giver en mere jævn hudtone og reducerer pigmentering og solskader.',
        ],
      },
    ],
    suited: [
      'Hudforyngelse og bedre hudstruktur',
      'Akne-ar, operationsar og mindre hudskader',
      'Fine linjer og begyndende rynker',
      'Ujævn hudtone og pigmentforandringer',
      'Rødme og rosacea-lignende tilstande',
      'Sensitiv hud',
    ],
    contraindications: [
      'Er gravid eller ammer',
      'Er i blodfortyndende behandling',
      'Har anæmi (lav blodprocent)',
      'Har trombocytsygdomme (blodpladesygdomme)',
      'Tidligere har haft hudkræft',
      'Har aktiv infektion i det område, der skal behandles',
    ],
    steps: [
      { t: 'Blodprøve', d: 'En lille mængde blod tages fra din arm, præcis som ved en almindelig blodprøve.' },
      { t: 'Centrifugering', d: 'Blodet adskilles nænsomt, så vi får en høj koncentration af kroppens egne regenererende celler.' },
      { t: 'Injektion', d: 'PRF injiceres med små, præcise stik, fx under øjnene, i ansigtet eller i hårbunden.' },
      { t: 'Efter behandlingen', d: 'Huden kan være let rød og hævet, og der kan komme små blå mærker, som forsvinder efter et par dage.' },
    ],
    prices: [
      {
        rows: [
          { label: 'PRF uden Skinpen (fx øjne, omkring munden eller mindre ar)', price: 2200 },
          { label: 'Skinpen + PRF, ansigt', price: 2800 },
          { label: 'Skinpen + PRF, ansigt og hals', price: 3200 },
        ],
      },
    ],
    faq: [
      { q: 'Hvad er en PRF-hudbehandling?', a: 'PRF står for Platelet Rich Fibrin. Vi udvinder dine egne blodplader og vækstfaktorer fra en lille mængde blod. De stimulerer hudens egen produktion af kollagen og elastin og giver en sundere, fastere og mere glødende hud.' },
      { q: 'Hvordan foregår behandlingen?', a: 'Vi tager en lille mængde blod fra din arm. Blodet centrifugeres, og PRF injiceres derefter med små stik i det ønskede område. Behandlingen er skånsom og kræver minimal nedetid.' },
      { q: 'Hvor længe holder resultatet?', a: 'Resultatet udvikler sig over 2–3 måneder, efterhånden som huden danner nyt kollagen. Effekten holder typisk 12–18 måneder, afhængigt af hud, livsstil og antal behandlinger. Effekten kan vedligeholdes med 1–2 behandlinger om året.' },
    ],
    results: [],
    related: ['skinpen', 'pfr-har', 'skinbooster'],
  },
  {
    slug: 'pfr-har',
    name: 'PRF – hår',
    category: 'krop',
    img: 't-prf-har',
    short: 'Naturlig stimulering af hårvækst ved begyndende hårtab.',
    headline: 'Naturlig stimulering af <em>hårvækst</em>',
    lead: 'Oplever du begyndende hårtab eller tyndere hår? PRF bruger kroppens egne vækstfaktorer til at stimulere hårsækkene og understøtte ny hårvækst.',
    discount: 10,
    facts: [
      ['Velegnet til', 'Både mænd og kvinder'],
      ['Forløb', '3–6 behandlinger med 4–6 ugers interval'],
      ['Resultat', 'Ses ofte efter 2–3 måneder'],
      ['Vedligehold', '1–2 behandlinger om året'],
    ],
    body: [
      {
        h: 'Fyldigere hår med kroppens egne vækstfaktorer',
        p: [
          'PRF (Platelet Rich Fibrin) er en 100 % naturlig behandling. Da PRF udvindes fra dit eget blod, er risikoen for bivirkninger minimal, og der bruges hverken kunstige tilsætningsstoffer eller medicin.',
          'Vi benytter en moderne centrifuge, der er op til fire gange mere effektiv end traditionelle modeller. Det giver en ekstra høj koncentration af vækstfaktorer og dermed et mere synligt resultat.',
        ],
      },
    ],
    suited: ['Tidligt hårtab hos mænd og kvinder', 'Tyndt hår efter graviditet eller stress', 'Hår, der mangler liv og fylde'],
    steps: [
      { t: 'Blodprøve', d: 'En lille mængde blod tages fra din arm.' },
      { t: 'Centrifugering', d: 'Blodet behandles i en specialdesignet centrifuge, der udskiller det aktive PRF.' },
      { t: 'Injektion i hårbunden', d: 'PRF injiceres med en fin nål i de områder af hovedbunden, hvor du ønsker forbedring.' },
    ],
    prices: [{ rows: [{ label: 'Hårvækst', price: 2200, from: true }] }],
    faq: [
      { q: 'Hvad er PRF mod hårtab?', a: 'En naturlig behandling, hvor vi bruger dine egne blodplader og vækstfaktorer til at stimulere hårsækkene. Det kan øge blodtilførslen, forbedre næringen til hårsækkene og dermed fremme hårvækst og styrke eksisterende hår.' },
      { q: 'Hvor lang tid går der, før jeg ser resultater?', a: 'De fleste oplever, at håret føles stærkere og tykkere efter 2–3 behandlinger. Ny hårvækst ses typisk efter 3–6 måneder.' },
      { q: 'Hvor længe holder resultatet?', a: 'Det varierer fra person til person, men mange oplever en langvarig forbedring, især med opfølgende behandlinger 1–2 gange om året.' },
      { q: 'Hvad koster behandlingen?', a: 'PRF til hårvækst koster fra 2.200 kr.' },
    ],
    results: [],
    related: ['pfr-hud', 'skinpen', 'hydrafacial'],
  },
  {
    slug: 'kemisk-peeling',
    name: 'Kemisk peeling',
    category: 'hud',
    img: 't-peeling',
    short: 'Medicinsk peeling mod akne, pigmentering, porer og fine linjer.',
    headline: 'Forny huden med <em>medicinsk</em> peeling',
    lead: 'En medicinsk peeling stimulerer cellefornyelsen og kan målrettes fine linjer, ujævn hudtone, store porer, pigmentering og akne.',
    discount: 10,
    facts: [
      ['Forundersøgelse', 'Gratis og uforpligtende'],
      ['Samme dag', 'Behandling kan ske samme dag'],
      ['Godkendt', 'Peelinger med pH under 3'],
      ['Nedetid', 'Fra ingen til få dage'],
    ],
    body: [
      {
        h: 'Dybere end en almindelig peeling',
        p: [
          'Medicinsk peeling adskiller sig fra de overfladiske peelinger, du måske kender fra hjemmebehandling eller hos en kosmetolog. Vi er specialuddannede i kemiske peelinger og godkendt af Styrelsen for Patientsikkerhed til at udføre peelinger med en pH-værdi under 3. Det betyder, at vi kan gå dybere i huden og opnå et bedre resultat.',
          'Vores overfladiske "red carpet peels" giver huden glød og ensartethed før en aften i byen. De mere dybdegående peelinger behandler konkrete hudproblemer og kan give et par dages nedetid, hvor huden er rød og sensitiv og kan skalle af.',
        ],
      },
      {
        h: 'Fire & Ice: "The Red Carpet Treatment"',
        p: [
          'Fire & Ice fra iS CLINICAL er en luksuriøs klinisk ansigtsbehandling, der hurtigt og sikkert fornyer hudens overflade. Den reducerer fine linjer, udglatter og fremskynder cellefornyelsen. Allerede efter første behandling ses en tydelig forbedring af hudens glød og struktur.',
        ],
      },
    ],
    suited: ['Akne og urenheder', 'Akne-ar og ujævn hudtekstur', 'Fine linjer og rynker', 'Hyperpigmentering', 'Tilstoppede porer'],
    steps: [
      { t: 'Gratis forundersøgelse', d: 'Vi vurderer din hud og dine forventninger hos vores kosmetiske sygeplejerske.' },
      { t: 'Valg af peeling', d: 'Sammen finder vi den type peeling, der passer bedst til dig og din hud.' },
      { t: 'Behandling', d: 'Kan udføres samme dag som forundersøgelsen.' },
    ],
    prices: [
      {
        rows: [
          { label: '1 behandling', price: 1500 },
          { label: '3 behandlinger', price: 3600 },
        ],
      },
    ],
    results: [],
    related: ['hydrafacial', 'skinpen', 'pfr-hud'],
  },
  {
    slug: 'skinpen',
    name: 'Skinpen',
    category: 'hud',
    img: 't-skinpen',
    short: 'Microneedling, der booster kollagen mod ar, porer og pigmentering.',
    headline: 'Boost hudens eget <em>kollagen</em>',
    lead: 'Skinpen er en prisvindende microneedling-metode, der stimulerer huden til selv at danne nyt kollagen og giver en jævn og naturlig hudstruktur.',
    discount: 10,
    facts: [
      ['Bedøvelse', 'Lokal bedøvende creme efter ønske'],
      ['Nåledybde', '0,25–2,5 mm'],
      ['Rødme', 'Aftager efter ca. 4 timer'],
      ['Helt væk', 'Efter 12–14 timer'],
    ],
    body: [
      {
        h: 'Sådan virker Skinpen',
        p: [
          'Skinpen er et elektronisk stempel med tynde nåle, der laver mikroskopiske kanaler i huden. Det stimulerer huden til at danne nyt kollagenvæv i underhuden.',
          'Under behandlingen påføres et serum, som virker stærkere, end hvis det blev påført huden almindeligvis. Behandlingen kan mærkes som en prikken, og huden kan være rød og varm bagefter.',
        ],
      },
    ],
    suited: ['Rynker og fine linjer', 'Aldringstegn', 'Akne og akne-ar', 'Strækmærker', 'Pigmentforandringer (melasma)', 'Store porer', 'Brandsår og ar'],
    steps: [
      { t: 'Før-billede', d: 'Din behandling starter med et før-billede, så vi kan følge resultatet.' },
      { t: 'Rens og bedøvelse', d: 'Huden afrenses, og du kan få lokal bedøvende creme.' },
      { t: 'Microneedling', d: 'Skinpen arbejder i en dybde på 0,25–2,5 mm sammen med et aktivt serum.' },
    ],
    prices: [
      {
        rows: [
          { label: 'Ansigt', price: 1400 },
          { label: 'Ansigt + hals', price: 1800 },
          { label: 'Ansigt + hals + décolleté', price: 2000 },
        ],
      },
    ],
    results: [],
    related: ['pfr-hud', 'kemisk-peeling', 'hydrafacial'],
  },
  {
    slug: 'hydrafacial',
    name: 'HydraFacial',
    category: 'hud',
    img: 't-hydrafacial',
    short: 'Rens, eksfoliering og intens fugt i én behandling.',
    headline: 'Smuk og sund hud med <em>HydraFacial</em>',
    lead: 'HydraFacial kombinerer rensning, eksfoliering, dybderens og fugt i én skånsom behandling, der efterlader huden strålende og forynget.',
    discount: 10,
    facts: [
      ['Velegnet til', 'Alle hudtyper'],
      ['Deluxe', 'Ca. 40 minutter med boostere og LED'],
      ['Resultat', 'Øjeblikkelig glød'],
      ['Teknologi', 'Vakuum- og Vortex-teknologi'],
    ],
    body: [
      {
        h: 'Tre trin til en strålende hud',
        p: [
          '<strong>Rens og peel:</strong> Det øverste hudlag renses og peeles, hvilket fremmer cellefornyelsen.',
          '<strong>Eksfolier og hydrer:</strong> Porerne dybderenses med blidt vakuumsug, mens huden tilføres intens fugt med et specialudviklet serum.',
          '<strong>Fugt og beskyttelse:</strong> Til sidst tilføres antioxidanter og peptider, der giver glød og beskytter mod miljøpåvirkninger.',
        ],
      },
      {
        h: 'Vælg din behandling',
        p: [
          '<strong>Signatur:</strong> Grundig rens, dybderens og masser af fugt med serum fyldt med antioxidanter, peptider og hyaluronsyre.',
          '<strong>Deluxe:</strong> Alt fra Signatur plus HydraFacials boostere og LED-lysterapi, der stimulerer dannelsen af nyt kollagen. Til dig, der vil tilpasse behandlingen til dine behov.',
          '<strong>Platinum:</strong> Den ultimative oplevelse. Starter med lymfedrænage, efterfulgt af Deluxe-behandlingen og afsluttes med LED-lys.',
        ],
      },
    ],
    suited: ['Tilstoppede porer og urenheder', 'Fedtet hud', 'Akne og akne-ar', 'Fine linjer og rynker', 'Pigmentering og solskader', 'Rødme, sensitiv hud og rosacea', 'Tør hud uden glød'],
    steps: [],
    prices: [
      {
        rows: [
          { label: 'Signatur', price: 1000 },
          { label: 'Deluxe', price: 1350 },
          { label: 'Platinum', price: 1600 },
        ],
      },
    ],
    results: [],
    related: ['kemisk-peeling', 'skinpen', 'skinbooster'],
  },
  {
    slug: 'fedtfrysning',
    name: 'Fedtfrysning',
    category: 'krop',
    img: 't-fedtfrysning',
    short: 'Reducér genstridige fedtdepoter og stram huden op.',
    headline: 'Slip af med <em>genstridigt</em> fedt',
    lead: 'Fedtfrysning er en skånsom behandling til fedtdepoter, der ikke forsvinder med træning og kost. Op til en tredjedel af det behandlede fedtvæv kan forsvinde.',
    discount: 20,
    facts: [
      ['Første resultater', 'Efter ca. 4 uger'],
      ['80 % af resultatet', 'Efter 3–4 uger'],
      ['Områder', 'Mave, BH-delle, arme, mandebryster'],
      ['Velkomsttilbud', '20 % rabat'],
    ],
    body: [
      {
        h: 'Gradvise og naturlige forandringer',
        p: [
          'Ud over at forme kroppen kan fedtfrysning forbedre hudens glathed og spændstighed ved at stimulere kroppens naturlige kollagenproduktion. Det kan forbedre hudteksturen og muligvis reducere synligheden af appelsinhud.',
          'Resultater varierer, og en sund livsstil med motion og sund kost er stadig vigtig for et langvarigt resultat.',
        ],
      },
    ],
    suited: ['Topmave', 'BH-delle', 'Mormorarme', 'Mandebryster'],
    steps: [
      { t: 'Indledende konsultation', d: 'Du får grundig information om behandlingen og dine muligheder.' },
      { t: 'Behandlingsplan', d: 'Sammen lægger vi en plan, og du kan stille alle dine spørgsmål.' },
      { t: 'Behandling', d: 'Med 1 eller 2 påsætninger alt efter område.' },
    ],
    prices: [
      {
        rows: [
          { label: '1 behandling, 1 påsætning', price: 1500 },
          { label: '1 behandling, 2 påsætninger', price: 2300 },
          { label: '3 behandlinger, 1 påsætning', price: 4000 },
          { label: '3 behandlinger, 2 påsætninger', price: 6000 },
        ],
      },
    ],
    results: [],
    related: ['pfr-har', 'hydrafacial', 'skinpen'],
  },
];

// Før/efter: ægte billeder fra klinikken. `tag` bruges til filtrering og kobling til behandlingssider.
export const results = [
  { id: 'ba-ansigt-3', tag: 'botox', title: 'Bekymringsrynke' },
  { id: 'ba-laeber-1', tag: 'filler', title: 'Læber' },
  { id: 'ba-pande-4', tag: 'botox', title: 'Panderynker' },
  { id: 'ba-ansigt-6', tag: 'botox', title: 'Panderynker' },
  { id: 'ba-laeber-2', tag: 'filler', title: 'Læber' },
  { id: 'ba-pande-1', tag: 'botox', title: 'Bekymringsrynke' },
  { id: 'ba-ansigt-7', tag: 'botox', title: 'Bekymringsrynke' },
  { id: 'ba-ansigt-2', tag: 'botox', title: 'Panderynker' },
  { id: 'ba-hals', tag: 'hud', title: 'Hals' },
  { id: 'ba-ansigt-5', tag: 'botox', title: 'Bekymringsrynke' },
  { id: 'ba-pande-3', tag: 'botox', title: 'Bekymringsrynke' },
  { id: 'ba-ansigt-4', tag: 'botox', title: 'Panderynker' },
  { id: 'ba-pande-2', tag: 'botox', title: 'Bekymringsrynke' },
];

export const resultTags = [
  { id: 'botox', name: 'Botox', slug: 'botox' },
  { id: 'filler', name: 'Filler', slug: 'kosmetisk-filler' },
  { id: 'hud', name: 'Hud', slug: null },
];

// Anmeldelser fra Trustpilot. Lange anmeldelser er forkortet (markeret med …).
export const reviews = [
  { name: 'Line', date: '9. sep. 2024', title: 'Fantastisk oplevelse og professionelle behandlinger', text: 'Pigerne er super venlige og imødekommende lige fra man træder ind af døren! Der blev virkelig taget sig god tid til at forstå mine behov, ønsker og bekymringer. Mette var utrolig dygtig og forklarede grundigt processen, så jeg følte mig tryg og velinformeret hele vejen igennem. Resultaterne af min behandling oversteg alle mine forventninger.', featured: true },
  { name: 'Rikke', date: '14. nov. 2025', title: 'Kompetent og erfarent personale – tryghed og flotte resultater!', text: 'Mette og Ditte er dygtige og erfarne. Jeg har følt mig i de absolut bedste hænder hver gang, jeg har besøgt deres klinik. …' },
  { name: 'Bente', date: '9. sep. 2024', title: 'Super grundig og ærlig vejledning!', text: 'Resultaterne er meget naturlige og præcis, som jeg havde håbet! Man mærker tydeligt, at de ikke går på kompromis med både kvaliteten af produkter og sikkerhed – hvilket gør behandlingen til en meget tryg og virkelig god oplevelse!' },
  { name: 'Christina Stampe', date: '3. dec. 2024', title: 'Ærligt og dygtigt personale, som lytter til ens ønsker', text: 'Jeg har fået tre behandlinger med Skinpen pga. solskader og pigmenter i ansigtet. Det har givet synlige resultater med det samme, og kombinationen af behandlinger og produkter fra ZO Skin Health har gjort, at jeg har fået den hud, jeg ikke turde drømme om.' },
  { name: 'Jessie', date: '2. jun. 2026', title: 'Altid pænt naturligt resultat', text: 'Det er altid en positiv oplevelse at få udført behandlinger hos Mette. …' },
  { name: 'Claus Nielsen', date: '11. mar. 2026', title: 'PRF-behandlinger mod hårtab', text: 'Jeg har fået PRF-behandlinger mod hårtab hos klinikken, og jeg er meget glad for både forløbet og resultatet. …' },
  { name: 'Dorte Andreasen', date: '18. feb. 2025', title: 'Læber', text: 'Har fået filler i mine læber, det så flot et resultat, og ser stadigvæk naturligt ud 🤗' },
  { name: 'Malene Paulsen', date: '3. dec. 2024', title: 'Behagelig og skøn klinik!', text: 'Man kan tydeligt mærke deres professionelle tilgang til behandlingerne. Jeg er meget tilfreds med mit naturlige resultat.' },
  { name: 'Susan', date: '30. jan. 2025', title: 'Første besøg, og jeg kommer helt klart igen', text: 'Professionelle, meget dygtige og imødekommende. Jeg er fan ✨' },
  { name: 'Susanne', date: '5. feb. 2025', title: 'Super sødt og professionelt personale', text: 'Har fået god behandling og rådgivning. Jeg kommer gerne igen 👍' },
];

export const team = [
  {
    name: 'Mette Appel',
    role: 'Indehaver · Kosmetisk specialsygeplejerske',
    img: 'mette',
    bio: [
      'Jeg er uddannet sygeplejerske med klinisk erfaring fra intensivafdelingen på Sønderborg Sygehus.',
      'Jeg er detaljeorienteret og går aldrig på kompromis med kvalitet og sikkerhed. Med stor respekt for den naturlige aldring sætter jeg en ære i at skabe naturlige og harmoniske resultater, og jeg tager løbende kurser for at holde mig opdateret om den nyeste viden og de nyeste injektionsteknikker.',
      'God kommunikation vægter jeg højt. Det er vigtigt for mig at give en ærlig og fyldestgørende vejledning, så du føler dig tryg.',
    ],
  },
  {
    name: 'Ditte B. R. Thordsen',
    role: 'Indehaver · Kosmetisk specialsygeplejerske',
    img: 'ditte',
    bio: [
      'Jeg er uddannet sygeplejerske og har flere års klinisk erfaring fra Dialysen og Medicinsk Modtagelse på Sønderborg Sygehus.',
      'Jeg stræber efter naturlige og harmoniske resultater, der forfiner dit udseende uden at ændre det. Det er vigtigt for mig at bevare din naturlige skønhed, og at du føler dig tryg og velinformeret gennem hele forløbet.',
      'Tillid og åbenhed er afgørende for et godt resultat. Ved at lytte til dine ønsker sikrer jeg, at vi sammen skaber et udseende, der føles autentisk.',
    ],
  },
  {
    name: 'Kristian',
    role: 'Speciallæge',
    img: 'kristian',
    bio: [
      'Kristian har mange års erfaring inden for både medicinsk og kosmetisk dermatologi og er klinikansvarlig på flere klinikker i landet.',
      'Han lægger vægt på naturlige resultater og æstetisk balance, og for ham er sikkerhed og høj kvalitet altid i centrum.',
      'Kristian varetager den lovpligtige forkonsultation før botoxbehandling, som foregår online.',
    ],
  },
];

export const steps = [
  { t: 'Gratis forundersøgelse', d: 'Vi starter altid med en grundig og uforpligtende samtale om dine ønsker og forventninger.' },
  { t: 'Personlig plan', d: 'Du får en ærlig vurdering og en behandlingsplan, der passer til dig. Ved injektioner er der 48 timers betænkningstid.' },
  { t: 'Behandling & kontrol', d: 'Behandlingen udføres af autoriseret sundhedspersonale, og vi følger op, så resultatet bliver, som du ønsker.' },
];
