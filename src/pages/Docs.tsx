import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronDown,
  Search,
  BookOpen,
  BarChart2,
  Cpu,
  Lightbulb,
  Zap,
  HelpCircle,
  Code2,
  Settings,
  Clock,
  Info,
  AlertTriangle,
  CheckCircle,
  X,
} from 'lucide-react';
import { SEO } from '../components/SEO';

type BadgeVariant = 'new' | 'beta' | 'api' | 'deprecated';

interface Article {
  title: string;
  body: React.ReactNode;
}

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
}

function Badge({ variant, label }: { variant: BadgeVariant; label?: string }) {
  const styles: Record<BadgeVariant, string> = {
    new: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    beta: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    api: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    deprecated: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300',
  };
  const defaultLabel: Record<BadgeVariant, string> = {
    new: 'New',
    beta: 'Beta',
    api: 'API',
    deprecated: 'Deprecated',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${styles[variant]}`}>
      {label ?? defaultLabel[variant]}
    </span>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded-r-lg p-3 my-3 text-sm text-blue-800 dark:text-blue-300">
      <Info className="w-4 h-4 shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded-r-lg p-3 my-3 text-sm text-amber-800 dark:text-amber-300">
      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

function Step({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-4">
      <div className="w-6 h-6 rounded-full bg-[#4f39f6] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
        {num}
      </div>
      <div>
        <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{children}</p>
      </div>
    </div>
  );
}

function MetricGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 my-3">
      {items.map((m) => (
        <div key={m.label} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{m.label}</p>
          <p className="text-base font-semibold text-gray-900 dark:text-white">{m.value}</p>
        </div>
      ))}
    </div>
  );
}

function FaqBlock({ q, a }: { q: string; a: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-3">
      <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{q}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{a}</p>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-gray-900 dark:bg-black text-green-300 text-xs rounded-lg p-3 overflow-x-auto my-3 leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 my-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
          <CheckCircle className="w-4 h-4 text-[#4f39f6] shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const CATEGORIES: Category[] = [
  { id: 'getting-started', label: 'Getting started', icon: BookOpen },
  { id: 'seo-tools', label: 'SEO tools', icon: BarChart2 },
  { id: 'ai-tools', label: 'AI generators', icon: Cpu },
  { id: 'best-practices', label: 'Best practices', icon: Lightbulb },
  { id: 'performance', label: 'Performance', icon: Zap },
  { id: 'troubleshooting', label: 'Troubleshooting', icon: HelpCircle },
  { id: 'account', label: 'Account & billing', icon: Settings },
  { id: 'changelog', label: 'Changelog', icon: Clock },
];

const ARTICLES: Record<string, Article[]> = {
  'getting-started': [
    {
      title: 'Quick start guide',
      body: (
        <div>
          <Step num={1} title="Create an account">
            Sign up free to unlock all tools and save your progress. Track history and manage favorites from your dashboard.
          </Step>
          <Step num={2} title="Explore tools">
            Browse 100+ SEO and AI tools in the top navigation. Organized by category for quick access.
          </Step>
          <Step num={3} title="Upgrade for more">
            Pro and Enterprise plans unlock unlimited AI generation and deeper analytics. Visit the pricing page to compare.
          </Step>
          <Tip>Bookmark your most-used tools for one-click access from your dashboard.</Tip>
        </div>
      ),
    },
    {
      title: 'What is OptiSEO?',
      body: (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            OptiSEO is a comprehensive suite of digital marketing tools for SEO professionals, webmasters, and content creators. It centralizes keyword research, backlink checking, performance testing, and AI-powered content creation into one unified platform.
          </p>
          <MetricGrid items={[
            { label: 'Tools available', value: '100+' },
            { label: 'Uptime SLA', value: '99.9%' },
            { label: 'Support', value: '24 / 7' },
          ]} />
        </div>
      ),
    },
    {
      title: 'Navigating the dashboard',
      body: (
        <UL items={[
          <span key="1"><strong>Tool bar:</strong> access all 100+ tools by category from the top navigation.</span>,
          <span key="2"><strong>History:</strong> every analysis you run is saved under your history tab for 90 days.</span>,
          <span key="3"><strong>Favorites:</strong> star any tool to pin it to your sidebar for fast access.</span>,
        ]} />
      ),
    },
  ],

  'seo-tools': [
    {
      title: 'Website analyzer',
      body: (
        <div>
          <UL items={[
            <span key="1"><strong>SEO:</strong> checks meta tags, headings, and overall SEO health with prioritized improvement tasks.</span>,
            <span key="2"><strong>Speed:</strong> estimates FCP, LCP, and overall load times using our built-in performance suite.</span>,
            <span key="3"><strong>Visitors:</strong> simulated traffic estimates and geographic data based on domain history.</span>,
            <span key="4"><strong>Technology:</strong> detects frameworks, analytics, and software used by the site.</span>,
          ]} />
          <Tip>For JavaScript-rendered apps, ensure SSR is enabled — basic crawling parses static HTML only.</Tip>
        </div>
      ),
    },
    {
      title: 'Keyword tools',
      body: (
        <UL items={[
          <span key="1"><strong>Keyword density analyzer:</strong> avoid keyword stuffing by analyzing exact frequency and weight.</span>,
          <span key="2"><strong>Long-tail keyword generator:</strong> discover lower-competition phrases for niche audiences.</span>,
          <span key="3"><strong>Platform-specific discovery:</strong> keywords geared for Google, Amazon, YouTube, and Bing.</span>,
          <span key="4"><strong>Keyword clustering:</strong> group related keywords into topic clusters. <Badge variant="new" /></span>,
        ]} />
      ),
    },
    {
      title: 'Backlink checker',
      body: (
        <div>
          <UL items={[
            'View total referring domains and link counts.',
            'Filter by dofollow / nofollow, anchor text, and domain authority.',
            'Export results to CSV for reporting.',
          ]} />
          <Warn>Backlink data is refreshed weekly. For real-time data, use our API integration.</Warn>
        </div>
      ),
    },
    {
      title: 'Technical SEO scripts',
      body: (
        <UL items={[
          <span key="1"><strong>Robots.txt & sitemap generators:</strong> build required crawler files instantly.</span>,
          <span key="2"><strong>Schema generators:</strong> create JSON-LD schemas for FAQs, Local Businesses, and Reviews without code.</span>,
          <span key="3"><strong>Htaccess & minifiers:</strong> optimize server configs and compress code in seconds.</span>,
          <span key="4"><strong>Redirect checker:</strong> trace redirect chains and identify loops. <Badge variant="new" /></span>,
        ]} />
      ),
    },
  ],

  'ai-tools': [
    {
      title: 'AI content generation',
      body: (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Provide a clear prompt and target keywords — our AI generates SEO-optimized content in seconds.
          </p>
          <UL items={[
            <span key="1"><strong>AI blog generator:</strong> structured, SEO-friendly articles from simple topics.</span>,
            <span key="2"><strong>AI product descriptions:</strong> compelling e-commerce copy that converts.</span>,
            <span key="3"><strong>AI social media captions:</strong> tailored posts for Instagram, Twitter, and LinkedIn.</span>,
            <span key="4"><strong>AI paragraph rewriter:</strong> rewrite existing text to avoid duplicate content.</span>,
          ]} />
        </div>
      ),
    },
    {
      title: 'AI image alt text generator',
      body: (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Upload images or provide URLs and let the AI generate descriptive, keyword-rich alt text for accessibility and SEO. <Badge variant="beta" />
          </p>
          <UL items={[
            'Batch process up to 50 images at once on Pro plans.',
            'Customizable tone — technical, descriptive, or minimal.',
          ]} />
        </div>
      ),
    },
    {
      title: 'AI meta tag generator',
      body: (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Generate optimized title tags and meta descriptions for any page. Enter a URL or paste content and get multiple AI-generated variants.
          </p>
          <Tip>Use A/B variants to test which meta description drives higher CTR in Google Search Console.</Tip>
        </div>
      ),
    },
  ],

  'best-practices': [
    {
      title: 'Writing for SEO with OptiSEO',
      body: (
        <UL items={[
          <span key="1"><strong>Search intent:</strong> answer the user's implicit question. Use the Content Ideas Generator to brainstorm.</span>,
          <span key="2"><strong>Readability:</strong> keep sentences short. Use the Readability Checker to aim for an 8th-grade level.</span>,
          <span key="3"><strong>Internal linking:</strong> always link back to your pillar pages.</span>,
          <span key="4"><strong>Content freshness:</strong> update top-performing pages every 6–12 months to maintain rankings.</span>,
        ]} />
      ),
    },
    {
      title: 'Keyword research workflow',
      body: (
        <div>
          <Step num={1} title="Seed keywords">Start broad with your topic in the keyword generator.</Step>
          <Step num={2} title="Cluster">Group by semantic similarity using the keyword clustering tool.</Step>
          <Step num={3} title="Prioritize">Target low-competition, high-intent terms first.</Step>
          <Step num={4} title="Map to pages">Assign each cluster to a single page to avoid keyword cannibalization.</Step>
        </div>
      ),
    },
  ],

  'performance': [
    {
      title: 'Core web vitals optimization',
      body: (
        <div>
          <UL items={[
            <span key="1"><strong>LCP (largest contentful paint):</strong> optimize large hero images and server response times. Target under 2.5s.</span>,
            <span key="2"><strong>INP (interaction to next paint):</strong> minimize main-thread work and reduce third-party scripts. Target under 200ms.</span>,
            <span key="3"><strong>CLS (cumulative layout shift):</strong> define explicit width/height on images to prevent layout jumps. Target under 0.1.</span>,
          ]} />
          <MetricGrid items={[
            { label: 'Good LCP', value: '≤ 2.5s' },
            { label: 'Good INP', value: '≤ 200ms' },
            { label: 'Good CLS', value: '≤ 0.1' },
            { label: 'Good TTFB', value: '≤ 800ms' },
          ]} />
        </div>
      ),
    },
    {
      title: 'Image optimization guide',
      body: (
        <UL items={[
          'Use WebP or AVIF format — 30–50% smaller than JPEG.',
          <span key="1">Lazy-load below-the-fold images using the <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">loading="lazy"</code> attribute.</span>,
          <span key="2">Specify explicit <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">width</code> and <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">height</code> to prevent CLS.</span>,
          'Use our Image Compressor to reduce file size without quality loss.',
        ]} />
      ),
    },
  ],

  'troubleshooting': [
    {
      title: 'Frequently asked questions',
      body: (
        <div>
          <FaqBlock
            q="Why isn't the website analyzer catching my React app?"
            a="Basic crawling parses static HTML. Enable SSR or prerendering on your host so content is available without JavaScript execution."
          />
          <FaqBlock
            q="Are the AI generators plagiarizing?"
            a="No — AI models generate novel content based on training patterns. Use the Plagiarism Checker tool to verify uniqueness before publishing."
          />
          <FaqBlock
            q="Why are my keyword volume numbers different from other tools?"
            a="Volume estimates are modeled from multiple data sources. Treat them as relative indicators, not absolute counts."
          />
          <FaqBlock
            q="Can I use OptiSEO on my client's websites?"
            a="Yes. Agency and Enterprise plans allow unlimited website audits across multiple domains."
          />
        </div>
      ),
    },
  ],

  'account': [
    {
      title: 'Managing your subscription',
      body: (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Manage your subscription from the <strong>Settings</strong> page.
          </p>
          <UL items={[
            'Upgrade to Pro for unlimited AI tool usage, deep SEO audits, and priority support.',
            'Enterprise plans offer custom limits for agency-level demands.',
            'Cancel or pause anytime from the billing dashboard — no hidden fees.',
          ]} />
        </div>
      ),
    },
    {
      title: 'Team & seats',
      body: (
        <div>
          <UL items={[
            'Invite teammates from Settings → Team.',
            <span key="1"><strong>Admin</strong> (full access), <strong>Editor</strong> (tools + history), <strong>Viewer</strong> (read-only).</span>,
            'Usage is pooled across all seats.',
          ]} />
          <Tip>Enterprise plans support SSO (SAML 2.0) and custom domain login.</Tip>
        </div>
      ),
    },
  ],

  'changelog': [
    {
      title: 'May 2026',
      body: (
        <UL items={[
          <span key="1"><Badge variant="new" /> <strong>Keyword clustering tool</strong> — group keywords by semantic similarity automatically.</span>,
          <span key="2"><Badge variant="new" /> <strong>Redirect checker</strong> — trace full redirect chains and detect loops.</span>,
          <span key="3"><Badge variant="beta" /> <strong>Webhooks</strong> — receive analysis results via POST callbacks.</span>,
        ]} />
      ),
    },
    {
      title: 'April 2026',
      body: (
        <UL items={[
          <span key="1"><Badge variant="new" /> <strong>AI image alt text generator</strong> — batch generate descriptive alt text.</span>,
          'Website analyzer now supports JavaScript-rendered pages via headless browser on Pro plans.',
          'Backlink data freshness improved — now updated weekly (was monthly).',
        ]} />
      ),
    },
    {
      title: 'March 2026',
      body: (
        <UL items={[
          <span key="1"><Badge variant="new" /> <strong>AI meta tag generator</strong> — generate optimized title tags and meta descriptions.</span>,
          'API rate limits increased for Pro plans (600 req/hr, up from 300).',
          'Dark mode improvements across all tool pages.',
        ]} />
      ),
    },
  ],
};

function ArticleCard({ article, defaultOpen }: { article: Article; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
      >
        <span className="font-medium text-sm text-gray-900 dark:text-white">{article.title}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              {article.body}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Docs() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const results: { catId: string; article: Article }[] = [];
    for (const [catId, articles] of Object.entries(ARTICLES)) {
      for (const article of articles) {
        const titleMatch = article.title.toLowerCase().includes(q);
        if (titleMatch) results.push({ catId, article });
      }
    }
    return results;
  }, [searchQuery]);

  const currentArticles = ARTICLES[activeCategory] ?? [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900/50">
      <SEO
        title="Documentation - OptiSEO"
        description="Learn how to use OptiSEO's comprehensive suite of SEO and AI tools."
      />

      {/* ── Header ── */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Documentation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-6"
          >
            Everything you need to know about using OptiSEO
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-md mx-auto"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">

          {/* ── Sidebar ── */}
          <aside className="w-full md:w-60 shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-3 mb-2">
                Categories
              </p>
              <nav className="space-y-0.5">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id && !searchQuery;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 text-left ${
                        isActive
                          ? 'bg-[#4f39f6] text-white shadow-md shadow-[#4f39f6]/20'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-sm font-medium">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`} />
                        {cat.label}
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ── Content ── */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {searchResults !== null ? (
                /* ── Search results ── */
                <motion.div
                  key="search"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Search className="w-4 h-4 text-[#4f39f6]" />
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                      {searchResults.length > 0
                        ? `${searchResults.length} result${searchResults.length > 1 ? 's' : ''} for "${searchQuery}"`
                        : `No results for "${searchQuery}"`}
                    </h2>
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-10 text-center">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Try a different keyword or browse the categories on the left.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {searchResults.map(({ catId, article }, idx) => {
                        const cat = CATEGORIES.find((c) => c.id === catId);
                        return (
                          <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="px-5 pt-4 pb-1 flex items-center gap-2">
                              {cat && <cat.icon className="w-3.5 h-3.5 text-[#4f39f6]" />}
                              <span className="text-xs text-[#4f39f6] font-medium">{cat?.label}</span>
                            </div>
                            <ArticleCard article={article} defaultOpen />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              ) : (
                /* ── Category view ── */
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Category header */}
                  {(() => {
                    const cat = CATEGORIES.find((c) => c.id === activeCategory);
                    const Icon = cat?.icon;
                    return (
                      <div className="flex items-center gap-2 mb-4">
                        {Icon && <Icon className="w-5 h-5 text-[#4f39f6]" />}
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{cat?.label}</h2>
                        <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
                          {currentArticles.length} article{currentArticles.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    );
                  })()}

                  <div className="space-y-2">
                    {currentArticles.map((article, idx) => (
                      <ArticleCard key={idx} article={article} defaultOpen={idx === 0} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
