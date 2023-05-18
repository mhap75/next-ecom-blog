import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { useRouter } from "next/router";
import toSentenceCase from "@/utils/toSentenceCase";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@nextui-org/react";

const Layout = ({ children }) => {
	const { isDark } = useTheme()
	const router = useRouter()
	console.log(router.query);
	return (
		<div className="grid grid-rows-[min-content_1fr_min-content] min-h-screen">
			<Head>
				<title>Next App</title>
				<link rel="icon" href="./favicon.ico" />
			</Head>
			<Header />
			<main className="container px-4 mx-auto my-3">{children}</main>
			<Footer />
			<Toaster
				position="top-right"
				toastOptions={{
					success: {
						style: {
							background: `${isDark ? "#06371B" : "#E8FCF1"}`,
							color: `${isDark ? "white" : "black"}`,
						},
						iconTheme: {
							primary: "green",
							secondary: "#EDF5FF",
						},
					},
					error: {
						style: {
							background: `${isDark ? "#910838" : "#FEE7EF"}`,
							color: `${isDark ? "white" : "black"}`,
						},
						iconTheme: {
							primary: "#F31260",
							secondary: "#EDF5FF",
						},
					},
					loading: {
						style: {
							background: `${isDark ? "#00254D" : "#B7D5F8"}`,
							color: `${isDark ? "white" : "black"}`,
						},
						iconTheme: {
							primary: "#0072F5",
							secondary: "#EDF5FF",
						},
					},
				}}
			/>
		</div>
	);
};

export default Layout;
