import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ImagePlus, MessageSquareQuote, Pencil, Star, Trash2, X } from "lucide-react";

const initialForm = {
  name: "",
  message: "",
  location: "",
  rating: "",
  image: "",
};

const StarRating = ({ value = 0 }) => {
  if (!value) {
    return <span className="text-sm text-slate-400">No rating</span>;
  }

  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < value ? "fill-current" : "text-slate-200"}`}
        />
      ))}
    </div>
  );
};

const TestimonialForm = ({
  form,
  onChange,
  onSubmit,
  loading,
  submitLabel,
  title,
  description,
  imageFile,
  onImageChange,
  currentImage,
}) => (
  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
    <div className="border-b border-slate-100 px-6 py-5">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>

    <form onSubmit={onSubmit} className="grid gap-5 p-6 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Traveler name"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Location</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="City or country"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-slate-700">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          required
          rows="5"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-y"
          placeholder="Write the guest testimonial"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Rating</label>
        <select
          name="rating"
          value={form.rating}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">No rating</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Guest Image</label>
        <label className="flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 transition hover:border-blue-500 hover:bg-blue-50">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
            <ImagePlus className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">
              {imageFile ? imageFile.name : currentImage ? "Replace current image" : "Choose image from device"}
            </span>
            <span className="block text-xs text-slate-500">PNG, JPG, or WEBP up to 10MB</span>
          </span>
          <input type="file" accept="image/*" onChange={onImageChange} hidden />
        </label>
        {currentImage && !imageFile ? (
          <p className="mt-2 text-xs text-slate-500">Current image will stay unless you choose a new one.</p>
        ) : null}
      </div>

      <div className="md:col-span-2 flex justify-end border-t border-slate-100 pt-5">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  </div>
);

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editForm, setEditForm] = useState(initialForm);
  const [editImageFile, setEditImageFile] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const apiBaseUrl = `${import.meta.env.VITE_BACK_END_URL}/api/testimonials`;

  const authConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const fetchTestimonials = useCallback(async () => {
    try {
      setFetching(true);
      const response = await axios.get(apiBaseUrl);
      setTestimonials(Array.isArray(response.data.testimonials) ? response.data.testimonials : []);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error.response || error);
      setTestimonials([]);
    } finally {
      setFetching(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files?.[0] || null);
  };

  const handleEditImageChange = (event) => {
    setEditImageFile(event.target.files?.[0] || null);
  };

  const buildTestimonialPayload = (values, photo) => {
    const payload = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        payload.append(key, value);
      }
    });

    if (photo) {
      payload.append("photo", photo);
    }

    return payload;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        apiBaseUrl,
        buildTestimonialPayload(form, imageFile),
        authConfig
      );

      if (response.data.success) {
        setTestimonials((current) => [response.data.testimonial, ...current]);
        setForm(initialForm);
        setImageFile(null);
      }
    } catch (error) {
      console.error("Failed to create testimonial:", error.response || error);
      alert(error.response?.data?.message || "Failed to create testimonial");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (testimonial) => {
    setEditingTestimonial(testimonial);
    setEditForm({
      name: testimonial.name || "",
      message: testimonial.message || "",
      location: testimonial.location || "",
      rating: testimonial.rating ?? "",
      image: testimonial.image || "",
    });
    setEditImageFile(null);
  };

  const closeEditModal = () => {
    setEditingTestimonial(null);
    setEditForm(initialForm);
    setEditImageFile(null);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!editingTestimonial) {
      return;
    }

    try {
      setEditLoading(true);
      const response = await axios.put(
        `${apiBaseUrl}/${editingTestimonial.id}`,
        buildTestimonialPayload(editForm, editImageFile),
        authConfig
      );

      if (response.data.success) {
        setTestimonials((current) =>
          current.map((testimonial) =>
            testimonial.id === editingTestimonial.id ? response.data.testimonial : testimonial
          )
        );
        closeEditModal();
      }
    } catch (error) {
      console.error("Failed to update testimonial:", error.response || error);
      alert(error.response?.data?.message || "Failed to update testimonial");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (testimonialId) => {
    const shouldDelete = window.confirm("Delete this testimonial?");

    if (!shouldDelete) {
      return;
    }

    try {
      await axios.delete(`${apiBaseUrl}/${testimonialId}`, authConfig);
      setTestimonials((current) => current.filter((testimonial) => testimonial.id !== testimonialId));
    } catch (error) {
      console.error("Failed to delete testimonial:", error.response || error);
      alert(error.response?.data?.message || "Failed to delete testimonial");
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Manage Testimonials</h1>
        <p className="text-sm text-slate-500">
          Add and maintain the testimonials that appear instantly on the public website.
        </p>
      </div>

      <TestimonialForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Add Testimonial"
        title="Add New Testimonial"
        description="Only admins can create testimonials. Published entries appear live right away."
        imageFile={imageFile}
        onImageChange={handleImageChange}
      />

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <MessageSquareQuote className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Current Testimonials</h2>
            <p className="text-sm text-slate-500">Edit or remove existing guest stories.</p>
          </div>
        </div>

        {fetching ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            Loading testimonials...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No testimonials yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Guest
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Added
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {testimonials.map((testimonial) => (
                    <tr key={testimonial.id} className="align-top">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-500">
                              {testimonial.name?.slice(0, 1)?.toUpperCase() || "T"}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-900">{testimonial.name}</p>
                            <p className="text-sm text-slate-500">
                              {testimonial.location || "Location not provided"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="max-w-md px-6 py-5 text-sm leading-6 text-slate-600">
                        {testimonial.message}
                      </td>
                      <td className="px-6 py-5">
                        <StarRating value={testimonial.rating} />
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500">
                        {testimonial.createdAt
                          ? new Date(testimonial.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(testimonial)}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(testimonial.id)}
                            className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {editingTestimonial ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="mx-auto flex min-h-full w-full max-w-3xl items-center">
            <div className="max-h-[calc(100vh-2rem)] w-full overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit Testimonial</h3>
                <p className="text-sm text-slate-500">Update the guest story and save changes.</p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

              <div className="max-h-[calc(100vh-7rem)] overflow-y-auto p-6">
              <TestimonialForm
                form={editForm}
                onChange={handleEditChange}
                onSubmit={handleEditSubmit}
                loading={editLoading}
                submitLabel="Save Changes"
                title="Update Testimonial"
                description="Keep featured stories current without leaving the dashboard."
                imageFile={editImageFile}
                onImageChange={handleEditImageChange}
                currentImage={editForm.image}
              />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminTestimonials;
