
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = document.cookie.split(';').find(c => c.trim().startsWith('cookie_consent='));
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    // Set cookie to expire in 1 year
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = "cookie_consent=true;" + expires + ";path=/";
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Cookie className="h-6 w-6 mr-3" />
          <p className="text-sm">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            <Link to="/privacy-policy" className="underline ml-2">Learn more</Link>
          </p>
        </div>
        <button
          onClick={acceptCookies}
          className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-dark transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
