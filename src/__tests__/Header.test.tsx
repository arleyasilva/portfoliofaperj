import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "@/components/Header";

describe("Header", () => {
  it("renderiza sem quebrar", () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
