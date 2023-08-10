import Layout from "@/containers/Layout";
import YouTube from "react-youtube";

export default function Home({ postsData, categories }) {
	return (
		<Layout>
			<YouTube
				videoId="_w0Ikk4JY7U"
				iframeClassName="rounded-lg overflow-hidden w-full h-full"
				className="h-full"
			/>
		</Layout>
	);
}
