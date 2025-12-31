import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Truck, Clock, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface IndustryDetailProps {
    title: string;
    image: string;
    description: string;
    features: { title: string; description: string }[];
    featuresDescription?: string;
    benefits: { title: string; description: string }[];
    benefitsDescription?: string;
}

const IndustryDetail: React.FC<IndustryDetailProps> = ({
    title,
    image,
    description,
    features,
    featuresDescription,
    benefits,
    benefitsDescription
}) => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section with Image */}
            <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
                        <button
                            onClick={() => navigate('/industry-solutions')}
                            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            {t('industries.backToSolutions')}
                        </button>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                            {title}
                        </h1>
                        <p className="text-xl text-slate-200 max-w-3xl font-medium">
                            {description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                        {t('industries.ourServicesFor', { title })}
                    </h2>
                    <p className="text-gray-600 text-lg mb-12 max-w-3xl">
                        {featuresDescription || t('industries.defaultFeaturesDesc', { title })}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
                            >
                                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-slate-900 font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                        {t('industries.whyChooseUs')}
                    </h2>
                    <p className="text-gray-600 text-lg mb-12 max-w-3xl">
                        {benefitsDescription || t('industries.experienceDifference')}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => {
                            const icons = [Truck, Clock, Shield];
                            const Icon = icons[index % icons.length];
                            return (
                                <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                    <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                        <Icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-gray-900 font-bold text-lg mb-3">{benefit.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IndustryDetail;
