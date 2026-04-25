import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle.jsx";
import Button from "../components/Button.jsx";
import { useLocation } from "react-router-dom";
//import posts from "../data/blog.json";

export default function BlogDetail() {
  const location = useLocation();
  const post = location.state?.post;
  // const { slug } = useParams();
  //const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="space-y-4 text-center">
        <SectionTitle
          eyebrow="Journal"
          title="Story not found"
          align="center"
        />
        <Button as={Link} to="/blog" className="mx-auto">
          Back to blog
        </Button>
      </div>
    );
  }

  return (
    <article className="space-y-8">
      <div className="h-96 w-full rounded-[32px] bg-slate-100 relative overflow-hidden flex items-center justify-center p-2">
        <img
          src={post.image_url}
          alt={post.title}
          className="max-h-full w-auto object-contain rounded-2xl shadow-sm"
        />
      </div>
      <SectionTitle eyebrow="Journal" title={post.title} />
      <p className="text-lg leading-relaxed text-slate-700">
        {post.description}
      </p>
    </article>
  );
}
