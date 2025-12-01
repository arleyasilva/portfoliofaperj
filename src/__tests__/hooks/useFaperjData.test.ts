import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import useFaperjData from "@/hooks/useFaperjData";

const TestComponent = ({ fileName }: { fileName: string }) => {
  const { data, loading, error } = useFaperjData<any>(fileName);

  return React.createElement(
    "div",
    null,
    loading && React.createElement("span", null, "LOADING"),
    error &&
      React.createElement(
        "span",
        null,
        "ERROR:",
        String(error)
      ),
    data &&
      React.createElement(
        "span",
        null,
        "DATA:",
        JSON.stringify(data)
      )
  );
};

describe("useFaperjData hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).fetch = undefined;
  });

  it("mostra loading inicialmente enquanto a requisição está pendente", () => {
    (global as any).fetch = jest.fn(() => new Promise(() => {}));
    render(React.createElement(TestComponent, { fileName: "pendente.json" }));
    expect(screen.getByText("LOADING")).toBeInTheDocument();
  });

  it("retorna dados quando fetch resolve com ok:true", async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ label: "A", value: 1 }],
    });

    render(React.createElement(TestComponent, { fileName: "dados.json" }));

    await waitFor(() =>
      expect(screen.queryByText("LOADING")).not.toBeInTheDocument()
    );
    expect(screen.getByText(/DATA:/)).toBeInTheDocument();
    expect(screen.getByText(/"label":"A"/)).toBeInTheDocument();
  });

  it("sinaliza erro quando fetch rejeita", async () => {
    (global as any).fetch = jest.fn().mockRejectedValue(
      new Error("fetch-fail")
    );

    render(React.createElement(TestComponent, { fileName: "erro.json" }));

    await waitFor(() =>
      expect(screen.getByText(/ERROR:/)).toBeInTheDocument()
    );
  });

  it("sinaliza erro quando response.ok é falso", async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Server error",
    });

    render(React.createElement(TestComponent, { fileName: "bad.json" }));

    await waitFor(() =>
      expect(screen.getByText(/ERROR:/)).toBeInTheDocument()
    );
  });
});
