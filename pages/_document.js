import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap'
          />
          <link rel='shortcut icon' href='/favicon-32.ico' />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <meta
            name='google-site-verification'
            content='NShioP0pNjcp9d47f-Z5k9c7-RoM09pZit_vEMTIK8Q'
          />
          <meta
            name='naver-site-verification'
            content='02a0be4bf2a2a69426b969157ad67e83982350be'
          />
          {/* Iamport Start */}
          <script
            type='text/javascript'
            src='https://code.jquery.com/jquery-1.12.4.min.js'
          ></script>
          <script
            type='text/javascript'
            src='https://cdn.iamport.kr/js/iamport.payment-1.1.5.js'
          ></script>
          {/* Iamport End */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
