import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Grafico17 from "@/components/dashboard/charts/grafico17";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

jest.mock("@/hooks/useFaperjData");
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

describe("Grafico17 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { label: "2019", internacional: 80, nacional: 920 },
        { label: "2020", internacional: 120, nacional: 980 },
      ],
      loading: false,
      error: null,
    });
  });

  it("deve renderizar o componente Grafico17", async () => {
    render(<Grafico17 />);
    await waitFor(() =>
      expect(screen.getByRole("heading")).toBeInTheDocument()
    );
  });

  it("deve renderizar o Card MUI", async () => {
    const { container } = render(<Grafico17 />);
    await waitFor(() =>
      expect(container.querySelector(".MuiCard-root")).toBeInTheDocument()
    );
  });

  it("deve renderizar Typography h6 para título", async () => {
    const { container } = render(<Grafico17 />);
    await waitFor(() =>
      expect(container.querySelector(".MuiTypography-h6")).toBeInTheDocument()
    );
  });

  it("deve chamar o hook useFaperjData com 'grafico17'", async () => {
    render(<Grafico17 />);
    await waitFor(() => {
      expect(useFaperjDataModule.default).toHaveBeenCalled();
      expect(useFaperjDataModule.default).toHaveBeenCalledWith("grafico17");
    });
  });

  it("deve renderizar a fonte de dados", async () => {
    render(<Grafico17 />);
    await waitFor(() =>
      expect(screen.getByText(/Fonte:/i)).toBeInTheDocument()
    );
  });

  it("deve renderizar o container do gráfico (Box)", async () => {
    const { container } = render(<Grafico17 />);
    await waitFor(() =>
      expect(container.querySelector(".MuiBox-root")).toBeInTheDocument()
    );
  });

  it("deve renderizar Typography caption para fonte", async () => {
    const { container } = render(<Grafico17 />);
    await waitFor(() =>
      expect(
        container.querySelector(".MuiTypography-caption")
      ).toBeInTheDocument()
    );
  });

  it("deve renderizar Paper root", async () => {
    const { container } = render(<Grafico17 />);
    await waitFor(() =>
      expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument()
    );
  });

  it("deve renderizar sem erros", async () => {
    const { container } = render(<Grafico17 />);
    await waitFor(() =>
      expect(container.firstChild).toBeInTheDocument()
    );
  });
});
