import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Script from "next/script";
import { useContext, useEffect } from "react";
import GlobalNavigation from "../components/Globals/Navbar/GlobalNavigation";
import PostOfMemes from "../components/Globals/Posts/PostOfMemes";
import {
  MemePostsContext,
  MemePostsProvider,
} from "../contexts/memePosts.context";
import { UserContext } from "../contexts/user.context";
import clientPromise from "../lib/mongodb";

export default function Home() {
  const { fetchUser } = useContext(UserContext);

  useEffect(() => {
    fetchUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>That Meme Site</title>
        <meta
          name="description"
          content="Search and Browser all latest and trending memes on the internet"
        />
        <meta
          name="keywords"
          content="memes, meme, famouse memes, trending memes, famous memes, latest memes, akshaykumar memes, akshay kumar memes"
        />
        <meta
          name="google-site-verification"
          content="dsQ1QoRqNSnuuc51fbNM17V0R_ZpHrx2fHxsuV_7cwc"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        ></script>
      </Head>
      <div>
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
        </Script>
      </div>

      <Script
        async
        custom-element="amp-ad"
        src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
      />

      <main>
        <MemePostsProvider>
          <Box transition="background-color 200ms linear">
            <GlobalNavigation />
            <PostOfMemes />
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
              data-ad-slot="7748221138"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>

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
          </Box>
        </MemePostsProvider>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
