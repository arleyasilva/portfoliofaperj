import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// mocks for next/image and next/link (declare before importing component)
jest.mock("next/image", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: (props: any) => {
      const { src, alt, width, height, ...rest } = props;
      return React.createElement("img", { src, alt, width, height, ...rest });
    },
  };
});

jest.mock("next/link", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ children, href }: any) =>
      React.isValidElement(children) ? React.cloneElement(children, { href }) : children,
  };
});

import TripleColumnNav from "@/components/TripleColumnNav";

describe("TripleColumnNav component", () => {
  it("monta sem crashar e renderiza pelo menos 3 links", () => {
    const { container } = render(<TripleColumnNav />);
    expect(container.firstChild).toBeTruthy();
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(3);
  });

  it("renderiza imagens/icons para os itens (suporta <img> e <svg>)", () => {
    const { container } = render(<TripleColumnNav />);

    // busca <img> e <svg> no DOM — componente pode usar next/image (mock -> <img>) ou svgs
    const imgs = Array.from(container.querySelectorAll("img"));
    const svgs = Array.from(container.querySelectorAll("svg"));

    const totalMedia = imgs.length + svgs.length;
    expect(totalMedia).toBeGreaterThanOrEqual(1); // espera pelo menos 1 elemento visual

    // valida alt quando houver <img>
    if (imgs.length > 0) {
      imgs.forEach((img) => expect(img.getAttribute("alt")).toBeTruthy());
    }

    // valida presença de svgs quando houver
    if (svgs.length > 0) {
      expect(svgs.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("cada link possui um href definido (não vazio)", () => {
    render(<TripleColumnNav />);
    const links = screen.getAllByRole("link");
    links.forEach((a) => {
      expect(a.getAttribute("href")).toBeTruthy();
      expect(a.getAttribute("href")?.length).toBeGreaterThan(0);
    });
  });
});