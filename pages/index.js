import { Button, Circle } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/user.context";
import clientPromise from "../lib/mongodb";

export default function Home({ isConnected }) {
  const navigate = useRouter();
  const { user, fetchUser, logOutUser } = useContext(UserContext);

  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        console.log(`fetchedUser`, fetchedUser);
        // Redirecting them once fetched.
        // redirectNow();
      }
    }
  };

  useEffect(() => {
    loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="container">
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
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
          data-ad-slot="7748221138"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        {isConnected ? (
          <Circle bg={"#bada55"} size={18} />
        ) : (
          <Circle bg={"tomato"} size={18} />
        )}
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
        {!isEmpty(user) ? (
          <Button onClick={async () => await logOutUser()}>Log out</Button>
        ) : (
          <Button onClick={() => navigate.push("/sign-up")}>Sign Up</Button>
        )}
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
