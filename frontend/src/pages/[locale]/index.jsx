// import qs from 'qs';
import React from 'react';
import { useTranslation } from 'next-i18next';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from '@/components/Link';

import { getStaticPaths, getI18nProps } from '../../lib/getStatic';

const baseUrl = process.env.BASE_URL || 'http://localhost:1337';

const fetchQuery = async (path, params = null) => {
  let url;
  if (params !== null) {
    url = `${baseUrl}/api/${path}/${params}`;
  } else {
    url = `${baseUrl}/api/${path}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const Homepage = ({ posts }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <main>
        <Header heading={t('h1')} title={t('title')} />
        <div>
          <Link href="/second-page">
            <button type="button">{t('to-second-page')}</button>
          </Link>
        </div>
        <ul>
          {posts?.map(({ attributes: { title } }) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default Homepage;

const getStaticProps = async (ctx) => {
  const i18n = await getI18nProps(ctx, ['common', 'footer']);
  const query = null;
  const posts = await fetchQuery('posts', query);

  return {
    props: {
      ...i18n,
      posts: posts ? posts.data : null,
    },
  };
};

export { getStaticPaths, getStaticProps };
