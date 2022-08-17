import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (content) => {
  const response = await fetch(`https://thatmeme.site/api/memes`);
  const { memes } = await response.json();

  const fields = memes.map((meme) => ({
    loc: `https://thatmeme.site/comments/${meme._id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(content, fields);
};

export default function Site() {}
