/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-title-in-document-head */
import React, { ReactElement } from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          <meta name="website" content="https://shreethemes.in" />
          <meta name="Version" content="v3.8.0" />
          <meta
            name="google-signin-client_id"
            content="curious-subject-317901.apps.googleusercontent.com"
          />
          <link rel="shortcut icon" href="asset/images/favicon.ico" />

          <link
            href="asset/css/bootstrap.min.css"
            rel="stylesheet"
            type="text/css"
          />

          <link
            href="asset/css/tobii.min.css"
            rel="stylesheet"
            type="text/css"
          />

          <link
            href="asset/css/materialdesignicons.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            rel="stylesheet"
            href="https://unicons.iconscout.com/release/v3.0.6/css/line.css"
          />

          <link rel="stylesheet" href="asset/css/tiny-slider.css" />

          <link
            href="asset/css/style.css"
            rel="stylesheet"
            type="text/css"
            id="theme-opt"
          />
          <link
            href="asset/css/colors/default.css"
            rel="stylesheet"
            id="color-opt"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          ></link>
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
          <script
            src="https://apis.google.com/js/platform.js"
            async
            defer
          ></script>
          <script
            src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossOrigin="anonymous"
          ></script>
        </body>
      </Html>
    );
  }
}
