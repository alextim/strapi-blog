/* eslint-disable no-console */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import GA from '@/components/GA';
import i18nextConfig from '../../next-i18next.config';

export default class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const host = ctx.req?.headers?.host;
    const isLocalHost = host?.split(':')[0] === 'localhost' ? 1 : 0;
    return {
      ...initialProps,
      isLocalHost,
    };
  }

  render() {
    // eslint-disable-next-line no-underscore-dangle
    const locale = this.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;
    const { isLocalHost } = this.props;
    const htmlLang = locale;
    return (
      <Html lang={htmlLang}>
        <Head>{!isLocalHost && <GA />}</Head>
        <body className={`locale-${locale} lang-${htmlLang}`}>
          <div>isLocalHost={isLocalHost}</div>
          <div>htmlLang={htmlLang}</div>
          <div>locale={locale}</div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
