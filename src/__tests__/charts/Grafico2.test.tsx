import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Grafico2 from "@/components/dashboard/charts/grafico2";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

// mock do hook
jest.mock("@/hooks/useFaperjData");

// mock do ReactECharts para não chamar ECharts de verdade
jest.mock("echarts-for-react", () => {
  return function MockedReactECharts() {
    return <div data-testid="echarts-mock" />;
  };
});

describe("Grafico2 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve mostrar loading quando estiver carregando", () => {
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<Grafico2 />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("deve mostrar erro quando houver erro", () => {
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: "Erro",
    });

    render(<Grafico2 />);
    expect(
      screen.getByText(/Erro ao carregar dados do gráfico 2\./i)
    ).toBeInTheDocument();
  });

  it("deve mostrar aviso quando não houver dados", () => {
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    render(<Grafico2 />);
    expect(screen.getByText(/Nenhum dado encontrado\./i)).toBeInTheDocument();
  });

  it("deve renderizar título, gráfico e fonte quando houver dados", () => {
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { label: "Microárea 1", value: 100, color: "#ff0000" },
        { label: "Microárea 2", value: 200, color: "#00ff00" },
      ],
      loading: false,
      error: null,
    });

    render(<Grafico2 />);

    // título
    expect(
      screen.getByText(/Total em \$ de Auxílios por Grande Área/i)
    ).toBeInTheDocument();

    // mock do gráfico
    expect(screen.getByTestId("echarts-mock")).toBeInTheDocument();

    // fonte
    expect(
      screen.getByText(/Fonte: Sistema de Bolsas e Auxílios/i)
    ).toBeInTheDocument();
  });
});
