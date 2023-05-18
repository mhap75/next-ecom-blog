import { Navbar, Text, Avatar, Dropdown } from "@nextui-org/react";
import Logo from "../assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Switch, useTheme } from "@nextui-org/react";
import SunIcon from "@/components/common/icons/SunIcon";
import MoonIcon from "@/components/common/icons/MoonIcon";
import { useTheme as useNextTheme } from "next-themes";
import { useRouter } from "next/router";
import { useAuth, useAuthActions } from "@/context/AuthContext";

const Header = () => {
	const { setTheme } = useNextTheme();
	const { isDark } = useTheme();
	const { pathname } = useRouter();
	const router = useRouter();
	const { user, loading, error } = useAuth();
	const dispatch = useAuthActions();

	const navItems = [
		{ title: "Home", path: "/" },
		{ title: "Blog", path: "/blogs" },
		{ title: "Products", path: "/products" },
		{ title: "About", path: "/about" },
	];

	const collapseItems = [
		"Profile",
		"Activity",
		"My Settings",
		"Help & Feedback",
		"Log Out",
	];

	return (
		<header>
			<Navbar isCompact isBordered variant="sticky">
				<Navbar.Brand
					css={{
						"@xs": {
							w: "12%",
						},
					}}
				>
					<Navbar.Toggle showIn="xs" />
					<Link href="/" className="ms-2 md:ms-0">
						<Image width={50} src={Logo} alt="logo" />
					</Link>
				</Navbar.Brand>
				<Navbar.Content
					enableCursorHighlight
					activeColor="primary"
					hideIn="xs"
					variant="highlight"
				>
					{navItems.map((nav, i) => (
						<Navbar.Link
							as="div"
							key={i}
							isActive={
								i !== 0
									? pathname.startsWith(nav.path)
									: pathname === nav.path
							}
						>
							<Link href={nav.path} className="!h-auto">
								{nav.title}
							</Link>
						</Navbar.Link>
					))}
				</Navbar.Content>
				<Navbar.Content
					css={{
						"@xs": {
							w: "12%",
							jc: "flex-end",
						},
					}}
				>
					<Switch
						checked={isDark}
						iconOn={<MoonIcon />}
						iconOff={<SunIcon />}
						onChange={(e) =>
							setTheme(e.target.checked ? "dark" : "light")
						}
					/>
					<Dropdown placement="bottom-right">
						<Navbar.Item>
							<Dropdown.Trigger>
								<Avatar
									bordered={user ? 1 : 0}
									as="button"
									color={user ? "gradient" : "default"}
									size="md"
									src={
										user
											? "https://i.pravatar.cc/150?u=a042581f4e29026704d"
											: "https://lordicon.com/icons/wired/gradient/44-avatar-user-in-circle.svg"
									}
								/>
							</Dropdown.Trigger>
						</Navbar.Item>

						{user ? (
							<Dropdown.Menu
								aria-label="User menu actions"
								color="primary"
								onAction={(actionKey) => {
									if (actionKey === "logout") {
										dispatch({ type: "LOGOUT" });
										setTimeout(() => router.reload(), 1000);
									}
								}}
							>
								<Dropdown.Item
									key="profile"
									css={{ height: "$18" }}
								>
									<Text b color="inherit" css={{ d: "flex" }}>
										Signed in as
									</Text>
									<Text b color="inherit" css={{ d: "flex" }}>
										{user.email}
									</Text>
								</Dropdown.Item>
								<Dropdown.Item key="settings" withDivider>
									My Settings
								</Dropdown.Item>
								<Dropdown.Item
									key="help_and_feedback"
									withDivider
								>
									Help & Feedback
								</Dropdown.Item>
								<Dropdown.Item
									key="logout"
									withDivider
									color="error"
								>
									Log Out
								</Dropdown.Item>
							</Dropdown.Menu>
						) : (
							<Dropdown.Menu
								aria-label="User menu actions"
								color="primary"
								onAction={(actionKey) => {
									if (actionKey === "$.0") {
										router.push("/login");
									} else if (actionKey === "$.1") {
										router.push("/signup");
									}
								}}
							>
								<Dropdown.Item>Log in</Dropdown.Item>
								<Dropdown.Item>Sign up</Dropdown.Item>
							</Dropdown.Menu>
						)}
					</Dropdown>
				</Navbar.Content>
				<Navbar.Collapse>
					{navItems.map((nav, index) => (
						<Navbar.CollapseItem
							key={index}
							activeColor="primary"
							isActive={
								index !== 0
									? pathname.startsWith(nav.path)
									: pathname === nav.path
							}
						>
							<Link
								color="inherit"
								css={{
									minWidth: "100%",
								}}
								href={nav.path}
							>
								{nav.title}
							</Link>
						</Navbar.CollapseItem>
					))}
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
