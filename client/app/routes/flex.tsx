import AllPosts from "~/components/posts/AllPosts";
import AddPost from "~/components/posts/AddPost";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}

export async function loader() {
  try {
    // const response = await fetch(" http://localhost:9000/api/posts");
    const response = await fetch(
      "https://expertformsspringservice.onrender.com/api/posts"
    );
    if (!response.ok) {
      return json(
        { error: `Failed to fetch posts: ${response.statusText}` },
        { status: response.status }
      );
    }
    const posts: Post[] = await response.json();
    return json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return json({ error: "Could not load posts." }, { status: 500 });
  }
}

interface LoaderData {
  posts?: Post[];
  error?: string;
}

export default function Flex() {
  const { posts, error } = useLoaderData<LoaderData>();

  if (error) {
    return (
      <section className="bg-primary text-text min-h-screen flex  flex-col gap-6 items-center justify-center ">
        <p className="text-xl text-red-600">{error}</p>
        <p className="text-xs text-text3">
          Probably a network error or server issue. Please try refreshing the
          page. If the problem persists, please contact{" "}
          <a
            href="www.linkedin.com/in/moses-imbahale"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent  hover:uunde"
          >
            Support
          </a>{" "}
          .
        </p>
        <a
          href="/flex"
          className="text-accent hover:bg-accent hover:text-text justify-center items-center flex flex-row gap-2 p-4 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 13.5A7.5 7.5 0 1 1 11.5 6H20m0 0l-3-3m3 3l-3 3"
            />
          </svg>
          Try again
        </a>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <section className="bg-primary text-text min-h-screen flex items-center justify-center">
        <p className="text-xl">No posts available at the moment.</p>
        <AddPost />
      </section>
    );
  }

  return (
    <>
      <section className="bg-primary text-text">
        <div className="flex flex-col gap-8 min-h-screen   bg-primary py-20 container mx-auto ">
          <div className="flex flex-col gap-6 text-accent text-left w-full ">
            <p
              className="text-2xl font-medium "
              style={{ fontFamily: "Space Grotesk" }}
            ></p>

            <div className="flex flex-row gap-2  text-text">
              <p
                className="text-2xl font-medium "
                style={{ fontFamily: "Space Grotesk" }}
              >
                ShadowWrite: An anonymous blog demonstrating the capabilities of the
                Expert Forms project in action.
              </p>
            </div>

            <p className="text-sm text-text ">
              You can post & comment anonymously. All posts and comments are
              proactively moderated by
              <span>{" "}
                <a href="/" className="hover:underline">
                  ExpertForms
                </a>{" "}
              </span>{" "}
              &
              <a
                href="https://developer.chrome.com/docs/ai/built-in"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:underline text-accent "
              >
                {" "}
                Chremo Built In AI.{" "}
              </a>
            </p>
          </div>

          <p className="text-xs flex flex-row gap-2 mb-2">
            This Demo as of Nov 28th only works with
            <span className="text-xs text-accent hover:underline">
              <a href="https://www.google.com/chrome/canary/" target="_blank" rel="noopener noreferrer">Chrome Canary.</a>
            </span>
            &

            <span className="text-xs text-accent hover:underline">
              <a href="https://www.google.com/chrome/dev/?extra=devchannel" target="_blank" rel="noopener noreferrer">Chrome Dev channel.</a>
            </span>
          </p>



          {/* All Posts */}
          <AllPosts posts={posts} />
          {/* Create Post FAB */}
          <AddPost />
        </div>
      </section>
    </>
  );
}
