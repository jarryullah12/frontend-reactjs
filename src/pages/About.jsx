import { Award, Users, Globe } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white">
            <div className="relative bg-primary py-24 sm:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1574&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About LUXE.</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                        We are defining the future of retail with a curated collection of premium products, exceptional service, and a commitment to quality.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 text-primary">
                            <Award className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
                        <p className="text-gray-500">We source only the finest materials and products from top-tier designers and manufacturers.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 text-primary">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Customer First</h3>
                        <p className="text-gray-500">Our support team is available 24/7 to ensure your shopping experience is seamless and enjoyable.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 text-primary">
                            <Globe className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Global Shipping</h3>
                        <p className="text-gray-500">We ship to over 100 countries worldwide with fast, tracked delivery options.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
