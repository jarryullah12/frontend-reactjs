import React from 'react';
import IndustryDetail from '../../components/IndustryDetail';
import SpecialTripsImg from '../../assets/industry-solutins/Special-Trips.jfif';
import { useLanguage } from '../../contexts/LanguageContext';

const SpecialTrips: React.FC = () => {
    const { t } = useLanguage();
    return (
        <IndustryDetail
            title={t('industries.specialTrips.title')}
            image={SpecialTripsImg}
            description={t('industries.specialTrips.description')}
            featuresDescription={t('industries.specialTrips.featuresDescription')}
            features={[
                {
                    title: t('industries.specialTrips.features.route.title'),
                    description: t('industries.specialTrips.features.route.description')
                },
                {
                    title: t('industries.specialTrips.features.oversized.title'),
                    description: t('industries.specialTrips.features.oversized.description')
                },
                {
                    title: t('industries.specialTrips.features.specialized.title'),
                    description: t('industries.specialTrips.features.specialized.description')
                },
                {
                    title: t('industries.specialTrips.features.escort.title'),
                    description: t('industries.specialTrips.features.escort.description')
                },
                {
                    title: t('industries.specialTrips.features.timesensitive.title'),
                    description: t('industries.specialTrips.features.timesensitive.description')
                },
                {
                    title: t('industries.specialTrips.features.unique.title'),
                    description: t('industries.specialTrips.features.unique.description')
                }
            ]}
            benefitsDescription={t('industries.specialTrips.benefitsDescription')}
            benefits={[
                {
                    title: t('industries.specialTrips.benefits.tailored.title'),
                    description: t('industries.specialTrips.benefits.tailored.description')
                },
                {
                    title: t('industries.specialTrips.benefits.expert.title'),
                    description: t('industries.specialTrips.benefits.expert.description')
                },
                {
                    title: t('industries.specialTrips.benefits.dedicated.title'),
                    description: t('industries.specialTrips.benefits.dedicated.description')
                }
            ]}
        />
    );
};

export default SpecialTrips;
