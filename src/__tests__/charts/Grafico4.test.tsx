import { render, screen } from "@testing-library/react";
import Grafico4 from "@/components/dashboard/charts/grafico4";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

jest.mock("@/hooks/useFaperjData");
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

describe("Grafico4 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { name: "Item 1", value: 200 },
        { name: "Item 2", value: 300 },
        { name: "Item 3", value: 150 },
      ],
    });
  });

  it("deve renderizar o componente Grafico4", () => {
    render(<Grafico4 />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("deve renderizar o Card", () => {
    const { container } = render(<Grafico4 />);
    expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
  });

  it("deve renderizar com Typography h6", () => {
    const { container } = render(<Grafico4 />);
    const heading = container.querySelector(".MuiTypography-h6");
    expect(heading).toBeInTheDocument();
  });

  it("deve chamar useFaperjData hook", () => {
    render(<Grafico4 />);
    expect(useFaperjDataModule.default).toHaveBeenCalled();
  });

  it("deve renderizar fonte de dados", () => {
    render(<Grafico4 />);
    expect(screen.getByText(/Fonte:/i)).toBeInTheDocument();
  });

  it("deve renderizar Box container", () => {
    const { container } = render(<Grafico4 />);
    expect(container.querySelector(".MuiBox-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography caption para fonte", () => {
    const { container } = render(<Grafico4 />);
    const caption = container.querySelector(".MuiTypography-caption");
    expect(caption).toBeInTheDocument();
  });

  it("deve ter múltiplos elementos de Box", () => {
    const { container } = render(<Grafico4 />);
    const boxes = container.querySelectorAll(".MuiBox-root");
    expect(boxes.length).toBeGreaterThan(1);
  });

  it("deve renderizar sem erros", () => {
    const { container } = render(<Grafico4 />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("deve renderizar Paper (Card base)", () => {
    const { container } = render(<Grafico4 />);
    expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument();
  });
});
