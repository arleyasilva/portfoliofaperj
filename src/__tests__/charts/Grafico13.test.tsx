import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Grafico13 from "@/components/dashboard/charts/grafico13";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

jest.mock("@/hooks/useFaperjData");
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

describe("📊 Grafico13 – Testes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { label: "2019", feminino: 1200, masculino: 1500 },
        { label: "2020", feminino: 1400, masculino: 1600 },
      ],
      loading: false,
      error: null,
    });
  });

  it("deve renderizar o componente Grafico13", () => {
    render(<Grafico13 />);
    expect(
      screen.getByRole("heading", { name: /Quantidade de Bolsas por Sexo e Ano/i })
    ).toBeInTheDocument();
  });

  it("deve renderizar o Card MUI", () => {
    const { container } = render(<Grafico13 />);
    expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography h6 para título", () => {
    const { container } = render(<Grafico13 />);
    expect(container.querySelector(".MuiTypography-h6")).toBeInTheDocument();
  });

  it("deve chamar o hook useFaperjData com 'grafico13'", () => {
    render(<Grafico13 />);
    expect(useFaperjDataModule.default).toHaveBeenCalled();
    expect(useFaperjDataModule.default).toHaveBeenCalledWith("grafico13");
  });

  it("deve renderizar fonte de dados", () => {
    render(<Grafico13 />);
    expect(screen.getByText(/Fonte:/i)).toBeInTheDocument();
  });

  it("deve renderizar Box container do gráfico", () => {
    const { container } = render(<Grafico13 />);
    expect(container.querySelector(".MuiBox-root")).toBeInTheDocument();
  });

  it("deve renderizar Typography caption para fonte", () => {
    const { container } = render(<Grafico13 />);
    expect(container.querySelector(".MuiTypography-caption")).toBeInTheDocument();
  });

  it("deve ter múltiplos elementos Box", () => {
    const { container } = render(<Grafico13 />);
    const boxes = container.querySelectorAll(".MuiBox-root");
    expect(boxes.length).toBeGreaterThan(0);
  });

  it("deve renderizar Paper root", () => {
    const { container } = render(<Grafico13 />);
    expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument();
  });

  it("deve renderizar sem erros", () => {
    const { container } = render(<Grafico13 />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
