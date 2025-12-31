import React from 'react';
import IndustryDetail from '../../components/IndustryDetail';
import WindPowerImg from '../../assets/industry-solutins/Wind-Power.jfif';
import { useLanguage } from '../../contexts/LanguageContext';

const WindPower: React.FC = () => {
    const { t } = useLanguage();
    return (
        <IndustryDetail
            title={t('industries.windPower.title')}
            image={WindPowerImg}
            description={t('industries.windPower.description')}
            featuresDescription={t('industries.windPower.featuresDescription')}
            features={[
                {
                    title: t('industries.windPower.features.blade.title'),
                    description: t('industries.windPower.features.blade.description')
                },
                {
                    title: t('industries.windPower.features.tower.title'),
                    description: t('industries.windPower.features.tower.description')
                },
                {
                    title: t('industries.windPower.features.nacelle.title'),
                    description: t('industries.windPower.features.nacelle.description')
                },
                {
                    title: t('industries.windPower.features.oversized.title'),
                    description: t('industries.windPower.features.oversized.description')
                },
                {
                    title: t('industries.windPower.features.sitespecific.title'),
                    description: t('industries.windPower.features.sitespecific.description')
                },
                {
                    title: t('industries.windPower.features.project.title'),
                    description: t('industries.windPower.features.project.description')
                }
            ]}
            benefitsDescription={t('industries.windPower.benefitsDescription')}
            benefits={[
                {
                    title: t('industries.windPower.benefits.specialized.title'),
                    description: t('industries.windPower.benefits.specialized.description')
                },
                {
                    title: t('industries.windPower.benefits.experts.title'),
                    description: t('industries.windPower.benefits.experts.description')
                },
                {
                    title: t('industries.windPower.benefits.sustainable.title'),
                    description: t('industries.windPower.benefits.sustainable.description')
                }
            ]}
        />
    );
};

export default WindPower;
