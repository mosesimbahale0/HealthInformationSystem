interface Comment {
  id: string;
  postId: string;
  sender: string;
  text: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

interface Reply {
  id: string;
  sender: string;
  text: string;
}




export default function Comments({ comments }: { comments: Comment[] }) {

  // Log the comments array to the console
  console.log("Comments component received the following comments:", comments);

    // Sort comments by created_at in descending order

  const sortedComments = comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  comments = sortedComments;
  

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-col">
          <div className="flex flex-wrap lg:flex-row gap-2">
            <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center shadow-lg text-text">
              <p className="text-xl">{comment.sender[0].toUpperCase()}</p>
            </div>
            <div className="flex flex-col gap-2 max-w-3/4">
              <p className="text-sm text-text  ">{comment.sender}</p>
              <p className="text-sm text-wrap max-w-full overflow-hidden text-text3 break-words">{comment.text}</p>
            </div>
          </div>
          {/* <div className="flex flex-col ml-20">
            {comment.replies.map((reply) => (
              <Replies key={reply.id} reply={reply} />
            ))}
          </div> */}
        </div>
      ))}
    </div>
  );
}


