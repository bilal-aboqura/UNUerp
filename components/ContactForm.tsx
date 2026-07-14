"use client";

import { FormEvent, useState } from "react";

export function ContactForm({ locale = "en" }: { locale?: "en" | "ar" }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [developmentDelivery, setDevelopmentDelivery] = useState(false);
  const arabic = locale === "ar";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (status === "submitting" || !form.reportValidity()) return;

    const values = new FormData(form);
    setStatus("submitting");
    setError("");
    void fetch("/api/demo-requests", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...Object.fromEntries(values),
        locale,
        sourcePage: window.location.pathname,
      }),
    })
      .then(async (response) => {
        const payload = (await response.json().catch(() => ({}))) as {
          message?: string;
          delivery?: string;
        };
        if (!response.ok) {
          throw new Error(
            arabic
              ? response.status === 429
                ? "تم إرسال طلبات كثيرة. يرجى المحاولة بعد بضع دقائق."
                : "تعذر إرسال طلبك. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة."
              : payload.message || "We could not send your request. Please try again.",
          );
        }
        setDevelopmentDelivery(payload.delivery === "development");
        form.reset();
        setStatus("success");
      })
      .catch((submissionError: unknown) => {
        setError(
          submissionError instanceof Error && submissionError.message
            ? submissionError.message
            : arabic
              ? "تعذر إرسال طلبك. يرجى المحاولة مرة أخرى."
              : "We could not send your request. Please try again.",
        );
        setStatus("error");
      });
  }

  if (status === "success")
    return (
      <section className="form-success" role="status" aria-live="polite">
        <span aria-hidden="true">✓</span>
        <h2>
          {arabic ? "تمت مراجعة بياناتك." : "Your details look complete."}
        </h2>
        <p>
          {arabic
            ? "تم إرسال طلبك. سيتواصل معك فريق UNU قريباً. وللتواصل المباشر، راسلنا على "
            : "Your request has been sent. The UNU team will be in touch soon. For direct contact, email "}
          <a href="mailto:info@unuerp.com">info@unuerp.com</a>
          {arabic ? " أو اتصل على " : " or call "}
          <a href="tel:+966112248822">+966 11 224 8822</a>.
        </p>
        {developmentDelivery && (
          <p className="form-development-note">
            {arabic
              ? "وضع التطوير: تم تسجيل الطلب محليًا ولم يتم إرساله إلى نظام إدارة العملاء."
              : "Development mode: this request was recorded locally and was not sent to a CRM."}
          </p>
        )}
        <button
          className="button secondary"
          type="button"
          onClick={() => setStatus("idle")}
        >
          {arabic ? "تعديل البيانات" : "Edit my details"}
        </button>
      </section>
    );

  return (
    <form onSubmit={submit} aria-busy={status === "submitting"}>
      <label>
        {arabic ? "الاسم الكامل" : "Full name"} <span aria-hidden="true">*</span>
        <input
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          placeholder={arabic ? "اسمك الكامل" : "Your name"}
        />
      </label>
      <label>
        {arabic ? "البريد الإلكتروني للعمل" : "Work email"} <span aria-hidden="true">*</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder={arabic ? "name@company.com" : "you@company.com"}
        />
      </label>
      <label>
        {arabic ? "الشركة" : "Company"} <span aria-hidden="true">*</span>
        <input
          name="company"
          autoComplete="organization"
          required
          maxLength={150}
          placeholder={arabic ? "اسم الشركة" : "Company name"}
        />
      </label>
      <label>
        {arabic ? "القطاع" : "Industry"}
        <select name="industry" defaultValue="" required={arabic}>
          <option value="" disabled>
            {arabic ? "اختر القطاع" : "Select your industry"}
          </option>
          {(arabic
            ? ["التصنيع", "التجزئة", "الرعاية الصحية", "التقنية", "أخرى"]
            : ["Manufacturing", "Retail", "Healthcare", "Technology", "Other"]
          ).map((industry) => (
            <option key={industry}>{industry}</option>
          ))}
        </select>
      </label>
      <label className="wide">
        {arabic ? "ما الذي ترغب في تحسينه؟" : "What would you like to improve?"}
        <textarea
          name="message"
          rows={5}
          maxLength={2000}
          placeholder={
            arabic
              ? "مثال: تقليل العمل اليدوي أو ربط الفرق أو تحسين التقارير"
              : "For example: reduce manual work, connect teams, or improve reporting"
          }
        />
      </label>
      <p className="form-note wide">
        {arabic
          ? "الحقول المطلوبة مميزة بعلامة النجمة."
          : "Required fields are marked with an asterisk."}
      </p>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      {status === "error" && (
        <p className="form-error wide" role="alert">
          {error}
        </p>
      )}
      <button className="button wide" type="submit" disabled={status === "submitting"}>
        {status === "submitting"
          ? arabic
            ? "جارٍ إرسال الطلب…"
            : "Sending request…"
          : arabic
            ? "إرسال طلب العرض"
            : "Send my demo request"}
      </button>
    </form>
  );
}
