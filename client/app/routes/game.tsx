import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "ExpertForms" },
        {
            name: "description",
            content: "A collection of Tools for building Content Moderation Systems",
        },
    ];
};

interface Post {}

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

const GET_ALL_POSTS = `
query GetPosts {
  getPosts {
    id
    title
    content
    cover_image
  }
}
`;



const API_URL = "http://server:4000/graphql";

export const loader: LoaderFunction = async () => {
    const response = await fetch("http://server:4000/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: GET_ALL_POSTS }),
    });

    if (!response.ok) {
        throw new Response("Failed to fetch posts", { status: 500 });
    }

    const { data } = await response.json();
    return json(data.getPosts);
};

export default function Index() {
    const posts = useLoaderData<typeof loader>();

    return (
        <div className="min-h-screen py-20 px-4">
            <h1 className="text-2xl font-bold mb-6">GraphQL Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="p-4 border rounded-lg shadow">
                        {post.cover_image && (
                            <img
                                src={post.cover_image}
                                alt={post.title}
                                className="w-full h-40 object-cover rounded"
                            />
                        )}
                        <h2 className="text-lg font-semibold mt-2">{post.title}</h2>
                        <p className="text-gray-700 mt-1">{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

