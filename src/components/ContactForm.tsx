"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import PhoneInput from "react-phone-number-input/input"; // input-only: no dropdown
import "react-phone-number-input/style.css";
import Lottie from "lottie-react";

const Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Enter a valid email"),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  campaignType: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof Schema>;

const pillBase =
  "px-4 py-2 rounded-full border text-sm md:text-[15px] transition-colors";
const pillActive =
  "bg-gradient-to-r from-yellow-600 to-amber-500 text-white border-transparent";
const pillIdle = "bg-white/5 border-white/10 text-white/80 hover:bg-white/10";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailAnim, setEmailAnim] = useState<any | null>(null); // Lottie JSON

  // Load Lottie JSON at runtime from /public
  useEffect(() => {
    fetch("/lottie/email-sent.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(setEmailAnim)
      .catch(() => setEmailAnim(null));
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      campaignType: "",
      message: "",
    },
  });

  const selected = watch("campaignType");

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true); // Show success message if email is sent
      } else {
        alert(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section
        className="mx-auto max-w-2xl px-6 py-20 text-center relative z-10"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div className="mx-auto w-48">
          {emailAnim ? (
            <Lottie animationData={emailAnim} loop={false} autoplay />
          ) : (
            <div className="flex h-48 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-white/70" />
            </div>
          )}
        </div>
        <h3 className="mt-4 text-2xl font-bold">Email sent</h3>
        <p className="mt-2 text-white/70">
          Thanks! We’ll get back to you within 24 hours.
        </p>
        <button
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 hover:bg-white/10"
          onClick={() => setSuccess(false)}
        >
          <CheckCircle2 className="h-5 w-5" />
          Send another message
        </button>
      </section>
    );
  }

  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-6 py-16 md:py-20">
      {/* Soft premium background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 420px at 12% 0%, rgba(147,51,234,0.10), transparent 60%), radial-gradient(900px 420px at 88% 8%, rgba(99,102,241,0.08), transparent 62%)",
        }}
      />

      <h2 className="text-3xl md:text-4xl font-black tracking-tight">
        Get in{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
          Touch
        </span>
      </h2>
      <p className="mt-2 text-white/70">
        Tell us about your goals. We’ll recommend the fastest path to guaranteed
        coverage.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 rounded-2xl border border-yellow-600/40 bg-[#1a1200] p-6 md:p-8"
      >
        {/* Name row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-white/80">
              First Name*
            </label>
            <input
              {...register("firstName")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 outline-none focus:border-yellow-600"
              placeholder="Jane"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/80">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 outline-none focus:border-yellow-600"
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Email / Phone */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-white/80">Email*</label>
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 outline-none focus:border-yellow-600"
              placeholder="you@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/80">Phone</label>
            <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 focus-within:border-purple-500">
              <PhoneInput
                value={watch("phone") || ""}
                onChange={(v) => setValue("phone", v ?? "")}
                placeholder="+1 555 123 4567"
                className="w-full bg-transparent px-1 py-1.5 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Campaign type pills (optional) */}
        <div className="mt-6">
          <label className="mb-2 block text-sm text-white/80">
            What Type Of PR Campaign?
          </label>
          <div className="flex flex-wrap gap-2">
            {(["Personal", "Company", "Both"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setValue("campaignType", opt)}
                className={`${pillBase} ${
                  selected === opt ? pillActive : pillIdle
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Message (optional) */}
        <div className="mt-6">
          <label className="mb-1 block text-sm text-white/80">
            Goals / Message
          </label>
          <textarea
            {...register("message")}
            rows={5}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 outline-none focus:border-yellow-600"
            placeholder="Tell us what you want to achieve…"
          />
        </div>

        {/* Submit */}
        <div className="mt-8 flex items-center gap-3">
          <button
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-500 px-6 py-3 font-semibold shadow-[0_10px_30px_-10px_rgba(180,140,50,.55)] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              "Submit"
            )}
          </button>
          <span className="text-xs text-white/60">
            *Only First Name and Email are required
          </span>
        </div>
      </form>
    </section>
  );
}
