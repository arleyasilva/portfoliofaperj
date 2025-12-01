// src/__tests__/pages/IndicadoresInternacionaisPage.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// mock de next/head
jest.mock("next/head", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
  };
});

// mock de Header e Footer usando alias @
jest.mock("@/components/Header", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: () =>
      React.createElement(
        "header",
        { "data-testid": "header-mock" },
        "Header Mock"
      ),
  };
});

jest.mock("@/components/Footer", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: () =>
      React.createElement(
        "footer",
        { "data-testid": "footer-mock" },
        "Footer Mock"
      ),
  };
});

// função auxiliar para criar mocks dos gráficos
function createGraficoMock(name: string) {
  const React = require("react");
  return {
    __esModule: true,
    default: () =>
      React.createElement(
        "div",
        { "data-testid": `${name}-mock` },
        `${name} Mock`
      ),
  };
}

// mocks de TODOS os gráficos usados pela página (com alias @)
jest.mock(
  "@/components/dashboard/charts/grafico1",
  () => createGraficoMock("grafico1")
);
jest.mock(
  "@/components/dashboard/charts/grafico2",
  () => createGraficoMock("grafico2")
);
jest.mock(
  "@/components/dashboard/charts/grafico3",
  () => createGraficoMock("grafico3")
);
jest.mock(
  "@/components/dashboard/charts/grafico4",
  () => createGraficoMock("grafico4")
);
jest.mock(
  "@/components/dashboard/charts/grafico5",
  () => createGraficoMock("grafico5")
);
jest.mock(
  "@/components/dashboard/charts/grafico6",
  () => createGraficoMock("grafico6")
);
jest.mock(
  "@/components/dashboard/charts/grafico7",
  () => createGraficoMock("grafico7")
);
jest.mock(
  "@/components/dashboard/charts/grafico8",
  () => createGraficoMock("grafico8")
);
jest.mock(
  "@/components/dashboard/charts/grafico9",
  () => createGraficoMock("grafico9")
);
jest.mock(
  "@/components/dashboard/charts/grafico10",
  () => createGraficoMock("grafico10")
);
jest.mock(
  "@/components/dashboard/charts/grafico11",
  () => createGraficoMock("grafico11")
);
jest.mock(
  "@/components/dashboard/charts/grafico12",
  () => createGraficoMock("grafico12")
);
jest.mock(
  "@/components/dashboard/charts/grafico13",
  () => createGraficoMock("grafico13")
);
jest.mock(
  "@/components/dashboard/charts/grafico14",
  () => createGraficoMock("grafico14")
);
jest.mock(
  "@/components/dashboard/charts/grafico15",
  () => createGraficoMock("grafico15")
);
jest.mock(
  "@/components/dashboard/charts/grafico16",
  () => createGraficoMock("grafico16")
);
jest.mock(
  "@/components/dashboard/charts/grafico17",
  () => createGraficoMock("grafico17")
);
jest.mock(
  "@/components/dashboard/charts/grafico18",
  () => createGraficoMock("grafico18")
);
jest.mock(
  "@/components/dashboard/charts/GraficoLineRace",
  () => createGraficoMock("GraficoLineRace")
);
jest.mock(
  "@/components/dashboard/charts/grafico9_1",
  () => createGraficoMock("grafico9_1")
);
jest.mock(
  "@/components/dashboard/charts/grafico16_1",
  () => createGraficoMock("grafico16_1")
);

// INTERNACIONALIZAÇÃO
jest.mock(
  "@/components/dashboard/charts/GraficoIntPaises",
  () => createGraficoMock("GraficoIntPaises")
);
jest.mock(
  "@/components/dashboard/charts/GraficoIntCidades",
  () => createGraficoMock("GraficoIntCidades")
);
jest.mock(
  "@/components/dashboard/charts/GraficoIntAnos",
  () => createGraficoMock("GraficoIntAnos")
);
jest.mock(
  "@/components/dashboard/charts/GraficoIntAreas",
  () => createGraficoMock("GraficoIntAreas")
);
jest.mock(
  "@/components/dashboard/charts/GraficoIntSankey",
  () => createGraficoMock("GraficoIntSankey")
);

// importa a página real
import Dashboard from "@/pages/IndicadoresInternacionaisPage";

describe("Página Indicadores Internacionais (IndicadoresInternacionaisPage)", () => {
  it("renderiza sem crashar e mostra título INDICADORES", () => {
    const { container } = render(<Dashboard />);
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByText("INDICADORES")).toBeInTheDocument();
  });

  it("exibe botões de categoria (ex.: Internacionalização e Bolsas)", () => {
    render(<Dashboard />);
    expect(screen.getByText("Bolsas")).toBeInTheDocument();
    expect(screen.getByText("Internacionalização")).toBeInTheDocument();
  });

  it("renderiza pelo menos um gráfico mockado", () => {
    render(<Dashboard />);
    const anyChart = screen.getAllByTestId(/grafico/i);
    expect(anyChart.length).toBeGreaterThanOrEqual(1);

    const buttonIntl = screen.getByText("Internacionalização");
    fireEvent.click(buttonIntl);
    const intlChart = screen.getAllByTestId(/GraficoInt/i);
    expect(intlChart.length).toBeGreaterThanOrEqual(1);
  });
});
