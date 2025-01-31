import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>NMitB Games API</title>
        <meta
          name="description"
          content="An API for all the silly games (No) Money in the Bank play"
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
