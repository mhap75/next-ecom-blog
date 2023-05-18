import Comment from "@/containers/Comment";
import CommentForm from "./CommentForm";
import RepliedComment from "./RepliedComment";

const Comments = ({ data }) => {
	return (
		<section className="mt-8">
			<h3 className="font-semibold mb-2">
				Comments ({data.commentsCount})
			</h3>
			<ul className="flex flex-col gap-4">
				{data.comments.map(
					(comment) =>
						!comment.responseTo && (
							<li key={comment._id}>
								<Comment comment={comment} />
								<RepliedComment
									comments={data.comments}
									inquiryId={comment._id}
								/>
							</li>
						)
				)}
			</ul>
			<CommentForm postId={data._id} inquiryId={null} />
		</section>
	);
};

export default Comments;
