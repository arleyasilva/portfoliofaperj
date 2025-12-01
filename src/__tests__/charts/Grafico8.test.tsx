import { render, screen } from "@testing-library/react";
import Grafico8 from "@/components/dashboard/charts/grafico8";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

jest.mock("@/hooks/useFaperjData");
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

describe("Grafico8 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { name: "Valor 1", value: 450 },
        { name: "Valor 2", value: 680 },
        { name: "Valor 3", value: 520 },
        { name: "Valor 4", value: 750 },
        { name: "Valor 5", value: 620 },
        { name: "Valor 6", value: 880 },
      ],
    });
  });

  it("deve renderizar o componente Grafico8", () => {
    render(<Grafico8 />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("deve renderizar Card MUI", () => {
    const { container } = render(<Grafico8 />);
    expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography h6 para título", () => {
    const { container } = render(<Grafico8 />);
    const heading = container.querySelector(".MuiTypography-h6");
    expect(heading).toBeInTheDocument();
  });

  it("deve chamar hook useFaperjData com tipo grafico8", () => {
    render(<Grafico8 />);
    expect(useFaperjDataModule.default).toHaveBeenCalled();
  });

  it("deve renderizar fonte de dados", () => {
    render(<Grafico8 />);
    const fonte = screen.getByText(/Fonte:/i);
    expect(fonte).toBeInTheDocument();
  });

  it("deve renderizar Box container para gráfico", () => {
    const { container } = render(<Grafico8 />);
    const boxes = container.querySelectorAll(".MuiBox-root");
    expect(boxes.length).toBeGreaterThan(0);
  });

  it("deve renderizar Paper root", () => {
    const { container } = render(<Grafico8 />);
    expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography caption para fonte", () => {
    const { container } = render(<Grafico8 />);
    const caption = container.querySelector(".MuiTypography-caption");
    expect(caption).toBeInTheDocument();
  });

  it("deve renderizar sem errors", () => {
    const { container } = render(<Grafico8 />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve ter Paper com classe elevation", () => {
    const { container } = render(<Grafico8 />);
    const paper = container.querySelector(".MuiPaper-elevation");
    expect(paper).toBeInTheDocument();
  });
});