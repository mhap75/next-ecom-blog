import { Card, Col, Row, Button, Text, Avatar, Badge } from "@nextui-org/react";
import { IconContext } from "react-icons";
import { BiTimer, BiBookmarks, BiCommentDetail } from "react-icons/bi";
import { BsBookmarksFill } from "react-icons/bs";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import Link from "next/link";
import http from "@/services/http";
import routerPush from "@/utils/routerPush";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const BlogThumb = ({ className, postData }) => {
	const today = new Date();
	const thirtyDaysAgo = new Date().setDate(today.getDate() - 30);
	const createdAt = new Date(Date.parse(postData.createdAt));
	const router = useRouter();
	// const handleLike = useHandleLike()
	// const handleBookmark = useHandleBookmark()

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

	return (
		<Card
			className={className}
			css={{ w: "100%", h: "300px" }}
			isPressable
			isHoverable
		>
			<Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
				{createdAt > thirtyDaysAgo && (
					<Col>
						<Badge
							size="xs"
							variant="flat"
							disableOutline
							color="success"
						>
							NEW
						</Badge>
					</Col>
				)}
			</Card.Header>
			<Card.Body css={{ p: 0 }}>
				<Link
					href={`/posts/${postData.hashId}/${postData.slug}`}
					className="h-full"
				>
					<Card.Image
						src={postData.coverImage}
						width="100%"
						height="100%"
						objectFit="cover"
						alt="Card example background"
					/>
				</Link>
			</Card.Body>
			<Card.Footer
				isBlurred
				css={{
					position: "absolute",
					bgBlur: "#ffffff66",
					borderTop:
						"$borderWeights$light solid rgba(255, 255, 255, 0.2)",
					bottom: 0,
					zIndex: 1,
				}}
			>
				<Row>
					<Col>
						<Text h3 className="mb-2" weight="bold" color="#000">
							{postData.title}
						</Text>
						<div className="flex gap-2 items-center mb-2">
							<div className="flex w-min gap-1 h-min items-center text-slate-700 text-xs rounded-full bg-slate-400 px-1.5 py-0.5">
								<IconContext.Provider
									value={{
										size: "1rem",
									}}
								>
									<BiTimer />
								</IconContext.Provider>
								<span>{postData.readingTime}</span>
								<span>min</span>
							</div>
							<Link
								block
								className="text-xs rounded-full bg-amber-200 bg-opacity-50 text-amber-800 font-semibold px-1.5 py-0.5"
								href={`/blogs/${postData.category.title}`}
							>
								{postData.category.title}
							</Link>
						</div>

						<div className="flex justify-between items-center gap-1">
							<div className="flex items-center gap-1">
								<Avatar
									size="sm"
									borderWeight="light"
									color="gradient"
									bordered
									src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
									zoomed
								/>
								<Text color="#000" size={12}>
									{postData.author.name}
								</Text>
							</div>

							<Button.Group
								size="xs"
								flat
								className="bg-blue-300 bg-opacity-50"
							>
								<IconContext.Provider value={{ size: "1rem" }}>
									<Button
										iconRight={
											postData.isLiked ? (
												<AiFillLike />
											) : (
												<AiOutlineLike />
											)
										}
										className="text-blue-600 hover:bg-blue-400"
										onClick={() => handleLike(postData._id)}
									>
										<span>{postData.likesCount}</span>
									</Button>
									<Button
										className="text-blue-600 hover:bg-blue-400"
										onClick={() =>
											handleBookmark(postData._id)
										}
									>
										{postData.isBookmarked ? (
											<BsBookmarksFill />
										) : (
											<BiBookmarks />
										)}
									</Button>
									<Button
										iconRight={<BiCommentDetail />}
										className="text-blue-600 hover:bg-blue-400"
									>
										<span>{postData.commentsCount}</span>
									</Button>
								</IconContext.Provider>
							</Button.Group>
						</div>
					</Col>
				</Row>
			</Card.Footer>
		</Card>
	);
};

export default BlogThumb;
