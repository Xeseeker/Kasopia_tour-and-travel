import { useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import Button from "../components/Button.jsx";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    travelMonth: "",
    groupSize: "",
    interest: "Adventure",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //       const res = await fetch("http://localhost:5000/api/contact", {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({
      //           name: form.name,
      //           email: form.email,
      //           message: `
      // Travel Month: ${form.travelMonth}
      // Group Size: ${form.groupSize}
      // Interest: ${form.interest}

      // ${form.message}
      //           `,
      //         }),
      //       });

      const response = await axios.post(
        import.meta.env.VITE_BACK_END_URL + "/api/contact",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Inquiry sent successfully!");
        setForm({
          name: "",
          email: "",
          travelMonth: "",
          groupSize: "",
          interest: "Adventure",
          message: "",
        });
      } else {
        alert("Failed to send inquiry.");
      }
    } catch (error) {
      alert("Server error. Please try again." + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="Contact"
        title="Let's design your Ethiopia journey"
        description="Fill the form and our travel architects will respond within one business day."
      />

      <div className="grid gap-10 md:grid-cols-2">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-soft space-y-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-600">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                required
                className="mt-2 w-full rounded-2xl border-slate-200"
                placeholder="Alem Kebede"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
                className="mt-2 w-full rounded-2xl border-slate-200"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Travel Month
              </label>
              <input
                name="travelMonth"
                value={form.travelMonth}
                onChange={handleChange}
                type="month"
                className="mt-2 w-full rounded-2xl border-slate-200"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Group Size
              </label>
              <input
                name="groupSize"
                value={form.groupSize}
                onChange={handleChange}
                type="number"
                min="1"
                className="mt-2 w-full rounded-2xl border-slate-200"
                placeholder="4"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">
              Interests
            </label>
            <select
              name="interest"
              value={form.interest}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border-slate-200"
            >
              <option>Adventure</option>
              <option>Culture</option>
              <option>Gastronomy</option>
              <option>Family</option>
              <option>Bespoke</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">
              Tell us about your dream trip
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              required
              className="mt-2 w-full rounded-3xl border-slate-200"
              placeholder="We'd love to..."
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center"
          >
            {loading ? "Sending..." : "Send inquiry"}
          </Button>
        </form>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-brand-500/10 p-8">
            <h3 className="text-2xl font-display text-dusk">Contact details</h3>
            <p className="mt-2 text-slate-600">Mon–Fri, 9am – 7pm EAT</p>
            <div className="mt-4 space-y-2 text-slate-600">
              <p>📧 kasopiaethiopiatour@gmail.com</p>
              <p>📞 +251 91 123 4567</p>
              <p>📍 Bole, Addis Ababa, Ethiopia</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-soft">
            <h4 className="text-lg font-semibold text-dusk">
              WhatsApp Concierge
            </h4>
            <p className="mt-2 text-slate-600">
              Message us for real-time availability and planning voice notes.
            </p>
            <Button
              as="a"
              href="https://wa.me/251911234567"
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="mt-4"
            >
              Open WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
