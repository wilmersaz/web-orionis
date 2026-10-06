import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Blocks,
  Bot,
  Box,
  FileCog,
  FlaskConical,
  Gauge,
  Gem,
  Github,
  Layers,
  Puzzle,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import python from 'highlight.js/lib/languages/python';
import { CodeSampleTabs, type CodeSampleTab } from './code-sample-tabs';
import { ThemeToggle } from './theme-toggle';
import { featureContent, getFeatures, type Accent, type IconName } from '@/content/features';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { nav, site } from '@/lib/site';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

const syntaxHighlighter = hljs.newInstance();
syntaxHighlighter.registerLanguage('bash', bash);
syntaxHighlighter.registerLanguage('python', python);

const featureIcons: Record<IconName, LucideIcon> = {
  server: Server,
  layers: Layers,
  gauge: Gauge,
  flask: FlaskConical,
  terminal: Terminal,
  fileCog: FileCog,
  workflow: Workflow,
  shieldCheck: ShieldCheck,
  box: Box,
  blocks: Blocks,
  puzzle: Puzzle,
  refreshCw: RefreshCw,
  bot: Bot,
  badgeCheck: BadgeCheck,
  gem: Gem,
};

const accentStyles: Record<Accent, string> = {
  cyan: 'bg-brand-cyan/10 text-brand-cyan ring-brand-cyan/15',
  gold: 'bg-brand-gold/10 text-brand-gold ring-brand-gold/15',
  blue: 'bg-brand-blue/10 text-brand-blue ring-brand-blue/15 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-300/15',
};

export default async function HomePage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Home' });
  const messages = await getMessages({ locale });
  const features = getFeatures();
  const codeTabs: CodeSampleTab[] = [
    {
      id: 'mcp',
      label: 'MCP',
      code: `from orionis.mcp import McpResponse, Server, Tool, ToolAnnotations
from orionis.mcp.server.compiler import compile_server
from orionis.schemas import Schema

class GreetInput(Schema):
    name: str

class GreetTool(Tool[GreetInput, str]):
    description = "Return a greeting."
    annotations = ToolAnnotations(read_only=True, destructive=False)

    def handle(self, payload: GreetInput) -> str:
        return f"Hello, {payload.name}!"

class DemoServer(Server):
    name = "Demo"
    version = "1.0.0"
    tools = (GreetTool,)

compiled = compile_server(DemoServer)
assert tuple(compiled.tools) == ("greet",)
assert McpResponse.text("ready").content[0].text == "ready"`,
    },
    {
      id: 'console-command',
      label: 'Console Command',
      code: `from orionis.console import Argument
from orionis.console.base import BaseCommand

class GreetCommand(BaseCommand):
    signature = "greet"
    description = "Print a greeting."
    arguments = [
        Argument(name_or_flags="name", help="Name to greet."),
    ]

    async def handle(self) -> int:
        self.writeLine(f"Hello, {self.getArgument('name')}!")
        return 0`,
    },
    {
      id: 'mail',
      label: 'Mail',
      code: `from orionis.mail import Address, Content, Envelope

sender = Address("notifications@example.com", "Example App")
envelope = Envelope(
    subject="Welcome",
    from_address=sender,
    to=("ana@example.com", "ops@example.com"),
    reply_to="support@example.com",
)
content = Content(text="Welcome to Orionis.", html="<p>Welcome to Orionis.</p>")
assert envelope.recipients() == ("ana@example.com", "ops@example.com")
assert content.text == "Welcome to Orionis."
print(sender.asHeader())`,
    },
  ].map((tab) => ({
    ...tab,
    highlightedCode: syntaxHighlighter.highlight(tab.code, { language: 'python' }).value,
  }));
  const docsUrl = site.docs.replace('/en/', `/${locale}/`);
  const alternateLocale = locale === 'en' ? 'es' : 'en';

  const navigation = nav.map((item) => ({
    href: item.href,
    label: t(`nav.${item.key}`),
  }));

  const metrics = [
    { value: t('metrics.requestsValue'), label: t('metrics.requestsLabel') },
    { value: t('metrics.latencyValue'), label: t('metrics.latencyLabel') },
    { value: t('metrics.speedValue'), label: t('metrics.speedLabel') },
  ];

  const modules: { icon: LucideIcon; title: string; description: string }[] = [
    {
      icon: Terminal,
      title: t('modules.cliTitle'),
      description: t('modules.cliDescription'),
    },
    {
      icon: Layers,
      title: t('modules.architectureTitle'),
      description: t('modules.architectureDescription'),
    },
    {
      icon: ShieldCheck,
      title: t('modules.securityTitle'),
      description: t('modules.securityDescription'),
    },
  ];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main lang={locale} className="relative isolate min-h-screen overflow-hidden bg-surface-page text-ink-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-hero-radial" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-72 -z-10 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl"
      />

      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" locale={locale} className="group flex items-center gap-3" aria-label={site.fullName}>
          <img src="/favicon.svg" width={40} height={40} alt="logo" />
          <span className="hidden text-lg font-bold tracking-tight text-ink-950 dark:text-ink-50 sm:inline">{site.fullName}</span>
        </Link>

        <nav aria-label={t('nav.ariaLabel')} className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              locale={locale}
              className="text-sm text-ink-300 transition-colors hover:text-ink-950 dark:hover:text-ink-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            locale={alternateLocale}
            className="rounded-lg border border-line/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink-300 transition-colors hover:border-line/20 hover:text-ink-950 dark:hover:text-ink-50"
            aria-label={t('nav.switchLocale')}
          >
            <span
              aria-hidden="true"
              className={`relative block h-4 overflow-hidden rounded-[2px] border border-white/20 shadow-sm ${
                alternateLocale === 'es' ? 'w-6' : 'w-[30px]'
              }`}
            >
              {alternateLocale === 'es' ? (
                <>
                  <span className="absolute inset-0 bg-[#AA151B]" />
                  <span className="absolute inset-x-0 top-1/4 h-1/2 bg-[#F1BF00]" />
                </>
              ) : (
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 190 100"
                  preserveAspectRatio="none"
                >
                  <rect width="190" height="100" fill="#FFFFFF" />
                  {Array.from({ length: 13 }, (_, index) => (
                    <rect
                      key={`stripe-${index}`}
                      width="190"
                      height={100 / 13 + 0.1}
                      y={index * (100 / 13)}
                      fill={index % 2 === 0 ? '#B22234' : '#FFFFFF'}
                    />
                  ))}
                  <rect width="76" height={(7 / 13) * 100} fill="#3C3B6E" />
                  {Array.from({ length: 9 }, (_, row) =>
                    Array.from({ length: row % 2 === 0 ? 6 : 5 }, (_, column) => {
                      const centerX = (row % 2 === 0 ? 7 : 13) + column * 12.3;
                      const centerY = 3 + row * 5.95;
                      const points = Array.from({ length: 10 }, (_, point) => {
                        const angle = (point * Math.PI) / 5 - Math.PI / 2;
                        const radius = point % 2 === 0 ? 2.3 : 1;
                        return `${centerX + radius * Math.cos(angle)},${centerY + radius * Math.sin(angle)}`;
                      }).join(' ');

                      return <polygon key={`${row}-${column}`} points={points} fill="#FFFFFF" />;
                    }),
                  )}
                </svg>
              )}
            </span>
          </Link>
          <ThemeToggle
            switchToLightLabel={t('theme.switchToLight')}
            switchToDarkLabel={t('theme.switchToDark')}
          />
          <a
            href={site.repo}
            className="hidden items-center gap-2 rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue dark:bg-white dark:text-ink-950 dark:hover:bg-brand-cyan sm:flex"
          >
            <Github size={16} aria-hidden="true" />
            {t('hero.githubCta')}
          </a>
        </div>
      </header>

      <section className="mx-auto grid grid-cols-1 max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-28 lg:pt-24">
        <div className="animate-fade-up min-w-0">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/[0.07] px-3.5 py-2 text-xs font-medium text-brand-cyanSoft">
            <span className="size-1.5 rounded-full bg-brand-cyan shadow-[0_0_12px_#4CC9F0]" />
            {t('hero.eyebrow')}
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 dark:text-ink-50 sm:text-5xl lg:text-6xl">
            {t('hero.titleFirst')}{' '}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              {t('hero.titleSecond')}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-ink-300 sm:text-lg sm:leading-8">
            {t('hero.description')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={docsUrl}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-cyan px-5 py-3 text-sm font-bold text-ink-950 shadow-[0_8px_28px_rgba(76,201,240,0.18)] transition-all hover:-translate-y-0.5 hover:bg-brand-cyanSoft"
            >
              {t('hero.docsCta')}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href={site.repo}
              className="inline-flex items-center gap-2 rounded-xl border border-line/10 bg-surface-overlay/[0.03] px-5 py-3 text-sm font-semibold text-ink-950 transition-colors hover:border-line/20 hover:bg-surface-overlay/[0.06] dark:text-ink-50"
            >
              <Github size={16} aria-hidden="true" />
              {t('hero.githubCta')}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-400">
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck size={15} className="text-brand-cyan" aria-hidden="true" />
              {t('hero.engine')}
            </span>
            <span>{t('hero.version', { version: site.version })}</span>
          </div>
        </div>

        <div className="animate-fade-in mx-auto w-full min-w-0 max-w-2xl lg:pl-2">
          <div className="relative w-full min-w-0 max-w-full rounded-2xl border border-line/10 bg-surface-elevated p-2 shadow-elevated backdrop-blur-xl">
            <div className="absolute -inset-px -z-10 rounded-2xl bg-brand-cyan/10 blur-xl" />
            <div className="min-w-0 max-w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#08111d]">
              <CodeSampleTabs
                tabs={codeTabs}
                tabsLabel={t('hero.codeTabsLabel')}
                copyLabel={t('hero.copyCode')}
                copiedLabel={t('hero.codeCopied')}
              />
              <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3 text-[11px] text-ink-500 sm:px-7">
                <span>{t('hero.codeCaption')}</span>
                <span className="font-sans">Python</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-400">
            <span className="size-1.5 rounded-full bg-brand-cyan" />
            {t('hero.engine')}
          </div>
        </div>
      </section>

      <section id="benchmarks" className="scroll-mt-20 border-y border-line/[0.07] bg-surface-overlay/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-line/[0.07] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-center justify-center gap-4 py-6 sm:py-8">
              <span className="text-3xl font-bold tracking-tight text-ink-950 dark:text-ink-50 sm:text-4xl">{metric.value}</span>
              <span className="max-w-24 text-xs leading-5 text-ink-400 sm:text-sm">{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="scroll-mt-16 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">{t('features.eyebrow')}</p>
            <h2 className="text-3xl font-bold tracking-tight text-ink-950 dark:text-ink-50 sm:text-4xl">{t('features.title')}</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-ink-400">{t('features.description')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = featureIcons[feature.icon];
            const content = featureContent(feature, locale);

            return (
              <article
                key={feature.slug}
                className="group rounded-2xl border border-line/[0.08] bg-surface-elevated p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line/15 hover:bg-surface-overlay/[0.025] sm:p-6"
              >
                <div className={`mb-5 flex size-11 items-center justify-center rounded-xl ring-1 ${accentStyles[feature.accent]}`}>
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.16em] text-ink-500">
                  {content.tagline}
                </p>
                <h3 className="text-lg font-semibold leading-6 text-ink-950 dark:text-ink-50">{content.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-400">{content.summary}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="modules" className="scroll-mt-16 border-y border-line/[0.07] bg-surface-section">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">{t('modules.eyebrow')}</p>
            <h2 className="text-3xl font-bold tracking-tight text-ink-950 dark:text-ink-50 sm:text-4xl">{t('modules.title')}</h2>
            <p className="mt-4 text-sm leading-6 text-ink-400">{t('modules.description')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {modules.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-line/[0.07] bg-surface-elevated p-6">
                <Icon size={21} className="mb-5 text-brand-cyan" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="font-semibold text-ink-950 dark:text-ink-50">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="getting-started" className="scroll-mt-16 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="callout-panel relative overflow-hidden rounded-3xl border px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:px-14">
          <div className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full bg-brand-cyan/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">{t('start.eyebrow')}</p>
            <h2 className="text-3xl font-bold tracking-tight text-ink-950 dark:text-ink-50 sm:text-4xl">{t('start.title')}</h2>
            <p className="mt-4 text-sm leading-6 text-ink-300">{t('start.description')}</p>
          </div>
          <div className="relative mt-7 flex shrink-0 flex-wrap gap-3 lg:mt-0 lg:pl-8">
            <a
              href={docsUrl}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-cyan px-5 py-3 text-sm font-bold text-ink-950 transition-colors hover:bg-brand-cyanSoft"
            >
              {t('start.docsCta')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              href={site.apiReference}
              className="inline-flex items-center gap-2 rounded-xl border border-line/15 px-5 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-surface-overlay/[0.06] dark:text-ink-50"
            >
              {t('start.apiCta')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer id="community" className="scroll-mt-16 border-t border-line/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div className="flex items-center gap-2 text-ink-300">
            <Sparkles size={16} className="text-brand-cyan" aria-hidden="true" />
            <span>{t('footer.madeFor')}</span>
          </div>
          <p>{t('footer.copyright', { year: new Date().getFullYear(), name: site.fullName })}</p>
          <a href={site.twitter} className="inline-flex items-center gap-1.5 transition-colors hover:text-ink-950 dark:hover:text-ink-50">
            {t('footer.community')}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </footer>
      </main>
    </NextIntlClientProvider>
  );
}