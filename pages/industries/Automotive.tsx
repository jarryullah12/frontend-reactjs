import React from 'react';
import IndustryDetail from '../../components/IndustryDetail';
import AutomotiveImg from '../../assets/industry-solutins/Automotive.jfif';
import { useLanguage } from '../../contexts/LanguageContext';

const Automotive: React.FC = () => {
    const { t } = useLanguage();
    return (
        <IndustryDetail
            title={t('industries.automotive.title')}
            image={AutomotiveImg}
            description={t('industries.automotive.description')}
            featuresDescription={t('industries.automotive.featuresDescription')}
            features={[
                {
                    title: t('industries.automotive.features.jit.title'),
                    description: t('industries.automotive.features.jit.description')
                },
                {
                    title: t('industries.automotive.features.temperature.title'),
                    description: t('industries.automotive.features.temperature.description')
                },
                {
                    title: t('industries.automotive.features.express.title'),
                    description: t('industries.automotive.features.express.description')
                },
                {
                    title: t('industries.automotive.features.secure.title'),
                    description: t('industries.automotive.features.secure.description')
                },
                {
                    title: t('industries.automotive.features.tracking.title'),
                    description: t('industries.automotive.features.tracking.description')
                },
                {
                    title: t('industries.automotive.features.dedicated.title'),
                    description: t('industries.automotive.features.dedicated.description')
                }
            ]}
            benefitsDescription={t('industries.automotive.benefitsDescription')}
            benefits={[
                {
                    title: t('industries.automotive.benefits.downtime.title'),
                    description: t('industries.automotive.benefits.downtime.description')
                },
                {
                    title: t('industries.automotive.benefits.inventory.title'),
                    description: t('industries.automotive.benefits.inventory.description')
                },
                {
                    title: t('industries.automotive.benefits.quality.title'),
                    description: t('industries.automotive.benefits.quality.description')
                }
            ]}
        />
    );
};

export default Automotive;
