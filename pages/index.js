import Head from "next/head";
import Script from "next/script";
import * as gtag from "../lib/gtag";

export default function Home() {
  const handleSubmit = (e) => {
    gtag.event({
      action: "submit_form",
      category: "Contact",
      label: "A Label",
    });
  };

  return (
    <div>
      <Head>
        <title>That Meme Site</title>
        <meta
          name="description"
          content="Browser latest memes on the internet"
        />
        <meta name="keywords" content="memes, meme, famouse memes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        async
        custom-element="amp-ad"
        src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
      />

      <main>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
          data-ad-slot="7748221138"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>

        <button onClick={handleSubmit}>Sign Up</button>
        <amp-ad
          width="100vw"
          height="320"
          type="adsense"
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
          data-ad-slot="7748221138"
          data-auto-format="rspv"
          data-full-width=""
        >
          <div overflow=""></div>
        </amp-ad>
      </main>
    </div>
  );
}
