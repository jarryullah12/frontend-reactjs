import React from 'react';
import IndustryDetail from '../../components/IndustryDetail';
import AssemblyImg from '../../assets/industry-solutins/Assembly.jfif';
import { useLanguage } from '../../contexts/LanguageContext';

const Assembly: React.FC = () => {
    const { t } = useLanguage();
    return (
        <IndustryDetail
            title={t('industries.assembly.title')}
            image={AssemblyImg}
            description={t('industries.assembly.description')}
            featuresDescription={t('industries.assembly.featuresDescription')}
            features={[
                {
                    title: t('industries.assembly.features.jit.title'),
                    description: t('industries.assembly.features.jit.description')
                },
                {
                    title: t('industries.assembly.features.parts.title'),
                    description: t('industries.assembly.features.parts.description')
                },
                {
                    title: t('industries.assembly.features.materials.title'),
                    description: t('industries.assembly.features.materials.description')
                },
                {
                    title: t('industries.assembly.features.sequenced.title'),
                    description: t('industries.assembly.features.sequenced.description')
                },
                {
                    title: t('industries.assembly.features.kitting.title'),
                    description: t('industries.assembly.features.kitting.description')
                },
                {
                    title: t('industries.assembly.features.realtime.title'),
                    description: t('industries.assembly.features.realtime.description')
                }
            ]}
            benefitsDescription={t('industries.assembly.benefitsDescription')}
            benefits={[
                {
                    title: t('industries.assembly.benefits.efficiency.title'),
                    description: t('industries.assembly.benefits.efficiency.description')
                },
                {
                    title: t('industries.assembly.benefits.downtime.title'),
                    description: t('industries.assembly.benefits.downtime.description')
                },
                {
                    title: t('industries.assembly.benefits.inventory.title'),
                    description: t('industries.assembly.benefits.inventory.description')
                }
            ]}
        />
    );
};

export default Assembly;
