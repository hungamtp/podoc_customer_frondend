import React, { ReactElement } from 'react';
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// NEXT.JS CUSTOM DOCUMENT
// https://nextjs.org/docs/advanced-features/custom-document

export default class MyDocument extends Document {
  // static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
  //   const sheet = new ServerStyleSheet();
  //   const originalRenderPage = ctx.renderPage;

  //   try {
  //     ctx.renderPage = () =>
  //     originalRenderPage({
  //       enhanceApp: (App) => (props) =>
  //         sheet.collectStyles(<App {...props} />),
  //     });

  //     const initialProps = await Document.getInitialProps(ctx);
  //     return {
  //       ...initialProps,
  //       styles: (
  //         <>
  //           {initialProps.styles}
  //           {sheet.getStyleElement()}
  //         </>
  //       ),
  //     };
  //   } finally {
  //     sheet.seal();
  //   }
  // }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <title>Mroki-shop</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <meta name="website" content="https://shreethemes.in" />
          <meta name="Version" content="v3.8.0" />

          <link rel="shortcut icon" href="asset/images/favicon.ico" />

          <link href="asset/css/bootstrap.min.css" rel="stylesheet" type="text/css" />

          <link href="asset/css/tobii.min.css" rel="stylesheet" type="text/css" />

          <link href="asset/css/materialdesignicons.min.css" rel="stylesheet" type="text/css" />
          <link rel="stylesheet" href="https://unicons.iconscout.com/release/v3.0.6/css/line.css" />

          <link rel="stylesheet" href="asset/css/tiny-slider.css" />

          <link href="asset/css/style.css" rel="stylesheet" type="text/css" id="theme-opt" />
          <link href="asset/css/colors/default.css" rel="stylesheet" id="color-opt" />
        </Head>
        <body>
          <Main />
          <NextScript />

          <script src="asset/js/bootstrap.bundle.min.js"></script>

          <script src="asset/js/tiny-slider.js "></script>

          <script src="asset/js/tobii.min.js "></script>

          <script src="asset/js/feather.min.js"></script>

          <script src="asset/js/switcher.js"></script>

          <script src="asset/js/plugins.init.js"></script>

          <script src="asset/js/app.js"></script>
        </body>
      </Html>
    );
  }
}
