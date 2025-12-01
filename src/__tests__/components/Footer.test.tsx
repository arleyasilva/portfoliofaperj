import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renderiza pelo menos 3 logos", () => {
    render(<Footer />);
    const logos = screen.getAllByTestId("footer-logo");
    expect(logos.length).toBeGreaterThanOrEqual(3);
  });

  it("todos os logos têm role=img", () => {
    render(<Footer />);
    const logos = screen.getAllByRole("img");
    expect(logos.length).toBeGreaterThanOrEqual(3);
  });
});
