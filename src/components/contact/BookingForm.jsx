// src/components/contact/BookingForm.jsx
import React, { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { services } from "../../data/services";
import {
  isRequired,
  isValidPhone,
  isValidEmail,
} from "../../utils/validation";
import {
  createBookingWhatsAppMessage,
  createWhatsAppUrl,
} from "../../utils/whatsapp";

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
  location: "",
  service: "",
  message: "",
};

export default function BookingForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!isRequired(form.name)) next.name = "Please enter your name.";
    if (!isRequired(form.phone)) next.phone = "Please enter a phone number.";
    else if (!isValidPhone(form.phone)) next.phone = "Enter a valid phone number.";
    if (form.email && !isValidEmail(form.email)) next.email = "Enter a valid email.";
    if (!isRequired(form.eventType)) next.eventType = "Select an event type.";
    if (!isRequired(form.eventDate)) next.eventDate = "Pick an event date.";
    if (!isRequired(form.location)) next.location = "Event location is required.";
    if (!isRequired(form.service)) next.service = "Choose a service.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const url = createWhatsAppUrl(createBookingWhatsAppMessage(form));
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputCls = (field) =>
    `w-full rounded-xl bg-white px-4 py-3 text-brand-900 placeholder:text-brand-300 outline-none transition-all ${
      errors[field]
        ? "shadow-[inset_0_0_0_2px_#f43f5e,-2px_-2px_0_0_#f43f5e,2px_2px_0_0_#be123c]"
        : "shadow-[-2px_-2px_0_0_#c8a951,2px_2px_0_0_#7a6020,0_2px_8px_rgba(200,169,81,0.12)] focus:shadow-[-3px_-3px_0_0_#d4b44a,3px_3px_0_0_#5c4810,0_4px_16px_rgba(200,169,81,0.22)] focus:bg-[#fffdf5]"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="border-3d p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.name}>
          <input className={inputCls("name")} placeholder="Vignesh" value={form.name} onChange={set("name")} />
        </Field>

        <Field label="Phone" error={errors.phone}>
          <input className={inputCls("phone")} placeholder="+91 …" type="tel" value={form.phone} onChange={set("phone")} />
        </Field>

        <Field label="Email (optional)" error={errors.email}>
          <input className={inputCls("email")} placeholder="you@email.com" type="email" value={form.email} onChange={set("email")} />
        </Field>

        <Field label="Event type" error={errors.eventType}>
          <select className={inputCls("eventType")} value={form.eventType} onChange={set("eventType")}>
            <option value="">Select event type…</option>
            <option>Wedding</option>
            <option>Engagement / Pre-wedding</option>
            <option>Ceremony</option>
            <option>Baby shower / Kids</option>
            <option>Portrait session</option>
            <option>Event / Function</option>
            <option>Other</option>
          </select>
        </Field>

        <Field label="Event date" error={errors.eventDate}>
          <input className={inputCls("eventDate")} type="date" value={form.eventDate} onChange={set("eventDate")} />
        </Field>

        <Field label="Location" error={errors.location}>
          <input className={inputCls("location")} placeholder="City / venue" value={form.location} onChange={set("location")} />
        </Field>

        <Field label="Service" error={errors.service} className="sm:col-span-2">
          <select className={inputCls("service")} value={form.service} onChange={set("service")}>
            <option value="">Choose a service…</option>
            {services.map((s) => (
              <option key={s.id}>{s.title}</option>
            ))}
            <option>Not sure yet</option>
          </select>
        </Field>

        <Field label="Message" className="sm:col-span-2">
          <textarea
            className={`${inputCls("message")} min-h-28 resize-y`}
            placeholder="Tell us about your celebration…"
            value={form.message}
            onChange={set("message")}
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button type="submit" className="btn-dark flex-1 sm:flex-none">
          <Send size={17} /> Continue on WhatsApp
        </button>
        <span className="text-caption inline-flex items-center gap-1.5">
          <MessageCircle size={15} /> You'll be redirected to WhatsApp with your enquiry pre-filled.
        </span>
      </div>
    </form>
  );
}

function Field({ label, error, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-brand-800">{label}</span>
      {children}
      {error && (
        <span className="mt-1.5 block text-xs font-medium text-rose-600" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}