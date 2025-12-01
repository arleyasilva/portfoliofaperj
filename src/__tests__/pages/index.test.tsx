import { render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import Home from "@/pages/index";

const mockRouter = {
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
};

describe("Home Page", () => {
  it("deve renderizar a página inicial", () => {
    render(
      <RouterContext.Provider value={mockRouter as any}>
        <Home />
      </RouterContext.Provider>
    );
    expect(screen.getByRole("heading", { name: /Busca/i })).toBeInTheDocument();
  });

  it("deve conter campos de busca", () => {
    render(
      <RouterContext.Provider value={mockRouter as any}>
        <Home />
      </RouterContext.Provider>
    );
    expect(screen.getByLabelText(/Pesquisador \/ Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Palavra-chave/i)).toBeInTheDocument();
  });
});