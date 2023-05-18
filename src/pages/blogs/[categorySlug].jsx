import BlogThumb from "@/components/BlogThumb";
import Layout from "@/containers/Layout";
import { Button, Card, Collapse, Text, useTheme } from "@nextui-org/react";
import Link from "next/link";
import http from "@/services/http";
import { IconContext } from "react-icons";
import { HiSortDescending } from "react-icons/hi";
import queryString from "query-string";
import { useRouter } from "next/router";
import { useState } from "react";
import routerPush from "@/utils/routerPush";
import { Pagination } from "@mui/material";

export default function Home({ postsData, categories }) {
	const { isDark } = useTheme();
	const router = useRouter();
	const [sort, setSort] = useState(router.query.sort);

	const sortOptions = [
		{ title: "View", id: "most" },
		{ title: "Popularity", id: "popular" },
		{ title: "Date", id: "newest" },
	];

	const handleSort = (sort) => {
		setSort(sort);
		router.query.sort = sort;
		routerPush(router);
	};

	const handlePageChange = (e, page) => {
		router.query.page = page;
		routerPush(router);
	};

	return (
		<Layout>
			<div className="grid gap-4 md:grid-cols-12 md:grid-rows-[min-content_minmax(300px,_1fr)]">
				{/* MOBILE CATEGORY SELECTOR */}
				<div className="md:hidden items-center flex gap-3 overflow-x-auto py-2">
					<Link href="/blogs" block color="primary">
						<Text
							color="primary"
							className={`${
								isDark
									? "hover:bg-blue-950"
									: "hover:bg-blue-200"
							} w-min hover:bg-opacity-70 rounded-full px-2.5`}
						>
							All
						</Text>
					</Link>
					{categories.map((category) => (
						<Link
							key={category._id}
							href={`/blogs/${category.title}`}
							className="my-1"
						>
							<Text
								color="primary"
								className={`${
									isDark
										? "hover:bg-blue-950"
										: "hover:bg-blue-200"
								} w-min hover:bg-opacity-70 rounded-full px-2.5`}
							>
								{category.title}
							</Text>
						</Link>
					))}
				</div>
				{/* CATEGORY COLUMN */}
				<div className="hidden md:block md:col-span-3 lg:col-span-2 md:row-span-2">
					<Card
						isHoverable
						variant="flat"
						className="border-none"
						css={{ background: `${isDark ? "gray50" : "$white"}` }}
					>
						<Collapse
							bordered
							title="Category"
							subtitle="Choose the blog category"
						>
							<div className="flex flex-col">
								{categories.map((category) => (
									<Link
										key={category._id}
										href={`/blogs/${category.title}`}
										className="my-1"
									>
										<Text
											color="primary"
											className={`${
												isDark
													? "hover:bg-blue-950"
													: "hover:bg-blue-200"
											} w-min hover:bg-opacity-70 rounded-full px-2.5 ${category.englishTitle === router.query.categorySlug ? !isDark ? "bg-blue-200" : "bg-blue-950" : ""}`}
										>
											{category.title}
										</Text>
									</Link>
								))}
							</div>
						</Collapse>
					</Card>
				</div>
				{/* SORT BAR */}
				<div className="hidden md:block md:col-span-9 lg:col-span-10">
					<Card isHoverable variant="bordered" css={{ mw: "100%" }}>
						<Card.Body>
							<div className="flex items-center gap-5">
								<div className="flex items-center gap-1">
									<IconContext.Provider
										value={{
											size: "1.5rem",
											style: { paddingTop: "3px" },
										}}
									>
										<HiSortDescending />
									</IconContext.Provider>
									<p>Sort by</p>
								</div>
								{sortOptions.map((option) => (
									<Button
										size="xs"
										key={option.id}
										className={`${
											isDark
												? "hover:bg-blue-950"
												: "hover:bg-blue-200"
										} text-base text-inherit w-min hover:bg-opacity-70 rounded-full px-2.5 ${
											option.id === router.query.sort
												? !isDark
													? "bg-blue-200"
													: "bg-blue-950"
												: ""
										}`}
										onClick={() => handleSort(option.id)}
									>
										{option.title}
									</Button>
								))}
							</div>
						</Card.Body>
					</Card>
				</div>
				{/* BLOG THUMBS */}
				<div className="md:col-span-9 lg:col-span-10 flex flex-col gap-10 items-center">
					<div className="grid grid-cols-6 gap-2">
						{postsData.docs.map((post) => (
							<BlogThumb
								className="col-span-6 md:col-span-3 lg:col-span-2"
								key={post._id}
								postData={post}
							/>
						))}
					</div>
					<Pagination
						classes={{
							root: `${
								isDark ? "bg-sky-300" : "bg-blue-100"
							} pt-2 rounded-lg`,
						}}
						onChange={handlePageChange}
						count={postsData.totalPages}
						color={isDark ? "standard" : "primary"}
						page={postsData.page}
					/>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { query, req } = context;
	const { data: result } = await http.get(
		`/posts?${queryString.stringify(query)}`,
		{
			headers: {
				Cookie: req.headers.cookie || "",
			},
		}
	);
	const { data: categories } = await http.get("/post-category");
	const { data } = result;
	return {
		props: {
			postsData: data,
			categories: categories.data,
		},
	};
}
