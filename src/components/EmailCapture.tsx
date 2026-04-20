import { useState, type FormEvent } from "react";

interface EmailCaptureProps {
  placeholder?: string;
  buttonLabel?: string;
}

export function EmailCapture({
  placeholder = "you@lab.org",
  buttonLabel = "Notify me",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="prose-body" style={{ color: "var(--teal-link)" }}>
        Thanks — we'll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
      <label htmlFor="email-capture" className="sr-only">
        Email address
      </label>
      <input
        id="email-capture"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="input-line flex-1"
      />
      <button type="submit" className="btn-pill-signal">
        {buttonLabel}
      </button>
    </form>
  );
}
