import React from 'react';
import IndustryDetail from '../../components/IndustryDetail';
import ConstructionImg from '../../assets/industry-solutins/Construction.jfif';
import { useLanguage } from '../../contexts/LanguageContext';

const Construction: React.FC = () => {
    const { t } = useLanguage();
    return (
        <IndustryDetail
            title={t('industries.construction.title')}
            image={ConstructionImg}
            description={t('industries.construction.description')}
            featuresDescription={t('industries.construction.featuresDescription')}
            features={[
                {
                    title: t('industries.construction.features.heavy.title'),
                    description: t('industries.construction.features.heavy.description')
                },
                {
                    title: t('industries.construction.features.materials.title'),
                    description: t('industries.construction.features.materials.description')
                },
                {
                    title: t('industries.construction.features.crane.title'),
                    description: t('industries.construction.features.crane.description')
                },
                {
                    title: t('industries.construction.features.scheduling.title'),
                    description: t('industries.construction.features.scheduling.description')
                },
                {
                    title: t('industries.construction.features.storage.title'),
                    description: t('industries.construction.features.storage.description')
                },
                {
                    title: t('industries.construction.features.multidrop.title'),
                    description: t('industries.construction.features.multidrop.description')
                }
            ]}
            benefitsDescription={t('industries.construction.benefitsDescription')}
            benefits={[
                {
                    title: t('industries.construction.benefits.schedule.title'),
                    description: t('industries.construction.benefits.schedule.description')
                },
                {
                    title: t('industries.construction.benefits.oversized.title'),
                    description: t('industries.construction.benefits.oversized.description')
                },
                {
                    title: t('industries.construction.benefits.flexible.title'),
                    description: t('industries.construction.benefits.flexible.description')
                }
            ]}
        />
    );
};

export default Construction;
