import http from "@/services/http";
import routerPush from "@/utils/routerPush";
import { Button, Card, Text, Textarea, useTheme } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

const CommentForm = ({ postId, inquiryId, setShowForm }) => {
	const { isDark } = useTheme();
	const [comment, setComment] = useState("");
	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			content: comment,
			postId,
			responseTo: inquiryId,
		};
		http.post("/post-comment/save-comment", data)
			.then(({ data }) => {
				toast.success(data.message);
				setComment("");
				if (setShowForm) setShowForm((stat) => !stat);
				routerPush(router);
			})
			.catch((error) => {
				toast.error(error.response.data.message);
			});
	};

	return (
		<Card isHoverable variant="bordered" css={{ mw: "100%" }}>
			<Card.Body>
				<Card.Header>
					<Text b>Write your comment</Text>
				</Card.Header>
				<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
					<Textarea
						bordered={isDark}
						width="100%"
						placeholder="Write your comment here"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<Button
						disabled={comment === ""}
						ghost
						className={`${
							isDark
								? "hover:bg-blue-900 hover:border-transparent"
								: "hover:bg-blue-600"
						}`}
						auto
						type="submit"
					>
						Submit
					</Button>
				</form>
			</Card.Body>
		</Card>
	);
};

export default CommentForm;
