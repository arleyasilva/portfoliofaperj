import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Banner from "@/components/Banner";

describe("Banner", () => {
  it("renderiza sem erros", () => {
    const { container } = render(<Banner />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
