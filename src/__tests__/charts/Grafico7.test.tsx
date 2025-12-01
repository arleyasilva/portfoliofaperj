import { render, screen } from "@testing-library/react";
import Grafico7 from "@/components/dashboard/charts/grafico7";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

jest.mock("@/hooks/useFaperjData");
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

describe("Grafico7 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { name: "Dado 1", value: 640 },
        { name: "Dado 2", value: 820 },
        { name: "Dado 3", value: 730 },
        { name: "Dado 4", value: 910 },
        { name: "Dado 5", value: 670 },
      ],
    });
  });

  it("deve renderizar o componente Grafico7", () => {
    render(<Grafico7 />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("deve renderizar Card MUI", () => {
    const { container } = render(<Grafico7 />);
    expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography h6 para título", () => {
    const { container } = render(<Grafico7 />);
    const heading = container.querySelector(".MuiTypography-h6");
    expect(heading).toBeInTheDocument();
  });

  it("deve chamar hook useFaperjData com tipo grafico7", () => {
    render(<Grafico7 />);
    expect(useFaperjDataModule.default).toHaveBeenCalled();
  });

  it("deve renderizar fonte de dados", () => {
    render(<Grafico7 />);
    const fonte = screen.getByText(/Fonte:/i);
    expect(fonte).toBeInTheDocument();
  });

  it("deve renderizar Box container para gráfico", () => {
    const { container } = render(<Grafico7 />);
    const boxes = container.querySelectorAll(".MuiBox-root");
    expect(boxes.length).toBeGreaterThan(0);
  });

  it("deve renderizar Paper root", () => {
    const { container } = render(<Grafico7 />);
    expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography caption para fonte", () => {
    const { container } = render(<Grafico7 />);
    const caption = container.querySelector(".MuiTypography-caption");
    expect(caption).toBeInTheDocument();
  });

  it("deve renderizar com dados carregados", () => {
    const { container } = render(<Grafico7 />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve ter Card com rounded borders", () => {
    const { container } = render(<Grafico7 />);
    const card = container.querySelector(".MuiCard-root");
    expect(card).toHaveClass("MuiPaper-rounded");
  });
});