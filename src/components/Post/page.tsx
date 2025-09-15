"use client";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchPosts() {
    setLoading(true);
    setPosts([]);

    // Запит до безкоштовного API
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    // Показуємо пости поступово (імітація стріму)
    for (let i = 0; i < data.length; i++) {
      setPosts(prev => [...prev, data[i]]);
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => setTimeout(resolve, 200)); // затримка між "чънками"
    }

    setLoading(false);
  }

  return (
    <div className="p-6">
      <button
        onClick={fetchPosts}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Завантажую..." : "Отримати пости"}
      </button>

      <div className="mt-6 space-y-4">
        {posts.map(post => (
          <div key={post.id} className="p-4 border rounded shadow">
            <h2 className="font-bold text-lg">{post.title}</h2>
            <p className="text-gray-700">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}