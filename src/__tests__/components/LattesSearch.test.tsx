import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LattesSearch from "@/components/LattesSearch";

describe("LattesSearch", () => {
  it("abre plataforma Lattes com nome pesquisado", async () => {
    const windowOpenSpy = jest.spyOn(window, "open").mockImplementation();

    render(<LattesSearch />);

    const input = screen.getByPlaceholderText("Digite o nome do pesquisador");
    await userEvent.type(input, "João");

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(windowOpenSpy).toHaveBeenCalled();
    
    // Verifica se a URL contém o texto encoded
    const urlChamada = windowOpenSpy.mock.calls[0][0];
    expect(urlChamada).toContain("Jo%C3%A3o");

    windowOpenSpy.mockRestore();
  });
});