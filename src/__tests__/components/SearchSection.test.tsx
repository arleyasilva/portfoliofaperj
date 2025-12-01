import { render, screen, fireEvent } from "@testing-library/react";
import SearchSection from "@/components/SearchSection";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("SearchSection", () => {
  it("envia busca e chama router.push", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<SearchSection />);

    fireEvent.change(screen.getByLabelText("Pesquisador / Nome"), {
      target: { value: "Maria" },
    });

    fireEvent.click(screen.getByText("BUSCAR"));

    expect(push).toHaveBeenCalledWith("/search-results?researcherName=Maria");
  });
});
