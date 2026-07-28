import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArabicIndustryExplorer } from "@/components/ArabicIndustryExplorer";
import { EnglishIndustryExplorer } from "@/components/EnglishIndustryExplorer";

const addedIndustry = {
  slug: "example",
  name: "Example",
  summary: "A newly managed industry.",
};

describe("industry explorers", () => {
  it("shows industries added after the original catalog in English", () => {
    const items = Array.from({ length: 22 }, (_, index) => ({
      slug: `industry-${index + 1}`,
      name: `Industry ${index + 1}`,
      summary: "Industry summary",
    }));
    items[21] = addedIndustry;

    render(<EnglishIndustryExplorer items={items} />);

    expect(screen.getByRole("link", { name: /Example/ })).toHaveAttribute("href", "/industries/example");
  });

  it("shows industries added after the original catalog in Arabic", () => {
    const items = Array.from({ length: 22 }, (_, index) => ({
      slug: `industry-${index + 1}`,
      name: `قطاع ${index + 1}`,
      summary: "ملخص القطاع",
    }));
    items[21] = { ...addedIndustry, name: "مثال", summary: "قطاع مضاف حديثاً." };

    render(<ArabicIndustryExplorer items={items} />);

    expect(screen.getByRole("link", { name: /مثال/ })).toHaveAttribute("href", "/ar/industries/example");
  });
});
