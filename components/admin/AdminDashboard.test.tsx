import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { cloneDefaultSiteContent } from "@/lib/site-content";

vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh: vi.fn() }) }));
vi.mock("@/lib/supabase/browser", () => ({ createSupabaseBrowserClient: () => null }));

describe("AdminDashboard management flows", () => {
  beforeEach(() => vi.spyOn(window, "confirm").mockReturnValue(true));

  it("creates, edits, publishes, reorders, and deletes a feature", async () => {
    const user = userEvent.setup();
    render(<AdminDashboard initialContent={cloneDefaultSiteContent()} initialMedia={[]} initialEnquiries={[]} adminEmail="admin@example.com" />);
    const navigation = screen.getByRole("navigation", { name: "Admin sections" });
    await user.click(within(navigation).getByRole("button", { name: "Features" }));
    await user.click(screen.getByRole("button", { name: "Add feature" }));
    await user.type(screen.getByLabelText("English name"), "Asset management");
    await user.type(screen.getByLabelText("الاسم بالعربية"), "إدارة الأصول");
    await user.click(screen.getByRole("button", { name: "Create feature" }));

    await user.click(screen.getByRole("checkbox", { name: "Published" }));
    const nameField = screen.getByLabelText("Name");
    await user.clear(nameField);
    await user.type(nameField, "Asset control");
    await user.click(screen.getByRole("button", { name: "Move up" }));
    expect(screen.getByRole("status")).toHaveTextContent("Feature order updated");

    await user.click(screen.getByRole("button", { name: "Delete feature" }));
    expect(screen.queryByRole("option", { name: "Asset management" })).not.toBeInTheDocument();
  });

  it("adds, edits, reorders, and deletes pricing plans and plan features", async () => {
    const user = userEvent.setup();
    render(<AdminDashboard initialContent={cloneDefaultSiteContent()} initialMedia={[]} initialEnquiries={[]} adminEmail="admin@example.com" />);
    const navigation = screen.getByRole("navigation", { name: "Admin sections" });
    await user.click(within(navigation).getByRole("button", { name: "Pricing" }));
    await user.click(screen.getByRole("button", { name: "Add plan" }));

    const planName = screen.getByLabelText("Plan name");
    await user.clear(planName);
    await user.type(planName, "Scale");
    await user.click(screen.getByRole("checkbox", { name: "Published" }));
    await user.click(screen.getByRole("button", { name: "Add feature" }));
    const featureField = screen.getByRole("textbox", { name: "Plan feature 1" });
    await user.clear(featureField);
    await user.type(featureField, "Multi-branch reporting");
    await user.click(screen.getByRole("button", { name: "Move up" }));
    expect(screen.getByRole("status")).toHaveTextContent("Unsaved changes");

    await user.click(screen.getByRole("button", { name: "Delete plan" }));
    expect(screen.queryByRole("option", { name: "Scale" })).not.toBeInTheDocument();
  });
});
