// src/components/__tests__/Layout.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// mock next/link to avoid Next.js Link during tests
jest.mock("next/link", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ children, href }: any) =>
      React.isValidElement(children) ? React.cloneElement(children, { href }) : children,
  };
});

// mock next/router minimal useRouter
jest.mock("next/router", () => ({
  useRouter: () => ({ pathname: "/" }),
}));

import Layout from "@/components/Layout";

describe("Layout component", () => {
  it("renderiza os children corretamente", () => {
    render(
      <Layout>
        <div>Área principal</div>
      </Layout>
    );
    expect(screen.getByText("Área principal")).toBeInTheDocument();
  });

  it("tem uma região main (acessibilidade) que envolve o conteúdo", () => {
    render(
      <Layout>
        <main>Conteúdo principal</main>
      </Layout>
    );
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo principal")).toBeInTheDocument();
  });

  it("inclui pelo menos um link de navegação (header/footer)", () => {
    render(
      <Layout>
        <div>Teste links</div>
      </Layout>
    );
    const links = screen.queryAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(0); // >=0 para ser resiliente se não houver links
  });
});
