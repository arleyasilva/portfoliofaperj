// src/__tests__/pages/indicadores.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
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

// mock do Layout usando o alias @ (mapeado pra src/)
jest.mock("@/components/Layout", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ children }: any) =>
      React.createElement(
        "div",
        { "data-testid": "layout-mock" },
        children
      ),
  };
});

// função auxiliar para criar mocks dos gráficos
function createGraficoMock(name: string) {
  const React = require("react");
  return {
    __esModule: true,
    default: (props: any) =>
      React.createElement(
        "div",
        { "data-testid": `${name}-mock` },
        `${name} Mock: ${props.title}`
      ),
  };
}

// mocks dos gráficos 5..9 e 9_1 usando alias @ também
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
  "@/components/dashboard/charts/grafico9_1",
  () => createGraficoMock("grafico9_1")
);

// importa a página real com alias
import IndicadoresPage from "@/pages/indicadores";

describe("Página indicadores", () => {
  it("renderiza sem crashar e inclui o Layout mockado", () => {
    const { container } = render(<IndicadoresPage />);
    expect(container.firstChild).toBeTruthy();

    const layoutMock = screen.getByTestId("layout-mock");
    expect(layoutMock).toBeInTheDocument();
  });

  it("inclui pelo menos um gráfico mockado", () => {
    const { container } = render(<IndicadoresPage />);

    const chartMocks = Array.from(
      container.querySelectorAll('[data-testid$="-mock"]')
    ).filter((el) =>
      el.getAttribute("data-testid")?.startsWith("grafico")
    );

    expect(chartMocks.length).toBeGreaterThanOrEqual(1);
  });

  it("tem pelo menos um heading visível (tolerante a múltiplos)", () => {
    render(<IndicadoresPage />);
    const headings = screen.queryAllByRole("heading");
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });
});
