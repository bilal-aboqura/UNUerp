import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/ContactForm";

const successfulResponse = (): Promise<Response> =>
  Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }));

afterEach(() => vi.restoreAllMocks());

describe("ContactForm", () => {
  it("keeps required English fields invalid until completed", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(successfulResponse);
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send my demo request" }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Full name *")).toBeInvalid();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("submits, confirms, and restores the English form", async () => {
    const user = userEvent.setup();
    vi.spyOn(global, "fetch").mockImplementation(successfulResponse);
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Full name *"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Work email *"), "ada@example.com");
    await user.type(screen.getByLabelText("Company *"), "UNU Labs");
    await user.click(screen.getByRole("button", { name: "Send my demo request" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Your request has been sent");
    await user.click(screen.getByRole("button", { name: "Edit my details" }));
    expect(screen.getByRole("button", { name: "Send my demo request" })).toBeInTheDocument();
  });

  it("enforces Arabic requirements and completes the localized flow", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(successfulResponse);
    render(<ContactForm locale="ar" />);

    await user.click(screen.getByRole("button", { name: "إرسال طلب العرض" }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText("الاسم الكامل *")).toBeInvalid();

    await user.type(screen.getByLabelText("الاسم الكامل *"), "مستخدم تجريبي");
    await user.type(screen.getByLabelText("البريد الإلكتروني للعمل *"), "test@example.com");
    await user.type(screen.getByLabelText("الشركة *"), "شركة تجريبية");
    await user.selectOptions(screen.getByLabelText("القطاع"), "التقنية");
    await user.click(screen.getByRole("button", { name: "إرسال طلب العرض" }));

    expect(await screen.findByRole("status")).toHaveTextContent("تم إرسال طلبك");
    await user.click(screen.getByRole("button", { name: "تعديل البيانات" }));
    expect(screen.getByRole("button", { name: "إرسال طلب العرض" })).toBeInTheDocument();
  });

  it("shows a recoverable error when the request fails", async () => {
    const user = userEvent.setup();
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: "Too many requests." }),
    } as Response);
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Full name *"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Work email *"), "ada@example.com");
    await user.type(screen.getByLabelText("Company *"), "UNU Labs");
    await user.click(screen.getByRole("button", { name: "Send my demo request" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Too many requests.");
  });

  it("includes quote sizing details in the submitted context", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(successfulResponse);
    render(<ContactForm variant="quote" />);

    await user.type(screen.getByLabelText("Full name *"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Work email *"), "ada@example.com");
    await user.type(screen.getByLabelText("Company *"), "UNU Labs");
    await user.type(screen.getByLabelText("Phone number *"), "+966500000000");
    await user.selectOptions(screen.getByLabelText("Number of employees"), "51–200");
    await user.selectOptions(screen.getByLabelText("Number of branches"), "6–20");
    await user.click(screen.getByRole("button", { name: "Request a quote" }));

    expect(fetchMock).toHaveBeenCalledOnce();
    const request = fetchMock.mock.calls[0][1] as RequestInit;
    const body = JSON.parse(String(request.body)) as { message: string };
    expect(body.message).toContain("Employees: 51–200");
    expect(body.message).toContain("Branches: 6–20");
  });
});
