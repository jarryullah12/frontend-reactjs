import React from 'react';
import IndustryDetail from '../../components/IndustryDetail';
import ShopfittingImg from '../../assets/industry-solutins/Shopfitting.jfif';
import { useLanguage } from '../../contexts/LanguageContext';

const Shopfitting: React.FC = () => {
    const { t } = useLanguage();
    return (
        <IndustryDetail
            title={t('industries.shopfitting.title')}
            image={ShopfittingImg}
            description={t('industries.shopfitting.description')}
            featuresDescription={t('industries.shopfitting.featuresDescription')}
            features={[
                {
                    title: t('industries.shopfitting.features.fixture.title'),
                    description: t('industries.shopfitting.features.fixture.description')
                },
                {
                    title: t('industries.shopfitting.features.equipment.title'),
                    description: t('industries.shopfitting.features.equipment.description')
                },
                {
                    title: t('industries.shopfitting.features.installation.title'),
                    description: t('industries.shopfitting.features.installation.description')
                },
                {
                    title: t('industries.shopfitting.features.rollout.title'),
                    description: t('industries.shopfitting.features.rollout.description')
                },
                {
                    title: t('industries.shopfitting.features.secure.title'),
                    description: t('industries.shopfitting.features.secure.description')
                },
                {
                    title: t('industries.shopfitting.features.flexible.title'),
                    description: t('industries.shopfitting.features.flexible.description')
                }
            ]}
            benefitsDescription={t('industries.shopfitting.benefitsDescription')}
            benefits={[
                {
                    title: t('industries.shopfitting.benefits.coordinate.title'),
                    description: t('industries.shopfitting.benefits.coordinate.description')
                },
                {
                    title: t('industries.shopfitting.benefits.professional.title'),
                    description: t('industries.shopfitting.benefits.professional.description')
                },
                {
                    title: t('industries.shopfitting.benefits.expansion.title'),
                    description: t('industries.shopfitting.benefits.expansion.description')
                }
            ]}
        />
    );
};

export default Shopfitting;
