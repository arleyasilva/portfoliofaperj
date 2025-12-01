import { render, screen } from "@testing-library/react";
import Grafico3 from "@/components/dashboard/charts/grafico3";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

jest.mock("@/hooks/useFaperjData");
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

describe("Grafico3 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { name: "Bolsas", value: 100 },
        { name: "Auxílios", value: 150 },
        { name: "Total", value: 250 },
      ],
    });
  });

  it("deve renderizar o componente Grafico3", () => {
    render(<Grafico3 />);
    expect(screen.getByRole("heading", { name: /Distribuição de Bolsas/i })).toBeInTheDocument();
  });

  it("deve renderizar o Card", () => {
    const { container } = render(<Grafico3 />);
    expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
  });

  it("deve renderizar o título do gráfico", () => {
    render(<Grafico3 />);
    const title = screen.getByRole("heading", { name: /Distribuição de Bolsas, Auxílios e Total/i });
    expect(title).toBeInTheDocument();
  });

  it("deve renderizar a fonte de dados", () => {
    render(<Grafico3 />);
    expect(screen.getByText(/Fonte: Sistema de Bolsas e Auxílios/i)).toBeInTheDocument();
  });

  it("deve chamar useFaperjData", () => {
    render(<Grafico3 />);
    expect(useFaperjDataModule.default).toHaveBeenCalled();
  });

  it("deve renderizar o container do gráfico", () => {
    const { container } = render(<Grafico3 />);
    const chartContainer = container.querySelector(".MuiBox-root");
    expect(chartContainer).toBeInTheDocument();
  });

  it("deve renderizar com dados carregados", () => {
    render(<Grafico3 />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("deve ter a classe Typography h6 no título", () => {
    const { container } = render(<Grafico3 />);
    const heading = container.querySelector(".MuiTypography-h6");
    expect(heading).toBeInTheDocument();
  });
});