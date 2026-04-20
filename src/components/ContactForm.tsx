import { useState, type FormEvent } from "react";

/** Client-side-only inquiry form. No-op submit handler (no backend on GH Pages). */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Funding",
    message: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-10">
        <p className="prose-lead">Thank you.</p>
        <p className="prose-body mt-3">We'll respond within a few days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-6 max-w-[560px]">
      <div>
        <label htmlFor="name" className="mono-anchor block mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input-line"
        />
      </div>

      <div>
        <label htmlFor="email" className="mono-anchor block mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input-line"
        />
      </div>

      <div>
        <label htmlFor="topic" className="mono-anchor block mb-2">
          Inquiry type
        </label>
        <select
          id="topic"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          className="input-line"
        >
          {["Funding", "Partnership", "Fellowship", "Science", "Careers", "Other"].map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mono-anchor block mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input-line"
        />
      </div>

      <button type="submit" className="btn-pill-signal">
        Send message
      </button>
    </form>
  );
}
