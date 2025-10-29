type Post = {
  userId?: number;
  id: number;
  title: string;
  body: string;
};

export default async function PostsPage() {
  // отримуємо дані на сервері
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Пости</h1>
      <ul className="space-y-2">
        {posts.slice(0, 10).map((post: Post) => (
          <li key={post.id} className="p-3 border rounded">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
