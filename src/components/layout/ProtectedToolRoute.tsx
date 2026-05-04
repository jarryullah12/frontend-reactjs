import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store';

const FREE_TRIAL_TOOLS = [
  '/tools/meta-tag-generator',
  '/tools/robots-txt-generator',
  '/tools/xml-sitemap-generator',
  '/tools/backlink-checker',
  '/tools/da-checker',
  '/tools/broken-link-checker',
  '/tools/schema-validator',
  '/tools/plagiarism-checker',
  '/tools/keyword-density',
  '/tools/website-analyzer',
  '/tools/content-analyzer',
  '/tools/css-minifier',
  '/tools/js-minifier',
  '/tools/ai-blog-generator',
  '/tools/ai-article-rewriter',
  '/tools/ai-product-description',
  '/tools/ai-content-ideas',
  '/tools/ai-sales-email',
  '/tools/ai-social-bio',
  '/tools/ai-social-caption',
  '/tools/keyword-suggestion-tool',
  '/tools/long-tail-keyword-generator',
  '/tools/page-authority-checker',
  '/tools/google-index-checker',
  '/tools/xml-sitemap-validator',
  '/tools/keyword-position-checker',
  '/tools/word-counter',
  '/tools/character-counter',
  '/tools/case-converter',
  '/tools/reverse-image-search',
  '/tools/image-compressor',
  '/tools/favicon-generator',
  '/tools/htaccess-generator',
  '/tools/ssl-checker',
  '/tools/what-is-my-ip',
  '/tools/server-status-checker',
  '/tools/website-screenshot',
  '/tools/url-rewriting-tool',
  '/tools/grammar-checker',
  '/tools/readability-checker',
  '/tools/md5-generator',
  '/tools/sha1-generator',
  '/tools/base64-encoder-decoder',
  '/tools/html-minifier',
  '/tools/json-formatter',
  '/tools/utm-builder',
  '/tools/open-graph-checker',
  '/tools/twitter-card-generator',
  '/tools/canonical-tag-generator',
  '/tools/http-headers-checker'
];

export function ProtectedToolRoute() {
  const { user, isAuthenticated, subscription } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user?.role === 'admin';
  
  // Check Free Trial
  const joinDate = user?.joinDate || user?.created_at;
  const trialDurationMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const isTrialActive = joinDate ? (new Date().getTime() - new Date(joinDate).getTime()) < trialDurationMs : false;

  // Check Subscription and Role
  const isPremiumActive = (subscription?.isActive && subscription?.plan === 'premium') || user?.role === 'premium';
  const isProActive = (subscription?.isActive && (subscription?.plan === 'pro' || subscription?.plan === 'lifetime' || subscription?.plan === 'lifetime pro')) || user?.role === 'pro' || user?.role === 'lifetime' || user?.role === 'lifetime pro';

  const isFreeTrialTool = FREE_TRIAL_TOOLS.includes(location.pathname);

  let isApproved = false;

  if (isAdmin || isProActive) {
    isApproved = true;
  } else if (isPremiumActive && isFreeTrialTool) {
    isApproved = true;
  } else if (isTrialActive && isFreeTrialTool) {
    isApproved = true;
  }

  if (!isApproved) {
    return <Navigate to="/pricing" replace />;
  }

  return <Outlet />;
}
