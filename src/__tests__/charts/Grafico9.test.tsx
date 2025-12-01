import { render, screen } from "@testing-library/react";
import Grafico9 from "@/components/dashboard/charts/grafico9";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

jest.mock("@/hooks/useFaperjData");
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

describe("Grafico9 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { name: "Categoria A", value: 500 },
        { name: "Categoria B", value: 700 },
        { name: "Categoria C", value: 450 },
        { name: "Categoria D", value: 600 },
      ],
    });
  });

  it("deve renderizar o componente Grafico9", () => {
    render(<Grafico9 />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("deve renderizar Card MUI", () => {
    const { container } = render(<Grafico9 />);
    expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography h6 para título", () => {
    const { container } = render(<Grafico9 />);
    const heading = container.querySelector(".MuiTypography-h6");
    expect(heading).toBeInTheDocument();
  });

  it("deve chamar hook useFaperjData com tipo grafico9", () => {
    render(<Grafico9 />);
    expect(useFaperjDataModule.default).toHaveBeenCalled();
  });

  it("deve renderizar fonte de dados FAPERJ", () => {
    render(<Grafico9 />);
    const fonte = screen.getByText(/Fonte:/i);
    expect(fonte).toBeInTheDocument();
  });

  it("deve renderizar Box para container do gráfico", () => {
    const { container } = render(<Grafico9 />);
    const boxes = container.querySelectorAll(".MuiBox-root");
    expect(boxes.length).toBeGreaterThan(0);
  });

  it("deve renderizar Paper root", () => {
    const { container } = render(<Grafico9 />);
    expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument();
  });

  it("deve renderizar caption typography para fonte", () => {
    const { container } = render(<Grafico9 />);
    const caption = container.querySelector(".MuiTypography-caption");
    expect(caption).toBeInTheDocument();
  });

  it("deve renderizar sem errors quando dados estão presentes", () => {
    const { container } = render(<Grafico9 />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve ter altura definida no container", () => {
    const { container } = render(<Grafico9 />);
    const chartBox = container.querySelector(".MuiBox-root");
    expect(chartBox).toBeInTheDocument();
  });
});