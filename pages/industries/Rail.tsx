import React from 'react';
import IndustryDetail from '../../components/IndustryDetail';
import RailImg from '../../assets/industry-solutins/Rail.jfif';
import { useLanguage } from '../../contexts/LanguageContext';

const Rail: React.FC = () => {
    const { t } = useLanguage();
    return (
        <IndustryDetail
            title={t('industries.rail.title')}
            image={RailImg}
            description={t('industries.rail.description')}
            featuresDescription={t('industries.rail.featuresDescription')}
            features={[
                {
                    title: t('industries.rail.features.component.title'),
                    description: t('industries.rail.features.component.description')
                },
                {
                    title: t('industries.rail.features.track.title'),
                    description: t('industries.rail.features.track.description')
                },
                {
                    title: t('industries.rail.features.maintenance.title'),
                    description: t('industries.rail.features.maintenance.description')
                },
                {
                    title: t('industries.rail.features.heavy.title'),
                    description: t('industries.rail.features.heavy.description')
                },
                {
                    title: t('industries.rail.features.sitespecific.title'),
                    description: t('industries.rail.features.sitespecific.description')
                },
                {
                    title: t('industries.rail.features.emergency.title'),
                    description: t('industries.rail.features.emergency.description')
                }
            ]}
            benefitsDescription={t('industries.rail.benefitsDescription')}
            benefits={[
                {
                    title: t('industries.rail.benefits.downtime.title'),
                    description: t('industries.rail.benefits.downtime.description')
                },
                {
                    title: t('industries.rail.benefits.heavy.title'),
                    description: t('industries.rail.benefits.heavy.description')
                },
                {
                    title: t('industries.rail.benefits.infrastructure.title'),
                    description: t('industries.rail.benefits.infrastructure.description')
                }
            ]}
        />
    );
};

export default Rail;
