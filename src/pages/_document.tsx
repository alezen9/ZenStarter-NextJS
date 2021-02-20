import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

          <meta name='description' content='J.A.R.V.I.S.' />
          <meta name='keywords' content='Keywords' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-title' content='FutBob' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
          <meta name='application-name' content='FutBob' />
          <meta name='msapplication-tooltip' content='FutBob' />
          <meta name='msapplication-starturl' content='/' />
          <meta name='msapplication-tap-highlight' content='no' />
          {/* Icons */}
          <link rel='apple-touch-icon' type='image/png' sizes='192x192' href='/icons/icon-192x192.png' />
          <link rel='icon' type='image/png' sizes='256x256' href='/icons/icon-256x256.png' />
          <link rel='icon' type='image/png' sizes='384x384' href='/icons/icon-384x384.png' />
          <link rel='icon' type='image/png' sizes='512x512' href='/icons/icon-512x512.png' />
          <link rel='mask-icon' href='/icons/safari-pinned.svg' color='#5bbad5' />
          {/* Favicon */}
          <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
          <link rel='icon' href='/favicon.ico' type='image/x-icon' />
          {/* Manifest */}
          <link rel='manifest' href='/manifest.json' />
          {/* Other */}
          <meta name='apple-mobile-web-app-title' content='FutBob' />
          <meta name='application-name' content='FutBob' />
          <meta name='msapplication-TileColor' content='#00aba9' />
          <meta name='theme-color' content='#222' />
          {/* Fonts */}
          <link href='https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;700&display=swap' rel='stylesheet' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />

          <style global jsx>
            {`
							@font-face {
								font-family: Poppins;
								src: url('/fonts/Poppins/Poppins-Regular.ttf') format('truetype');
								font-display: swap;
							}

							@font-face {
								font-family: Poppins;
								src: url('/fonts/Poppins/Poppins-Bold.ttf') format('truetype');
								font-weight: bold;
								font-display: swap;
							}

							@font-face {
								font-family: Poppins;
								src: url('/fonts/Poppins/Poppins-Italic.ttf') format('truetype');
								font-style: italic;
								font-display: swap;
							}

							@font-face {
								font-family: Poppins;
								src: url('/fonts/Poppins/Poppins-BoldItalic.ttf') format('truetype');
								font-style: italic;
								font-weight: bold;
								font-display: swap;
							}

							#nprogress .bar {
								background: rgb(42, 156, 71) !important;
								background-color: rgb(42, 156, 71) !important;
							}

							#nprogress .spinner {
								display: none;
							}

							::-webkit-scrollbar {
								/* width: 4px; */
								width: 0;
								height: 4px;
							}

							::-webkit-scrollbar-track {
								background-color: transparent;
								-webkit-border-radius: 10px;
								border-radius: 10px;
							}

							::-webkit-scrollbar-thumb {
								-webkit-border-radius: 10px;
								border-radius: 10px;
								background: rgba(158, 158, 158, 0.5);
							}
							::-webkit-calendar-picker-indicator {
								filter: invert(50%);
							}
							@media all and (display-mode: standalone) {
								body::after {
									position: fixed;
									top: -80px;
									left: 0;
									width: 100vw;
									height: 80px;
									content: ' ';
									backdrop-filter: blur(20px);
									background-color: rgba(0, 0, 0, 0.3);
								}
								::-webkit-scrollbar {
									display: none;
								}
								::-webkit-scrollbar-track {
									display: none;
								}
								::-webkit-scrollbar-thumb {
									display: none;
								}
							}

							@media all and (max-width: 450px) {
								::-webkit-scrollbar {
									display: none;
								}
								::-webkit-scrollbar-track {
									display: none;
								}
								::-webkit-scrollbar-thumb {
									display: none;
								}
							}
						`}
          </style>
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  }
}
