import Image from 'next/image';
import { CallLink } from '@/components/call-link';
import { ConsultationDialog } from '@/components/consultation-dialog';
import { ReviewCarousel } from '@/components/review-carousel';
import {
  BarChart3,
  BookOpenCheck,
  Building2,
  Calculator,
  CirclePlay,
  ClipboardList,
  Clock3,
  GraduationCap,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  MonitorPlay,
  Music2,
  Phone,
  PencilLine,
  Ruler,
  ShieldCheck,
  Star,
  Target,
  UserRound,
  Users,
} from 'lucide-react';

export const dynamic = 'force-static';

const navigation = [
  { label: 'Úvod', href: '#uvod' },
  { label: 'O nás', href: '#o-nas' },
  { label: 'Cenník', href: '#cennik' },
  { label: 'Kurzy', href: '#kurzy' },
  { label: 'Recenzie', href: '#recenzie' },
  { label: 'Kontakt', href: '#kontakt' },
];

const advantages = [
  { icon: Users, title: 'Skúsení lektori', text: 'Každý lektor u nás má prax a je odborníkom v matematike.' },
  { icon: Target, title: 'Individuálny prístup', text: 'Prispôsobujeme sa každému žiakovi, jeho tempu a potrebám.' },
  { icon: BarChart3, title: 'Zrozumiteľné vysvetlenia', text: 'Učíme žiakov chápať matematiku tak, aby im dávala zmysel.' },
  { icon: Clock3, title: 'Flexibilne online aj osobne', text: 'Doučovanie podľa vašich potrieb.' },
  { icon: GraduationCap, title: 'Stovky spokojných študentov', text: 'Výsledky, ktoré potvrdzujú aj ich recenzie.' },
  { icon: BookOpenCheck, title: '10000+ odučených hodín', text: 'Skúsenosti s rôznym učivom aj úrovňami.' },
];

const promises = [
  { icon: GraduationCap, title: 'Skúsení lektori' },
  { icon: Users, title: 'Individuálny prístup' },
  { icon: ShieldCheck, title: 'Podpora a motivácia' },
  { icon: Star, title: 'Overené metódy' },
];

const courses = [
  {
    icon: ClipboardList,
    title: 'Kurz prípravy na T9 / prijímacie skúšky na SŠ',
    text: '60-minútová lekcia so systematickou prípravou v malej skupine 2 – 6 žiakov na Testovanie 9 alebo prijímacie skúšky na SŠ.',
    includes: ['Výučbové materiály po každej téme', 'Pravidelné domáce úlohy', 'Pravidelné kontrolné testy', '90-minútové testy podľa špecifikácií T9', 'Prijímačkové testy z minulých rokov'],
  },
  {
    icon: Building2,
    title: 'Kurz prípravy na prijímačky na 8-ročné gymnázium',
    text: '60-minútová lekcia so systematickou prípravou v malej skupine 2 – 6 žiakov na prijímacie skúšky na 8-ročné gymnázium.',
    includes: ['Výučbové materiály', 'Pravidelné domáce úlohy', 'Kontrolné testy', 'Prijímačkové testy z minulých rokov'],
  },
  {
    icon: GraduationCap,
    title: 'Kurz prípravy na maturitu / prijímačky na VŠ',
    text: '60-minútová lekcia so systematickou prípravou v malej skupine 2 – 6 žiakov na maturitu alebo prijímacie skúšky na VŠ.',
    includes: ['Výučbové materiály', 'Pravidelné domáce úlohy', 'Kontrolné testy', 'Testy podľa špecifikácií maturitnej skúšky', 'Prijímačkové testy z minulých rokov'],
  },
  {
    icon: UserRound,
    title: 'Individuálne doučovanie',
    text: '55-minútová individuálna hodina 1 na 1.',
    includes: ['Individuálny prístup a tempo podľa vašich potrieb', 'Lektor sa počas celej hodiny venuje iba vám', 'Zober aj parťáka a dostaneš 30 % zľavu', 'Výučbové materiály', 'Pravidelné domáce úlohy', 'Kontrolné testy', 'Priebežná príprava počas celého školského roka'],
  },
  {
    icon: MonitorPlay,
    title: 'Balík samouk',
    text: 'Dve videá na konkrétnu tému s príkladmi a 30-minútové skrátené doučovanie.',
    includes: ['Prvé video s vysvetlením témy', 'Sada príkladov na pochopenie problematiky', 'Druhé video so spoločným riešením príkladov a vysvetlením postupu', '30-minútové doučovanie na objasnenie nejasností a upevnenie vedomostí'],
  },
];

function LogoMark({ size = 'md', decorative = false }: { size?: 'sm' | 'md' | 'hero'; decorative?: boolean }) {
  const sizeClass = size === 'hero' ? 'size-full' : size === 'sm' ? 'size-9' : 'size-11';
  return (
    <span className={`${sizeClass} relative block shrink-0 overflow-hidden rounded-full bg-[#1743a4]`}>
      <Image
        src="/matikaren-logo.png"
        alt={decorative ? '' : 'Logo Matikáreň'}
        width={1024}
        height={1536}
        sizes={size === 'hero' ? '350px' : '76px'}
        className="brand-logo-source"
        priority={size !== 'sm'}
      />
    </span>
  );
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark size={footer ? 'sm' : 'md'} />
      <span>
        <span className={`${footer ? 'text-lg' : 'text-[25px]'} block font-extrabold leading-none tracking-[.02em] text-white`}>MATIKÁREŇ</span>
        {footer && <span className="mt-1 block text-[10px] leading-tight text-white/70">Doučovanie matematiky<br />ľudskou rečou.</span>}
      </span>
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-center">
      <h2 className="text-[18px] font-extrabold uppercase tracking-tight text-[#09266f]">{children}</h2>
      <span className="mx-auto mt-1 block h-0.5 w-5 rounded-full bg-[#0b5cff]" />
    </div>
  );
}

function SchoolBackdrop() {
  return (
    <div aria-hidden="true" className="school-backdrop pointer-events-none absolute inset-0 z-0 overflow-hidden text-[#0b5cff]">
      <Ruler strokeWidth={1.45} />
      <GraduationCap strokeWidth={1.45} />
      <Calculator strokeWidth={1.45} />
      <PencilLine strokeWidth={1.45} />
    </div>
  );
}

const lessonPackages = [
  { lessons: 10, total: 140, perLesson: 14 },
  { lessons: 20, total: 240, perLesson: 12 },
  { lessons: 40, total: 400, perLesson: 10 },
];

function LessonPackageList() {
  return (
    <div className="price-list">
      {lessonPackages.map(({ lessons, total, perLesson }) => (
        <div key={lessons} className="price-package-row">
          <div className="price-package-copy">
            <span>{lessons} lekcií</span>
            <small>{perLesson} € / lekcia</small>
          </div>
          <b>{total} €</b>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#f7faff] text-[#08236a]">
      <section id="uvod" className="hero-reference hero-copy-outlined relative overflow-hidden text-white">
        <div className="relative z-40 border-t-[3px] border-[#ffbf19] bg-[#061947] text-white shadow-[0_4px_14px_rgba(3,20,68,.18)] sm:border-t-0 sm:bg-[#ffbf19] sm:text-[#061947]">
          <div className="site-shell grid grid-cols-[auto_1fr] items-center justify-center gap-x-1.5 gap-y-1 py-1.5 text-center text-[9px] font-extrabold leading-[1.25] sm:flex sm:min-h-10 sm:flex-wrap sm:gap-x-2 sm:py-2 sm:text-[13px] sm:leading-[1.3]">
            <Megaphone className="size-3.5 shrink-0 sm:size-4" aria-hidden="true" />
            <span>Školský rok 2026/2027 je tu! 83 % kapacít je už obsadených. Rezervuj si svoje doučovanie ešte dnes!</span>
            <CallLink className="banner-phone-number button-font col-span-2 inline-flex items-center justify-self-center gap-1 whitespace-nowrap rounded-full bg-[#ffbf19] px-2 py-1 text-[10px] font-extrabold text-[#061947] transition hover:bg-[#ffd15a] sm:col-span-1 sm:bg-[#061947] sm:px-3 sm:text-[13px] sm:text-white sm:hover:bg-[#0b327b]" aria-label="Zavolať na číslo +421 944 275 203">
              <Phone className="size-3 sm:size-3.5" fill="currentColor" />
              +421 944 275 203
            </CallLink>
          </div>
        </div>
        <header className="relative z-30 border-b border-white/10 bg-[#061947]/70">
          <div className="site-shell flex h-[76px] items-center justify-between gap-5">
            <a href="#uvod" aria-label="Matikáreň – úvod"><Brand /></a>
            <nav aria-label="Hlavná navigácia" className="hidden items-center gap-9 text-[15px] font-semibold lg:flex">
              {navigation.map((item) => <a key={item.href} href={item.href} className="transition hover:text-[#70a6ff]">{item.label}</a>)}
            </nav>
            <ConsultationDialog compact />
            <details className="relative lg:hidden">
              <summary aria-label="Otvoriť menu" className="grid size-10 cursor-pointer list-none place-items-center rounded-lg border border-white/20 [&::-webkit-details-marker]:hidden"><Menu className="size-5" /></summary>
              <nav className="absolute right-0 top-12 z-50 w-52 rounded-xl border border-white/15 bg-[#071c50]/95 p-2 shadow-2xl">
                {navigation.map((item) => <a key={item.href} href={item.href} className="block rounded-lg px-4 py-2.5 text-base hover:bg-white/10">{item.label}</a>)}
              </nav>
            </details>
          </div>
        </header>

        <div aria-hidden="true" className="hero-math-layer pointer-events-none absolute inset-0 z-[2] block overflow-hidden">
          <div className="math-float absolute left-[52%] top-[94px] h-16 w-20 text-[#62a2ff]/70">
            <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
            <span className="absolute left-3 top-0 h-full w-px bg-current" />
            <span className="absolute left-5 top-1 -rotate-6 text-[44px] font-light leading-none">∿</span>
            <span className="absolute -bottom-3 right-0 text-[11px] italic">x</span>
            <span className="absolute -top-2 left-0 text-[11px] italic">y</span>
          </div>
          <div className="math-float absolute right-[7%] top-[88px] rotate-[3deg] text-[24px] italic text-[#62a2ff]/70">a² + b² = c²</div>
          <div className="math-float absolute left-[45%] top-[218px] rotate-[-3deg] text-[21px] italic text-[#62a2ff]/65">f(x) = x²</div>
          <div className="math-float absolute right-[4%] top-[205px] h-20 w-24 text-[#62a2ff]/68">
            <span className="absolute bottom-2 left-3 h-px w-16 rotate-[8deg] bg-current" />
            <span className="absolute bottom-2 left-3 h-px w-[72px] origin-left rotate-[-66deg] bg-current" />
            <span className="absolute bottom-2 right-2 h-px w-[68px] origin-right rotate-[57deg] bg-current" />
            <span className="absolute bottom-4 left-0 text-[13px] italic">a</span>
            <span className="absolute right-0 top-6 text-[13px] italic">b</span>
            <span className="absolute right-9 top-0 text-[13px] italic">c</span>
          </div>
          <div className="math-float absolute bottom-[58px] right-[16%] rotate-[5deg] text-[44px] font-light text-[#62a2ff]/70">√x</div>
          <div className="math-dot-grid math-float absolute bottom-[49px] right-[1%] size-16 opacity-65" />
          <div className="math-float absolute right-[28%] top-[112px] text-[33px] font-light text-[#62a2ff]/55">π</div>
          <div className="math-float absolute right-[30%] bottom-[54px] text-[31px] font-light text-[#62a2ff]/50">∑</div>
          <div className="math-float absolute right-[3%] bottom-[150px] rotate-[-8deg] text-[22px] italic text-[#62a2ff]/55">∞ · x²</div>
          <div className="math-float absolute left-[58%] bottom-[45px] rotate-[4deg] text-[17px] italic text-[#62a2ff]/50">2x + 3 = 11</div>
        </div>

        <div aria-hidden="true" className="hero-logo-watermark pointer-events-none absolute left-[70%] top-[53%] z-[1] aspect-square w-[460px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full opacity-[0.72] mix-blend-screen">
          <LogoMark size="hero" decorative />
        </div>

        <div className="site-shell relative z-10 flex min-h-[430px] items-center pb-8 pt-6">
          <div className="hero-main-copy relative isolate w-full pt-1">
            <h1 className="relative z-10 max-w-[660px] text-[52px] font-extrabold leading-[1.04] tracking-[-.035em] sm:text-[62px]">Matematika, <span className="block text-[#65a0ff]">ktorej rozumieš.</span></h1>
            <p className="mt-5 text-[20px] font-semibold leading-[1.5] text-white">Doučovanie matematiky pre ZŠ, SŠ a VŠ.<br />Príprava na T9, prijímačky a maturitu.</p>
            <div className="mt-4 flex max-w-[690px] items-start gap-3 rounded-xl border border-[#7eb0ff]/70 bg-[#061947]/55 px-4 py-3 text-[14px] font-bold leading-[1.45] text-white shadow-[0_10px_24px_rgba(0,15,58,.2)] backdrop-blur-sm sm:max-w-[460px]">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#7eb0ff]" aria-hidden="true" />
              <p><strong className="font-extrabold">Prvá hodina úplne bez rizika.</strong> Ak nebudete spokojní, vrátime vám peniaze.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ConsultationDialog />
              <CallLink className="button-font inline-flex items-center gap-2 rounded-xl border border-white bg-white/10 px-6 py-3 text-[15px] font-extrabold text-white transition hover:bg-white/20" aria-label="Zavolať na číslo +421 944 275 203"><Phone className="size-4" fill="currentColor" />+421 944 275 203</CallLink>
              <a href="#cennik" className="button-font rounded-xl border border-white bg-white/5 px-6 py-3 text-[15px] font-extrabold transition hover:bg-white/10">Pozrieť cenník</a>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-7 lg:grid-cols-6">
              {advantages.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3 sm:block"><Icon className="mt-0.5 size-8 shrink-0 text-[#6fa7ff] drop-shadow-[0_1px_2px_rgba(2,15,53,.9)] sm:mb-3 sm:mt-0 sm:size-9" strokeWidth={2} /><div><h2 className="text-[21px] font-extrabold leading-[1.2] sm:text-[19px]">{title}</h2><p className="mt-1.5 max-w-[280px] text-[15.5px] font-bold leading-[1.45] text-white">{text}</p></div></div>
              ))}
            </div>
          </div>
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 42"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -bottom-px left-0 z-20 h-8 w-full sm:h-10"
        >
          <path
            fill="#f8fbff"
            d="M0 26C220 2 430 5 650 23C890 42 1130 41 1440 17V42H0Z"
          />
        </svg>
      </section>

      <section id="o-nas" className="relative overflow-hidden bg-[#f8fbff] pb-4 pt-7">
        <SchoolBackdrop />
        <div className="site-shell relative z-10 grid items-center gap-8 lg:grid-cols-[.9fr_1.5fr]">
          <div className="flex h-[228px] items-center justify-center rounded-xl border border-dashed border-[#76a6ff] bg-white text-center">
            <a href="#kontakt" className="group flex flex-col items-center px-6 text-[13px] font-medium leading-relaxed text-[#153373]"><span className="grid size-11 place-items-center rounded-full bg-[#0b5cff] text-white shadow-[0_8px_20px_rgba(11,92,255,.25)] transition group-hover:scale-105"><CirclePlay className="size-6" /></span><span className="mt-4">Tu bude úvodné video<br />o nás a našom prístupe</span></a>
          </div>
          <div>
            <p className="text-[15px] font-extrabold uppercase text-[#09266f]">O nás</p>
            <h2 className="mt-2 text-[29px] font-extrabold leading-[1.17] tracking-[-.02em] text-[#09266f]">Sme tím lektorov, <span className="text-[#075cff]">ktorí rozumejú matematike aj žiakom.</span></h2>
            <p className="mt-4 text-[18px] font-normal leading-[1.65] text-[#334d82]">Veríme, že matematika sa dá ľahko zvládnuť, ak zvolíme správny prístup.</p>
            <p className="mt-3 text-[18px] font-normal leading-[1.65] text-[#334d82]">Snažíme sa učiť tak, aby to dávalo zmysel – nie len naučiť postupy naspamäť, ale vysvetliť, prečo to funguje. Vieme, že každému vyhovuje iný spôsob výučby, a preto sa snažíme prispôsobiť tomu, čo konkrétny žiak potrebuje. Aj zložitejšie učivo vysvetľujeme jednoducho a krok po kroku, aby ste ho vedeli použiť aj v praxi. :)</p>
          </div>
        </div>

        <ul className="site-shell relative z-10 mt-7 grid grid-cols-2 border-y border-[#d7e3f7] py-4 sm:grid-cols-4">
          {promises.map(({ icon: Icon, title }, index) => (
            <li key={title} className={`flex items-center gap-3 px-3 py-3 sm:justify-center sm:px-4 ${index % 2 === 1 ? 'border-l border-[#d7e3f7]' : ''} sm:border-l sm:first:border-l-0`}>
              <Icon className="size-8 shrink-0 text-[#0b5cff]" strokeWidth={2.1} />
              <h3 className="text-[17px] font-extrabold leading-tight text-[#09266f]">{title}</h3>
            </li>
          ))}
        </ul>

        <div className="site-shell relative z-10 mt-9">
          <article className="overflow-hidden rounded-[24px] border border-[#cbdaf7] bg-white shadow-[0_20px_55px_rgba(24,72,158,.10)]">
            <div className="grid md:grid-cols-[minmax(260px,.78fr)_1.45fr]">
              <div className="relative min-h-[390px] overflow-hidden bg-[#dce9ff] md:min-h-[440px]">
                <Image
                  src="/juraj-marcinka.png"
                  alt="Juraj Marcinka, zakladateľ a lektor Matikárne"
                  width={864}
                  height={1536}
                  sizes="(max-width: 767px) 100vw, 38vw"
                  className="absolute inset-0 h-full w-full object-cover object-[center_52%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#061947]/55 to-transparent" />
              </div>

              <div className="relative flex flex-col justify-center px-6 py-8 sm:px-9 sm:py-10 lg:px-12">
                <div aria-hidden="true" className="absolute -right-8 -top-8 size-36 rounded-full bg-[#eaf2ff]" />
                <div className="relative">
                  <p className="text-[14px] font-extrabold uppercase tracking-[.08em] text-[#075cff]">O mne</p>
                  <h2 className="mt-2 text-[29px] font-extrabold leading-tight tracking-[-.02em] text-[#09266f]">Zakladateľ a lektor</h2>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#eaf2ff] px-3 py-1.5 text-[13px] font-bold text-[#075cff]">
                    <GraduationCap className="size-4" /> Juraj Marcinka
                  </div>

                  <div className="mt-5 space-y-5 text-[18px] font-normal leading-[1.65] text-[#334d82]">
                    <p>Volám sa <strong className="font-extrabold text-[#09266f]">Juraj Marcinka</strong> a som študentom 2. ročníka Univerzity Komenského. Absolvoval som 8-ročné gymnázium na Pankúchovej, kde som maturoval z matematiky.</p>
                    <p>Matematiku doučujem už <strong className="font-extrabold text-[#09266f]">viac ako štyri roky</strong> a mám skúsenosti s prípravou žiakov rôzneho veku aj úrovne. Pri doučovaní sa snažím každému prispôsobiť tempo, spôsob vysvetľovania aj typ úloh podľa jeho individuálnych potrieb.</p>
                    <p className="rounded-xl border-l-4 border-[#075cff] bg-[#f3f7ff] px-4 py-3">Mojím cieľom je, aby žiaci matematike <strong className="font-extrabold text-[#075cff]">skutočne porozumeli</strong>, nie aby sa postupy iba učili naspamäť.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="kurzy" className="relative overflow-hidden bg-[#f8fbff] pb-4 pt-1">
        <SchoolBackdrop />
        <div className="site-shell relative z-10">
          <SectionTitle>Čo ponúkame</SectionTitle>
          <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {courses.map(({ icon: Icon, title, text, includes }, index) => (
              <article key={title} className={`flex h-full min-h-[205px] flex-col items-center rounded-2xl border border-[#d1def5] bg-white px-5 py-5 text-center shadow-[0_10px_24px_rgba(35,75,150,.06)] ${index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                <Icon className="size-9 shrink-0 text-[#075cff]" strokeWidth={2.1} />
                <h3 className="mt-3 text-[17px] font-extrabold leading-[1.25] text-[#09266f]">{title}</h3>
                <p className="mt-2 text-[13.5px] font-medium leading-[1.5] text-[#455d8e]">{text}</p>
                {includes.length > 0 && (
                  <div className="mt-4 w-full border-t border-[#e0e9f8] pt-3 text-left">
                    <p className="text-[13px] font-extrabold text-[#09266f]">Zahŕňa:</p>
                    <ul className="mt-2 space-y-1.5 text-[12.5px] font-medium leading-[1.4] text-[#455d8e]">
                      {includes.map((item) => <li key={item} className="flex gap-2"><span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#075cff]" />{item}</li>)}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-[760px] rounded-xl border border-[#cbdaf7] bg-white px-5 py-4 text-center text-[14px] font-bold leading-relaxed text-[#153373] shadow-[0_8px_22px_rgba(35,75,150,.05)]">Kurzy otvárame priebežne – stačí zavolať alebo napísať a informovať sa o voľných miestach.</p>
        </div>
      </section>

      <section id="cennik" className="relative overflow-hidden bg-[linear-gradient(180deg,#edf5ff,#f7faff)] pb-4 pt-2">
        <SchoolBackdrop />
        <div className="site-shell relative z-10"><SectionTitle>Cenník</SectionTitle><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <article className="price-card"><GraduationCap aria-hidden="true" className="price-card-symbol" /><h3 className="price-head">Kurz prípravy na T9 /<br />prijímačky na SŠ</h3><div className="price-body"><p className="price-label">Skúšobná hodina</p><p className="price-main">15 €</p><div className="price-rule" /><p className="price-label">Balíčky</p><LessonPackageList /></div></article>
          <article className="price-card"><GraduationCap aria-hidden="true" className="price-card-symbol" /><h3 className="price-head">Kurz prípravy na<br />8-ročné gymnáziá</h3><div className="price-body"><p className="price-label">Skúšobná hodina</p><p className="price-main">15 €</p><div className="price-rule" /><p className="price-label">Balíčky</p><LessonPackageList /></div></article>
          <article className="price-card"><UserRound aria-hidden="true" className="price-card-symbol" /><h3 className="price-head">Individuálne doučovanie<br /><small>(55 minút)</small></h3><div className="price-body"><p className="price-main !mt-0">24 €</p><div className="price-rule" /><p className="price-label">Zober aj parťáka a dostaneš</p><p className="text-[58.5px] font-extrabold leading-none text-[#09266f]">30 %</p><p className="mt-1 text-[20px] font-extrabold leading-[1.2] text-[#075cff]">zľavu</p><p className="mt-3 text-[16.5px] font-normal leading-[1.35]">Učenie bude zábavnejšie<br />a cena výhodnejšia!</p></div></article>
          <article className="price-card"><MonitorPlay aria-hidden="true" className="price-card-symbol" /><h3 className="price-head">Balík samouk</h3><div className="price-body"><p className="price-main !mt-0">20 €</p><div className="price-rule" /><div><div className="mb-3 flex items-center justify-center gap-4 text-[#075cff]"><MonitorPlay className="size-9" /><span className="text-[45px] leading-none">＋</span><UserRound className="size-9" /></div><p className="text-[18px] font-semibold leading-[1.35]">2× výučbové video<br />na konkrétnu tému<br /><span className="text-[36px] leading-none text-[#075cff]">＋</span><br />30-minútové doučovanie<br />na objasnenie nejasností<br />a upevnenie vedomostí</p></div></div></article>
        </div></div>
      </section>

      <section id="recenzie" className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff,#f6faff)] pb-5 pt-3">
        <SchoolBackdrop />
        <div className="site-shell relative z-10"><SectionTitle>Recenzie</SectionTitle><ReviewCarousel /></div>
      </section>

      <section id="kontakt" className="relative overflow-hidden bg-white pb-2 pt-0">
        <SchoolBackdrop />
        <div className="button-font site-shell relative z-10 flex flex-col items-center justify-between gap-4 rounded-xl bg-[linear-gradient(110deg,#071a4c,#083a91)] px-7 py-4 text-white shadow-[0_12px_30px_rgba(8,38,105,.16)] md:flex-row"><div><h2 className="text-[20px] font-extrabold uppercase">Kontaktuj nás</h2><div className="mt-2 flex flex-wrap gap-x-8 gap-y-2.5 text-[16px] font-bold"><CallLink className="flex items-center gap-2 transition hover:text-[#8db9ff]" aria-label="Zavolať na číslo +421 944 275 203"><Phone className="size-5" fill="currentColor" />+421 944 275 203</CallLink><a href="mailto:matikaren.info@gmail.com" className="flex items-center gap-2 transition hover:text-[#8db9ff]"><Mail className="size-5" />matikaren.info@gmail.com</a><span className="flex items-center gap-2"><BookOpenCheck className="size-5" />Online aj osobne</span></div></div><a href="mailto:matikaren.info@gmail.com?subject=Z%C3%A1ujem%20o%20dou%C4%8Dovanie%20matematiky" className="button-font flex shrink-0 items-center gap-2 rounded-xl bg-[#0b5cff] px-6 py-3 text-[15px] font-extrabold transition hover:bg-[#2470ff]"><MessageCircle className="size-4" fill="currentColor" />Napísať správu</a></div>
      </section>

      <footer className="bg-[#061947] py-3 text-white">
        <div className="site-shell flex flex-col items-center justify-between gap-3 sm:flex-row"><a href="#uvod"><Brand footer /></a><p className="text-[12px] font-normal text-white/65">© 2026 Matikáreň – Všetky práva vyhradené.</p><div className="flex gap-4"><a href="https://www.instagram.com/matikaren.sk/" target="_blank" rel="noreferrer" aria-label="Instagram Matikáreň" className="grid size-7 place-items-center rounded-lg border border-white/80 transition hover:border-[#8db9ff] hover:text-[#8db9ff]"><svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-none stroke-current" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" /></svg></a><a href="https://www.tiktok.com/@matikaren.sk" target="_blank" rel="noreferrer" aria-label="TikTok Matikáreň" className="grid size-7 place-items-center rounded-lg border border-white/80 transition hover:border-[#8db9ff] hover:text-[#8db9ff]"><Music2 className="size-4" /></a><a href="mailto:matikaren.info@gmail.com" aria-label="Email Matikáreň" className="grid size-7 place-items-center rounded-lg border border-white/80 transition hover:border-[#8db9ff] hover:text-[#8db9ff]"><Mail className="size-4" /></a></div></div>
      </footer>
    </main>
  );
}
