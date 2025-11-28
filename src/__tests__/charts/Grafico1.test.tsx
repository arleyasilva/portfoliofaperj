import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Grafico1 from "@/components/dashboard/charts/grafico1";

// mock do hook
jest.mock("@/hooks/useFaperjData", () => ({
  __esModule: true,
  default: () => ({
    data: [
      { label: "2019", value: 1000 },
      { label: "2020", value: 2000 },
    ],
    loading: false,
    error: null,
  }),
}));

describe("Grafico1", () => {
  it("renderiza o card do gráfico", () => {
    const { container } = render(<Grafico1 />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
