const siteUrl = "https://thatmeme.site/";

module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}server-sitemap.xml`],
  },
};
