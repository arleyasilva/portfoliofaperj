import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "@/components/Header";

describe("Header Component", () => {
  it("renderiza sem quebrar", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /Abrir menu/i })).toBeInTheDocument();
  });

  it("deve renderizar o header com menu", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /Abrir menu/i })).toBeInTheDocument();
  });

  it("deve conter botões de redes sociais", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /Facebook da FAPERJ/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Twitter da FAPERJ/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Instagram da FAPERJ/i })).toBeInTheDocument();
  });
});
