import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Grafico15 from "@/components/dashboard/charts/grafico15";
import * as useFaperjDataModule from "@/hooks/useFaperjData";

jest.mock("@/hooks/useFaperjData");
jest.mock("echarts", () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
}));

describe("Grafico15 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFaperjDataModule.default as jest.Mock).mockReturnValue({
      data: [
        { label: "2019", area: "Ciências", value: 210 },
        { label: "2020", area: "Engenharia", value: 330 },
      ],
      loading: false,
      error: null,
    });
  });

  it("deve renderizar o componente Grafico15", async () => {
    render(<Grafico15 />);
    await waitFor(() =>
      expect(screen.getByRole("heading")).toBeInTheDocument()
    );
  });

  it("deve renderizar o Card MUI", async () => {
    const { container } = render(<Grafico15 />);
    await waitFor(() =>
      expect(container.querySelector(".MuiCard-root")).toBeInTheDocument()
    );
  });

  it("deve renderizar Typography h6 para título", async () => {
    const { container } = render(<Grafico15 />);
    await waitFor(() =>
      expect(container.querySelector(".MuiTypography-h6")).toBeInTheDocument()
    );
  });

  it("deve chamar o hook useFaperjData com 'grafico15'", async () => {
    render(<Grafico15 />);
    await waitFor(() => {
      expect(useFaperjDataModule.default).toHaveBeenCalled();
      expect(useFaperjDataModule.default).toHaveBeenCalledWith("grafico15");
    });
  });

  it("deve renderizar fonte de dados", async () => {
    render(<Grafico15 />);
    await waitFor(() =>
      expect(screen.getByText(/Fonte:/i)).toBeInTheDocument()
    );
  });

  it("deve renderizar Box container do gráfico", async () => {
    const { container } = render(<Grafico15 />);
    await waitFor(() =>
      expect(container.querySelector(".MuiBox-root")).toBeInTheDocument()
    );
  });

  it("deve renderizar Typography caption para fonte", async () => {
    const { container } = render(<Grafico15 />);
    await waitFor(() =>
      expect(
        container.querySelector(".MuiTypography-caption")
      ).toBeInTheDocument()
    );
  });

  it("deve renderizar Paper root", async () => {
    const { container } = render(<Grafico15 />);
    await waitFor(() =>
      expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument()
    );
  });

  it("deve renderizar sem erros", async () => {
    const { container } = render(<Grafico15 />);
    await waitFor(() =>
      expect(container.firstChild).toBeInTheDocument()
    );
  });
});
