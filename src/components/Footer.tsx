import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { ArrowRight, Mail, MapPin, Phone, Calculator, Instagram, Film } from 'lucide-react';
=======
import { ArrowRight, Mail, MapPin, Phone, Calculator } from 'lucide-react';
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Calculators', path: '/calculators' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

<<<<<<< HEAD
const socialLinks = [
    { name: 'Instagram', path: 'https://www.instagram.com/jarryullah22/', icon: Instagram },
    { name: 'TikTok', path: 'https://www.tiktok.com/jarryullah22', icon: Film },
];

=======
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
export function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
<<<<<<< HEAD
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
=======
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
          {/* About Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-brand-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calculator className="h-5 w-5 text-brand-dark" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Finova<span className="text-brand-accent">Calc</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              A suite of free, professional financial calculators to help you make smarter financial decisions. From loans and investments to retirement planning, we have the tools you need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-white hover:underline underline-offset-4 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Calculators</h3>
            <ul className="space-y-3">
              {['EMI', 'Compound Interest', 'Mortgage', 'Retirement'].map((name) => (
                <li key={name}>
                  <Link to={`/calculators/${name.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-gray-400 hover:text-white hover:underline underline-offset-4 transition-colors">
                    {name} Calculator
                  </Link>
                </li>
              ))}
               <li>
                  <Link to="/calculators" className="text-sm font-semibold text-brand-accent hover:text-white transition-colors flex items-center gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                jarryullah46@gmail.com
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
<<<<<<< HEAD
                +923356471303
=======
                +923497034892
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                Bhutto calony Faisalabad, Pakistan
              </div>
            </div>
          </div>
<<<<<<< HEAD
          {/* Follow Us */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.path} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
=======
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center text-sm text-gray-400">
          <p>&copy; 2026 FinovaCalc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/terms-and-conditions" className="hover:text-white hover:underline underline-offset-4 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy-policy" className="hover:text-white hover:underline underline-offset-4 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/disclaimer" className="hover:text-white hover:underline underline-offset-4 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
