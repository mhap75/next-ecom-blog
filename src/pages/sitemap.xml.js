import axios from "axios";
import fs from "fs";

const Sitemap = () => {
	return null;
};

export default Sitemap;

export const getServerSideProps = async ({ res }) => {
	const BASE_URL = "http://localhost:3000";
	const API_URL = "http://localhost:5000/api/posts?page=1&limit=10";

	const staticPages = fs
		.readdirSync("src/pages")
		.filter((staticPage) => {
			return ![
				"api",
				"_app.js",
				"_document.js",
				"404.js",
				"sitemap.xml.jsx",
			].includes(staticPage);
		})
		.map((staticPagePath) => {
			return `${BASE_URL}/${staticPagePath.replace(/\.jsx?$/, "")}`;
		});

	const { data: posts } = await axios.get(API_URL);

	const dynamicPaths = posts.data.docs.map((post) => {
		return `${BASE_URL}/posts/${post.slug}`;
	});

	const allPaths = [...staticPages, ...dynamicPaths];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
		.map((url) => {
			return `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
      `;
		})
		.join("")}
</urlset>
`;

	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
};
