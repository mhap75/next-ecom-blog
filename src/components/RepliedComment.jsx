import Comment from "@/containers/Comment";
import { useTheme } from "@nextui-org/react";

const RepliedComment = ({ comments, inquiryId }) => {
    const {isDark} = useTheme()
 	return comments.map(
		(comment) =>
			inquiryId === comment.responseTo && (
                <div className={`ms-4 mt-2 border-l ${isDark ? "border-l-slate-600" : "border-l-slate-300"} ps-2`} key={comment._id}>
                    <Comment comment={comment} />
                    <RepliedComment comments={comments} inquiryId={comment._id} />
                </div>
			)
	);
};

export default RepliedComment;
