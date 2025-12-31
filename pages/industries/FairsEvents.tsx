import React from 'react';
import IndustryDetail from '../../components/IndustryDetail';
import FairsEventsImg from '../../assets/industry-solutins/Fairs-& -Events.jfif';
import { useLanguage } from '../../contexts/LanguageContext';

const FairsEvents: React.FC = () => {
    const { t } = useLanguage();
    return (
        <IndustryDetail
            title={t('industries.fairsEvents.title')}
            image={FairsEventsImg}
            description={t('industries.fairsEvents.description')}
            featuresDescription={t('industries.fairsEvents.featuresDescription')}
            features={[
                {
                    title: t('industries.fairsEvents.features.booth.title'),
                    description: t('industries.fairsEvents.features.booth.description')
                },
                {
                    title: t('industries.fairsEvents.features.timecritical.title'),
                    description: t('industries.fairsEvents.features.timecritical.description')
                },
                {
                    title: t('industries.fairsEvents.features.setup.title'),
                    description: t('industries.fairsEvents.features.setup.description')
                },
                {
                    title: t('industries.fairsEvents.features.storage.title'),
                    description: t('industries.fairsEvents.features.storage.description')
                },
                {
                    title: t('industries.fairsEvents.features.international.title'),
                    description: t('industries.fairsEvents.features.international.description')
                },
                {
                    title: t('industries.fairsEvents.features.lastmile.title'),
                    description: t('industries.fairsEvents.features.lastmile.description')
                }
            ]}
            benefitsDescription={t('industries.fairsEvents.benefitsDescription')}
            benefits={[
                {
                    title: t('industries.fairsEvents.benefits.deadline.title'),
                    description: t('industries.fairsEvents.benefits.deadline.description')
                },
                {
                    title: t('industries.fairsEvents.benefits.professional.title'),
                    description: t('industries.fairsEvents.benefits.professional.description')
                },
                {
                    title: t('industries.fairsEvents.benefits.comprehensive.title'),
                    description: t('industries.fairsEvents.benefits.comprehensive.description')
                }
            ]}
        />
    );
};

export default FairsEvents;
