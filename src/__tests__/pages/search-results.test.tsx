import React from "react";
import { render, screen, act } from "@testing-library/react";
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

// mock de Layout
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

// mock de useRouter
const mockPush = jest.fn();
let mockQuery: any = {};
let mockIsReady = true;

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: mockQuery,
    isReady: mockIsReady,
    push: mockPush,
  }),
}));

// importa a página real
import SearchResultsPage from "@/pages/search-results";

// usar fake timers para controlar setTimeout
beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("Página de resultados de busca (search-results)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockQuery = { q: "IA", tipo: "APQ1" }; // filtros de exemplo
    mockIsReady = true;
  });

  it("renderiza sem crashar e mostra o título", () => {
    const { container } = render(<SearchResultsPage />);
    expect(container.firstChild).toBeTruthy();
    expect(
      screen.getByText("Resultados da Busca")
    ).toBeInTheDocument();
  });

  it("mostra loading inicialmente", () => {
    render(<SearchResultsPage />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });

  it("mostra os filtros aplicados no subtítulo", () => {
    render(<SearchResultsPage />);
    const textoFiltros = screen.getByText(/Filtros aplicados:/);
    expect(textoFiltros).toBeInTheDocument();
    expect(textoFiltros.textContent).toMatch(/q=IA/);
  });

  it("exibe resultados mockados após o timeout", async () => {
    render(<SearchResultsPage />);

    // ainda em loading
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // avança o setTimeout de 1500ms
    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    // agora não deve mais estar em loading
    expect(
      screen.queryByRole("progressbar")
    ).not.toBeInTheDocument();

    // mostra contagem de resultados
    expect(
      screen.getByText(/resultados encontrados/)
    ).toBeInTheDocument();

    // mostra dados do mock (pesquisador, título, tipo de fomento)
    expect(
      screen.getByText(/João Arroio da Silva/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Estudos Avançados em IA/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Tipo de Fomento:/)
    ).toBeInTheDocument();
  });

  it("mostra erro quando não há filtros de busca", () => {
    mockQuery = {}; // sem filtros
    render(<SearchResultsPage />);

    // como não há queryString, o efeito deve marcar erro e parar
    const alertaErro = screen.getByText(
      /Nenhum filtro de busca fornecido./
    );
    expect(alertaErro).toBeInTheDocument();
  });
});
