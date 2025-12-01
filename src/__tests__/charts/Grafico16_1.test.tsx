import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Grafico16_1 from "@/components/dashboard/charts/grafico16_1";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

jest.mock("@/hooks/useFaperjData");
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

describe("Grafico16_1 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { label: "2019", internacional: 50, nacional: 450 },
        { label: "2020", internacional: 80, nacional: 420 },
      ],
      loading: false,
      error: null,
    });
  });

  it("deve renderizar o componente Grafico16_1", () => {
    render(<Grafico16_1 />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("deve renderizar o Card MUI", () => {
    const { container } = render(<Grafico16_1 />);
    expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography h6 para título", () => {
    const { container } = render(<Grafico16_1 />);
    expect(container.querySelector(".MuiTypography-h6")).toBeInTheDocument();
  });

  it("deve chamar o hook useFaperjData com 'grafico16_1'", () => {
    render(<Grafico16_1 />);
    expect(useFaperjDataModule.default).toHaveBeenCalled();
    expect(useFaperjDataModule.default).toHaveBeenCalledWith("grafico16_1");
  });

  it("deve renderizar fonte de dados", () => {
    render(<Grafico16_1 />);
    expect(screen.getByText(/Fonte:/i)).toBeInTheDocument();
  });

  it("deve renderizar Box container do gráfico", () => {
    const { container } = render(<Grafico16_1 />);
    expect(container.querySelector(".MuiBox-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography caption para fonte", () => {
    const { container } = render(<Grafico16_1 />);
    expect(container.querySelector(".MuiTypography-caption")).toBeInTheDocument();
  });

  it("deve renderizar Paper root", () => {
    const { container } = render(<Grafico16_1 />);
    expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument();
  });

  it("deve renderizar sem erros", () => {
    const { container } = render(<Grafico16_1 />);
    expect(container.firstChild).toBeInTheDocument();
  });
});