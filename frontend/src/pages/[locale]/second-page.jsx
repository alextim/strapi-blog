import React from 'react';
import { useTranslation } from 'next-i18next';

import Link from '@/components/Link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

// eslint-disable-next-line react/function-component-definition
const SecondPage = () => {
  const { t } = useTranslation('second-page');

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <Link href="/">
          <button type="button">{t('common:back-to-home')}</button>
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default SecondPage;

const getStaticProps = makeStaticProps(['second-page', 'common', 'footer']);
export { getStaticPaths, getStaticProps };
