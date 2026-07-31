import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FloatingWhatsapp, FooterSocialLinks } from "@/components/SocialLinks";

describe("managed communication links", () => {
  it("renders only enabled social links with valid URLs", () => {
    render(<FooterSocialLinks links={[
      { id: "one", platform: "linkedin", url: "https://linkedin.com/company/unu", enabled: true },
      { id: "two", platform: "facebook", url: "not-a-url", enabled: true },
      { id: "three", platform: "instagram", url: "https://instagram.com/unu", enabled: false },
    ]} />);
    const link = screen.getByRole("link", { name: "LinkedIn" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByRole("link", { name: "Facebook" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Instagram" })).not.toBeInTheDocument();
  });

  it("normalizes the WhatsApp URL and uses the Arabic physical-left position", () => {
    render(<FloatingWhatsapp locale="ar" settings={{ phone: "+966 11 224 8822", message: { en: "Hello", ar: "مرحباً" }, visible: true, position: "auto" }} />);
    const link = screen.getByRole("link", { name: "تواصل مع UNU عبر واتساب" });
    expect(link).toHaveClass("is-left");
    expect(link).toHaveAttribute("href", "https://wa.me/966112248822?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B");
  });
});
