import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <article className="group glass-card rounded-3xl overflow-hidden flex flex-col">
      <div className="h-56 w-full bg-slate-100 overflow-hidden relative">
        <img
          src={post.image_url}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
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
