import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// mock do hook
jest.mock("@/hooks/useFaperjData");

// mock do echarts (instância)
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

// mock do echarts-for-react (simula lifecycle)
jest.mock("echarts-for-react", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: (props: any) => {
      const echarts = require("echarts");
      React.useEffect(() => {
        const container = document.createElement("div");
        const instance = echarts.init(container);
        if (props && props.option && typeof instance.setOption === "function") {
          instance.setOption(props.option);
        }
        return () => {
          if (typeof instance.dispose === "function") instance.dispose();
        };
      }, [props && props.option]);
      return React.createElement(
        "div",
        { "data-testid": "echarts-mock" },
        "ECharts Mock"
      );
    },
  };
});

import * as useFaperjDataModule from "@/hooks/useFaperjData";
import * as echarts from "echarts";
import ChartSection from "@/components/ChartSection";

describe("ChartSection Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve chamar useFaperjData com o fileName recebido", () => {
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<ChartSection title="Teste" fileName="meu_arquivo" />);
    expect(useFaperjDataModule.default).toHaveBeenCalledWith("meu_arquivo");
  });

  it("exibe texto de carregando quando loading", () => {
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<ChartSection title="Teste" fileName="meu_arquivo" />);
    expect(screen.getByText("Carregando gráfico...")).toBeInTheDocument();
  });

  it("exibe mensagem de erro quando error", () => {
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: "fail",
    });

    render(<ChartSection title="Teste" fileName="meu_arquivo" />);
    expect(
      screen.getByText(/Erro ao carregar meu_arquivo/)
    ).toBeInTheDocument();
  });

  it("exibe mensagem quando não há dados", () => {
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<ChartSection title="Teste" fileName="meu_arquivo" />);
    expect(
      screen.getByText(/Dados indisponíveis \(meu_arquivo\)/)
    ).toBeInTheDocument();
  });

  it("renderiza gráfico com dados e chama echarts.setOption", async () => {
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { label: "A", value: 10 },
        { label: "B", value: 20 },
      ],
      loading: false,
      error: null,
    });

    const { container } = render(
      <ChartSection
        title="Meu Gráfico"
        fileName="meu_arquivo"
        chartType="bar"
      />
    );

    expect(screen.getByText("Meu Gráfico")).toBeInTheDocument();
    expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();

    await waitFor(() => {
      expect((echarts.init as jest.Mock).mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    const instance = (echarts.init as jest.Mock).mock.results[0].value;
    await waitFor(() => expect(instance.setOption).toHaveBeenCalled());
  });

  it("chama dispose ao desmontar", async () => {
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { label: "A", value: 10 },
        { label: "B", value: 20 },
      ],
      loading: false,
      error: null,
    });

    const { unmount } = render(
      <ChartSection title="Meu Gráfico" fileName="meu_arquivo" />
    );

    await waitFor(() => {
      expect((echarts.init as jest.Mock).mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    const instance = (echarts.init as jest.Mock).mock.results[0].value;
    unmount();
    expect(instance.dispose).toHaveBeenCalled();
  });
});
