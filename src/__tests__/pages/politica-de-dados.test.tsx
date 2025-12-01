import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// mock de next/head para evitar problemas de contexto interno do Next
jest.mock("next/head", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
  };
});

// importe a página de política de dados (ajuste o path se for diferente)
import PoliticaDeDadosPage from "@/pages/politica-de-dados";

// cria um tema simples do MUI
const theme = createTheme();

function renderWithTheme(Page: React.ComponentType) {
  return render(
    <ThemeProvider theme={theme}>
      <Page />
    </ThemeProvider>
  );
}

describe("Página política de dados (política-de-dados)", () => {
  it("renderiza sem crashar", () => {
    const { container } = renderWithTheme(PoliticaDeDadosPage);
    expect(container.firstChild).toBeTruthy();
  });

  it("tem pelo menos um heading visível", () => {
    renderWithTheme(PoliticaDeDadosPage);
    const headings = screen.queryAllByRole("heading");
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it("exibe conteúdo relacionado à política de dados (privacidade/cookies/dados pessoais)", () => {
    renderWithTheme(PoliticaDeDadosPage);

    const regex = /privacidade|dados pessoais|cookies/i;
    const found = screen.queryAllByText(regex);
    expect(found.length).toBeGreaterThanOrEqual(1);
  });

  it("inclui pelo menos um link (contato/termos/externo)", () => {
    renderWithTheme(PoliticaDeDadosPage);
    const links = screen.queryAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});
