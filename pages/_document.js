import { Html, Head, Main, NextScript } from 'next/document'
/**
 * FONTS GO HERE
 */
export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400&family=Nanum+Gothic:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body id="body">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
