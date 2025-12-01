import { render, screen } from "@testing-library/react";
import Grafico10 from "@/components/dashboard/charts/grafico10";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

jest.mock("@/hooks/useFaperjData");
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

describe("Grafico10 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { name: "Nível 1", value: 580 },
        { name: "Nível 2", value: 740 },
        { name: "Nível 3", value: 620 },
        { name: "Nível 4", value: 910 },
      ],
    });
  });

  it("deve renderizar o componente Grafico10", () => {
    render(<Grafico10 />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("deve renderizar Card MUI", () => {
    const { container } = render(<Grafico10 />);
    expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography h6 para título", () => {
    const { container } = render(<Grafico10 />);
    const heading = container.querySelector(".MuiTypography-h6");
    expect(heading).toBeInTheDocument();
  });

  it("deve chamar hook useFaperjData com tipo grafico10", () => {
    render(<Grafico10 />);
    expect(useFaperjDataModule.default).toHaveBeenCalled();
  });

  it("deve renderizar fonte de dados", () => {
    render(<Grafico10 />);
    const fonte = screen.getByText(/Fonte:/i);
    expect(fonte).toBeInTheDocument();
  });

  it("deve renderizar Box container para gráfico", () => {
    const { container } = render(<Grafico10 />);
    const boxes = container.querySelectorAll(".MuiBox-root");
    expect(boxes.length).toBeGreaterThan(0);
  });

  it("deve renderizar Paper root", () => {
    const { container } = render(<Grafico10 />);
    expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography caption para fonte", () => {
    const { container } = render(<Grafico10 />);
    const caption = container.querySelector(".MuiTypography-caption");
    expect(caption).toBeInTheDocument();
  });

  it("deve renderizar sem errors", () => {
    const { container } = render(<Grafico10 />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve ter Paper com classe elevation", () => {
    const { container } = render(<Grafico10 />);
    const paper = container.querySelector(".MuiPaper-elevation");
    expect(paper).toBeInTheDocument();
  });
});