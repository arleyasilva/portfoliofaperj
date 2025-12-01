import "@testing-library/jest-dom";

// mock global de charts (para evitar erros de DOM)
jest.mock("echarts-for-react", () => {
  return () => "ECharts Mock";
});

// mock básico de next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: unknown) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return `<img {...props} />`;
  },
}));

// Mock do window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock do IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver;

// Suprimir avisos de console não críticos
const originalError = console.error;

beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const [first] = args;
    const message =
      typeof first === "string" ? first : String(first ?? "");

    // Ignora warnings antigos de ReactDOM.render
    if (message.includes("Warning: ReactDOM.render")) {
      return;
    }

    // Ignora especificamente os warnings de act() do ForwardRef(LoadableComponent)
    if (
      message.includes(
        "Warning: An update to ForwardRef(LoadableComponent) inside a test was not wrapped in act("
      )
    ) {
      return;
    }

    // Mantém comportamento normal para o resto
    originalError(...args);
  };
});
