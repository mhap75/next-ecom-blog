import Signup from "@/components/authentication/Signup";
import Layout from "@/containers/Layout";

export default function Home({ postsData, categories }) {
	return (
		<Layout>
			<Signup />
		</Layout>
	);
}
