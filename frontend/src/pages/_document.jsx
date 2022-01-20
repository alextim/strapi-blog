import Document, { Html, Head, Main, NextScript } from 'next/document';
import GA from '@/components/GA';

export default class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const {
      req: {
        headers: { host },
      },
    } = ctx;
    const isLocalHost = host.split(':')[0] === 'localhost' ? 1 : 0;
    return {
      ...initialProps,
      locale: ctx.locale,
      htmlLang: ctx.locale,
      isLocalHost,
    };
  }

  render() {
    const { htmlLang, locale, isLocalHost } = this.props;
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
