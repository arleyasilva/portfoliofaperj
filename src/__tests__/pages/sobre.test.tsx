import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
      React.createElement("div", { "data-testid": "layout-mock" }, children),
  };
});

// mock router básico
jest.mock("next/router", () => ({
  useRouter: () => ({ pathname: "/sobre" }),
}));

import Sobre from "@/pages/sobre";

const theme = createTheme();

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("Página Sobre", () => {
  it("renderiza sem crashar e inclui layout mockado", () => {
    const { container } = renderWithTheme(<Sobre />);
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByTestId("layout-mock")).toBeInTheDocument();
  });

  it("exibe um título/heading Sobre", () => {
    renderWithTheme(<Sobre />);
    expect(
      screen.getByRole("heading", { name: /sobre/i })
    ).toBeTruthy();
  });

  // Removido o teste de equipe/créditos enquanto a página não tiver esse conteúdo

  // Removido o teste de contato enquanto a página não tiver seção de contato

  it("menciona a organização/plataforma (ex.: FAPERJ ou Plataforma)", () => {
    renderWithTheme(<Sobre />);
    const orgs = screen.queryAllByText(/faperj|plataform/i);
    expect(orgs.length).toBeGreaterThanOrEqual(1);
  });
});
