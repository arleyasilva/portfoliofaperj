import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

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

import IconNav from "@/components/IconNav";

describe("IconNav component", () => {
  it("renderiza todos os itens de navegação com labels e imagens", () => {
    // seus expects aqui
  });
});
