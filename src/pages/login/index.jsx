import Signin from "@/components/authentication/Signin";
import Layout from "@/containers/Layout";

export default function Home({ postsData, categories }) {
	return (
		<Layout>
			<Signin />
		</Layout>
	);
}
