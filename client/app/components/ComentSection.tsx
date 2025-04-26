import Comments from "./comments/Comments"
import AddComent from "./comments/AddComent"

import { useState, useEffect } from "react";

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


export default function ComentSection() {
  return (
    <div className="flex flex-col gap-4 bg-secondary p-4 shadow-lg">
      <AddComent />
      <Comments />
    </div>
  )
}
