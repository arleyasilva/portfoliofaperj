import { render, screen } from "@testing-library/react";
import Dashboard from "@/pages/dashboard";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

jest.mock("@/hooks/useFaperjData");
jest.mock("@/components/Header", () => () => <div data-testid="header">Header</div>);
jest.mock("@/components/Footer", () => () => <div data-testid="footer">Footer</div>);

describe("Dashboard Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({ 
      data: [
        { label: "Item 1", value: 10 },
        { label: "Item 2", value: 20 },
      ] 
    });
  });

  it("deve renderizar o Header", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("deve renderizar o Footer", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("deve renderizar o título INDICADORES", () => {
    render(<Dashboard />);
    expect(screen.getByRole("heading", { name: /INDICADORES/i })).toBeInTheDocument();
  });

  it("deve renderizar botões de filtro", () => {
    render(<Dashboard />);
    expect(screen.getByRole("button", { name: /Bolsas/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Auxílios/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Área de Conhecimento/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sexo/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Regionalização/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Internacionalização/i })).toBeInTheDocument();
  });

  it("deve chamar useFaperjData com múltiplos tipos de gráficos", () => {
    render(<Dashboard />);
    expect(useFaperjDataModule.default).toHaveBeenCalled();
  });

  it("deve renderizar Container com maxWidth xl", () => {
    const { container } = render(<Dashboard />);
    expect(container.querySelector(".MuiContainer-maxWidthXl")).toBeInTheDocument();
  });

  it("deve renderizar main element", () => {
    render(<Dashboard />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("deve renderizar Cards com gráficos", () => {
    const { container } = render(<Dashboard />);
    const cards = container.querySelectorAll(".MuiCard-root");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("deve renderizar Grid container", () => {
    const { container } = render(<Dashboard />);
    expect(container.querySelector(".MuiGrid-container")).toBeInTheDocument();
  });

  it("deve renderizar fonte de dados", () => {
    render(<Dashboard />);
    const fontes = screen.getAllByText(/Fonte: Sistema de Bolsas/i);
    expect(fontes.length).toBeGreaterThan(0);
  });
});