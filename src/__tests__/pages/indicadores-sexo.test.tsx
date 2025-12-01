// src/__tests__/pages/indicadores-sexo.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// mock de next/head para não depender de contexto interno do Next
jest.mock("next/head", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
  };
});

// mock do Header
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

// mock do Footer
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

// função auxiliar PRECISA vir antes dos jest.mock que a usam
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

// mocks dos gráficos (Grafico10..17)
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
  "@/components/dashboard/charts/grafico16_1",
  () => createGraficoMock("grafico16_1")
);
jest.mock(
  "@/components/dashboard/charts/grafico17",
  () => createGraficoMock("grafico17")
);

// importa a página real
import IndicadoresSexoPage from "@/pages/indicadores-sexo";

describe("Página indicadores-sexo", () => {
  it("renderiza sem crashar e inclui header e footer mockados", () => {
    const { container } = render(<IndicadoresSexoPage />);
    expect(container.firstChild).toBeTruthy();

    expect(screen.getByTestId("header-mock")).toBeInTheDocument();
    expect(screen.getByTestId("footer-mock")).toBeInTheDocument();
  });

  it("inclui pelo menos um gráfico mockado", () => {
    const { container } = render(<IndicadoresSexoPage />);

    const chartMocks = Array.from(
      container.querySelectorAll('[data-testid$="-mock"]')
    ).filter((el) =>
      el.getAttribute("data-testid")?.startsWith("grafico")
    );

    expect(chartMocks.length).toBeGreaterThanOrEqual(1);
  });

  it("tem pelo menos um heading visível (tolerante a múltiplos)", () => {
    render(<IndicadoresSexoPage />);
    const headings = screen.queryAllByRole("heading");
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });
});
