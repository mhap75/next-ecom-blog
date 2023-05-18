import CommentForm from "@/components/CommentForm";
import { Card, Grid, Text, Link, Avatar, Button } from "@nextui-org/react";
import { useState } from "react";
const Comment = ({ comment }) => {
	const [showForm, setShowForm] = useState(false);
	const date = new Date(comment.createdAt);
	const options = { year: "numeric", month: "long", day: "numeric" };
	const formattedDate = date
		.toLocaleDateString("en-US", options)
		.replace(/(\d{4}),(.*)/, "$1,$2");


	return (
		<Card css={{ p: "$2" }}>
			<Card.Header>
				<Avatar
					src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
					size="lg"
				/>
				<Grid.Container css={{ pl: "$6" }}>
					<Grid xs={12}>
						<Text css={{ lineHeight: "$xs" }}>
							{comment.writer.name}
						</Text>
					</Grid>
					<Grid xs={12}>
						<Text css={{ color: "$accents8", fontSize: "0.8rem" }}>
							{formattedDate}
						</Text>
					</Grid>
				</Grid.Container>
			</Card.Header>
			<Card.Body css={{ py: "$2" }}>
				<Text>{comment.content}</Text>
			</Card.Body>
			<Card.Footer className="flex flex-col items-start gap-2">
				<Button
					className="text-blue-700 justify-start"
					onClick={() => setShowForm(!showForm)}
				>
					{!showForm ? "reply" : "cancel"}
				</Button>
				{showForm && <CommentForm setShowForm={setShowForm} postId={comment.postId} inquiryId={comment._id} />}
			</Card.Footer>
		</Card>
	);
};

export default Comment;
