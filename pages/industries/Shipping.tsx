import React from 'react';
import IndustryDetail from '../../components/IndustryDetail';
import ShippingImg from '../../assets/industry-solutins/Shipping.jfif';
import { useLanguage } from '../../contexts/LanguageContext';

const Shipping: React.FC = () => {
    const { t } = useLanguage();
    return (
        <IndustryDetail
            title={t('industries.shipping.title')}
            image={ShippingImg}
            description={t('industries.shipping.description')}
            featuresDescription={t('industries.shipping.featuresDescription')}
            features={[
                {
                    title: t('industries.shipping.features.porttodoor.title'),
                    description: t('industries.shipping.features.porttodoor.description')
                },
                {
                    title: t('industries.shipping.features.container.title'),
                    description: t('industries.shipping.features.container.description')
                },
                {
                    title: t('industries.shipping.features.maritime.title'),
                    description: t('industries.shipping.features.maritime.description')
                },
                {
                    title: t('industries.shipping.features.customs.title'),
                    description: t('industries.shipping.features.customs.description')
                },
                {
                    title: t('industries.shipping.features.international.title'),
                    description: t('industries.shipping.features.international.description')
                },
                {
                    title: t('industries.shipping.features.dockside.title'),
                    description: t('industries.shipping.features.dockside.description')
                }
            ]}
            benefitsDescription={t('industries.shipping.benefitsDescription')}
            benefits={[
                {
                    title: t('industries.shipping.benefits.integration.title'),
                    description: t('industries.shipping.benefits.integration.description')
                },
                {
                    title: t('industries.shipping.benefits.dwelltime.title'),
                    description: t('industries.shipping.benefits.dwelltime.description')
                },
                {
                    title: t('industries.shipping.benefits.visibility.title'),
                    description: t('industries.shipping.benefits.visibility.description')
                }
            ]}
        />
    );
};

export default Shipping;
