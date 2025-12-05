import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LattesSearch from "@/components/LattesSearch";

describe("LattesSearch", () => {
  it("abre plataforma Lattes com nome pesquisado quando habilitado", async () => {
    const windowOpenSpy = jest.spyOn(window, "open").mockImplementation();

    // O componente por padrão está desabilitado; habilitamos explicitamente para testar a busca
    render(<LattesSearch enabled />);

    const input = screen.getByPlaceholderText("Nome do pesquisador ou ID Lattes");
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