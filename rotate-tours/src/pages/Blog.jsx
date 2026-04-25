import axios from "axios";
import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import BlogCard from "../components/BlogCard.jsx";
// import posts from "../data/blog.json";

export default function Blog() {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACK_END_URL + "/api/user/fetchBlog"
      );

      if (response.data.success) {
        setBlog(response.data.photos);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  if (loading) return <p className="text-center mt-10">Loading blog...</p>;

  return (
    <div className="space-y-12 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
      <SectionTitle
        eyebrow="Journal"
        title="Dispatches from our field team"
        description="Trip-planning advice, cultural context, and personal essays from our guides."
      />
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {blog.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
