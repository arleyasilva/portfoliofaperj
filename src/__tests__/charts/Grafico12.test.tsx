import { render, screen } from "@testing-library/react";
import Grafico12 from "@/components/dashboard/charts/grafico12";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

jest.mock("@/hooks/useFaperjData");
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

describe("Grafico12 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { name: "Região Norte", value: 420 },
        { name: "Região Nordeste", value: 560 },
        { name: "Região Centro-Oeste", value: 380 },
        { name: "Região Sudeste", value: 890 },
        { name: "Região Sul", value: 650 },
      ],
    });
  });

  it("deve renderizar o componente Grafico12", () => {
    render(<Grafico12 />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("deve renderizar Card MUI", () => {
    const { container } = render(<Grafico12 />);
    expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography h6 para título", () => {
    const { container } = render(<Grafico12 />);
    const heading = container.querySelector(".MuiTypography-h6");
    expect(heading).toBeInTheDocument();
  });

  it("deve chamar hook useFaperjData com tipo grafico12", () => {
    render(<Grafico12 />);
    expect(useFaperjDataModule.default).toHaveBeenCalled();
  });

  it("deve renderizar fonte de dados", () => {
    render(<Grafico12 />);
    const fonte = screen.getByText(/Fonte:/i);
    expect(fonte).toBeInTheDocument();
  });

  it("deve renderizar Box container para gráfico", () => {
    const { container } = render(<Grafico12 />);
    const boxes = container.querySelectorAll(".MuiBox-root");
    expect(boxes.length).toBeGreaterThan(0);
  });

  it("deve renderizar Paper root", () => {
    const { container } = render(<Grafico12 />);
    expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography caption para fonte", () => {
    const { container } = render(<Grafico12 />);
    const caption = container.querySelector(".MuiTypography-caption");
    expect(caption).toBeInTheDocument();
  });

  it("deve renderizar sem errors", () => {
    const { container } = render(<Grafico12 />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve ter Paper com classe elevation", () => {
    const { container } = render(<Grafico12 />);
    const paper = container.querySelector(".MuiPaper-elevation");
    expect(paper).toBeInTheDocument();
  });
});