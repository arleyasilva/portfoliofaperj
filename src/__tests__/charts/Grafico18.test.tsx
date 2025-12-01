import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock next/dynamic para simular o comportamento do echarts-for-react:
// - no mount chama echarts.init e instance.setOption(props.option)
// - no unmount chama instance.dispose
jest.mock("next/dynamic", () => (loader: any) => {
  const React = require("react");
  return (props: any) => {
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
    return React.createElement("div", { "data-testid": "echarts-mock" }, "ECharts Mock");
  };
});

// mock hook e echarts
jest.mock("@/hooks/useFaperjData");
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

import * as useFaperjDataModule from "@/hooks/useFaperjData";
import * as echarts from "echarts";
import Grafico18 from "@/components/dashboard/charts/grafico18";

describe("Grafico18 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: {
        years: ["2019", "2020", "2021"],
        regions: [
          { label: "18-24", values: [100, 120, 140] },
          { label: "25-34", values: [200, 210, 220] },
        ],
      },
      loading: false,
      error: null,
    });
  });

  it("deve chamar useFaperjData com 'grafico18'", () => {
    render(<Grafico18 />);
    expect(useFaperjDataModule.default).toHaveBeenCalledWith("grafico18");
  });

  it("deve renderizar elementos básicos (heading, Card, Box)", () => {
    const { container } = render(<Grafico18 />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
    expect(container.querySelector(".MuiBox-root")).toBeInTheDocument();
  });

  it("deve inicializar echarts e chamar setOption", async () => {
    render(<Grafico18 />);
    await waitFor(() => {
      expect((echarts.init as jest.Mock).mock.calls.length).toBeGreaterThanOrEqual(1);
    });
    const instance = (echarts.init as jest.Mock).mock.results[0].value;
    await waitFor(() => expect(instance.setOption).toHaveBeenCalled());
  });

  it("deve chamar dispose ao desmontar o componente", async () => {
    const { unmount } = render(<Grafico18 />);
    await waitFor(() => {
      expect((echarts.init as jest.Mock).mock.calls.length).toBeGreaterThanOrEqual(1);
    });
    const instance = (echarts.init as jest.Mock).mock.results[0].value;
    unmount();
    expect(instance.dispose).toHaveBeenCalled();
  });

  it("não inicializa echarts quando loading", () => {
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<Grafico18 />);
    expect((echarts.init as jest.Mock).mock.calls.length).toBe(0);
  });

  it("não inicializa echarts quando error", () => {
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: new Error("fail"),
    });
    render(<Grafico18 />);
    expect((echarts.init as jest.Mock).mock.calls.length).toBe(0);
  });
});