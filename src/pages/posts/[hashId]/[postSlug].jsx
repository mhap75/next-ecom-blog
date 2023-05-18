import Layout from "@/containers/Layout";
import { Avatar, Badge, Button, useTheme } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IconContext } from "react-icons";
import { BiBookmarks, BiLink } from "react-icons/bi";
import { BsBookmarksFill, BsCheckLg } from "react-icons/bs";
import { useState } from "react";
import BlogThumb from "@/components/BlogThumb";
import Comments from "@/components/Comments";
import http from "@/services/http";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import routerPush from "@/utils/routerPush";

const Post = ({ data }) => {
	const { isDark } = useTheme();
	const date = new Date(data.createdAt);
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const [isCopying, setIsCopying] = useState(false);
	const router = useRouter();

	const handleLike = (id) => {
		http.put(`posts/like/${id}`)
			.then(({ data }) => {
				routerPush(router);
				toast.success(data.message);
			})
			.catch((error) => {
				toast.error(error.response.data.message);
			});
	};

	const handleBookmark = (id) => {
		http.put(`posts/bookmark/${id}`)
			.then(({ data }) => {
				routerPush(router);
				toast.success(data.message);
			})
			.catch((error) => {
				toast.error(error.response.data.message);
			});
	};

	const copyToClipboard = () => {
		setIsCopying(true);
		const links = "http://localhost:3000" + `/${data.hashId}/${data.slug}`;
		navigator.clipboard.writeText(links);
		setTimeout(() => setIsCopying(false), 1500);
	};

	const formattedDate =
		monthNames[date.getUTCMonth()] + " " + date.getUTCFullYear();
	console.log(data);
	return (
		<Layout>
			<Head>
				<title>{data.title}</title>
				<meta name="description" content={data.briefText} />
			</Head>
			<article
				className={`${
					isDark
						? "prose-invert"
						: "prose-slate prose-headings:text-blue-950"
				} lg:prose-lg mx-auto prose prose-img:rounded-xl`}
			>
				<h1>{data.title}</h1>
				<img
					src={data.coverImage}
					alt={data.title}
					className="max-h-[400px] w-full"
				/>
				<div className="flex justify-between">
					<div className="text-sm mb-4 flex flex-col gap-2">
						<div className="flex items-center gap-1">
							<Avatar
								size="sm"
								src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
								zoomed
							/>
							{data.author.name} | {formattedDate}
						</div>
						<Link
							href={`/blogs/${data.category.title}`}
							className="my-1"
						>
							<Badge size="sm" variant="bordered">
								{data.category.title}
							</Badge>
						</Link>
					</div>
					<div>
						<IconContext.Provider value={{ size: "1.4rem" }}>
							<Button.Group size="xs" className="gap-4">
								<Button
									auto
									className="text-blue-400 hover:opacity-60"
									icon={
										data.isLiked ? (
											<AiFillLike />
										) : (
											<AiOutlineLike />
										)
									}
									onClick={() => handleLike(data._id)}
								/>
								<Button
									onClick={copyToClipboard}
									auto
									className={`${
										isCopying
											? "text-green-700"
											: "text-slate-500"
									} hover:opacity-60`}
									icon={
										isCopying ? <BsCheckLg /> : <BiLink />
									}
								/>
								<Button
									auto
									className="text-slate-500 hover:opacity-60"
									icon={
										data.isBookmarked ? (
											<BsBookmarksFill />
										) : (
											<BiBookmarks />
										)
									}
									onClick={() =>
											handleBookmark(data._id)
										}
								/>
							</Button.Group>
						</IconContext.Provider>
					</div>
				</div>
				<p>{data.text}</p>
			</article>

			{data.related.length > 0 && (
				<section>
					<h3 className="my-4 font-semibold">Related articles</h3>
					<div className="flex gap-2 flex-wrap">
						{data.related.map((post) => (
							<BlogThumb
								key={post._id}
								postData={post}
								className="max-w-xs"
							/>
						))}
					</div>
				</section>
			)}
			{/* COMMENTS */}
			<Comments data={data} isDark={isDark} />
		</Layout>
	);
};

export default Post;

export async function getServerSideProps(ctx) {
	const { query, req } = ctx;
	const { data } = await http.get(`/posts/${query.postSlug}`, {
		headers: {
			Cookie: req.headers.cookie || "",
		},
	});
	return {
		props: {
			data: data.data,
		},
	};
}
