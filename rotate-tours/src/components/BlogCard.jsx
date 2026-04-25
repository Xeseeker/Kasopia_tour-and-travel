import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <article className="rounded-3xl overflow-hidden bg-white shadow-soft flex flex-col">
      <img
        src={post.image_url}
        alt={post.title}
        className="h-56 w-full object-cover"
        loading="lazy"
      />
      <div className="p-6 space-y-3 flex-1 flex flex-col">
        <h3 className="text-2xl font-display text-dusk">{post.title}</h3>
        <p className="text-slate-600 flex-1">{post.description}</p>

        <Link
          to={`/blog/${post.id}`}
          state={{ post }} // <-- pass the whole post object
          className="text-sm font-semibold text-brand-500 hover:text-brand-400"
        >
          Continue reading →
        </Link>
      </div>
    </article>
  );
}
