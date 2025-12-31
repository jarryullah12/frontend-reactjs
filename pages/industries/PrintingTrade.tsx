import React from 'react';
import IndustryDetail from '../../components/IndustryDetail';
import PrintingImg from '../../assets/industry-solutins/Printing-Trade.jfif';
import { useLanguage } from '../../contexts/LanguageContext';

const PrintingTrade: React.FC = () => {
    const { t } = useLanguage();
    return (
        <IndustryDetail
            title={t('industries.printingTrade.title')}
            image={PrintingImg}
            description={t('industries.printingTrade.description')}
            featuresDescription={t('industries.printingTrade.featuresDescription')}
            features={[
                {
                    title: t('industries.printingTrade.features.machinery.title'),
                    description: t('industries.printingTrade.features.machinery.description')
                },
                {
                    title: t('industries.printingTrade.features.paper.title'),
                    description: t('industries.printingTrade.features.paper.description')
                },
                {
                    title: t('industries.printingTrade.features.finished.title'),
                    description: t('industries.printingTrade.features.finished.description')
                },
                {
                    title: t('industries.printingTrade.features.climate.title'),
                    description: t('industries.printingTrade.features.climate.description')
                },
                {
                    title: t('industries.printingTrade.features.urgent.title'),
                    description: t('industries.printingTrade.features.urgent.description')
                },
                {
                    title: t('industries.printingTrade.features.multilocation.title'),
                    description: t('industries.printingTrade.features.multilocation.description')
                }
            ]}
            benefitsDescription={t('industries.printingTrade.benefitsDescription')}
            benefits={[
                {
                    title: t('industries.printingTrade.benefits.protect.title'),
                    description: t('industries.printingTrade.benefits.protect.description')
                },
                {
                    title: t('industries.printingTrade.benefits.deadline.title'),
                    description: t('industries.printingTrade.benefits.deadline.description')
                },
                {
                    title: t('industries.printingTrade.benefits.handling.title'),
                    description: t('industries.printingTrade.benefits.handling.description')
                }
            ]}
        />
    );
};

export default PrintingTrade;
