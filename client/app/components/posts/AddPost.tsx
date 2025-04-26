import { Link } from "@remix-run/react";
export default function AddPost() {
  return (
    <Link to="/add" className="flex flex-row  justify-center items-center gap-4 p-4 px-8 fixed bottom-4 right-4 bg-gradient-to-br from-accent to-complementary rounded-full shadow-2xl cursor-pointer hover:bg-gradient-to-r hover:from-complementary hover:to-accent hover:text-text text-text z-10 " >
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M13 4v7h7v2h-7v7h-2v-7H4v-2h7V4z"/></svg>
      Add Post
    </Link>
  )
}
