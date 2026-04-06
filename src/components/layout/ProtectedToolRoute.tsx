import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store';

const FREE_TRIAL_TOOLS = [
  '/tools/website-analyzer',
  '/tools/keyword-density',
  '/tools/ai-blog-generator',
  '/tools/ai-article-rewriter',
  '/tools/backlink-checker',
  '/tools/plagiarism-checker',
  '/tools/ai-product-description',
  '/tools/da-checker',
  '/tools/keyword-suggestion-tool',
  '/tools/grammar-checker'
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
  const daysSinceJoin = joinDate ? Math.floor((new Date().getTime() - new Date(joinDate).getTime()) / (1000 * 3600 * 24)) : 0;
  const isTrialActive = daysSinceJoin <= 7;

  // Check Subscription
  const isPremiumActive = subscription?.isActive && subscription?.plan === 'premium';
  const isProActive = subscription?.isActive && (subscription?.plan === 'pro' || subscription?.plan === 'lifetime' || subscription?.plan === 'lifetime pro');

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
