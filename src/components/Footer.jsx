import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">LUXE.</h3>
                        <p className="text-gray-400">
                            Premium fashion and lifestyle products delivered to your doorstep.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
                            <li><a href="/shop" className="hover:text-accent transition-colors">Shop</a></li>
                            <li><a href="/about" className="hover:text-accent transition-colors">About Us</a></li>
                            <li><a href="/contact" className="hover:text-accent transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                            <li><a href="/" className="hover:text-accent transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Mail className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} LUXE E-Commerce. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
