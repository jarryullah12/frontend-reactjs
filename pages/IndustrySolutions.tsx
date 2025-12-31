import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

import AutomotiveImg from '../assets/industry-solutins/Automotive.jfif';
import ConstructionImg from '../assets/industry-solutins/Construction.jfif';
import FairsEventsImg from '../assets/industry-solutins/Fairs-& -Events.jfif';
import PackagingImg from '../assets/industry-solutins/Packaging.jfif';
import PrintingImg from '../assets/industry-solutins/Printing-Trade.jfif';
import RailImg from '../assets/industry-solutins/Rail.jfif';
import ShippingImg from '../assets/industry-solutins/Shipping.jfif';
import ShopfittingImg from '../assets/industry-solutins/Shopfitting.jfif';
import WindPowerImg from '../assets/industry-solutins/Wind-Power.jfif';
import AssemblyImg from '../assets/industry-solutins/Assembly.jfif';
import SpecialTripsImg from '../assets/industry-solutins/Special-Trips.jfif';

const IndustrySolutions: React.FC = () => {
    const { t } = useLanguage();

    const industries = [
        {
            id: 'automotive',
            title: t('industries.titles.automotive'),
            image: AutomotiveImg,
            description: t('industries.descriptions.automotive'),
            color: 'blue'
        },
        {
            id: 'construction',
            title: t('industries.titles.construction'),
            image: ConstructionImg,
            description: t('industries.descriptions.construction'),
            color: 'orange'
        },
        {
            id: 'fairs-events',
            title: t('industries.titles.fairsEvents'),
            image: FairsEventsImg,
            description: t('industries.descriptions.fairsEvents'),
            color: 'purple'
        },
        {
            id: 'packaging',
            title: t('industries.titles.packaging'),
            image: PackagingImg,
            description: t('industries.descriptions.packaging'),
            color: 'green'
        },
        {
            id: 'printing',
            title: t('industries.titles.printingTrade'),
            image: PrintingImg,
            description: t('industries.descriptions.printingTrade'),
            color: 'indigo'
        },
        {
            id: 'rail',
            title: t('industries.titles.rail'),
            image: RailImg,
            description: t('industries.descriptions.rail'),
            color: 'gray'
        },
        {
            id: 'shipping',
            title: t('industries.titles.shipping'),
            image: ShippingImg,
            description: t('industries.descriptions.shipping'),
            color: 'cyan'
        },
        {
            id: 'shopfitting',
            title: t('industries.titles.shopfitting'),
            image: ShopfittingImg,
            description: t('industries.descriptions.shopfitting'),
            color: 'yellow'
        },
        {
            id: 'wind-power',
            title: t('industries.titles.windPower'),
            image: WindPowerImg,
            description: t('industries.descriptions.windPower'),
            color: 'teal'
        },
        {
            id: 'assembly',
            title: t('industries.titles.assembly'),
            image: AssemblyImg,
            description: t('industries.descriptions.assembly'),
            color: 'red'
        },
        {
            id: 'special-trips',
            title: t('industries.titles.specialTrips'),
            image: SpecialTripsImg,
            description: t('industries.descriptions.specialTrips'),
            color: 'pink'
        }
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; icon: string; hover: string; border: string }> = {
            blue: { bg: 'bg-blue-50', icon: 'text-blue-600', hover: 'hover:border-blue-200', border: 'border-blue-100' },
            orange: { bg: 'bg-orange-50', icon: 'text-orange-600', hover: 'hover:border-orange-200', border: 'border-orange-100' },
            purple: { bg: 'bg-purple-50', icon: 'text-purple-600', hover: 'hover:border-purple-200', border: 'border-purple-100' },
            green: { bg: 'bg-green-50', icon: 'text-green-600', hover: 'hover:border-green-200', border: 'border-green-100' },
            indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', hover: 'hover:border-indigo-200', border: 'border-indigo-100' },
            gray: { bg: 'bg-gray-50', icon: 'text-gray-600', hover: 'hover:border-gray-200', border: 'border-gray-100' },
            cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', hover: 'hover:border-cyan-200', border: 'border-cyan-100' },
            yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600', hover: 'hover:border-yellow-200', border: 'border-yellow-100' },
            teal: { bg: 'bg-teal-50', icon: 'text-teal-600', hover: 'hover:border-teal-200', border: 'border-teal-100' },
            red: { bg: 'bg-red-50', icon: 'text-red-600', hover: 'hover:border-red-200', border: 'border-red-100' },
            pink: { bg: 'bg-pink-50', icon: 'text-pink-600', hover: 'hover:border-pink-200', border: 'border-pink-100' }
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-slate-900 py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        {t('industries.title')}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
                        {t('industries.subtitle')}
                    </p>
                    <p className="text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
                        {t('industries.heroDesc')}
                    </p>
                </div>
            </section>

            {/* Industries Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            {t('industries.serveTitle')}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
                            {t('industries.serveDesc')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {industries.map((industry) => {
                            const colors = getColorClasses(industry.color);

                            return (
                                <div
                                    key={industry.id}
                                    className={`bg-white rounded-3xl border ${colors.border} shadow-sm ${colors.hover} hover:shadow-xl transition-all duration-300 group overflow-hidden`}
                                >
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={industry.image}
                                            alt={industry.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4">
                                            <h3 className="text-2xl font-black text-white tracking-tight">
                                                {industry.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-6">

                                        {/* Description */}
                                        <p className="text-gray-600 text-sm leading-relaxed font-medium mb-6">
                                            {industry.description}
                                        </p>

                                        {/* Learn More Link */}
                                        <Link
                                            to={`/industry/${industry.id}`}
                                            className={`text-sm font-bold ${colors.icon} hover:underline flex items-center gap-2 group-hover:gap-3 transition-all`}
                                        >
                                            {t('industries.learnMore')}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IndustrySolutions;
