import React from 'react';
import IndustryDetail from '../../components/IndustryDetail';
import PackagingImg from '../../assets/industry-solutins/Packaging.jfif';
import { useLanguage } from '../../contexts/LanguageContext';

const Packaging: React.FC = () => {
    const { t } = useLanguage();
    return (
        <IndustryDetail
            title={t('industries.packaging.title')}
            image={PackagingImg}
            description={t('industries.packaging.description')}
            featuresDescription={t('industries.packaging.featuresDescription')}
            features={[
                {
                    title: t('industries.packaging.features.bulk.title'),
                    description: t('industries.packaging.features.bulk.description')
                },
                {
                    title: t('industries.packaging.features.roll.title'),
                    description: t('industries.packaging.features.roll.description')
                },
                {
                    title: t('industries.packaging.features.distribution.title'),
                    description: t('industries.packaging.features.distribution.description')
                },
                {
                    title: t('industries.packaging.features.inventory.title'),
                    description: t('industries.packaging.features.inventory.description')
                },
                {
                    title: t('industries.packaging.features.scheduled.title'),
                    description: t('industries.packaging.features.scheduled.description')
                },
                {
                    title: t('industries.packaging.features.flexible.title'),
                    description: t('industries.packaging.features.flexible.description')
                }
            ]}
            benefitsDescription={t('industries.packaging.benefitsDescription')}
            benefits={[
                {
                    title: t('industries.packaging.benefits.efficiency.title'),
                    description: t('industries.packaging.benefits.efficiency.description')
                },
                {
                    title: t('industries.packaging.benefits.storage.title'),
                    description: t('industries.packaging.benefits.storage.description')
                },
                {
                    title: t('industries.packaging.benefits.quality.title'),
                    description: t('industries.packaging.benefits.quality.description')
                }
            ]}
        />
    );
};

export default Packaging;
