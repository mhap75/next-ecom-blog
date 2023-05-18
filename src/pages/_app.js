import "@/styles/globals.css";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import AuthProvider from "@/context/AuthContext";

const lightTheme = createTheme({
	type: "light",
});

const darkTheme = createTheme({
	type: "dark",
});

const progress = new ProgressBar({
	size: 3,
	color: "#117bf6",
	className: "bar-of-progress bg-gradient-to-r from-sky-600 to-violet-700",
	delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function App({ Component, pageProps }) {
	// 2. Use at the root of your app
	return (
		<AuthProvider>
			<NextThemesProvider
				defaultTheme="system"
				attribute="class"
				value={{
					light: lightTheme.className,
					dark: darkTheme.className,
				}}
			>
				<NextUIProvider>
					<Component {...pageProps} />
				</NextUIProvider>
			</NextThemesProvider>
		</AuthProvider>
	);
}

export default App;
