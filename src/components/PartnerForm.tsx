"use client";

import { useState } from "react";
import { BUSINESS_TYPES, type PartnerLead } from "@/lib/leads";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<keyof PartnerLead | "_form", string[]>>;

const EMPTY: PartnerLead = {
  businessName: "",
  contactName: "",
  phone: "",
  email: "",
  city: "Hyderabad",
  businessType: "Restaurant",
  message: "",
};

const labelClass = "stamp mb-2 block text-husk/70";
const fieldClass =
  "w-full rounded-xl border border-stone bg-paper-deep/60 px-4 py-3 text-husk " +
  "placeholder:text-husk/40 transition outline-none " +
  "focus:border-leaf focus:ring-2 focus:ring-field/40";

export default function PartnerForm() {
  const [values, setValues] = useState<PartnerLead>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof PartnerLead>(key: K, value: PartnerLead[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setFormError(null);

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: {
        ok: boolean;
        demo?: boolean;
        errors?: FieldErrors;
      } = await res.json().catch(() => ({ ok: false }));

      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }

      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setFormError("Please fix the highlighted fields and try again.");
      } else {
        setFormError("Something went wrong on our end. Please try again.");
      }
      setStatus("error");
    } catch {
      setFormError("Network error. Please check your connection and retry.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-leaf/40 bg-field-soft/40 p-8 text-center"
      >
        <p className="stamp text-leaf">— Received</p>
        <h3 className="mt-3 font-display text-2xl font-bold text-field">
          Thanks — we&rsquo;ll be in touch.
        </h3>
        <p className="mt-2 text-husk/70">
          A member of our team will reach out shortly to set up your supply.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {formError && (
        <p
          role="alert"
          className="rounded-xl border border-citrus/50 bg-citrus/10 px-4 py-3 text-sm text-husk"
        >
          {formError}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          id="businessName"
          label="Business name"
          error={errors.businessName}
        >
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            className={fieldClass}
            placeholder="The Spice Room"
            value={values.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            aria-invalid={Boolean(errors.businessName)}
            required
          />
        </Field>

        <Field id="contactName" label="Your name" error={errors.contactName}>
          <input
            id="contactName"
            name="contactName"
            type="text"
            autoComplete="name"
            className={fieldClass}
            placeholder="Aarav Sharma"
            value={values.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            aria-invalid={Boolean(errors.contactName)}
            required
          />
        </Field>

        <Field id="phone" label="Phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="+91 98765 43210"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            required
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            placeholder="you@business.com"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            required
          />
        </Field>

        <Field id="city" label="City" error={errors.city}>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            className={fieldClass}
            placeholder="Hyderabad"
            value={values.city}
            onChange={(e) => update("city", e.target.value)}
            aria-invalid={Boolean(errors.city)}
            required
          />
        </Field>

        <Field
          id="businessType"
          label="Business type"
          error={errors.businessType}
        >
          <select
            id="businessType"
            name="businessType"
            className={`${fieldClass} appearance-none`}
            value={values.businessType}
            onChange={(e) =>
              update("businessType", e.target.value as PartnerLead["businessType"])
            }
            aria-invalid={Boolean(errors.businessType)}
            required
          >
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            id="message"
            label="Message (optional)"
            error={errors.message}
          >
            <textarea
              id="message"
              name="message"
              rows={4}
              className={`${fieldClass} resize-y`}
              placeholder="Tell us what you'd like to source, volumes, delivery windows…"
              value={values.message ?? ""}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={Boolean(errors.message)}
              maxLength={1000}
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-citrus px-8 py-3.5 font-semibold text-paper transition
          hover:brightness-95 focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-field focus-visible:ring-offset-2 focus-visible:ring-offset-paper
          disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request a partnership"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error && error.length > 0 && (
        <p className="mt-1.5 text-sm text-citrus" role="alert">
          {error[0]}
        </p>
      )}
    </div>
  );
}
