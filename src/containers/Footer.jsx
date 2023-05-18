import { SendButton } from "@/components/common/icons/SendBtn";
import { Input, Link, Text, useTheme } from "@nextui-org/react";
import { RiMailSendFill } from "react-icons/ri";

const Footer = () => {
	const { isDark } = useTheme();


	return (
		<footer
			className={`grid grid-cols-1 p-10 ${isDark ? "bg-blue-950" : "bg-blue-200"} bg-opacity-70 md:grid-cols-2 lg:grid-cols-4 bg-base-200 text-base-content`}
		>
			<Text h4 className="flex flex-col gap-2">
				<Link className="link link-hover">Branding</Link>
				<Link className="link link-hover">Design</Link>
				<Link className="link link-hover">Marketing</Link>
				<Link className="link link-hover">Advertisement</Link>
			</Text>
			<Text h4 className="flex flex-col gap-2">
				<Link className="link link-hover">About us</Link>
				<Link className="link link-hover">Contact</Link>
				<Link className="link link-hover">Jobs</Link>
				<Link className="link link-hover">Press kit</Link>
			</Text>
			<Text h4 className="flex flex-col gap-2">
				<Link className="link link-hover">Terms of use</Link>
				<Link className="link link-hover">Privacy policy</Link>
				<Link className="link link-hover">Cookie policy</Link>
			</Text>
			<div>
				<div className="form-control w-80">
					<Text h3>Subscribe for Newsletter</Text>
					<div className="mt-2">
						<Input
							clearable
							contentRightStyling={false}
							placeholder="Type your message..."
							contentRight={
								<SendButton>
									<RiMailSendFill />
								</SendButton>
							}
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
