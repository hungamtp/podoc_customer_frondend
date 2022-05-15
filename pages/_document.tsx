/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-title-in-document-head */
import React, { ReactElement } from 'react';
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document';

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

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
